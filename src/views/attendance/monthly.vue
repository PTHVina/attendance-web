<template>
  <div class="table-container monthly">
    <div class="group">
      <div class="form_group">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          size="medium"
          @submit.native.prevent
        >
          <!-- 考勤月份 -->
          <el-form-item>
            <span>{{ $t('attendance.text_40') }}</span>
            <el-date-picker
              v-model="queryForm.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              :placeholder="$t('attendance.text_41')"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
          <!-- 组织机构 -->
          <el-form-item>
            <span>{{ $t('attendance.text_12') }}</span>
            <el-select
              v-model="departments"
              multiple
              collapse-tags
              :placeholder="$t('accessControl.pleaseChooseDepartment')"
            >
              <el-option
                v-for="item in allDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item>
            <span>{{ $t('attendance.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('attendance.text_2')"
            />
          </el-form-item>
          <el-form-item>
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
            <!-- 导出 -->
            <el-popover
              v-if="lang == 'en_US' || lang == 'vi'"
              style="margin-left: 5px"
              trigger="click"
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: stretch;
                "
              >
                <el-button
                  style="margin-bottom: 5px"
                  @click="exportAttendanceMasterReport"
                >
                  Attendance Master
                </el-button>
                <el-button
                  style="margin-left: 0px"
                  @click="exportPeriodicMasterReport"
                >
                  Periodic Master
                </el-button>
              </div>
              <el-button slot="reference" icon="el-icon-folder" type="primary">
                {{ $t('operation_btn.btn_text_30') }}
              </el-button>
            </el-popover>
            <el-button
              v-else
              icon="el-icon-folder"
              type="primary"
              @click="exportData"
            >
              {{ $t('operation_btn.btn_text_30') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      v-if="lang == 'en_US'"
      ref="tableSort"
      v-loading="listLoading"
      stripe
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="calc(100vh - 258px)"
    >
      <!-- Department -->
      <el-table-column
        show-overflow-tooltip
        prop="Department"
        :label="$t('attendance.text_12')"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="Designation"
        :label="$t('attendance.designation')"
        sortable
      ></el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        prop="EmployeeNo"
        :label="$t('attendance.text_13')"
        sortable
      ></el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="EmployeeName"
        :label="$t('attendance.text_1')"
        sortable
      ></el-table-column>
      <!-- 日期 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.month')"
        prop="YearMonth"
      ></el-table-column>
      <!-- 出勤(天) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.pr')"
        prop="PresentDaysCount"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.ab')"
        prop="AbsentDaysCount"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.ho')"
        prop="HolidaysCount"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.wo')"
        prop="LeaveDaysCount"
        sortable
      ></el-table-column>
      <!-- 迟到次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.totalLateDuration')"
        prop="TotalLateHours"
        :formatter="formatDuration"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.totalLateCount')"
        prop="TotalLateDays"
      ></el-table-column>
      <!-- 早退次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.totalEarlyLeaveDuration')"
        prop="TotalEarlyHours"
        :formatter="formatDuration"
      ></el-table-column>
      <!-- 旷工天数 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.totalEarlyLeaveCount')"
        prop="TotalEarlyDays"
      ></el-table-column>
    </el-table>
    <el-table
      v-else
      ref="tableSort"
      v-loading="listLoading"
      stripe
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="calc(100vh - 258px)"
    >
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('attendance.text_1')"
        sortable
      >
        <template #default="{ row }">
          <a
            href="#"
            style="text-decoration: underline"
            @click.prevent="openDialog(row)"
          >
            {{ row.name }}
          </a>
        </template>
      </el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        prop="Employee_code"
        :label="$t('attendance.text_13')"
        :width="lang == 'en_US' ? '170px' : lang == 'Fr_fr' ? '200px' : ''"
        sortable
      ></el-table-column>
      <!-- 组织机构 -->
      <el-table-column
        show-overflow-tooltip
        prop="department"
        :label="$t('attendance.text_12')"
        sortable
        :width="lang == 'Fr_fr' ? '170px' : ''"
      ></el-table-column>
      <!-- 日期 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_42')"
        prop="nowdate"
        :width="lang == 'en_US' ? '80px' : ''"
      ></el-table-column>
      <!-- 出勤(天) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_43')"
        prop="Attendance"
        sortable
        :width="lang == 'Fr_fr' ? '230px' : ''"
      ></el-table-column>
      <!-- 迟到次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_44')"
        prop="latedata"
        :width="lang == 'en_US' ? '330px' : lang == 'Fr_fr' ? '370px' : ''"
      >
        <template #default="{ row }">
          <span style="color: red; height: 40px; line-height: 40px">
            {{ row.latedata }}
          </span>
        </template>
      </el-table-column>
      <!-- 早退次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_45')"
        prop="Leaveearlydata"
        :width="lang == 'en_US' ? '330px' : lang == 'Fr_fr' ? '390px' : ''"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.Leaveearlydata }}</span>
        </template>
      </el-table-column>
      <!-- 旷工天数 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_46')"
        prop="AbsenteeismCount"
        :width="lang == 'Fr_fr' ? '330px' : ''"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.AbsenteeismCount }}</span>
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

    <!-- 每日考勤 -->
    <el-dialog
      :title="$t('router.title_17')"
      :visible.sync="dialogTableVisible"
      :destroy-on-close="true"
      width="80vw"
    >
      <el-table
        ref="table"
        v-loading="listLoading2"
        :data="everydayList"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
        class="dialog_size"
        height="68vh"
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
        <!-- 组织机构 -->
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
          :width="
            lang == 'en_US' ? '200px' : lang == 'Fr_fr' ? '170px' : '160px'
          "
        >
          <template #default="{ row }">
            <div>{{ row.Date }}（{{ setWeek(row.Date) }}）</div>
          </template>
        </el-table-column>
        <!-- 班次信息 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('attendance.text_14')"
          prop="Shiftinformation"
          sortable
          :width="
            lang == 'en_US' ? '170px' : lang == 'Fr_fr' ? '190px' : '170px'
          "
        ></el-table-column>
        <!-- 打卡信息 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('attendance.text_15')"
          prop="Punchinformation"
          :width="
            lang == 'zh_CN'
              ? '200px'
              : lang == 'Jan_JPN'
              ? '400px'
              : lang == 'Fr_fr'
              ? '520px'
              : '420px'
          "
        >
          <template #default="{ row }">
            <div class="tab_box">
              <div>
                <span>{{ $t('attendance.text_16') }}：</span>
                <span v-if="row.Punchinformation">
                  {{ row.Punchinformation }}
                </span>
                <span v-else style="color: red">
                  {{ $t('attendance.text_18') }}
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
                <span v-else style="color: red">
                  {{ $t('attendance.text_18') }}
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
              ? '200px'
              : lang == 'Jan_JPN'
              ? '400px'
              : lang == 'Fr_fr'
              ? '520px'
              : '420px'
          "
        >
          <template #default="{ row }">
            <div v-if="row.Punchinformation2 != null" class="tab_box">
              <div>
                <span>{{ $t('attendance.text_16') }}：</span>
                <span v-if="row.Punchinformation2">
                  {{ row.Punchinformation2 }}
                </span>
                <span v-else style="color: red">
                  {{ $t('attendance.text_18') }}
                </span>
              </div>
              <div>
                <span>{{ $t('attendance.text_19') }}：</span>
                <span v-if="row.Punchinformation22">
                  {{ row.Punchinformation22 }}
                </span>
                <span v-else style="color: red">
                  {{ $t('attendance.text_18') }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 体温(℃) -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('attendance.text_20')"
          formatter="formatCellTemperatureString"
          prop="temperature"
          sortable
          :width="
            lang == 'en_US' ? '160px' : lang == 'Fr_fr' ? '240px' : '100px'
          "
        >
          <template #default="{ row }">
            <span
              v-if="
                Number(row.temperature) > 37.3 || Number(row.temperature) < 36.3
              "
              style="color: red"
            >
              {{ formatTemperatureString(row.temperature) }}
            </span>
            <span v-else>{{ formatTemperatureString(row.temperature) }}</span>
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
              ? '180px'
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
          :width="
            lang == 'en_US' ? '140px' : lang == 'Fr_fr' ? '170px' : '80px'
          "
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
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMonthlyList,
    exportData,
    getEverydayAllList,
    exportAttendanceMasterReport,
    exportPeriodicMasterReport,
    formatDuration,
  } from '@/api/attendance'
  import {
    formatCellTemperatureString,
    formatTemperatureString,
  } from '@/utils/index'
  import { getAllDepartment } from '@/api/accesscontrol'
  export default {
    name: 'Monthly',
    data() {
      return {
        lang: this.$lang,
        departments: [],
        allDepartments: [],
        list: [],
        listLoading: false, //列表加载
        listLoading2: false,
        layout: 'total',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        queryForm: {
          name: '',
          date: '',
          departments: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },

        dialogTableVisible: false,
        everydayList: [],
      }
    },
    created() {
      let date = new Date()
      let YY = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM > 9 ? MM : '0' + MM
      this.queryForm.date = YY + '-' + MM
      this.loadAllDepartments()
    },
    beforeDestroy() {},
    async mounted() {
      await this.loadData()
    },
    methods: {
      loadAllDepartments() {
        const depts = getAllDepartment()
        this.allDepartments = depts
      },
      formatCellTemperatureString,
      formatTemperatureString,
      async loadData() {
        if (this.queryForm.date) {
          this.listLoading = true
          this.queryForm.departments = this.departments.join(',')
          let lst = await getMonthlyList(this.queryForm)
          this.list = lst
          this.page.total = lst.length
          this.listLoading = false
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        } else {
          this.$baseMessage(this.$t('attendance.text_47'), 'warning')
        }
      },
      //查询
      async handleQuery() {
        this.page.pageNo = 1
        await this.loadData()
      },
      // 切换显示条数
      async handleSizeChange(val) {
        this.page.pageSize = val
        await this.loadData()
      },
      //切换页数
      async handleCurrentChange(val) {
        this.page.pageNo = val
        await this.loadData()
      },
      //导出数据
      exportData() {
        if (this.queryForm.date) {
          exportData(this.queryForm)
        } else {
          this.$baseMessage(this.$t('attendance.text_47'), 'warning')
        }
      },

      //单人每日数据
      openDialog(row) {
        this.dialogTableVisible = true
        this.listLoading2 = true
        console.log(row)
        getEverydayAllList(row).then((res) => {
          this.everydayList = res
          this.listLoading2 = false
        })
      },
      //获取星期
      setWeek(date) {
        var weekDay = [
          this.$t('attendance.text_50'),
          this.$t('attendance.text_51'),
          this.$t('attendance.text_52'),
          this.$t('attendance.text_53'),
          this.$t('attendance.text_54'),
          this.$t('attendance.text_55'),
          this.$t('attendance.text_56'),
        ]
        var myDate = new Date(Date.parse(date))
        return weekDay[myDate.getDay()]
      },
      exportAttendanceMasterReport() {
        exportAttendanceMasterReport(this.queryForm)
      },
      exportPeriodicMasterReport() {
        exportPeriodicMasterReport(this.queryForm)
      },
      formatDuration(row, column, cellValue) {
        return formatDuration(cellValue)
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
  .el-form {
    padding: 0 !important;
  }

  .dialog_size {
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

  .tab_box {
    height: 50px;
    display: flex;
    align-items: center;
    div {
      margin-right: 20px;
      display: flex;
      align-items: center;
    }
  }
</style>
