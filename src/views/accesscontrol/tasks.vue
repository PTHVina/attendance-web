<template>
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
    ></el-table-column>
    <el-table-column
      align="center"
      prop="Progress"
      label="进度"
      width="100px"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="TotalCount"
      label="总数"
      width="100px"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="SuccessCount"
      label="成功"
      width="100px"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="FailCount"
      label="失败"
      width="100px"
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
    },
  }
</script>
