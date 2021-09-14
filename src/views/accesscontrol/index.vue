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
              v-for="(seg, index) in row.Days[0].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[0], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 0)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周一" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[1]" class="parent">
            <p
              v-for="(seg, index) in row.Days[1].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[1], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 1)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周二" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[2]" class="parent">
            <p
              v-for="(seg, index) in row.Days[2].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[2], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 2)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周三" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[3]" class="parent">
            <p
              v-for="(seg, index) in row.Days[3].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[3], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 3)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周四" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[4]" class="parent">
            <p
              v-for="(seg, index) in row.Days[4].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[4], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 4)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周五" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[5]" class="parent">
            <p
              v-for="(seg, index) in row.Days[5].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[5], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 5)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="周六" align="center" width="180">
        <template #default="{ row }">
          <label v-if="row.Days[6]" class="parent">
            <p
              v-for="(seg, index) in row.Days[6].TimeSegments"
              :key="seg.Id"
              class="parentRemove"
            >
              {{ seg.Start + '-' + seg.End }}
              <span
                class="remove"
                @click="removeTimeSegment(row.Days[6], index)"
              >
                &nbsp;
                <i class="el-icon-remove-outline"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 6)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ scope }">
          <el-button
            size="mini"
            type="danger"
            @click="removeAccessRule(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getAllAccessRules,
    addTimeSegment,
    removeTimeSegment,
    removeAccessRule,
  } from '@/api/accesscontrol'
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
      addTimeSegment(Days, index) {
        const regular = /(\d{2,2}):?(\d{2,2})\D?(\d{2,2}):?(\d{2,2})/
        this.$prompt('input time frame', {
          inputPlaceholder: '12:00-13:00',
          inputPattern: regular,
        }).then(({ value }) => {
          var match = value.match(regular)
          if (match) {
            var ts = addTimeSegment(
              Days[index].Id,
              match[1] + ':' + match[2],
              match[3] + ':' + match[4]
            )
            Days[index].TimeSegments.push(ts)
          }
        })
      },
      removeTimeSegment(Day, index) {
        removeTimeSegment(Day.TimeSegments[index].Id)
        Day.TimeSegments.splice(index, 1)
      },
      removeAccessRule(index, row) {
        removeAccessRule(row.Id)
        this.rules.splice(index, 1)
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
