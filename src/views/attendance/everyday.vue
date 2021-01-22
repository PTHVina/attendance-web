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
            <span>旷工</span>
            <el-select
              v-model="queryForm.isAbsenteeism"
              clearable
              placeholder="请选择"
              style="width: 80px"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option key="1" label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>迟到</span>
            <el-select
              v-model="queryForm.late"
              clearable
              placeholder="请选择"
              style="width: 80px"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option key="1" label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>早退</span>
            <el-select
              v-model="queryForm.Leaveearly"
              clearable
              placeholder="请选择"
              style="width: 80px"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option key="1" label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>考勤日期</span>
            <el-date-picker
              v-model="queryForm.daterangetime"
              type="daterange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 280px"
            ></el-date-picker>
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
            <el-button
              icon="el-icon-upload2"
              type="primary"
              @click="exportList"
            >
              导出
            </el-button>
            <el-button icon="el-icon-setting" type="primary" @click="setExport">
              导出设置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      stripe
      :data="list"
      height="720"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="部门"
        prop="department"
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
        label="考勤日期"
        prop="Date"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="班次信息"
        prop="Shiftinformation"
        width="160px"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="打卡信息"
        prop="Punchinformation"
        width="300px"
      >
        <template #default="{ row }">
          <div class="tab_box">
            <div>
              <span>上班：</span>
              <span v-if="row.Punchinformation">
                {{ row.Punchinformation }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 1)"
                >
                  请假
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 1)"
                >
                  缺卡
                </el-button>
              </span>
            </div>
            <div>
              <span>下班：</span>
              <span v-if="row.Punchinformation1">
                {{ row.Punchinformation1 }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 2)"
                >
                  请假
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 2)"
                >
                  缺卡
                </el-button>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="体温(℃)"
        prop="temperature"
        sortable
      >
        <template #default="{ row }">
          <span
            v-if="
              Number(row.temperature) > 37.3 || Number(row.temperature) < 36.3
            "
            style="color: red"
          >
            {{ row.temperature }}
          </span>
          <span v-else>{{ row.temperature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="迟到(分钟)"
        prop="late"
        sortable
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.late }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="早退"
        prop="Leaveearly"
        sortable
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.Leaveearly }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="旷工"
        prop="isAbsenteeism"
        sortable
      >
        <template #default="{ row }">
          <span
            v-if="row.isAbsenteeism == '0' && row.Remarks != '3'"
            style="color: red"
          >
            旷工
          </span>
          <span v-else-if="row.isAbsenteeism == ' ' && row.Remarks == '3'">
            请假
          </span>
          <span v-else></span>
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

    <!-- 补卡弹窗 -->
    <el-dialog
      title="补卡信息"
      :visible.sync="dialogFormVisible"
      width="400px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="cardForm"
        :model="cardForm"
        :inline="true"
        label-width="80px"
        size="medium"
        @submit.native.prevent
      >
        <el-form-item label="补卡类型">
          <el-select v-model="cardForm.type" placeholder="请选择">
            <el-option :key="0" label="正常" value="0"></el-option>
            <el-option
              v-if="cardForm.num == 1"
              :key="1"
              label="迟到"
              value="1"
            ></el-option>
            <el-option
              v-else-if="cardForm.num == 2"
              :key="2"
              label="早退"
              value="2"
            ></el-option>
            <el-option :key="3" label="请假" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补卡时间">
          <el-time-picker
            v-model="cardForm.time"
            value-format="HH:mm"
            format="HH:mm"
            :clearable="false"
            :disabled="cardForm.type == 3"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="setCard()">保存</el-button>
      </div>
    </el-dialog>

    <!-- 补卡弹窗 -->
    <el-dialog
      title="导出设置"
      :visible.sync="dialogVisible"
      width="650px"
      :destroy-on-close="true"
    >
      <el-transfer
        v-model="setData"
        :props="{
          key: 'value',
          label: 'title',
        }"
        :titles="['默认', '设置']"
        :data="setList"
        @change="changeSet"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSet()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getEverydayList,
    getEverydayCount,
    reissueACard,
    exportList,
    defaultSet,
    saveSetting,
  } from '@/api/attendance'
  import store from '@/store'
  export default {
    name: 'Everyday',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: '正在加载...',
        queryForm: {
          name: '',
          isAbsenteeism: '', //旷工
          late: '', //迟到
          Leaveearly: '', //早退
          daterangetime: [], //考勤日期
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        cardRow: '', //选中行
        cardForm: {
          type: '',
          time: '',
          time1: '',
          time2: '',
          num: '',
        },
        //导出设置
        dialogVisible: false,
        setList: [], //左侧设置信息
        setData: [], //右侧选中列表
      }
    },
    created() {
      let date = new Date()
      let YY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      MM = MM > 9 ? MM : '0' + MM
      DD = DD > 9 ? DD : '0' + DD
      this.queryForm.daterangetime[0] = YY + '-' + MM + '-' + DD
      this.queryForm.daterangetime[1] = YY + '-' + MM + '-' + DD
      this.init()
      this.setTingList()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        this.queryForm.isAbsenteeism ? this.queryForm.isAbsenteeism : '0'
        this.queryForm.late ? this.queryForm.late : '0'
        this.queryForm.Leaveearly ? this.queryForm.Leaveearly : '0'
        let count = getEverydayCount(this.queryForm)
        this.page.total = count
        getEverydayList(this.queryForm, this.page).then((res) => {
          if (res) {
            this.list = JSON.parse(res)
            // console.log('res', this.list)
          } else {
            this.$baseMessage('没有查询到考勤信息...', 'warning')
          }
        })
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //设置设置列表信息
      setTingList() {
        //模拟数据
        var dataZn = [
          { value: 'name', title: '姓名' },
          { value: 'department', title: '部门' },
          { value: 'Employee_code', title: '员工编号' },
          { value: 'Date', title: '考勤日期' },
          { value: 'Punchinformation', title: '上班打卡' },
          { value: 'Punchinformation1', title: '下班打卡' },
          { value: 'Shiftinformation', title: '班次信息' },
          { value: 'Duration', title: '应出勤时间(小时)' },
          { value: 'late', title: '迟到(分钟)' },
          { value: 'Leaveearly', title: '早退(分钟)' },
          { value: 'workOvertime', title: '加班(分钟)' },
          { value: 'isAbsenteeism', title: '是否旷工' },
          { value: 'temperature', title: '体温(℃)' },
        ]
        var dataJpan = [
          { value: 'name', title: '名前' },
          { value: 'department', title: 'ポジション' },
          { value: 'Employee_code', title: '社員番号' },
          { value: 'Date', title: '日付' },
          { value: 'Punchinformation', title: '出勤時間' },
          { value: 'Punchinformation1', title: '退勤時間' },
          { value: 'Shiftinformation', title: 'シフト' },
          { value: 'Duration', title: '勤務時間' },
          { value: 'late', title: '遅刻（分）' },
          { value: 'Leaveearly', title: '早退（分）' },
          { value: 'workOvertime', title: '残業（分）' },
          { value: 'isAbsenteeism', title: '欠勤かどうか' },
          { value: 'temperature', title: 'ポジション番号' },
        ]
        var dataEn = [
          { value: 'name', title: 'Name' },
          { value: 'department', title: 'Department' },
          { value: 'Employee_code', title: 'Employee number' },
          { value: 'Date', title: 'Attendance date' },
          { value: 'Punchinformation', title: 'Clock in' },
          { value: 'Punchinformation1', title: 'Clock out' },
          { value: 'Shiftinformation', title: 'Shift information' },
          { value: 'Duration', title: 'Due attendance time(hours)' },
          { value: 'late', title: 'Late(minutes)' },
          { value: 'Leaveearly', title: 'Leave early(minutes)' },
          { value: 'workOvertime', title: 'Overtime(minutes)' },
          { value: 'isAbsenteeism', title: 'Absenteeism' },
          { value: 'temperature', title: 'Body temperature(℃)' },
        ]
        let lang = store.getters['user/lang']
        if (lang == 'zh_CN') {
          this.setList = dataZn
        } else if (lang == 'Jan_JPN') {
          this.setList = dataJpan
        } else if (lang == 'en_US') {
          this.setList = dataEn
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

      //补卡信息
      cardInfo(row, type) {
        this.dialogFormVisible = true
        this.cardRow = row
        let time = row.Shiftinformation.split('-')
        this.cardForm = {
          id: row.id,
          type: row.Remarks ? row.Remarks : '0',
          time: type == 1 ? time[1] : time[2],
          time1: time[1],
          time2: time[2],
          num: type,
        }
      },
      //补卡保存
      setCard() {
        let data = this.cardForm
        if (data.num == 1) {
          // 上班
          data.setTime = data.time1
          if (data.type == '0') {
            // 正常
            data.type = '01'
          } else if (data.type == '1') {
            //迟到
            if (data.time.replace(':', '') <= data.time1.replace(':', '')) {
              this.$baseMessage('补卡时间不能小于上班时间', 'warning')
              return
            }
          }
        } else {
          // 下班
          data.setTime = data.time2
          if (data.type == '0') {
            // 正常
            data.type = '02'
          } else if (data.type == '2') {
            //早退
            if (data.time.replace(':', '') >= data.time2.replace(':', '')) {
              this.$baseMessage('下班时间不能小于补卡时间', 'warning')
              return
            }
          }
        }
        if (data.type == '3') {
          data.time = ''
          data.setTime = ''
        }
        let res = reissueACard(data)
        if (res) {
          this.$baseMessage('补卡成功', 'success')
          this.dialogFormVisible = false
          this.init()
        } else {
          this.$baseMessage('补卡失败', 'warning')
        }
      },
      // 关闭弹窗
      closeFn(done) {
        if (done && typeof done == 'function') {
          done()
        } else {
          this.dialogFormVisible = false
        }
      },

      //导出
      exportList() {
        this.queryForm.isAbsenteeism ? this.queryForm.isAbsenteeism : '0'
        this.queryForm.late ? this.queryForm.late : '0'
        this.queryForm.Leaveearly ? this.queryForm.Leaveearly : '0'
        if (this.list.length == 0) {
          this.$baseMessage('当前时间没有打卡信息', 'warning')
          return
        }
        exportList(this.queryForm)
      },

      // 导出设置列表
      getSetting() {
        let res = defaultSet()[0]
        let key = res.keyStr.split(',')
        if (key == '') {
          return
        }
        this.setData = key
      },
      //导出设置
      setExport() {
        this.getSetting()
        this.dialogVisible = true
      },
      changeSet(e, type, direction) {
        // console.log('e', e, type, direction)
        // direction  选中数据
        // console.log(this.setData) //右侧数据
      },
      saveSet() {
        let key = []
        let val = []
        key = this.setData.join(',')
        this.setData.forEach((item, index) => {
          this.setList.forEach((data) => {
            if (item == data.value) {
              val.push(data.title)
            }
          })
        })
        val = val.join(',')
        if (key.length == 0) {
          key = ''
        }
        if (val.length == 0) {
          val = ''
        }
        let res = saveSetting(key, val)
        if (res) {
          this.$baseMessage('设置成功', 'success')
          this.dialogVisible = false
        } else {
          this.$baseMessage('设置失败', 'warning')
        }
      },
    },
  }
</script>

<style lang="scss">
  .form_group {
    height: auto;
    margin-bottom: 20px;
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

  .tab_box {
    height: 50px;
    display: flex;
    align-items: center;
    div {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .btn {
        margin-left: 5px;
        .el-button {
          padding: 5px 10px;
        }
      }
    }
  }
</style>
