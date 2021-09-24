<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button icon="el-icon-refresh" @click="loadTasks">
          刷新状态
        </el-button>
      </div>
    </div>
    <el-table
      ref="tableSort"
      border="true"
      :data="tasks"
      :highlight-current-row="true"
    >
      <el-table-column
        align="center"
        prop="Created"
        label="创建时间"
        formatter=""
        width="300px"
      >
        <template #default="{ row }">
          <div>
            {{ timestampToTime(row.Created) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Progress" label="进度">
        <template #default="{ row }">
          <el-progress
            :percentage="(row.Progress / row.TotalCount) * 100"
            :status="row.Progress / row.TotalCount < 1 ? 'warning' : 'success'"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="TotalCount"
        label="总数"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="SuccessCount"
        label="成功"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="FailCount"
        label="失败"
      ></el-table-column>
      <el-table-column align="center" prop="State" label="状态" width="100px">
        <template #default="{ row }">
          <div v-if="row.State === 1" style="display: inline">
            <i
              v-if="row.FailCount === 0"
              class="el-icon-success"
              style="color: green"
            ></i>
            <i
              v-else-if="row.FailCount > 0"
              class="el-icon-warning"
              style="color: red"
            ></i>
            完成
          </div>
          <div v-else-if="row.State === 2" style="display: inline">
            <i class="el-icon-error" style="color: red"></i>
            {{ $t('operation_btn.btn_text_20') }}
          </div>
          <div v-else-if="row.State === 0" style="display: inline">
            <i class="el-icon-loading"></i>
            {{ $t('operation_btn.btn_text_21') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed align="center" width="50px">
        <template #default="{ row, $index }">
          <el-button
            type="text"
            :disabled="row.State === 0"
            @click="removeTask($index, row)"
          >
            <i class="el-icon-remove" style="font-size: 1.5em; color: red"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getRuleDeployTasks,
    removeAccessControlDeployTask,
  } from '@/api/accesscontrol'

  export default {
    data() {
      return {
        tasks: [],
      }
    },
    created() {
      this.loadTasks()
    },
    methods: {
      loadTasks() {
        this.tasks = getRuleDeployTasks()
      },
      removeTask(index, row) {
        removeAccessControlDeployTask(row.Id)
        this.tasks.splice(index, 1)
      },
      // 时间显示转化为12小时制
      timestampToTime(timestamp) {
        var date = new Date(timestamp)
        return date.toLocaleString('en', { hour12: true })
      },
    },
  }
</script>

<style lang="scss" scoped>
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
</style>
