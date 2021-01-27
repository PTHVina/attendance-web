<template>
  <div class="table-container">
    <div class="group">
      <div class="form_group">
        <el-form
          ref="queryForm"
          :model="queryForm"
          :inline="true"
          size="medium"
          @submit.native.prevent
        >
          <!-- 姓名 -->
          <el-form-item>
            <span>{{ $t('personnel.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('personnel.pl_1')"
            />
          </el-form-item>
          <!-- 编号 -->
          <el-form-item>
            <span>{{ $t('personnel.text_2') }}</span>
            <el-input
              v-model="queryForm.no"
              :placeholder="$t('personnel.title_5')"
            />
          </el-form-item>
          <!-- 电话号码 -->
          <el-form-item>
            <span>{{ $t('personnel.text_3') }}</span>
            <el-input
              v-model="queryForm.qu_phone"
              :placeholder="$t('personnel.text_3')"
            />
          </el-form-item>
          <el-form-item>
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery('queryForm')"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <!-- 新增 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
        <!-- 导出列表 -->
        <el-button icon="el-icon-upload2" type="primary" @click="downList">
          {{ $t('operation_btn.btn_text_8') }}
        </el-button>
        <!-- 批量导入 -->
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          @click="importExcel"
        >
          {{ $t('operation_btn.btn_text_9') }}
        </el-button>
        <!-- 下载模板 -->
        <el-button icon="el-icon-download" type="primary" @click="downDemo">
          {{ $t('operation_btn.btn_text_10') }}
        </el-button>
        <!-- 批量下发 -->
        <el-button icon="el-icon-connection" type="primary" @click="issue">
          {{ $t('operation_btn.btn_text_11') }}
        </el-button>
        <!-- 一键下发 -->
        <el-button icon="el-icon-thumb" type="primary" @click="oneClickIssue">
          {{ $t('operation_btn.btn_text_12') }}
        </el-button>
        <!-- 批量删除 -->
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="handleDelete"
        >
          {{ $t('operation_btn.btn_text_13') }}
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <!-- 头像 -->
      <el-table-column show-overflow-tooltip :label="$t('personnel.title_1')">
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.picture"></el-image>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('personnel.text_1')"
        sortable
      ></el-table-column>
      <!-- 电话号码 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_3')"
        prop="phone"
        sortable
      ></el-table-column>
      <!-- 部门 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_4')"
        prop="departmentname"
        sortable
      ></el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_5')"
        prop="Employee_code"
        sortable
      ></el-table-column>
      <!-- 工作分类 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_6')"
        prop="Employetypename"
        sortable
      ></el-table-column>
      <!-- 已下发总数 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_7')"
        prop="eqcount"
        sortable
      ></el-table-column>
      <!-- 相机总数 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_8')"
        prop="decount"
        sortable
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column
        :label="$t('personnel.title_9')"
        min-width="200px"
        fixed="right"
      >
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 下发 -->
          <el-button type="text" icon="el-icon-thumb" @click="issue(row)">
            {{ $t('operation_btn.btn_text_15') }}
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
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <!-- 人员信息 -->
    <el-dialog
      :title="$t('personnel.text_4')"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="setForm"
        :model="form"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <!-- 姓名 -->
        <el-form-item :label="$t('personnel.text_1')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('personnel.pl_1')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 编号 -->
        <el-form-item :label="$t('personnel.text_2')" prop="Employee_code">
          <el-input
            v-model="form.Employee_code"
            :placeholder="$t('personnel.title_5')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item :label="$t('personnel.text_3')" prop="phone">
          <el-input
            v-model="form.phone"
            :placeholder="$t('personnel.text_3')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 门禁卡号 -->
        <el-form-item :label="$t('personnel.title_10')">
          <el-input
            v-model="form.face_idcard"
            :placeholder="$t('personnel.title_10')"
            autocomplete="off"
            style="width: 60%; margin-right: 20px"
          ></el-input>
          <el-radio-group v-model="form.idcardtype">
            <el-radio label="32">32{{ $t('personnel.title_2') }}</el-radio>
            <el-radio label="64">64{{ $t('personnel.title_2') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item :label="$t('personnel.title_11')" prop="Email">
          <el-input
            v-model="form.Email"
            :placeholder="$t('personnel.pl_2')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 部门 -->
        <el-form-item
          v-if="form.id"
          :label="$t('personnel.title_4')"
          prop="departmentname"
        >
          <el-cascader
            ref="cascader"
            :key="form.departmentname"
            v-model="form.departmentname"
            :options="option"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'name',
              emitPath: false,
            }"
            :show-all-levels="false"
            :placeholder="$t('personnel.pl_3')"
            style="width: 100%"
            @change="changeDepartment"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          v-else
          :label="$t('personnel.title_4')"
          prop="departmentname"
        >
          <el-cascader
            v-model="form.departmentname"
            :options="option"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id',
              emitPath: false,
            }"
            :show-all-levels="false"
            :placeholder="$t('personnel.pl_3')"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <!-- 工作分类 -->
        <el-form-item :label="$t('personnel.title_6')" prop="Employetypename">
          <el-select
            v-model="form.Employetypename"
            :placeholder="$t('personnel.pl_4')"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 照片 -->
        <el-form-item :label="$t('personnel.title_12')" prop="picture">
          <div class="add_img">
            <el-image
              v-if="form.picture"
              class="show_img"
              :src="form.picture"
              :preview-src-list="[form.picture]"
              fit="contain"
            ></el-image>
            <i v-else class="el-icon-picture-outline"></i>
            <div class="add_box">
              <span class="uploading" @click="checkImg">
                {{ $t('operation_btn.btn_text_16') }}
              </span>
              <span class="photo" @click="photograph">
                {{ $t('operation_btn.btn_text_17') }}
              </span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setFormData('setForm')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 设备弹窗 -->
    <!-- 下发设备 -->
    <el-dialog
      :title="$t('personnel.text_5')"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="gridData" @selection-change="getSelectRows">
        <el-table-column
          show-overflow-tooltip
          type="selection"
          width="55"
        ></el-table-column>
        <!-- IP地址 -->
        <el-table-column
          property="IP"
          sortable
          :label="$t('personnel.title_3')"
        ></el-table-column>
        <!-- 设备名称 -->
        <el-table-column
          property="DeviceName"
          sortable
          :label="$t('personnel.title_13')"
        ></el-table-column>
        <!-- 设备编号 -->
        <el-table-column
          property="DeviceNo"
          sortable
          :label="$t('personnel.title_14')"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setIssue">
          {{ $t('operation_btn.btn_text_15') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDataList,
    queryList,
    getTypeList,
    setData,
    openImg,
    editData,
    delData,
    queryPerson,
    getDeviceList,
    toIssue,
    oneClickIssue,
    download,
    importExcel,
    downList,
    photograph,
  } from '@/api/personnel'
  export default {
    name: 'PersonnelList',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: this.$t('operation_tips.tips_12'),
        // 查询表单
        queryForm: {
          name: '',
          no: '',
          qu_phone: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        option: [], // 部门列表
        options: [], // 工作分类
        // 新增、编辑
        form: {
          name: '',
          Employee_code: '', //编号
          phone: '',
          face_idcard: '', //门禁编号
          idcardtype: '32', //门禁编号位数
          Email: '',
          departmentname: '', //部门
          Employetypename: '', //工作分类
          picture: '',
          line_userid: '',
          line_type: '',
        },
        departmentData: {}, //选中部门数据
        rules: {
          name: [
            {
              required: true,
              message: this.$t('operation_tips.tips_13'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 10,
              message: this.$t('operation_tips.tips_2'),
              trigger: 'blur',
            },
          ],
          Employee_code: [
            {
              required: true,
              message: this.$t('operation_tips.tips_14'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 18,
              message: this.$t('operation_tips.tips_20'),
              trigger: 'blur',
            },
            {
              pattern: /^[A-Za-z0-9]*$/,
              message: this.$t('operation_tips.tips_15'),
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[3-9]\d{9}$/,
              message: this.$t('operation_tips.tips_3'),
              trigger: 'blur',
            },
          ],
          Email: [
            {
              pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
              message: this.$t('operation_tips.tips_16'),
              trigger: 'blur',
            },
          ],
          departmentname: [
            {
              required: true,
              message: this.$t('operation_tips.tips_17'),
              trigger: 'blur',
            },
          ],
          Employetypename: [
            {
              required: true,
              message: this.$t('operation_tips.tips_18'),
              trigger: 'blur',
            },
          ],
          picture: [
            {
              required: true,
              message: this.$t('operation_tips.tips_19'),
              trigger: 'blur',
            },
          ],
        },
        dialogTableVisible: false, //表格弹窗控制
        gridData: [], //设备列表
        deviceRows: [], //设备选中列表
        issueUser: [], //选中人员
      }
    },
    created() {
      this.typeList()
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      typeList() {
        // 人员分类、部门列表
        let list = getTypeList()
        this.option = list[0]
        this.options = list[1]
        //设备列表
        let deviceList = getDeviceList()
        this.gridData = deviceList
      },
      init() {
        this.listLoading = true
        let list = getDataList(this.page)
        this.list = list[0]
        this.page.total = list[1]
        let imageList = []
        this.list.forEach((item, index) => {
          imageList.push(item.picture)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.picture)
        })
        this.imageList = imageList
      },
      // 选中
      setSelectRows(val) {
        this.selectRows = val
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
            let res = delData([row.id])
            if (res) {
              this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
              this.init()
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
              this.init()
            }
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = []
            this.selectRows.forEach((item) => {
              ids.push(item.id)
            })
            this.$baseConfirm(this.$t('operation_tips.tips_21'), null, () => {
              let res = delData(ids)
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
                this.init()
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
                this.init()
              }
            })
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
      },
      //下发按钮
      issue(row) {
        if (row.id) {
          let res = queryPerson(row.id)
          if (res.result == 'error') {
            this.$baseMessage(this.$t('operation_tips.tips_19'), 'warning')
            return
          } else if (res.result == 'success') {
            this.deviceRows = []
            this.issueUser = []
            this.issueUser.push(row)
            this.dialogTableVisible = true
          }
        } else {
          if (this.selectRows.length > 0) {
            this.deviceRows = []
            this.issueUser = []
            let isFind = true
            this.selectRows.forEach((item) => {
              let res = queryPerson(item.id)
              if (res.result == 'error') {
                this.$baseMessage(this.$t('operation_tips.tips_19'), 'warning')
                isFind = false
              } else if (res.result == 'success') {
                this.issueUser.push(item)
              }
            })
            if (isFind) {
              this.dialogTableVisible = true
            } else {
              this.issueUser = []
              this.deviceRows = []
              this.dialogTableVisible = fasle
            }
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
      },
      //设备列表选中
      getSelectRows(val) {
        this.deviceRows = val
      },
      //人员下发
      setIssue() {
        let data = []
        this.issueUser.forEach((item, index) => {
          this.deviceRows.forEach((item2) => {
            let obj = { userid: item.id, deviceid: item2.Deviceid }
            data.push(obj)
          })
        })
        let res = toIssue(data)
        if (res) {
          this.$baseMessage(this.$t('operation_tips.tips_23'), 'success')
          this.dialogTableVisible = false
          this.init()
        }
      },
      //一键下发
      oneClickIssue() {
        this.$baseConfirm('确定将全部人员下发到所有设备吗？', null, () => {
          oneClickIssue().then((res) => {
            if (res) {
              this.$baseMessage(this.$t('operation_tips.tips_24'), 'success')
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_25'), 'warning')
            }
            this.init()
          })
        })
      },
      //下载模板
      downDemo() {
        download()
      },
      //批量导入
      importExcel() {
        importExcel().then((res) => {
          if (res.result == 2) {
            this.$baseMessage(this.$t('operation_tips.tips_26'), 'success')
          } else if (res.result == 1) {
            this.$baseMessage(res.data, 'warning')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_27'), 'error')
          }
          this.init()
        })
      },
      //导出
      downList() {
        downList()
      },
      // 切换显示条数
      handleSizeChange(val) {
        this.page.pageSize = val
        this.init()
      },
      //切换页数
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.init()
      },
      //查询
      handleQuery(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.page.pageNo = 1
            let list = queryList(this.page, this.queryForm)
            this.list = list[0]
            this.page.total = list[1]
            let imageList = []
            this.list.forEach((item, index) => {
              imageList.push(item.picture)
            })
            this.imageList = imageList
            setTimeout(() => {
              this.listLoading = false
            }, 500)
          } else {
            return false
          }
        })
      },

      //编辑打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        if (data.id) {
          this.form = {
            id: data.id,
            name: data.name,
            Employee_code: data.Employee_code,
            phone: data.phone,
            face_idcard: data.face_idcard,
            idcardtype: data.idcardtype,
            Email: data.Email.replace(/\s*/g, ''),
            departmentname: data.departmentname,
            Employetypename: data.Employetype_id,
            picture: data.picture,
            line_userid: data.line_userid,
            line_type: data.line_type,
          }
          this.departmentData = {
            id: data.department_id,
            name: data.departmentname,
            title: data.departmentname,
          }
        }
      },
      //部门切换
      changeDepartment(e) {
        let data = this.$refs.cascader.panel.getNodeByValue(e)
        this.departmentData = data.data
      },
      //选择图片
      checkImg() {
        let img = openImg()
        if (!img) {
          return
        }
        this.form.picture = img
      },
      //拍照
      photograph() {
        let img = photograph()
        if (!img) {
          return
        }
        this.form.picture = img
      },
      //设置人员信息
      setFormData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res
            if (this.form.face_idcard.length == 0) {
              this.form.idcardtype = ''
            }
            if (this.form.idcardtype == 32) {
              if (this.form.face_idcard > 4294967295) {
                this.$baseMessage(this.$t('operation_tips.tips_28'), 'warning')
                return
              }
            } else if (this.form.idcardtype == 64) {
              if (this.form.face_idcard > 18446744073709551615) {
                this.$baseMessage(this.$t('operation_tips.tips_29'), 'warning')
                return
              }
            }
            if (this.form.id) {
              this.form.departmentname = this.departmentData.id
              res = editData(this.form)
            } else {
              res = setData(this.form)
            }
            if (res.result == 2) {
              this.$baseMessage(res.data, 'success')
              this.dialogFormVisible = false
              this.init()
            } else {
              this.$baseMessage(res.data, 'warning')
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
          name: '',
          Employee_code: '',
          phone: '',
          face_idcard: '',
          idcardtype: '',
          Email: '',
          departmentname: '',
          Employetypename: '',
          picture: '',
        }
        this.departmentData = {}
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
  .el-cascader-node__postfix {
    position: unset;
  }

  .add_img {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 146px;
    position: relative;
    z-index: 0;
    .show_img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    > i {
      width: 100%;
      height: 100%;
      line-height: 146px;
      vertical-align: top;
      font-size: 40px;
      color: #ccc;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .add_box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background: #666;
      border-radius: 6px;
      opacity: 0.6;
      display: none;
      // display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: white;
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
      }
      .uploading {
        margin-right: 20px;
      }
    }
  }
  .add_img:hover .add_box {
    display: flex;
  }
</style>
