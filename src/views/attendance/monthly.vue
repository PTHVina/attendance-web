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
          <el-form-item>
            <span>考勤月份</span>
            <el-date-picker
              v-model="queryForm.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择月"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>姓名</span>
            <el-input v-model="queryForm.name" placeholder="人员姓名" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
            <el-button icon="el-icon-folder" type="primary" @click="exportData">
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column show-overflow-tooltip prop="name" label="姓名" sortable>
        <template #default="{ row }">
          <span style="color: red">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="Employee_code"
        label="人员编号"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="department"
        label="部门"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="日期"
        prop="nowdate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="出勤(天)"
        prop="Attendance"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="迟到次数/总时长(分钟)"
        prop="latedata"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.latedata }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="早退次数/总时长(分钟)"
        prop="Leaveearlydata"
      >
        <template #default="{ row }">
          <span style="color: red">{{ row.Leaveearlydata }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="旷工天数"
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
    name: 'monthly',
    data() {
      return {
        list: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: '正在加载...',
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
          this.$baseMessage('请先选择查询年月', 'warning')
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
          this.$baseMessage('请先选择查询年月', 'warning')
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
