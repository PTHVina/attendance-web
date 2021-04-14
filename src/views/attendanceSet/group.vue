<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <!-- 新增 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="calc(100vh - 205px)"
    >
      <!-- 班组名 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_30')"
        prop="name"
        sortable
      ></el-table-column>
      <!-- 类型 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_31')"
      >
        <span>{{ $t('attendanceSet.text_32') }}</span>
      </el-table-column>
      <!-- 排班详情 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_33')"
        prop="pageViews"
        width="410px"
      >
        <template #default="{ row }">
          <div style="margin-bottom: 5px">
            <span>{{ $t('attendanceSet.text_34') }}：</span>
            <el-tag v-if="JSON.parse(row.attribute).Monday != 0" size="mini">
              {{ $t('attendanceSet.text_35') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Tuesday != 0" size="mini">
              {{ $t('attendanceSet.text_36') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Wednesday != 0" size="mini">
              {{ $t('attendanceSet.text_37') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Thursday != 0" size="mini">
              {{ $t('attendanceSet.text_38') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Friday != 0" size="mini">
              {{ $t('attendanceSet.text_39') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Saturday != 0" size="mini">
              {{ $t('attendanceSet.text_40') }}
            </el-tag>
            <el-tag v-if="JSON.parse(row.attribute).Sunday != 0" size="mini">
              {{ $t('attendanceSet.text_41') }}
            </el-tag>
          </div>
          <div>
            <span>{{ $t('attendanceSet.text_42') }}：</span>
            <el-tag
              v-if="JSON.parse(row.attribute).Monday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_35') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Tuesday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_36') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Wednesday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_37') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Thursday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_38') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Friday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_39') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Saturday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_40') }}
            </el-tag>
            <el-tag
              v-if="JSON.parse(row.attribute).Sunday == 0"
              size="mini"
              type="success"
            >
              {{ $t('attendanceSet.text_41') }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- 人员数目 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_43')"
        prop="count"
        sortable
      ></el-table-column>
      <!-- 是否默认 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_44')"
        prop="status"
      >
        <template #default="{ row }">
          <span v-if="row.isdefault == '1'">
            {{ $t('attendanceSet.text_45') }}
          </span>
          <span v-else>{{ $t('attendanceSet.text_46') }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('attendanceSet.text_9')" fixed="right">
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 默认 -->
          <el-button type="text" icon="el-icon-thumb" @click="setDefault(row)">
            {{ $t('operation_btn.btn_text_28') }}
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

    <!-- 新增/修改弹窗 -->
    <!-- 考勤组 -->
    <el-dialog
      :title="$t('attendanceSet.text_47')"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formData"
        :model="form"
        :label-width="lang == 'zh_CN' ? '80px' : '120px'"
        :rules="rules"
        size="medium"
        class="dialog_size"
      >
        <!-- 班组名 -->
        <el-form-item :label="$t('attendanceSet.text_30')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('attendanceSet.text_48')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 选择人员 -->
        <el-form-item :label="$t('attendanceSet.text_49')" class="tag_list">
          <div class="tag_num">
            <el-tag v-for="(item, index) in selectRows" :key="index">
              {{ item.name }}
            </el-tag>
          </div>
          <div class="tag_btn">
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 10px; padding: 5px 15px"
              @click="openTabelDialog"
            >
              {{
                form.count > 0
                  ? $t('attendanceSet.text_66')
                  : $t('attendanceSet.text_54')
              }}
            </el-button>
            <span v-if="form.count" style="margin-left: 5px; color: #888">
              {{ form.count }}{{ $t('attendanceSet.text_50') }}
            </span>
          </div>
        </el-form-item>
        <!-- 排班类型 -->
        <el-form-item
          :label="$t('attendanceSet.text_65')"
          style="margin-bottom: 10px"
        >
          <el-tag>{{ $t('attendanceSet.text_32') }}</el-tag>
        </el-form-item>
        <!-- 周一 -->
        <el-form-item
          :label="$t('attendanceSet.text_35')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Monday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周二 -->
        <el-form-item
          :label="$t('attendanceSet.text_36')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Tuesday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周三 -->
        <el-form-item
          :label="$t('attendanceSet.text_37')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Wednesday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周四 -->
        <el-form-item
          :label="$t('attendanceSet.text_38')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Thursday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周五 -->
        <el-form-item
          :label="$t('attendanceSet.text_39')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Friday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周六 -->
        <el-form-item
          :label="$t('attendanceSet.text_40')"
          style="margin-bottom: 0px"
        >
          <el-radio-group v-model="form.Saturday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 周日 -->
        <el-form-item :label="$t('attendanceSet.text_41')">
          <el-radio-group v-model="form.Sunday">
            <el-radio :label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
            <el-radio
              v-for="(item, index) in classes"
              :key="index"
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是否默认 -->
        <el-form-item :label="$t('attendanceSet.text_44')">
          <el-radio-group v-model="form.isdefault">
            <el-radio label="1">{{ $t('attendanceSet.text_45') }}</el-radio>
            <el-radio label="0">{{ $t('attendanceSet.text_46') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 特殊日期 -->
        <el-form-item :label="$t('attendanceSet.text_51')">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="openDeteDialog(0)"
          >
            {{ $t('attendanceSet.text_52') }}
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            @click="openDeteDialog(1)"
          >
            {{ $t('attendanceSet.text_53') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="saveForm('formData')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 选择人员 -->
    <el-dialog
      :title="$t('attendanceSet.text_49')"
      :visible.sync="dialogTableVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="changeTabel"
    >
      <div class="people_search">
        <el-input
          v-model="peopleText"
          :placeholder="$t('attendanceSet.text_67')"
        />
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          @click="peopleQuery"
        >
          {{ $t('operation_btn.btn_text_6') }}
        </el-button>
      </div>
      <el-table
        ref="numTable"
        v-loading="listLoading2"
        :data="personnelData"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
        class="dialog_size"
        style="width: 100%; max-height: 65vh"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="name"
          :label="$t('attendanceSet.text_55')"
        ></el-table-column>
        <!-- 人员编号 -->
        <el-table-column
          prop="Employee_code"
          :label="$t('attendanceSet.text_56')"
        ></el-table-column>
        <!-- 部门 -->
        <el-table-column
          prop="departmentname"
          :label="$t('attendanceSet.text_57')"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeTabel">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 打卡日期 -->
    <el-dialog
      :title="
        deteType == 0
          ? $t('attendanceSet.text_52')
          : $t('attendanceSet.text_53')
      "
      :visible.sync="dialogDeteVisible"
      width="600px"
      :destroy-on-close="true"
    >
      <div style="margin-bottom: 20px">
        <!-- 新增 -->
        <el-button icon="el-icon-plus" type="primary" @click="addDete">
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
        <!-- 批量删除 -->
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="delDete"
        >
          {{ $t('operation_btn.btn_text_13') }}
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
        <!-- 考勤日期 -->
        <el-table-column
          prop="date"
          :label="$t('attendanceSet.text_58')"
        ></el-table-column>
        <!-- 班次名称 -->
        <el-table-column
          prop="Employee_code"
          :label="$t('attendanceSet.text_3')"
        >
          <template #default="{ row }">
            <span v-if="row.name == '0'">
              {{ $t('attendanceSet.text_42') }}
            </span>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <!-- 日期类型 -->
        <el-table-column
          prop="departmentname"
          :label="$t('attendanceSet.text_59')"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span v-if="row.type == '0'">
              {{ $t('attendanceSet.text_52') }}
            </span>
            <span v-else>{{ $t('attendanceSet.text_53') }}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('attendanceSet.text_9')" fixed="right">
          <template #default="{ row }">
            <el-button
              type="text"
              class="btn_red"
              icon="el-icon-delete"
              @click="delDete(row)"
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
    </el-dialog>
    <!-- 新增打卡日期 -->
    <el-dialog
      :title="
        deteType == 0
          ? $t('attendanceSet.text_52')
          : $t('attendanceSet.text_53')
      "
      :visible.sync="dialogDeteFormVisible"
      :width="lang == 'zh_CN' ? '400px' : '450px'"
      :destroy-on-close="true"
    >
      <el-form
        ref="date"
        :model="DeteForm"
        :rules="dateRules"
        :label-width="
          lang == 'zh_CN' ? '80px' : lang == 'en_US' ? '130px' : '100px'
        "
        size="medium"
      >
        <!-- 考勤日期 -->
        <el-form-item :label="$t('attendanceSet.text_58')" prop="date">
          <el-date-picker
            v-model="DeteForm.date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('attendanceSet.text_60')"
          ></el-date-picker>
        </el-form-item>
        <!-- 选择班次 -->
        <el-form-item :label="$t('attendanceSet.text_61')" prop="radio">
          <el-radio-group v-model="DeteForm.radio">
            <el-radio label="0">{{ $t('attendanceSet.text_42') }}</el-radio>
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
        <el-button type="primary" @click="saveAddDete('date')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
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
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        elementLoadingText: this.$t('operation_tips.tips_12'),
        classes: [], //班次信息

        dialogFormVisible: false, //表单弹窗控制
        // 新增、编辑
        form: {
          name: '', //班组名
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,
          isdefault: '0', //是否默认
        },
        timestamp: '',
        rules: {
          name: [
            {
              required: true,
              message: this.$t('attendanceSet.text_62'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 10,
              message: this.$t('operation_tips.tips_2'),
              trigger: 'blur',
            },
          ],
        },

        dialogTableVisible: false, //选择人员
        listLoading2: false, //列表加载
        personnelData: [], //人员列表
        personnelData2: [], //人员列表
        selectRows: [], //选中人员列表
        peopleText: '', //搜索信息

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
            {
              required: true,
              message: this.$t('attendanceSet.text_63'),
              trigger: 'change',
            },
          ],
          radio: [
            {
              required: true,
              message: this.$t('attendanceSet.text_64'),
              trigger: 'change',
            },
          ],
        },
      }
    },
    created() {
      this.getClassesList()
      this.init()
    },
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
        this.personnelData2 = res
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
          this.$baseMessage(this.$t('operation_tips.tips_43'), 'success')
          this.init()
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_44'), 'warning')
        }
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, async () => {
          let res = await doDelete(row.id)
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
            this.init()
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_7'), 'warning')
          }
        })
      },

      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        this.timestamp = new Date().valueOf()
        if (data.id) {
          // console.log('选中参数', data)
          this.form = {
            id: data.id,
            name: data.name,
            Monday: Number(JSON.parse(data.attribute).Monday),
            Tuesday: Number(JSON.parse(data.attribute).Tuesday),
            Wednesday: Number(JSON.parse(data.attribute).Wednesday),
            Thursday: Number(JSON.parse(data.attribute).Thursday),
            Friday: Number(JSON.parse(data.attribute).Friday),
            Saturday: Number(JSON.parse(data.attribute).Saturday),
            Sunday: Number(JSON.parse(data.attribute).Sunday),
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
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,
          isdefault: '0',
        }
        this.selectRows = []
      },
      //新增
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let attribute = {
              Monday: this.form.Monday.toString(),
              Tuesday: this.form.Tuesday.toString(),
              Wednesday: this.form.Wednesday.toString(),
              Thursday: this.form.Thursday.toString(),
              Friday: this.form.Friday.toString(),
              Saturday: this.form.Saturday.toString(),
              Sunday: this.form.Sunday.toString(),
            }
            let ids = []
            this.selectRows.forEach((item) => {
              ids.push(item.id)
            })
            if (this.form.id) {
              let res = setGroup(attribute, this.form, ids, this.form.id)
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_10'), 'success')
                this.init()
                this.closeFn()
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_11'), 'warning')
              }
            } else {
              let res = addGroup(attribute, this.form, ids, this.timestamp)
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_8'), 'success')
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
        if (this.personnelData2.length == 0) {
          this.getPersonnelList()
        } else {
          this.personnelData = this.personnelData2
        }
        this.peopleText = ''
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
        // console.log('选择人员', this.selectRows)
      },
      //搜索人员
      peopleQuery() {
        this.listLoading2 = true
        this.selectRows = []
        if (!this.peopleText) {
          this.getPersonnelList()
          return
        }
        let list = []
        let text = this.peopleText
        this.personnelData2.forEach((item, index) => {
          if (
            String(item.name).indexOf(text) != -1 ||
            String(item.Employee_code).indexOf(text) != -1 ||
            String(item.departmentname).indexOf(text) != -1
          ) {
            list.push(item)
          }
        })
        this.personnelData = list
        setTimeout(() => {
          this.listLoading2 = false
        }, 500)
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
          this.$baseConfirm(
            this.$t('operation_tips.tips_4'),
            null,
            async () => {
              let res = await delDeteData(row.id)
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
                this.getDeteList(this.deteType)
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_7'), 'warning')
              }
            }
          )
        } else {
          if (this.deteRows.length == 0) {
            this.$baseMessage(this.$t('operation_tips.tips_45'), 'warning')
            return
          }
          this.$baseConfirm(
            this.$t('operation_tips.tips_21'),
            null,
            async () => {
              let ids = []
              this.deteRows.forEach((item) => {
                ids.push(item.id)
              })
              let res = await delDeteData(ids)
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
                this.getDeteList(this.deteType)
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
              }
            }
          )
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
              this.$baseMessage(this.$t('operation_tips.tips_26'), 'success')
              this.getDeteList(this.deteType)
              this.DeteForm = {
                date: '',
                radio: '0',
              }
              this.dialogDeteFormVisible = false
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_46'), 'warning')
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

  .el-dialog {
    margin-top: 60px !important;
  }
  .dialog_size {
    max-height: 70vh;
    overflow-y: scroll;
  }
  .dialog_size::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
  .dialog_size::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }
  .dialog_size::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .dialog_size::-webkit-scrollbar-track:hover {
    background-color: #f8fafc;
  }

  .tag_list {
    .el-form-item__content {
      display: flex;
      align-items: center;
      height: 100% !important;
      .tag_num {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tag_btn {
        flex: 1;
        min-width: 115px;
        margin-left: 10px;
      }
    }
  }

  .people_search {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .el-input {
      flex: 1;
      input {
        border-radius: 4px 0 0 4px;
      }
    }
    button {
      border-radius: 0 4px 4px 0;
      height: 32px;
    }
  }
</style>
