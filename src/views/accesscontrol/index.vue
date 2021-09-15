<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button @click="addWeekAccessRule">添加周调度规则</el-button>
        <el-button @click="addDayAccessRule">添加天调度规则</el-button>
      </div>
    </div>
    <el-table
      ref="tableSort"
      border="true"
      :data="rules"
      :span-method="columnSpan"
      :highlight-current-row="true"
    >
      <el-table-column
        align="center"
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
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
                <i class="el-icon-remove" style="color: red"></i>
              </span>
            </p>
            <p class="add" @click="addTimeSegment(row.Days, 6)">
              <i class="el-icon-circle-plus-outline"></i>
            </p>
          </label>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed align="center" width="50px">
        <template #default="{ row, $index }">
          <el-button type="text" @click="removeAccessRule($index, row)">
            <i class="el-icon-remove" style="font-size: 1.5em; color: red"></i>
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
    addWeekAccessRule,
    addDayAccessRule,
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
        const rules = getAllAccessRules()
        //按周日，周一..排序，因为界面上按这个顺序显示
        for (const r of rules) {
          r.Days.sort((x, y) => x.DayOfWeek - y.DayOfWeek)
        }
        this.rules = rules
      },
      columnSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 2) {
          if (row.Days && row.Days.length == 1) {
            return [1, 7]
          }
        }
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
      addWeekAccessRule() {
        this.$prompt('input name', {}).then(({ value }) => {
          this.addAccessRule(value, 0)
        })
      },
      addDayAccessRule() {
        this.$prompt('input name', {}).then(({ value }) => {
          this.addAccessRule(value, 1)
        })
      },
      addAccessRule(name, type) {
        var rule
        if (type === 0) {
          rule = addWeekAccessRule(name)
        } else if (type === 1) {
          rule = addDayAccessRule(name)
        }
        this.rules.push(rule)
      },
    },
  }
</script>

<style lang="scss">
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
