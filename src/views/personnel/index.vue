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
          <el-form-item>
            <span>姓名</span>
            <el-input v-model="queryForm.name" placeholder="人员姓名" />
          </el-form-item>
          <el-form-item>
            <span>编号</span>
            <el-input v-model="queryForm.no" placeholder="人员编号" />
          </el-form-item>
          <el-form-item>
            <span>电话号码</span>
            <el-input v-model="queryForm.qu_phone" placeholder="电话号码" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery('queryForm')"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          新增
        </el-button>
        <el-button icon="el-icon-upload2" type="primary" @click="downList">
          导出列表
        </el-button>
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          @click="importExcel"
        >
          批量导入
        </el-button>
        <el-button icon="el-icon-download" type="primary" @click="downDemo">
          下载模板
        </el-button>
        <el-button icon="el-icon-connection" type="primary" @click="issue">
          批量下发
        </el-button>
        <el-button icon="el-icon-thumb" type="primary" @click="oneClickIssue">
          一键下发
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="handleDelete"
        >
          批量删除
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
      <el-table-column show-overflow-tooltip label="头像">
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.picture"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="电话号码"
        prop="phone"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="部门"
        prop="departmentname"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="人员编号"
        prop="Employee_code"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="工作分类"
        prop="Employetypename"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="已下发总数"
        prop="eqcount"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="相机总数"
        prop="decount"
        sortable
      ></el-table-column>
      <el-table-column label="操作" min-width="200px" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-thumb" @click="issue(row)">
            下发
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
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <el-dialog
      title="人员信息"
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
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="人员姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="Employee_code">
          <el-input
            v-model="form.Employee_code"
            placeholder="人员编号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="电话号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="门禁卡号">
          <el-input
            v-model="form.face_idcard"
            placeholder="门禁卡号"
            autocomplete="off"
            style="width: 60%; margin-right: 20px"
          ></el-input>
          <el-radio-group v-model="form.idcardtype">
            <el-radio label="32">32位</el-radio>
            <el-radio label="64">64位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input
            v-model="form.Email"
            placeholder="电子邮箱"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="form.id" label="部门" prop="departmentname">
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
            placeholder="请选择工作部门"
            style="width: 100%"
            @change="changeDepartment"
          ></el-cascader>
        </el-form-item>
        <el-form-item v-else label="部门" prop="departmentname">
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
            placeholder="请选择工作部门"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="工作分类" prop="Employetypename">
          <el-select
            v-model="form.Employetypename"
            placeholder="请选择工作分类"
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
        <el-form-item label="照片" prop="picture">
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
              <span class="uploading" @click="checkImg">上传</span>
              <span class="photo" @click="photograph">拍照</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="setFormData('setForm')">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 设备弹窗 -->
    <el-dialog title="下发设备" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" @selection-change="getSelectRows">
        <el-table-column
          show-overflow-tooltip
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          property="IP"
          sortable
          label="IP地址"
        ></el-table-column>
        <el-table-column
          property="DeviceName"
          sortable
          label="设备名称"
        ></el-table-column>
        <el-table-column
          property="DeviceNo"
          sortable
          label="设备编号"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="setIssue">下发</el-button>
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
        elementLoadingText: '正在加载...',
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
            { required: true, message: '请输入人员姓名', trigger: 'blur' },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur',
            },
          ],
          Employee_code: [
            { required: true, message: '请输入人员编号', trigger: 'blur' },
            {
              min: 1,
              max: 18,
              message: '长度在 1 到 18 个字符',
              trigger: 'blur',
            },
            {
              pattern: /^[A-Za-z0-9]*$/,
              message: '人员编号只能为数字和字母',
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的11位电话号码',
              trigger: 'blur',
            },
          ],
          Email: [
            {
              pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
              message: '请输入正确的邮箱',
              trigger: 'blur',
            },
          ],
          departmentname: [
            { required: true, message: '请选择部门', trigger: 'blur' },
          ],
          Employetypename: [
            { required: true, message: '请选择工作分类', trigger: 'blur' },
          ],
          picture: [{ required: true, message: '请上传头像', trigger: 'blur' }],
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
          this.$baseConfirm('你确定要删除当前项吗', null, () => {
            let res = delData([row.id])
            if (res) {
              this.$baseMessage('删除成功！', 'success')
              this.init()
            } else {
              this.$baseMessage('删除失败！', 'warning')
              this.init()
            }
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = []
            this.selectRows.forEach((item) => {
              ids.push(item.id)
            })
            this.$baseConfirm('你确定要删除选中项吗', null, () => {
              let res = delData(ids)
              if (res) {
                this.$baseMessage('删除成功！', 'success')
                this.init()
              } else {
                this.$baseMessage('删除失败！', 'warning')
                this.init()
              }
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      //下发按钮
      issue(row) {
        if (row.id) {
          let res = queryPerson(row.id)
          if (res.result == 'error') {
            this.$baseMessage('请先上传头像', 'warning')
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
                this.$baseMessage('请先上传头像', 'warning')
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
            this.$baseMessage('未选中任何行', 'error')
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
          this.$baseMessage('已下发', 'success')
          this.dialogTableVisible = false
          this.init()
        }
      },
      //一键下发
      oneClickIssue() {
        this.$baseConfirm('确定将全部人员下发到所有设备吗？', null, () => {
          oneClickIssue().then((res) => {
            if (res) {
              this.$baseMessage('下发成功！', 'success')
            } else {
              this.$baseMessage('下发失败！', 'warning')
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
            this.$baseMessage('保存成功', 'success')
          } else if (res.result == 1) {
            this.$baseMessage(res.data, 'warning')
          } else {
            this.$baseMessage('保存失败', 'error')
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
                this.$baseMessage(
                  '您的输入的卡号大于32位的最大值，请确认是否属于64位',
                  'warning'
                )
                return
              }
            } else if (this.form.idcardtype == 64) {
              if (this.form.face_idcard > 18446744073709551615) {
                this.$baseMessage('号超过系统支持的最大值', 'warning')
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
