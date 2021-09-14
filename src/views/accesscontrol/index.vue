<template>
  <div class="table-container">
    <h1>Access Rules</h1>
    <el-table
      ref="tableSort"
      border="true"
      :data="rules"
      :span-method="columnSpan"
      :highlight-current-row="true"
    >
      <el-table-column
        show-overflow-tooltip
        prop="Name"
        label="名称"
        width="100px"
      ></el-table-column>
      <el-table-column label="周日" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[0]">
            <p v-for="seg in row.Days[0].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周一" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[1]">
            <p v-for="seg in row.Days[1].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周二" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[2]">
            <p v-for="seg in row.Days[2].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周三" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[3]">
            <p v-for="seg in row.Days[3].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周四" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[4]">
            <p v-for="seg in row.Days[4].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周五" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[5]">
            <p v-for="seg in row.Days[5].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周六" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[6]">
            <p v-for="seg in row.Days[6].TimeSegments" :key="seg.Id">
              {{ seg.Start + '-' + seg.End }}
            </p>
          </label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getAllAccessRules } from '@/api/accesscontrol'
  export default {
    name: 'Rules',
    data() {
      return {
        rules: [],
        weekeays: ['周日', '周1', '周2', '周3', '周4', '周5', '周6'],
      }
    },
    created() {
      this.loadRules()
    },
    methods: {
      loadRules() {
        this.rules = getAllAccessRules()
        console.log(this.rules)
      },
      columnSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 1) {
          if (row.Days && row.Days.length == 1) {
            return [1, 7]
          }
        }
        return [1, 1]
      },
    },
  }
</script>

<style lang="scss"></style>
