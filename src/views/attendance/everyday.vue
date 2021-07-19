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
            <span>{{ $t('attendance.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('attendance.text_2')"
            />
          </el-form-item>
          <!-- 旷工 -->
          <el-form-item>
            <span>{{ $t('attendance.text_3') }}</span>
            <el-select
              v-model="queryForm.isAbsenteeism"
              clearable
              :placeholder="$t('attendance.text_4')"
              :style="lang == 'zh_CN' ? 'width: 90px' : 'width: 160px'"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option
                key="1"
                :label="$t('attendance.text_5')"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 迟到 -->
          <el-form-item>
            <span>{{ $t('attendance.text_6') }}</span>
            <el-select
              v-model="queryForm.late"
              clearable
              :placeholder="$t('attendance.text_4')"
              :style="lang == 'zh_CN' ? 'width: 90px' : 'width: 160px'"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option
                key="1"
                :label="$t('attendance.text_5')"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 早退 -->
          <el-form-item>
            <span>{{ $t('attendance.text_7') }}</span>
            <el-select
              v-model="queryForm.Leaveearly"
              clearable
              :placeholder="$t('attendance.text_4')"
              :style="lang == 'zh_CN' ? 'width: 90px' : 'width: 160px'"
            >
              <!-- <el-option key="0" label=" " value="0"></el-option> -->
              <el-option
                key="1"
                :label="$t('attendance.text_5')"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 考勤日期 -->
          <el-form-item>
            <span>{{ $t('attendance.text_8') }}</span>
            <el-date-picker
              v-model="queryForm.daterangetime"
              type="daterange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :clearable="false"
              :editable="false"
              :range-separator="$t('attendance.text_9')"
              :start-placeholder="$t('attendance.text_10')"
              :end-placeholder="$t('attendance.text_11')"
              style="width: 280px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery()"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
            <!-- 导出 -->
            <el-button
              icon="el-icon-upload2"
              type="primary"
              @click="exportList"
            >
              {{ $t('operation_btn.btn_text_30') }}
            </el-button>
            <!-- 导出设置 -->
            <el-button icon="el-icon-setting" type="primary" @click="setExport">
              {{ $t('operation_btn.btn_text_31') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      stripe
      :data="list"
      :height="lang == 'zh_CN' ? '745' : '700'"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('attendance.text_1')"
        :width="
          lang == 'en_US' ? '130px' : lang == 'Jan_JPN' ? '120px' : '100px'
        "
      ></el-table-column>
      <!-- 部门 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_12')"
        prop="department"
        sortable
        :width="
          lang == 'en_US' ? '160px' : lang == 'Jan_JPN' ? '150px' : '140px'
        "
      ></el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_13')"
        prop="Employee_code"
        sortable
        :width="
          lang == 'en_US'
            ? '170px'
            : lang == 'Jan_JPN'
            ? '170px'
            : lang == 'Fr_fr'
            ? '170px'
            : '150px'
        "
      ></el-table-column>
      <!-- 考勤日期 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_8')"
        prop="Date"
        sortable
        :width="lang == 'en_US' ? '160px' : lang == 'Fr_fr' ? '170px' : '130px'"
      ></el-table-column>
      <!-- 班次信息 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_14')"
        prop="Shiftinformation"
        sortable
        :width="lang == 'en_US' ? '170px' : lang == 'Fr_fr' ? '190px' : '170px'"
      ></el-table-column>
      <!-- 打卡信息 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_15')"
        prop="Punchinformation"
        :width="
          lang == 'zh_CN'
            ? '300px'
            : lang == 'Jan_JPN'
            ? '450px'
            : lang == 'Fr_fr'
            ? '540px'
            : '470px'
        "
      >
        <template #default="{ row }">
          <div class="tab_box">
            <div>
              <span>{{ $t('attendance.text_16') }}：</span>
              <span v-if="row.Punchinformation">
                {{ row.Punchinformation }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 1, 1)"
                >
                  {{ $t('attendance.text_17') }}
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 1, 1)"
                >
                  {{ $t('attendance.text_18') }}
                </el-button>
              </span>
            </div>
            <div>
              <span>
                {{ $t('attendance.text_19') }}
                <span
                  v-if="
                    row.IsAcrossNight &&
                    row.IsAcrossNight != 'False' &&
                    row.IsAcrossNight != 'false'
                  "
                >
                  ({{ $t('attendance.text_34') }})
                </span>
                ：
              </span>
              <span v-if="row.Punchinformation1">
                {{ row.Punchinformation1 }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 2, 1)"
                >
                  {{ $t('attendance.text_17') }}
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 2, 1)"
                >
                  {{ $t('attendance.text_18') }}
                </el-button>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 打卡信息-时段二 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_35')"
        prop="Punchinformation2"
        :width="
          lang == 'zh_CN'
            ? '300px'
            : lang == 'Jan_JPN'
            ? '450px'
            : lang == 'Fr_fr'
            ? '540px'
            : '470px'
        "
      >
        <template #default="{ row }">
          <div v-if="row.Punchinformation2 != null" class="tab_box">
            <div>
              <span>{{ $t('attendance.text_16') }}：</span>
              <span v-if="row.Punchinformation2">
                {{ row.Punchinformation2 }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 1, 2)"
                >
                  {{ $t('attendance.text_17') }}
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 1, 2)"
                >
                  {{ $t('attendance.text_18') }}
                </el-button>
              </span>
            </div>
            <div>
              <span>{{ $t('attendance.text_19') }}：</span>
              <span v-if="row.Punchinformation22">
                {{ row.Punchinformation22 }}
              </span>
              <span v-else class="btn">
                <el-button
                  v-if="row.Remarks == '3'"
                  type="success"
                  size="mini"
                  round
                  @click="cardInfo(row, 2, 2)"
                >
                  {{ $t('attendance.text_17') }}
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  size="mini"
                  round
                  @click="cardInfo(row, 2, 2)"
                >
                  {{ $t('attendance.text_18') }}
                </el-button>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 体温(℃) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_20')"
        prop="temperature"
        sortable
        :width="lang == 'en_US' ? '160px' : lang == 'Fr_fr' ? '230px' : '100px'"
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
      <!-- 迟到(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_21')"
        prop="late"
        sortable
        :width="
          lang == 'en_US'
            ? '130px'
            : lang == 'Jan_JPN'
            ? '100px'
            : lang == 'Fr_fr'
            ? '170px'
            : '110px'
        "
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.late }}</span>
        </template>
      </el-table-column>
      <!-- 早退 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_7')"
        prop="Leaveearly"
        sortable
        :width="lang == 'en_US' ? '140px' : lang == 'Fr_fr' ? '170px' : '80px'"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.Leaveearly }}</span>
        </template>
      </el-table-column>
      <!-- 旷工 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_3')"
        prop="isAbsenteeism"
        sortable
        :width="
          lang == 'en_US'
            ? '150px'
            : lang == 'Jan_JPN'
            ? '120px'
            : lang == 'Fr_fr'
            ? '170px'
            : '80px'
        "
      >
        <template #default="{ row }">
          <span
            v-if="row.isAbsenteeism == '0' && row.Remarks != '3'"
            style="color: red"
          >
            {{ $t('attendance.text_3') }}
          </span>
          <span v-else-if="row.isAbsenteeism == ' ' && row.Remarks == '3'">
            {{ $t('attendance.text_17') }}
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
    <!-- 补卡信息 -->
    <el-dialog
      :title="$t('attendance.text_22')"
      :visible.sync="dialogFormVisible"
      :width="lang == 'zh_CN' ? '400px' : lang == 'Fr_fr' ? '550px' : '500px'"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="cardForm"
        :model="cardForm"
        :inline="true"
        :label-width="
          lang == 'zh_CN' ? '80px' : lang == 'Fr_fr' ? '250px' : '200px'
        "
        size="medium"
        @submit.native.prevent
      >
        <!-- 补卡类型 -->
        <el-form-item :label="$t('attendance.text_23')">
          <el-select v-model="cardForm.type" placeholder="请选择">
            <!-- 正常 -->
            <el-option
              :key="0"
              :label="$t('attendance.text_24')"
              value="0"
            ></el-option>
            <!-- 迟到 -->
            <el-option
              v-if="cardForm.num == 1"
              :key="1"
              :label="$t('attendance.text_6')"
              value="1"
            ></el-option>
            <!-- 早退 -->
            <el-option
              v-else-if="cardForm.num == 2"
              :key="2"
              :label="$t('attendance.text_7')"
              value="2"
            ></el-option>
            <!-- 请假 -->
            <el-option
              :key="3"
              :label="$t('attendance.text_17')"
              value="3"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 补卡时间 -->
        <el-form-item :label="$t('attendance.text_25')">
          <el-time-picker
            v-model="cardForm.time"
            value-format="HH:mm"
            format="HH:mm"
            :clearable="false"
            :disabled="cardForm.type == 3"
            :placeholder="$t('attendance.text_26')"
          ></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setCard()">
          {{ $t('operation_btn.btn_text_29') }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 导出设置弹窗 -->
    <el-dialog
      :title="$t('attendance.text_27')"
      :visible.sync="dialogVisible"
      width="900px"
      :destroy-on-close="true"
    >
      <el-transfer
        v-model="setData"
        style="display: flex; align-items: center; justify-content: center"
        :props="{
          key: 'value',
          label: 'title',
        }"
        :titles="[$t('attendance.text_28'), $t('attendance.text_29')]"
        :data="setList"
        @change="changeSet"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="saveSet()">
          {{ $t('operation_btn.btn_text_29') }}
        </el-button>
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
  export default {
    name: 'Everyday',
    data() {
      return {
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: this.$t('operation_tips.tips_12'),
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
          timeInterval: '', //时段，'1':时段1，'2'：时段2
          number: '0', //迟到早退时间数，默认0
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
            // console.log('list', this.list)
          } else {
            this.$baseMessage(this.$t('attendance.text_30'), 'warning')
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
        var dataFr = [
          { value: 'name', title: 'Nom' },
          { value: 'department', title: 'département' },
          { value: 'Employee_code', title: "identifiant d'employé" },
          { value: 'Date', title: 'Date de présence' },
          { value: 'Punchinformation', title: 'carte perforée' },
          {
            value: 'Punchinformation1',
            title: 'Pointer après avoir quitté le travail',
          },
          {
            value: 'Shiftinformation',
            title: 'Information sur les quarts de travail',
          },
          { value: 'Duration', title: 'Temps de présence (heures)' },
          { value: 'late', title: 'Tardif (minutes)' },
          { value: 'Leaveearly', title: 'Partez tôt (minutes)' },
          { value: 'workOvertime', title: 'Heures supplémentaires (minutes)' },
          { value: 'isAbsenteeism', title: 'Absentéisme' },
          { value: 'temperature', title: 'Température corporelle (℃)' },
        ]
        var dataVi = [
          { value: 'name', title: 'Tên' },
          { value: 'department', title: 'département' },
          { value: 'Employee_code', title: 'Số nhân viên' },
          { value: 'Date', title: 'Ngày tham dự' },
          { value: 'Punchinformation', title: 'Giờ vào' },
          {
            value: 'Punchinformation1',
            title: 'Giờ ra',
          },
          {
            value: 'Shiftinformation',
            title: 'Thông tin ca làm việc',
          },
          { value: 'Duration', title: 'Thời gian tham dự (giờ)' },
          { value: 'late', title: 'Muộn (phút)' },
          { value: 'Leaveearly', title: 'Nghỉ sớm (phút)' },
          { value: 'workOvertime', title: 'Làm thêm giờ (phút)' },
          { value: 'isAbsenteeism', title: 'Vắng mặt' },
          { value: 'temperature', title: 'Nhiệt độ cơ thể (℃)' },
        ]
        if (this.$lang == 'zh_CN') {
          this.setList = dataZn
        } else if (this.$lang == 'Jan_JPN') {
          this.setList = dataJpan
        } else if (this.$lang == 'en_US') {
          this.setList = dataEn
        } else if (this.$lang == 'Fr_fr') {
          this.setList = dataFr
        } else if (this.$lang == 'vi') {
          this.setList = dataVi
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
      cardInfo(row, type, timeType) {
        // type 1:上班，2：下班
        // timeType 1:时段1,2：时段2
        // console.log('info', row)
        this.dialogFormVisible = true
        this.cardRow = row
        let time = ''
        if (timeType == 1) {
          time = [
            row.Shiftinformation.split('-')[1],
            row.Shiftinformation.split('-')[2],
          ]
        } else if (timeType == 2) {
          time = row.Shiftinformation.split(';')[1].split('-')
        }
        this.cardForm = {
          id: row.id,
          type: row.Remarks ? row.Remarks : '0',
          time: type == 1 ? time[0] : time[1], //上下班时间
          time1: time[0], //上班时间
          time2: time[1], //下班时间
          num: type,
          timeInterval: timeType.toString(),
          number: '0',
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
              this.$baseMessage(this.$t('attendance.text_31'), 'warning')
              return
            }
            //时段二补卡时传入迟到分钟数
            if (data.timeInterval == '2') {
              data.number = this.cardRow.late ? this.cardRow.late : '0'
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
              this.$baseMessage(this.$t('attendance.text_32'), 'warning')
              return
            }
            //时段二补卡时传入早退分钟数
            if (data.timeInterval == '2') {
              data.number = this.cardRow.Leaveearly
                ? this.cardRow.Leaveearly
                : '0'
            }
          }
        }
        if (data.type == '3') {
          data.time = ''
          data.setTime = ''
        }
        // console.log('data', data)
        let res = reissueACard(data)
        if (res) {
          this.$baseMessage(this.$t('operation_tips.tips_47'), 'success')
          this.dialogFormVisible = false
          this.init()
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_48'), 'warning')
          data.type = Number(data.type).toString()
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
          this.$baseMessage(this.$t('attendance.text_33'), 'warning')
          return
        }
        exportList(this.queryForm)
      },

      // 导出设置列表
      getSetting() {
        let res = defaultSet()[0]
        let key = res && res.keyStr ? res.keyStr.split(',') : ''
        if (key == '') {
          return
        }
        this.setData = key
      },
      //导出设置
      setExport() {
        this.getSetting()
        this.dialogVisible = true
        if (this.lang != 'zh_CN' || this.lang != 'Jan_JPN') {
          setTimeout(() => {
            var element = document.getElementsByClassName('el-transfer-panel')
            console.log(element)
            element[0].style.width = '330px'
            element[1].style.width = '330px'
          }, 100)
        }
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
          this.$baseMessage(this.$t('operation_tips.tips_43'), 'success')
          this.dialogVisible = false
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_44'), 'warning')
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
