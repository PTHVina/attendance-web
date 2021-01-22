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
            <span>设备编号</span>
            <el-input v-model="queryForm.devname" placeholder="设备编号" />
          </el-form-item>
          <el-form-item>
            <span>抓拍时间</span>
            <el-date-picker
              v-model="queryForm.accreditTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="抓拍起始时间"
              end-placeholder="抓拍结束时间"
              style="width: 350px"
              @change="checkTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>陌生人</span>
            <el-select
              v-model="queryForm.stranger"
              clearable
              placeholder="请选择"
              style="width: 90px"
            >
              <!-- <el-option key="0" label="否" value="0"></el-option> -->
              <el-option key="1" label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>健康码状态</span>
            <el-select
              v-model="queryForm.codestus"
              clearable
              placeholder="请选择"
              style="width: 90px"
            >
              <!-- <el-option key="3" label="" value="3"></el-option> -->
              <el-option key="0" label="绿码" value="0">绿码</el-option>
              <el-option key="1" label="黄码" value="1">黄码</el-option>
              <el-option key="2" label="红码" value="2">红码</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery()"
            >
              查询
            </el-button>
            <el-button type="info" plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          @click="openTabelDialog"
        >
          批量导出
        </el-button>
        <!-- <el-button icon="el-icon-upload2" type="primary">导出列表</el-button> -->
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
      <el-table-column show-overflow-tooltip label="特写图">
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.closeup"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="person_name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="体温"
        prop="body_temp"
        sortable
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="设备编号"
        prop="device_sn"
        sortable
        width="160"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="健康码"
        prop="QRcodestatus"
        sortable
      >
        <template #default="{ row }">
          <el-tag v-if="row.QRcodestatus == '0'" type="success">绿码</el-tag>
          <el-tag v-else-if="row.QRcodestatus == '1'" type="danger">
            红码
          </el-tag>
          <el-tag v-else-if="row.QRcodestatus == '2'" type="warning">
            黄码
          </el-tag>
          <div v-else-if="row.QRcodestatus != '' && row.QRcodestatus != null">
            <el-tag
              v-if="row.QRcodestatus.split(';')[0] == '绿码'"
              type="success"
            >
              绿码
            </el-tag>
            <el-tag
              v-else-if="row.QRcodestatus.split(';')[0] == '红码'"
              type="danger"
            >
              红码
            </el-tag>
            <el-tag
              v-else-if="row.QRcodestatus.split(';')[0] == '黄码'"
              type="warning"
            >
              黄码
            </el-tag>
            <span v-else></span>
          </div>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="身份证号码"
        prop="idcard_number"
        width="140"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="门禁卡号"
        prop="wg_card_id"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="相机名称"
        prop="addr_name"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="抓拍时间"
        prop="time"
        sortable
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="是否佩戴口罩"
        prop="exist_mask"
        sortable
        width="140"
      >
        <template #default="{ row }">
          <span v-if="row.exist_mask == '0'">否</span>
          <span v-else-if="row.exist_mask == '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="头像">
        <template #default="{ row }">
          <el-image
            v-if="row.TemplateImage"
            :src="row.TemplateImage"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150px" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.person_id == 0 || row.person_id == null"
            type="text"
            icon="el-icon-edit"
            @click="register(row)"
          >
            注册
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
        <el-form-item label="部门" prop="departmentname">
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
    <!-- 批量导出 -->
    <el-dialog
      title="人员信息"
      :visible.sync="dialogTableVisible"
      width="500px"
    >
      <el-form label-width="100px" size="medium">
        <el-form-item label="导出时间范围">
          <el-date-picker
            v-model="exportData.exportTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            style="width: 350px"
            @change="exportTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getTypeList,
    getDeviceList,
    openImg,
    setData,
    photograph,
  } from '@/api/personnel'
  import { getRecordList, delRecord, BatchXport } from '@/api/record'
  export default {
    name: 'Record',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: '正在加载...',
        queryForm: {
          name: '',
          devname: '',
          accreditTime: [], //授权时间范围
          statime: '',
          endtime: '',
          stranger: '', //是否陌生人
          codestus: '', //健康码
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        option: [], // 部门列表
        options: [], // 工作分类
        gridData: [], //设备列表
        // 注册
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
        dialogTableVisible: false,
        exportData: {
          exportTime: '',
          startTime: '',
          endTime: '',
        },
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
        this.queryForm.stranger ? this.queryForm.stranger : '0'
        this.queryForm.codestus < 3 ? this.queryForm.codestus : '3'
        let { counts, list } = getRecordList(this.queryForm, this.page)
        this.page.total = counts
        this.list = list
        let imageList = []
        list.forEach((item, index) => {
          imageList.push(item.closeup)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //日期时间选择
      checkTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.queryForm.startTime = start[0] + ' ' + start[1]
          this.queryForm.endTime = end[0] + ' ' + end[1]
        } else {
          this.queryForm.startTime = ''
          this.queryForm.endTime = ''
        }
      },
      //处理时间
      getTime(time) {
        var date = new Date(time)
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        M = M <= 9 ? '0' + M : M
        D = D <= 9 ? '0' + D : D
        h = h <= 9 ? '0' + h : h
        m = m <= 9 ? '0' + m : m
        s = s <= 9 ? '0' + s : s

        return [Y + '-' + M + '-' + D, h + ':' + m + ':' + s]
      },
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
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
            let res = delRecord(row.id + ',')
            if (res) {
              this.$baseMessage('删除成功', 'success')
            } else {
              this.$baseMessage('删除失败', 'error')
            }
            this.init()
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = ''
            this.selectRows.forEach((item) => {
              ids += item.id + ','
            })
            this.$baseConfirm('你确定要删除选中项吗', null, () => {
              let res = delRecord(ids)
              if (res) {
                this.$baseMessage('删除成功', 'success')
              } else {
                this.$baseMessage('删除失败', 'error')
              }
              this.init()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
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
      handleQuery() {
        this.page.pageNo = 1
        this.init()
      },
      //重置
      reset() {
        this.queryForm = {
          name: '',
          devname: '',
          accreditTime: [],
          statime: '',
          endtime: '',
          stranger: '',
          codestus: '',
        }
        this.page.pageNo = 1
        this.init()
      },

      //打开弹窗
      register(data) {
        this.dialogFormVisible = true
        if (data.id) {
          this.form = {
            id: data.id,
            name: data.person_name,
            Employee_code: '',
            phone: '',
            face_idcard: data.wg_card_id,
            idcardtype: '32',
            Email: '',
            departmentname: '',
            Employetypename: '',
            picture: data.closeup,
          }
        }
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
            let res = setData(this.form)
            if (res.result == 2) {
              this.$baseMessage(res.data, 'success')
              this.dialogFormVisible = false
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
      },

      //打开表格弹窗
      openTabelDialog() {
        this.dialogTableVisible = true
      },
      exportTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.exportData.startTime = start[0] + ' ' + start[1]
          this.exportData.endTime = end[0] + ' ' + end[1]
        } else {
          this.exportData.startTime = ''
          this.exportData.endTime = ''
        }
      },
      exportList() {
        if (!this.exportData.startTime || !this.exportData.endTime) {
          this.$baseMessage('导出记录必须选择日期范围。', 'warning')
          return
        }
        BatchXport(this.exportData)
        this.dialogTableVisible = false
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
