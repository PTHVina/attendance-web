<template>
  <div class="table-container">
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
            <el-button icon="el-icon-folder" type="primary" @click="exportData">
              {{ $t('operation_btn.btn_text_30') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      stripe
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="700"
    >
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('attendance.text_1')"
        sortable
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.name }}</span>
        </template>
      </el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        prop="Employee_code"
        :label="$t('attendance.text_13')"
        sortable
      ></el-table-column>
      <!-- 部门 -->
      <el-table-column
        show-overflow-tooltip
        prop="department"
        :label="$t('attendance.text_12')"
        sortable
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
        prop="attendance"
        sortable
      ></el-table-column>
      <!-- 迟到次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_44')"
        prop="latedata"
        :width="lang == 'en_US' ? '330px' : ''"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.latedata }}</span>
        </template>
      </el-table-column>
      <!-- 早退次数/总时长(分钟) -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendance.text_45')"
        prop="Leaveearlydata"
        :width="lang == 'en_US' ? '330px' : ''"
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
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.AbsenteeismCount }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getMonthlyList, exportData } from '@/api/attendance'
  export default {
    name: 'Monthly',
    data() {
      return {
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        queryForm: {
          name: '',
          date: '',
        },
      }
    },
    created() {
      let date = new Date()
      let YY = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM > 9 ? MM : '0' + MM
      this.queryForm.date = YY + '-' + MM
    },
    beforeDestroy() {},
    mounted() {
      this.init()
    },
    methods: {
      init() {
        if (this.queryForm.date) {
          this.listLoading = true
          let list = getMonthlyList(this.queryForm)
          this.list = list
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        } else {
          this.$baseMessage(this.$t('attendance.text_47'), 'warning')
        }
      },
      //查询
      handleQuery() {
        this.init()
      },
      //导出数据
      exportData() {
        if (this.queryForm.date) {
          exportData(this.queryForm)
        } else {
          this.$baseMessage(this.$t('attendance.text_47'), 'warning')
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
  .el-form {
    padding: 0 !important;
  }
</style>
