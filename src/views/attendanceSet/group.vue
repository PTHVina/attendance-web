<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          新增
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        label="班组名"
        prop="name"
        sortable
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="类型">
        <span>按周循环排班</span>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="排班详情"
        prop="pageViews"
        width="400px"
      >
        <template #default="{ row }">
          <div style="margin-bottom: 5px">
            <span>工作：</span>
            <el-tag v-if="JSON.parse(row.attribute).Monday != 0" size="mini">
              周一
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Tuesday != 0" size="mini">
              周二
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Wednesday != 0" size="mini">
              周三
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Thursday != 0" size="mini">
              周四
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Friday != 0" size="mini">
              周五
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Saturday != 0" size="mini">
              周六
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Sunday != 0" size="mini">
              周日
            </el-tag>
          </div>
          <div>
            <span>休息：</span>
            <el-tag
              v-if="JSON.parse(row.attribute).Monday == 0"
              size="mini"
              type="success"
            >
              周一
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Tuesday == 0"
              size="mini"
              type="success"
            >
              周二
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Wednesday == 0"
              size="mini"
              type="success"
            >
              周三
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Thursday == 0"
              size="mini"
              type="success"
            >
              周四
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Friday == 0"
              size="mini"
              type="success"
            >
              周五
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Saturday == 0"
              size="mini"
              type="success"
            >
              周六
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Sunday == 0"
              size="mini"
              type="success"
            >
              周日
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="人员数目"
        prop="count"
        sortable
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="是否默认" prop="status">
        <template #default="{ row }">
          <span v-if="row.isdefault == '1'">是</span>
          <span v-else>否</span>
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
          <el-button type="text" icon="el-icon-thumb" @click="setDefault(row)">
            默认
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

    <!-- 新增/修改弹窗 -->
    <el-dialog
      title="考勤组"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formData"
        :model="form"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="班组名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="班组名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择人员">
          <el-tag v-for="(item, index) in selectRows" :key="index">
            {{ item.name }}
          </el-tag>
          <el-button
            type="primary"
            size="mini"
            style="margin-left: 10px; padding: 5px 15px"
            @click="openTabelDialog"
          >
            选择
          </el-button>
          <span v-if="form.count" style="margin-left: 5px; color: #888">
            {{ form.count }}人
          </span>
        </el-form-item>
        <el-form-item label="周一" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Monday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周二" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Tuesday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周三" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Wednesday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周四" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Thursday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周五" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Friday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周六" style="margin-bottom: 0px">
          <el-radio-group v-model="form.Saturday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="周日">
          <el-radio-group v-model="form.Sunday">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否默认">
          <el-radio-group v-model="form.isdefault">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="特殊日期">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="openDeteDialog(1)"
          >
            必须打卡日期
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            @click="openDeteDialog(0)"
          >
            不用打卡日期
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="saveForm('formData')">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 选择人员 -->
    <el-dialog
      title="选择人员"
      :visible.sync="dialogTableVisible"
      width="600px"
      :destroy-on-close="true"
    >
      <el-table
        ref="numTable"
        v-loading="listLoading2"
        :data="personnelData"
        :highlight-current-row="true"
        style="width: 100%"
        :element-loading-text="elementLoadingText"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="Employee_code"
          label="人员编号"
        ></el-table-column>
        <el-table-column
          prop="departmentname"
          label="部门"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeTabel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 打卡日期 -->
    <el-dialog
      :title="deteType == 1 ? '必须打卡日期' : '不用打卡日期'"
      :visible.sync="dialogDeteVisible"
      width="600px"
      :destroy-on-close="true"
    >
      <div style="margin-bottom: 20px">
        <el-button icon="el-icon-plus" type="primary" @click="addDete">
          新增
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="delDete"
        >
          批量删除
        </el-button>
      </div>
      <el-table
        ref="deteTable"
        v-loading="listLoading3"
        :data="deteData"
        :highlight-current-row="true"
        style="width: 100%"
        :element-loading-text="elementLoadingText"
        @selection-change="setDeteRows"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="date" label="考勤日期"></el-table-column>
        <el-table-column prop="Employee_code" label="班次名称">
          <template #default="{ row }">
            <span v-if="row.name == '0'">休息</span>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="departmentname"
          label="日期类型"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="row.type == '0'">不用打卡日期</span>
            <span v-else>必须打卡日期</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-button
              type="text"
              class="btn_red"
              icon="el-icon-delete"
              @click="delDete(row)"
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
    </el-dialog>
    <!-- 新增打卡日期 -->
    <el-dialog
      :title="deteType == 1 ? '新增必须打卡日期' : '新增不用打卡日期'"
      :visible.sync="dialogDeteFormVisible"
      width="400px"
      :destroy-on-close="true"
    >
      <el-form
        ref="date"
        :model="DeteForm"
        :rules="dateRules"
        label-width="80px"
        size="medium"
      >
        <el-form-item label="考勤日期" prop="date">
          <el-date-picker
            v-model="DeteForm.date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="选择班次" prop="radio">
          <el-radio-group v-model="DeteForm.radio">
            <el-radio label="0">休息</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddDete('date')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getGroupList,
    getClassesList,
    setDefault,
    doDelete,
    getPersonnelList,
    getDeteCount,
    getDeteList,
    delDeteData,
    addDete,
    addGroup,
    setGroup,
  } from '@/api/attendanceSet'
  export default {
    name: 'Classes',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        elementLoadingText: '正在加载...',
        classes: [], //班次信息

        dialogFormVisible: false, //表单弹窗控制
        // 新增、编辑
        form: {
          name: '', //班组名
          Monday: '0',
          Tuesday: '0',
          Wednesday: '0',
          Thursday: '0',
          Friday: '0',
          Saturday: '0',
          Sunday: '0',
          isdefault: '0', //是否默认
        },
        timestamp: '',
        rules: {
          name: [
            { required: true, message: '请输入班组名称', trigger: 'blur' },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur',
            },
          ],
        },

        dialogTableVisible: false, //选择人员
        listLoading2: false, //列表加载
        personnelData: [], //人员列表
        selectRows: [], //选中人员列表

        dialogDeteVisible: false, //打卡日期
        deteType: 1, //日期类型
        listLoading3: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        deteData: [], //日期列表
        deteRows: [], //选中日期

        dialogDeteFormVisible: false, //新增打卡日期
        DeteForm: {
          date: '',
          radio: '0',
        },
        dateRules: {
          date: [
            { required: true, message: '请选择考勤日期', trigger: 'change' },
          ],
          radio: [{ required: true, message: '请选择班次', trigger: 'change' }],
        },
      }
    },
    created() {
      this.getClassesList()
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        let res = getGroupList()
        this.list = res
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //班次信息
      getClassesList() {
        let res = getClassesList()
        this.classes = res
      },
      //人员信息
      getPersonnelList() {
        this.listLoading2 = true
        let res = getPersonnelList()
        this.personnelData = res
        setTimeout(() => {
          this.listLoading2 = false
        }, 500)
      },
      //打卡日期
      getDeteList(type) {
        this.listLoading3 = true
        let count = getDeteCount(
          type,
          this.form.id ? this.form.id : this.timestamp
        )
        let res = getDeteList(
          type,
          this.page,
          this.form.id ? this.form.id : this.timestamp
        )
        this.page.total = count
        this.deteData = res
        setTimeout(() => {
          this.listLoading3 = false
        }, 500)
      },
      //设置默认
      setDefault(row) {
        let res = setDefault(row.id)
        if (res) {
          this.$baseMessage('设置成功！', 'success')
          this.init()
        } else {
          this.$baseMessage('设置失败！', 'warning')
        }
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          let res = await doDelete(row.id)
          if (res) {
            this.$baseMessage('删除成功！', 'success')
            this.init()
          } else {
            this.$baseMessage('删除失败！', 'warning')
          }
        })
      },

      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        this.timestamp = new Date().valueOf()
        if (data.id) {
          console.log('选中参数', data)
          this.form = {
            id: data.id,
            name: data.name,
            Monday: JSON.parse(data.attribute).Monday,
            Tuesday: JSON.parse(data.attribute).Tuesday,
            Wednesday: JSON.parse(data.attribute).Wednesday,
            Thursday: JSON.parse(data.attribute).Thursday,
            Friday: JSON.parse(data.attribute).Friday,
            Saturday: JSON.parse(data.attribute).Saturday,
            Sunday: JSON.parse(data.attribute).Sunday,
            isdefault: data.isdefault,
            count: data.count,
          }
        }
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
          Monday: '0',
          Tuesday: '0',
          Wednesday: '0',
          Thursday: '0',
          Friday: '0',
          Saturday: '0',
          Sunday: '0',
          isdefault: '0',
        }
        this.selectRows = []
      },
      //新增
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let attribute = {
              Monday: this.form.Monday,
              Tuesday: this.form.Tuesday,
              Wednesday: this.form.Wednesday,
              Thursday: this.form.Thursday,
              Friday: this.form.Friday,
              Saturday: this.form.Saturday,
              Sunday: this.form.Sunday,
            }
            let ids = []
            this.selectRows.forEach((item) => {
              ids.push(item.id)
            })
            if (this.form.id) {
              let res = setGroup(attribute, this.form, ids, this.form.id)
              if (res.result == 2) {
                this.$baseMessage('修改考勤组成功！', 'success')
                this.init()
                this.closeFn()
              } else {
                this.$baseMessage('修改失败!', 'warning')
              }
            } else {
              let res = addGroup(attribute, this.form, ids, this.timestamp)
              if (res.result == 2) {
                this.$baseMessage('添加考勤组成功！', 'success')
                this.init()
                this.closeFn()
              } else {
                this.$baseMessage(res.data, 'warning')
              }
            }
          } else {
            return false
          }
        })
      },

      //选择人员
      openTabelDialog() {
        this.dialogTableVisible = true
        if (this.personnelData.length == 0) {
          this.getPersonnelList()
        }
        this.selectRows.forEach((item) => {
          this.$refs.numTable.toggleRowSelection(item)
        })
      },
      //选中人员
      setSelectRows(rows) {
        this.selectRows = rows
      },
      //选择人员
      changeTabel() {
        this.dialogTableVisible = false
        this.form.count = this.selectRows.length
        console.log('选择人员', this.selectRows)
      },

      //打卡日期
      openDeteDialog(type) {
        this.deteType = type
        this.dialogDeteVisible = true
        this.getDeteList(type)
      },
      // 切换显示条数
      handleSizeChange(val) {
        this.page.pageSize = val
        this.openDeteDialog(this.deteType)
      },
      //切换页数
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.openDeteDialog(this.deteType)
      },
      //选中日期
      setDeteRows(rows) {
        this.deteRows = rows
      },
      //删除打卡日期
      delDete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            let res = await delDeteData(row.id)
            if (res) {
              this.$baseMessage('删除成功！', 'success')
              this.getDeteList(this.deteType)
            } else {
              this.$baseMessage('删除失败！', 'warning')
            }
          })
        } else {
          if (this.deteRows.length == 0) {
            this.$baseMessage('请选择需要删除的日期', 'warning')
            return
          }
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            let ids = []
            this.deteRows.forEach((item) => {
              ids.push(item.id)
            })
            let res = await delDeteData(ids)
            if (res) {
              this.$baseMessage('删除成功！', 'success')
              this.getDeteList(this.deteType)
            } else {
              this.$baseMessage('删除失败！', 'warning')
            }
          })
        }
      },

      //新增打卡日期弹窗
      addDete() {
        this.dialogDeteFormVisible = true
      },
      //新增打卡日期
      saveAddDete(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let editId = 0
            if (!this.form.id) {
              editId = this.timestamp
            } else {
              editId = this.form.id
            }
            let res = addDete(
              this.deteType,
              editId,
              this.DeteForm.date,
              this.DeteForm.radio
            )
            if (res) {
              this.$baseMessage('保存成功！', 'success')
              this.getDeteList(this.deteType)
              this.DeteForm = {
                date: '',
                radio: '0',
              }
              this.dialogDeteFormVisible = false
            } else {
              this.$baseMessage('该日期已被指定', 'warning')
            }
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
