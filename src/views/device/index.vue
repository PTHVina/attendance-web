<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          添加设备
        </el-button>
        <el-button
          icon="el-icon-search"
          type="primary"
          style="opacity: 0.7"
          @click="openTabelDialog"
        >
          搜索设备
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      @sort-change="tableSortChange"
    >
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="设备编号"
        prop="DeviceNo"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="设备名称"
        prop="DeviceName"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="IP地址"
        prop="IP"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="状态"
        prop="IsConnected"
        sortable
      >
        <template #default="{ row }">
          <el-tag v-if="row.IsConnected">在线</el-tag>
          <el-tag v-else type="danger">离线</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-thumb" @click="openDoor(row)">
            开闸
          </el-button>
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
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
      title="添加设备"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        :model="form"
        label-width="80px"
        :rules="rules"
        size="medium"
        ref="formInfo"
      >
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="form.IP"
            placeholder="IP地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="DeviceName">
          <el-input
            v-model="form.DeviceName"
            placeholder="设备名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="addDevice('formInfo')">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 设备列表 -->
    <el-dialog
      title="设备IP"
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
        <el-table-column
          show-overflow-tooltip
          label="IP地址"
          prop="Item2"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="设备型号"
          prop="Item4"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-edit" @click="addIP(row)">
              添加
            </el-button>
            <el-button type="text" icon="el-icon-thumb" @click="editIP(row)">
              修改IP
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- IP信息 -->
    <el-dialog
      title="IP信息"
      :visible.sync="dialogIPVisible"
      width="350px"
      :destroy-on-close="true"
    >
      <el-form
        :model="ipForm"
        label-width="80px"
        :rules="rules"
        size="medium"
        ref="IPform"
      >
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="ipForm.IP"
            placeholder="IP"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="子网掩码" prop="Netmask">
          <el-input
            v-model="ipForm.Netmask"
            placeholder="子网掩码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认网关" prop="gateway">
          <el-input
            v-model="ipForm.gateway"
            placeholder="默认网关"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIPVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeIP('IPform')">确 定</el-button>
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
    name: 'device',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total',
        elementLoadingText: '正在加载...',
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
            { required: true, message: 'IP地址不能为空!', trigger: 'blur' },
            {
              pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: '请填写正确的ipv4地址',
              trigger: 'blur',
            },
          ],
          DeviceName: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
          ],
          Netmask: [
            { required: true, message: '子网掩码不能为空!', trigger: 'blur' },
            {
              pattern: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
              message: '请填写正确的子网掩码',
              trigger: 'blur',
            },
          ],
          gateway: [
            { required: true, message: '默认网关不能为空!', trigger: 'blur' },
            {
              pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: '请填写正确的网关',
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
            this.$baseMessage('开闸成功', 'success')
          } else {
            this.$baseMessage('开闸失败', 'warning')
          }
        })
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm('你确定要删除当前项吗', null, () => {
          let res = delDevice(row)
          if (res) {
            this.$baseMessage('删除成功', 'success')
          } else {
            this.$baseMessage('删除失败', 'warning')
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
                this.$baseMessage('修改成功', 'success')
                this.dialogFormVisible = false
                this.update()
              } else if (res.result == 0) {
                this.$baseMessage('修改失败', 'warning')
              }
            } else {
              res = addDevice(this.form)
              if (res.result == 2) {
                this.$baseMessage('添加成功', 'success')
                this.dialogFormVisible = false
                this.update()
              } else if (res.result == 1) {
                this.$baseMessage('IP地址已存在，不能重复添加！', 'warning')
              } else if (res.result == 3) {
                this.$baseMessage('添加失败', 'error')
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
        this.$prompt('请输入设备名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let res = addDevice({
            IP: row.Item2,
            DeviceName: value ? value : row.Item4,
          })
          if (res.result == 2) {
            this.$baseMessage('添加成功', 'success')
            this.openTabelDialog()
            this.update()
          } else if (res.result == 1) {
            this.$baseMessage('IP地址已存在，不能重复添加！', 'warning')
          } else if (res.result == 3) {
            this.$baseMessage('添加失败', 'error')
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
