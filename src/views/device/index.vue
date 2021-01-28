<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <!-- 添加设备 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          {{ $t('operation_btn.btn_text_22') }}
        </el-button>
        <!-- 搜索设备 -->
        <el-button
          icon="el-icon-search"
          type="primary"
          style="opacity: 0.7"
          @click="openTabelDialog"
        >
          {{ $t('operation_btn.btn_text_23') }}
        </el-button>
        <span class="tips">
          {{ $t('operation_tips.tips_39') }}
        </span>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="700"
      @sort-change="tableSortChange"
    >
      <!-- 序号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_1')"
        width="95"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_2')"
        prop="DeviceNo"
        sortable
      ></el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_3')"
        prop="DeviceName"
        sortable
      ></el-table-column>
      <!-- IP地址 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_4')"
        prop="IP"
        sortable
      ></el-table-column>
      <!-- 状态 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_5')"
        prop="IsConnected"
        sortable
      >
        <template #default="{ row }">
          <el-tag v-if="row.IsConnected">{{ $t('device.text_7') }}</el-tag>
          <el-tag v-else type="danger">{{ $t('device.text_8') }}</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('device.text_6')" fixed="right">
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 开闸 -->
          <el-button type="text" icon="el-icon-thumb" @click="openDoor(row)">
            {{ $t('operation_btn.btn_text_24') }}
          </el-button>
          <!-- 删除 -->
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            {{ $t('operation_btn.btn_text_2') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page.pageNo"
      :layout="layout"
      :page-size="page.pageSize"
      :total="page.total"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <el-dialog
      :title="form.editIp ? $t('device.text_9') : $t('device.text_10')"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formInfo"
        :model="form"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <!-- IP地址 -->
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="form.IP"
            :placeholder="$t('device.text_4')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 名称 -->
        <el-form-item :label="$t('device.text_11')" prop="DeviceName">
          <el-input
            v-model="form.DeviceName"
            :placeholder="$t('device.text_3')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="addDevice('formInfo')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 设备列表 -->
    <!-- 设备IP -->
    <el-dialog
      :title="$t('device.text_12')"
      :visible.sync="dialogTableVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-table
        ref="tableIP"
        v-loading="listLoading2"
        :data="IPList"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
      >
        <!-- IP地址 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('device.text_4')"
          prop="Item2"
        ></el-table-column>
        <!-- 设备型号 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('device.text_13')"
          prop="Item4"
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('device.text_6')" fixed="right">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-edit" @click="addIP(row)">
              {{ $t('operation_btn.btn_text_1') }}
            </el-button>
            <!-- 修改IP -->
            <el-button type="text" icon="el-icon-thumb" @click="editIP(row)">
              {{ $t('operation_btn.btn_text_25') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- IP信息 -->
    <el-dialog
      :title="$t('device.text_14')"
      :visible.sync="dialogIPVisible"
      width="350px"
      :destroy-on-close="true"
    >
      <el-form
        ref="IPform"
        :model="ipForm"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="ipForm.IP"
            placeholder="IP"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 子网掩码 -->
        <el-form-item :label="$t('device.text_15')" prop="Netmask">
          <el-input
            v-model="ipForm.Netmask"
            :placeholder="$t('device.text_15')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 默认网关 -->
        <el-form-item :label="$t('device.text_16')" prop="gateway">
          <el-input
            v-model="ipForm.gateway"
            :placeholder="$t('device.text_16')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIPVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="changeIP('IPform')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDeviceList,
    addDevice,
    editDevice,
    openDoor,
    delDevice,
    getDeviceByLocal,
    changeIP,
  } from '@/api/device'
  export default {
    name: 'DeviceIndex',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        page: {
          pageNo: 1,
          pageSize: 100,
          title: '',
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        // 新增、编辑
        form: {
          IP: '',
          DeviceName: '',
        },
        rules: {
          IP: [
            {
              required: true,
              message: this.$t('device.text_17'),
              trigger: 'blur',
            },
            {
              pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_18'),
              trigger: 'blur',
            },
          ],
          DeviceName: [
            {
              required: true,
              message: this.$t('device.text_19'),
              trigger: 'blur',
            },
          ],
          Netmask: [
            {
              required: true,
              message: this.$t('device.text_20'),
              trigger: 'blur',
            },
            {
              pattern: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
              message: this.$t('device.text_23'),
              trigger: 'blur',
            },
          ],
          gateway: [
            {
              required: true,
              message: this.$t('device.text_21'),
              trigger: 'blur',
            },
            {
              pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_22'),
              trigger: 'blur',
            },
          ],
        },
        dialogTableVisible: false, //表格弹窗控制
        IPList: [], //IP列表
        listLoading2: false,
        dialogIPVisible: false, //IP信息弹窗
        ipForm: {
          IP: '',
          Netmask: '',
          gateway: '',
        },
      }
    },
    created() {
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        let list = getDeviceList()
        this.list = list
        this.page.total = list.length
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      update() {
        this.listLoading = true
        setTimeout(() => {
          let list = getDeviceList()
          this.list = list
          this.page.total = list.length
          this.listLoading = false
        }, 5000)
      },
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      //开闸
      openDoor(row) {
        openDoor(row.IP).then((res) => {
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_40'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_41'), 'warning')
          }
        })
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
          let res = delDevice(row)
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
          }
          this.update()
        })
      },

      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        if (data.Deviceid) {
          this.form = data
          this.form.editIp = data.IP
        }
      },
      //添加设备
      addDevice(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res
            if (this.form.Deviceid) {
              res = editDevice(this.form)
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_10'), 'success')
                this.dialogFormVisible = false
                this.update()
              } else if (res.result == 0) {
                this.$baseMessage(this.$t('operation_tips.tips_11'), 'warning')
              }
            } else {
              res = addDevice(this.form)
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_8'), 'success')
                this.dialogFormVisible = false
                this.update()
              } else if (res.result == 1) {
                this.$baseMessage(this.$t('device.text_24'), 'warning')
              } else if (res.result == 3) {
                this.$baseMessage(this.$t('operation_tips.tips_9'), 'error')
              }
            }
          } else {
            return false
          }
        })
      },
      // 关闭弹窗
      closeFn(done) {
        if (done && typeof done == 'function') {
          done()
        } else {
          this.dialogFormVisible = false
        }
        this.form = {
          IP: '',
          DeviceName: '',
        }
      },

      //打开表格弹窗
      openTabelDialog() {
        this.dialogTableVisible = true
        this.listLoading2 = true
        getDeviceByLocal().then((res) => {
          this.IPList = res
          this.listLoading2 = false
        })
      },
      //添加IP
      addIP(row) {
        this.$prompt(
          this.$t('device.text_19'),
          this.$t('operation_tips.tips_42'),
          {
            confirmButtonText: this.$t('operation_btn.btn_text_5'),
            cancelButtonText: this.$t('operation_btn.btn_text_4'),
          }
        ).then(({ value }) => {
          let res = addDevice({
            IP: row.Item2,
            DeviceName: value ? value : row.Item4,
          })
          if (res.result == 2) {
            this.$baseMessage(this.$t('operation_tips.tips_8'), 'success')
            this.openTabelDialog()
            this.update()
          } else if (res.result == 1) {
            this.$baseMessage(this.$t('device.text_24'), 'warning')
          } else if (res.result == 3) {
            this.$baseMessage(this.$t('operation_tips.tips_9'), 'error')
          }
        })
      },
      // 打开ip信息弹窗
      editIP(row) {
        this.dialogIPVisible = true
        let a = row.Item2.split('.')
        this.ipForm = {
          mac: row.Item1,
          IP: row.Item2,
          Netmask: row.Item3,
          gateway: row.Item5
            ? row.Item5
            : a[0] + '.' + a[1] + '.' + a[2] + '.1',
        }
      },
      //修改ip
      changeIP(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            changeIP(this.ipForm)
            this.dialogIPVisible = false
            this.listLoading2 = true
            setTimeout(() => {
              this.openTabelDialog()
            }, 3000)
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .form_group {
    height: auto;
    .el-form {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__content {
          display: flex;
          align-items: center;
          margin-right: 10px;
          > span {
            white-space: nowrap;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .btn_group {
    margin: 15px 0;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-form {
    padding: 0 !important;
  }
</style>
