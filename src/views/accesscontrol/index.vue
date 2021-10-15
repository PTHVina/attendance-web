<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button @click="addWeekAccessRule">
          {{ $t('accessControl.addWeekRule') }}
        </el-button>
        <el-button @click="addDayAccessRule">
          {{ $t('accessControl.addDayRule') }}
        </el-button>
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
        :label="$t('accessControl.name')"
        width="100px"
      ></el-table-column>
      <el-table-column
        :label="$t('attendance.text_50')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_51')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_52')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_53')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_54')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_55')"
        align="center"
        width="180"
      >
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
      <el-table-column
        :label="$t('attendance.text_56')"
        align="center"
        width="180"
      >
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
      <el-table-column fixed align="center" width="50px">
        <template #default="{ row, $index }">
          <el-button type="text" @click="removeAccessRule($index, row)">
            <i class="el-icon-remove" style="font-size: 1.5em; color: red"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加调度时间段弹窗-->
    <el-dialog
      :title="$t('accessControl.inputTimeSlot')"
      :close-on-click-modal="false"
      :visible.sync="dialogTimeVisible"
      :destroy-on-close="true"
      :before-close="closeFn"
      width="30%"
      center
    >
      <div style="text-align: center">
        <el-time-picker
          v-model="timeValue"
          is-range
          :range-separator="$t('snapshot.text_5')"
          :start-placeholder="$t('snapshot.text_36')"
          :end-placeholder="$t('snapshot.text_37')"
          :placeholder="$t('attendanceSet.text_20')"
          format="HH:mm"
        ></el-time-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setTimeData">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
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
        dialogTimeVisible: false,
        timeValue: [new Date(2021, 5, 5, 0, 0), new Date(2021, 6, 6, 23, 59)],
        Days: '',
        index: '',
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
        this.Days = Days
        this.index = index
        this.dialogTimeVisible = true
        // const regular = /(\d{2,2}):?(\d{2,2})\D?(\d{2,2}):?(\d{2,2})/
        // this.$prompt(this.$t('accessControl.inputTimeSlot'), {
        //   inputPlaceholder: this.$t('accessControl.timeSlotPlaceHolder'),
        //   inputPattern: regular,
        // }).then(({ value }) => {
        //   var match = value.match(regular)
        //   if (match) {
        //     var ts = addTimeSegment(
        //       Days[index].Id,
        //       match[1] + ':' + match[2],
        //       match[3] + ':' + match[4]
        //     )
        //     Days[index].TimeSegments.push(ts)
        //   }
        // })
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
        this.addAccessRule(0)
      },
      addDayAccessRule() {
        this.addAccessRule(1)
      },
      addAccessRule(type) {
        this.$prompt(this.$t('accessControl.name'), {}).then(({ value }) => {
          var rule
          if (type === 0) {
            rule = addWeekAccessRule(value)
          } else if (type === 1) {
            rule = addDayAccessRule(value)
          }
          this.rules.push(rule)
        })
      },
      //关闭窗口
      closeFn() {
        this.Days = ''
        this.index = ''
        this.dialogTimeVisible = false
      },
      // 添加调度时间片段
      setTimeData() {
        if (this.timeValue) {
          try {
            let start = this.formatAccessTime(this.timeValue[0])
            let end = this.formatAccessTime(this.timeValue[1])
            var ts = addTimeSegment(this.Days[this.index].Id, start, end)
            this.Days[this.index].TimeSegments.push(ts)
          } catch (error) {
            this.$baseMessage(this.$t('personnel.pl_17'), 'error')
          }
        }
        this.dialogTimeVisible = false
      },
      //格式化时间
      formatAccessTime(date) {
        let h = date.getHours()
        let m = date.getMinutes()
        h = h <= 9 ? '0' + h : h
        m = m <= 9 ? '0' + m : m
        return h + ':' + m
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
