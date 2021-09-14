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
          <label v-if="row.Days[0]" class="parent">
            <p
              v-for="seg in row.Days[0].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周一" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[1]" class="parent">
            <p
              v-for="seg in row.Days[1].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周二" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[2]" class="parent">
            <p
              v-for="seg in row.Days[2].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周三" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[3]" class="parent">
            <p
              v-for="seg in row.Days[3].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周四" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[4]" class="parent">
            <p
              v-for="seg in row.Days[4].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周五" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[5]" class="parent">
            <p
              v-for="seg in row.Days[5].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周六" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[6]" class="parent">
            <p
              v-for="seg in row.Days[6].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span class="remove" @click="removeTimeSegment">
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment">
              <i class="el-icon-circle-plus-outline"></i>
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
      },
      columnSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 1) {
          if (row.Days && row.Days.length == 1) {
            return [1, 7]
          }
        }
        return [1, 1]
      },
      addTimeSegment(parentId, start, end) {
        alert('add')
      },
      removeTimeSegment(id) {
        alert('remove')
      },
    },
  }
</script>

<style lang="scss">
  .parentRemove > .remove {
    visibility: hidden;
  }

  .parentRemove:hover > .remove {
    visibility: visible;
    cursor: pointer;
  }

  .cell .add {
    visibility: hidden;
  }

  .cell:hover .add {
    visibility: visible;
    cursor: pointer;
  }
</style>
