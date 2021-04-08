<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <!-- 新增 -->
        <el-button
          icon="el-icon-plus"
          type="primary"
          class="btn_guide_c"
          @click="openFormDialog"
        >
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="calc(100vh - 205px)"
    >
      <!-- 创建时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_2')"
        prop="publish_time"
        sortable
      ></el-table-column>
      <!-- 班次名称 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_3')"
        prop="name"
      >
        <template #default="{ row }">
          <div style="height: 40px; line-height: 40px">{{ row.name }}</div>
        </template>
      </el-table-column>
      <!-- 班次类型 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_74')"
        prop="IsAcrossNight"
      >
        <template #default="{ row }">
          <el-tag v-if="row.IsAcrossNight == 'true'" type="danger">
            {{ $t('attendanceSet.text_73') }}
          </el-tag>
          <el-tag v-else>
            {{ $t('attendanceSet.text_72') }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 班次时长 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_4')"
        prop="Duration"
      ></el-table-column>
      <!-- 工作时段一 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_5')"
        prop="gotowork1"
      ></el-table-column>
      <!-- 工作时段二 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_6')"
        prop="gotowork2"
      ></el-table-column>
      <!-- 工作时段三 -->
      <!-- <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_7')"
        prop="gooffwork3"
      ></el-table-column> -->
      <!-- 休息时间段 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_8')"
        prop="rest_time"
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('attendanceSet.text_9')" fixed="right">
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 删除 -->
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            {{ $t('operation_btn.btn_text_2') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改弹窗 -->
    <!-- 班次信息 -->
    <el-dialog
      :title="$t('attendanceSet.text_10')"
      :visible.sync="dialogFormVisible"
      :width="lang == 'zh_CN' ? '610px' : '670px'"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formData"
        :model="form"
        :label-width="lang == 'zh_CN' ? '140px' : '220px'"
        :rules="rules"
        size="medium"
        style="max-height: 60vh; overflow: auto"
        :style="
          form.radio == '2' && isShow ? 'padding-right:10px !important;' : ''
        "
      >
        <!-- 班次类型 -->
        <el-form-item :label="$t('attendanceSet.text_74')">
          <el-switch
            v-model="form.IsAcrossNight"
            :active-text="$t('attendanceSet.text_73')"
            :disabled="form.id ? true : false"
            @change="changeShift"
          ></el-switch>
        </el-form-item>
        <!-- 班次 -->
        <el-form-item :label="$t('attendanceSet.text_3')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('attendanceSet.text_3')"
          ></el-input>
        </el-form-item>
        <!-- 时段数 -->
        <el-form-item :label="$t('attendanceSet.text_12')">
          <el-radio-group v-model="form.radio" @change="radioChange">
            <el-radio label="1" border>
              {{ $t('attendanceSet.text_13') }}
            </el-radio>
            <!-- <el-radio v-if="!form.IsAcrossNight" label="2" border>
              {{ $t('attendanceSet.text_14') }}
            </el-radio> -->
            <el-radio v-if="false" label="3" border>
              {{ $t('attendanceSet.text_15') }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 上下班时间段-白班 -->
        <el-form-item
          v-if="!form.IsAcrossNight"
          :label="$t('attendanceSet.text_16')"
          prop="commuter"
        >
          <el-time-picker
            v-model="form.commuter"
            is-range
            :editable="false"
            :clearable="false"
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="commuter1Change"
          ></el-time-picker>
        </el-form-item>
        <!-- 上下班时间段-白班-2 -->
        <el-form-item
          v-if="!form.IsAcrossNight && form.radio == '2'"
          :label="$t('attendanceSet.text_16') + '2'"
          prop="commuter2"
        >
          <el-time-picker
            v-model="form.commuter2"
            is-range
            :editable="false"
            :clearable="false"
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="commuterBChange"
          ></el-time-picker>
        </el-form-item>
        <!-- 休息时间段-白班 -->
        <el-form-item
          v-if="!form.IsAcrossNight && form.radio == '1'"
          :label="$t('attendanceSet.text_8')"
          prop="rest"
        >
          <el-time-picker
            v-model="form.rest"
            is-range
            :editable="false"
            :clearable="false"
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="restChange"
          ></el-time-picker>
        </el-form-item>
        <!-- 上下班时间段-夜班 -->
        <el-form-item
          v-if="form.IsAcrossNight"
          :label="$t('attendanceSet.text_16')"
          prop="clockIn1"
        >
          <div style="display: flex; align-items: center">
            <el-time-picker
              v-model="form.clockIn1"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: '12:00:00 - 23:59:00',
              }"
              :placeholder="$t('attendanceSet.text_18')"
              style="flex: 0.5"
            ></el-time-picker>
            <span style="margin: 0 10px">
              {{ $t('attendanceSet.text_17') }}
            </span>
            <el-tag style="margin-right: 10px">
              {{ $t('attendanceSet.text_29') }}
            </el-tag>
            <el-time-picker
              v-model="form.clockIn2"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: '00:00:00 - 11:59:00',
              }"
              :placeholder="$t('attendanceSet.text_19')"
              style="flex: 0.5"
            ></el-time-picker>
          </div>
        </el-form-item>
        <!-- 休息时间段-夜班 -->
        <el-form-item
          v-if="form.IsAcrossNight"
          :label="$t('attendanceSet.text_8')"
          prop="repose1"
        >
          <div style="display: flex; align-items: center">
            <el-time-picker
              v-model="form.repose1"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: repose1_SR,
              }"
              :placeholder="$t('attendanceSet.text_18')"
              style="flex: 0.5"
            ></el-time-picker>
            <span style="margin: 0 10px">
              {{ $t('attendanceSet.text_17') }}
            </span>
            <el-tag
              v-if="
                form.repose1 &&
                form.repose2 &&
                Number(form.repose1.replace(':', '')) >
                  Number(form.repose2.replace(':', ''))
              "
              style="margin-right: 10px"
            >
              {{ $t('attendanceSet.text_29') }}
            </el-tag>
            <el-time-picker
              v-model="form.repose2"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: repose2_SR,
              }"
              :placeholder="$t('attendanceSet.text_18')"
              style="flex: 0.5"
            ></el-time-picker>
          </div>
        </el-form-item>
        <!-- 出勤时长 -->
        <el-form-item :label="$t('attendanceSet.text_21')">
          <el-tag size="medium">
            {{ timeLong }}{{ $t('attendanceSet.text_22') }}
          </el-tag>
        </el-form-item>
        <div class="set_btn" @click="setShow">
          {{ $t('attendanceSet.text_28') }}
          <i v-if="isShow" class="el-icon-open"></i>
          <i v-if="!isShow" class="el-icon-turn-off"></i>
        </div>
        <!-- 上班有效打卡区间-白班 -->
        <el-form-item
          v-if="isShow && !form.IsAcrossNight"
          :label="$t('attendanceSet.text_23')"
        >
          <el-time-picker
            v-model="form.punchCard1"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="punchCard1Change"
          ></el-time-picker>
        </el-form-item>
        <!-- 下班有效打卡区间-白班 -->
        <el-form-item
          v-if="isShow && !form.IsAcrossNight"
          :label="$t('attendanceSet.text_24')"
        >
          <el-time-picker
            v-model="form.punchCard2"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="punchCard2Change"
          ></el-time-picker>
        </el-form-item>
        <span
          v-if="isShow && form.radio == '2'"
          style="display: inline-block; margin: 0 0 10px 10px; color: #999"
        >
          时段二
        </span>
        <!-- 上班有效打卡区间-白班-时段2 -->
        <el-form-item
          v-if="isShow && !form.IsAcrossNight && form.radio == '2'"
          :label="$t('attendanceSet.text_23') + '2'"
        >
          <el-time-picker
            v-model="form.punchCardB1"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="punchCardB1Change"
          ></el-time-picker>
        </el-form-item>
        <!-- 下班有效打卡区间-白班-时段2 -->
        <el-form-item
          v-if="isShow && !form.IsAcrossNight && form.radio == '2'"
          :label="$t('attendanceSet.text_24') + '2'"
        >
          <el-time-picker
            v-model="form.punchCardB2"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
            @change="punchCardB2Change"
          ></el-time-picker>
        </el-form-item>
        <!-- 上班有效打卡区间-夜班 -->
        <el-form-item
          v-if="isShow && form.IsAcrossNight"
          :label="$t('attendanceSet.text_23')"
        >
          <div style="display: flex; align-items: center">
            <el-time-picker
              v-model="form.CIARange1"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: CIARange1SR,
              }"
              :placeholder="$t('attendanceSet.text_18')"
              style="flex: 0.5"
            ></el-time-picker>
            <span style="margin: 0 10px">
              {{ $t('attendanceSet.text_17') }}
            </span>
            <el-time-picker
              v-model="form.CIARange2"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: CIARange2SR,
              }"
              :placeholder="$t('attendanceSet.text_19')"
              style="flex: 0.5"
            ></el-time-picker>
          </div>
        </el-form-item>
        <!-- 下班有效打卡区间-夜班 -->
        <el-form-item
          v-if="isShow && form.IsAcrossNight"
          :label="$t('attendanceSet.text_24')"
        >
          <div style="display: flex; align-items: center">
            <el-time-picker
              v-model="form.CIBRange1"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: CIBRange1SR,
              }"
              :placeholder="$t('attendanceSet.text_18')"
              style="flex: 0.5"
            ></el-time-picker>
            <span style="margin: 0 10px">
              {{ $t('attendanceSet.text_17') }}
            </span>
            <el-time-picker
              v-model="form.CIBRange2"
              value-format="HH:mm"
              format="HH:mm"
              :picker-options="{
                selectableRange: CIBRange2SR,
              }"
              :placeholder="$t('attendanceSet.text_19')"
              style="flex: 0.5"
            ></el-time-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setFormData('formData')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //时间大小
  function timeReplace(time) {
    return parseInt(time.replace(':', ''))
  }
  // 分割时间 [时，分]
  function timeSplit(time) {
    let list = time.split(':')
    let array = []
    list.forEach((item) => {
      array.push(parseInt(item))
    })
    return array
  }

  import { getshiftlist, delClasses, setClasses } from '@/api/attendanceSet'
  export default {
    name: 'Classes',
    data() {
      return {
        lang: this.$lang,
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        elementLoadingText: this.$t('operation_tips.tips_12'),
        dialogFormVisible: false, //表单弹窗控制
        // 新增、编辑
        form: {
          IsAcrossNight: false,
          name: '',
          radio: '1',
          commuter: ['09:00', '18:00'], //白班打卡时间
          commuter2: ['19:00', '23:00'], //白班打卡时间-时段2
          rest: ['12:00', '13:00'], //白班休息时间

          clockIn1: '20:00', //夜班上班打卡时间
          clockIn2: '08:00', //夜班下班打卡时间
          repose1: '00:00', //夜班休息时间开始
          repose2: '01:00', //夜班休息时间结婚时

          time: '',
          punchCard1: '', //上班有效打卡区间-白班
          punchCard2: '', //下班有效打卡区间-白班
          punchCardB1: '', //上班有效打卡区间-白班-时段2
          punchCardB2: '', //下班有效打卡区间-白班-时段2

          CIARange1: '', //上班有效打卡区间开始-夜班
          CIARange2: '', //上班有效打卡区间结束-夜班
          CIBRange1: '', //下班有效打卡区间开始-夜班
          CIBRange2: '', //下班有效打卡区间结束-夜班
        },
        rules: {
          name: [
            {
              required: true,
              message: this.$t('attendanceSet.text_25'),
              trigger: 'blur',
            },
          ],
          commuter: [
            {
              required: true,
              message: this.$t('attendanceSet.text_26'),
              trigger: 'blur',
            },
          ],
          commuter2: [
            {
              required: true,
              message: this.$t('attendanceSet.text_26'),
              trigger: 'blur',
            },
          ],
          rest: [
            {
              required: true,
              message: this.$t('attendanceSet.text_27'),
              trigger: 'blur',
            },
          ],
          clockIn1: [
            {
              required: true,
              message: this.$t('attendanceSet.text_26'),
              trigger: 'blur',
            },
          ],
          repose1: [
            {
              required: true,
              message: this.$t('attendanceSet.text_27'),
              trigger: 'blur',
            },
          ],
        },
        isShow: false,
      }
    },
    computed: {
      //计算出勤时长
      timeLong() {
        if (!this.dialogFormVisible) {
          return ''
        }

        if (!this.form.IsAcrossNight) {
          // 白班出勤时长
          let time = 0
          let commuter1H = timeSplit(this.form.commuter[0])[0] //上班小时
          let commuter1M = timeSplit(this.form.commuter[0])[1] //上班分钟
          let commuter2H = timeSplit(this.form.commuter[1])[0] //下班小时
          let commuter2M = timeSplit(this.form.commuter[1])[1] //下班分钟
          time += commuter2H - commuter1H
          let a = (commuter1M / 60).toFixed(2)
          let b = (commuter2M / 60).toFixed(2)
          time -= b - a
          if (this.form.commuter2 && this.form.radio == '2') {
            let commuterB1H = timeSplit(this.form.commuter2[0])[0] //上班小时
            let commuterB1M = timeSplit(this.form.commuter2[0])[1] //上班分钟
            let commuterB2H = timeSplit(this.form.commuter2[1])[0] //下班小时
            let commuterB2M = timeSplit(this.form.commuter2[1])[1] //下班分钟
            time += commuterB2H - commuterB1H
            let a2 = (commuterB1M / 60).toFixed(2)
            let b2 = (commuterB2M / 60).toFixed(2)
            time -= b2 - a2
          }
          if (this.form.rest && this.form.radio == '1') {
            let rest1H = timeSplit(this.form.rest[0])[0] //休息小时
            let rest1M = timeSplit(this.form.rest[0])[1] //休息分钟
            let rest2H = timeSplit(this.form.rest[1])[0] //休息结束小时
            let rest2M = timeSplit(this.form.rest[1])[1] //休息结束分钟
            time -= rest2H - rest1H
            let a3 = (rest1M / 60).toFixed(2)
            let b3 = (rest2M / 60).toFixed(2)
            time -= b3 - a3
          }
          time = time.toFixed(1)
          if (String(time).split('.')[1] == 0) {
            time = String(time).split('.')[0]
          }

          return time
        } else {
          // 夜班出勤时长
          if (
            !this.form.clockIn1 ||
            !this.form.clockIn2 ||
            !this.form.repose1 ||
            !this.form.repose2
          ) {
            return ''
          }

          let commuter1H = timeSplit(this.form.clockIn1)[0] //上班小时
          let commuter1M = timeSplit(this.form.clockIn1)[1] //上班分钟
          let commuter2H = timeSplit(this.form.clockIn2)[0] //下班小时
          let commuter2M = timeSplit(this.form.clockIn2)[1] //下班分钟
          let rest1H = timeSplit(this.form.repose1)[0] //休息小时
          let rest1M = timeSplit(this.form.repose1)[1] //休息分钟
          let rest2H = timeSplit(this.form.repose2)[0] //休息结束小时
          let rest2M = timeSplit(this.form.repose2)[1] //休息结束分钟
          let time = 0
          time += 24 - commuter1H + commuter2H
          if (rest1H > 12 && rest2H < 12) {
            time -= 24 - rest1H + rest2H
          } else if (rest1H > 12 && rest2H > 12) {
            time -= rest2H - rest1H
          } else if (rest1H < 12 && rest2H < 12) {
            time -= rest2H - rest1H
          }
          time += (commuter2M / 60).toFixed(2) - (commuter1M / 60).toFixed(2)
          time -= (rest2M / 60).toFixed(2) - (rest1M / 60).toFixed(2)

          time = time.toFixed(1)
          if (String(time).split('.')[1] == 0) {
            time = String(time).split('.')[0]
          }

          return time
        }
      },
      //夜班休息时间范围
      repose1_SR() {
        if (!this.form.IsAcrossNight) {
          return
        }
        if (!this.form.clockIn1 && !this.form.clockIn2) {
          return '00:00:00-23:59:00'
        } else if (!this.form.clockIn1 && this.form.clockIn2) {
          return ['12:00:00-23:59:00', '00:00:00-' + this.form.clockIn2 + ':00']
        } else if (this.form.clockIn1 && !this.form.clockIn2) {
          return [this.form.clockIn1 + ':00' + '-23:59:00', '00:00:00-12:00:00']
        } else {
          return [
            this.form.clockIn1 + ':00' + '-23:59:00',
            '00:00:00-' + this.form.clockIn2 + ':00',
          ]
        }
      },
      //夜班休息时间范围
      repose2_SR() {
        if (!this.form.IsAcrossNight) {
          return
        }
        if (!this.form.repose1) {
          if (!this.form.clockIn1 && !this.form.clockIn2) {
            return '00:00:00-23:59:00'
          } else if (!this.form.clockIn1 && this.form.clockIn2) {
            return [
              '12:00:00-23:59:00',
              '00:00:00-' + this.form.clockIn2 + ':00',
            ]
          } else if (this.form.clockIn1 && !this.form.clockIn2) {
            return [
              this.form.clockIn1 + ':00' + '-23:59:00',
              '00:00:00-12:00:00',
            ]
          } else {
            return [
              this.form.clockIn1 + ':00' + '-23:59:00',
              '00:00:00-' + this.form.clockIn2 + ':00',
            ]
          }
        }
        if (timeSplit(this.form.repose1)[0] > 12) {
          return [
            this.form.repose1 + ':00' + '-23:59:00',
            '00:00:00-' + this.form.clockIn2 + ':00',
          ]
        } else {
          return [this.form.repose1 + ':00-' + this.form.clockIn2 + ':00']
        }
      },
      //夜班上班有效打卡开始时间范围
      CIARange1SR() {
        if (!this.form.IsAcrossNight || !this.form.clockIn1) {
          return '12:00:00-23:59:00'
        }
        let start = timeSplit(this.form.clockIn1)[0] - 5
        start = start < 10 ? '0' + start : start

        return (
          start +
          ':' +
          this.form.clockIn1.split(':')[1] +
          ':00-' +
          this.form.clockIn1 +
          ':00'
        )
      },
      //夜班上班有效打卡结束时间范围
      CIARange2SR() {
        if (!this.form.IsAcrossNight || !this.form.clockIn1) {
          return '12:00:00-23:59:00'
        }
        let time = ''
        let end = timeSplit(this.form.clockIn1)[0] + 2
        if (end >= 24) {
          time = this.form.clockIn1 + ':00-23:59:00'
        } else {
          time =
            this.form.clockIn1 +
            ':00-' +
            end +
            ':' +
            this.form.clockIn1.split(':')[1] +
            ':00'
        }
        return time
      },
      //夜班下班有效打卡开始时间范围
      CIBRange1SR() {
        if (!this.form.IsAcrossNight || !this.form.clockIn2) {
          return '00:00:00-12:00:00'
        }
        let start = timeSplit(this.form.clockIn2)[0] - 2
        if (start < 0) {
          return '00:00:00-' + this.form.clockIn2 + ':00'
        } else {
          start = start < 10 ? '0' + start : start
          return (
            start +
            ':' +
            this.form.clockIn2.split(':')[1] +
            ':00-' +
            this.form.clockIn2 +
            ':00'
          )
        }
      },
      //夜班下班有效打卡结束时间范围
      CIBRange2SR() {
        if (!this.form.IsAcrossNight || !this.form.clockIn2) {
          return '00:00:00-12:00:00'
        }
        let end = timeSplit(this.form.clockIn2)[0] + 5
        end = end < 10 ? '0' + end : end

        return (
          this.form.clockIn2 +
          ':00-' +
          end +
          ':' +
          this.form.clockIn2.split(':')[1] +
          ':00'
        )
      },
    },
    watch: {
      'form.commuter'(val, old) {
        this.form.commuter = val
      },
      'form.rest'(val, old) {
        this.form.rest = val
      },
      timeLong(val, old) {
        this.form.time = val
      },
      'form.punchCard1'(val) {
        if (val) {
          this.isShow = true
        }
      },
      'form.punchCard2'(val) {
        if (val) {
          this.isShow = true
        }
      },
      'form.clockIn1'(val) {
        if (!this.form.IsAcrossNight || !val) {
          return
        }
        this.form.clockIn1 = val
        //判断休息时间是否在有效时间之内
        if (this.form.repose1 && timeSplit(this.form.repose1)[0] > 12) {
          if (timeReplace(val) > timeReplace(this.form.repose1)) {
            this.form.repose1 = ''
            this.form.repose2 = ''
          }
        }
        // 判断打卡有效区间开始结束时间是否在有效时间范围之内
        if (this.form.CIARange1) {
          if (
            timeReplace(this.form.CIARange1) > timeReplace(val) ||
            timeSplit(val)[0] - timeSplit(this.form.CIARange1)[0] > 5
          ) {
            this.form.CIARange1 = ''
          }
        }
        if (this.form.CIARange2) {
          if (
            timeReplace(this.form.CIARange2) < timeReplace(val) ||
            timeSplit(this.form.CIARange2)[0] - timeSplit(val)[0] > 2
          ) {
            this.form.CIARange2 = ''
          }
        }
      },
      'form.clockIn2'(val) {
        if (!this.form.IsAcrossNight || !val) {
          return
        }
        this.form.clockIn2 = val
        //判断休息时间是否在有效时间之内
        if (this.form.repose1 && Number(this.form.repose1.split(':')[0] < 12)) {
          if (timeReplace(val) < timeReplace(this.form.repose1)) {
            this.form.repose1 = ''
            this.form.repose2 = ''
          }
        }
        if (timeReplace(val) < timeReplace(this.form.repose2)) {
          this.form.repose2 = ''
        }

        // 判断打卡有效区间开始结束时间是否在有效时间范围之内
        if (this.form.CIBRange1) {
          if (
            timeReplace(this.form.CIBRange1) > timeReplace(val) ||
            timeSplit(val)[0] - timeSplit(this.form.CIBRange1)[0] > 2
          ) {
            this.form.CIBRange1 = ''
          }
        }
        if (this.form.CIBRange2) {
          if (
            timeReplace(this.form.CIBRange2) < timeReplace(val) ||
            timeSplit(this.form.CIBRange2)[0] - timeSplit(val)[0] > 5
          ) {
            this.form.CIBRange2 = ''
          }
        }
      },
      'form.repose1'(val) {
        if (!this.form.IsAcrossNight || !val) {
          return
        }
        this.form.repose1 = val
        if (
          timeSplit(this.form.repose1)[0] < 12 ||
          timeSplit(this.form.repose2)[0] > 12
        ) {
          if (
            timeReplace(this.form.repose2) - timeReplace(this.form.repose1) <
            0
          ) {
            this.form.repose2 = ''
          }
        }
      },
    },
    created() {
      this.init()
    },
    mounted() {
      let firstLogin = JSON.parse(localStorage.getItem('firstLogin'))
      if (firstLogin) {
        this.setGuide()
      }
    },
    methods: {
      setGuide() {
        try {
          let data = [
            {
              element: '.btn_guide_c',
              intro: this.$t('operation_tips.tips_77'),
              position: 'bottom',
            },
            {
              element: '.el-menu li:nth-child(4)>ul li:nth-child(2)',
              intro: this.$t('operation_tips.tips_78'),
              position: 'right',
            },
          ]
          this.$intro()
            .setOptions({
              prevLabel: this.$t('operation_tips.tips_66'),
              nextLabel: this.$t('operation_tips.tips_67'),
              skipLabel: '',
              doneLabel: this.$t('operation_tips.tips_68'),
              steps: data,
              exitOnOverlayClick: false, //是否允许点击空白处退出
              overlayOpacity: 0.6, //遮罩层的透明度
              showBullets: false, //是否使用点点点显示进度
              showProgress: false, //是否显示进度条
            })
            .onchange((obj) => {
              //已完成当前一步
              console.log('已完成当前一步', obj)
            })
            .oncomplete(() => {
              //点击结束按钮后执行的事件
              console.log('结束')
              this.$router.push('/attendanceSet/group')
            })
            .onexit(() => {
              //点击跳过按钮后执行的事件
              console.log('跳过')
            })
            .start()
        } catch {
          //路由跳转过来无法调起引导，使用刷新页面调起引导
          location.reload()
        }
      },
      init() {
        this.listLoading = true
        let list = getshiftlist()
        this.list = list
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
          let res = delClasses(row.id)
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
          }
          this.init()
        })
      },
      //监控班次类型改变修改时段数
      changeShift(e) {
        this.form.radio = '1'

        this.form.commuter2 = ''
        this.form.punchCardB1 = ''
        this.form.punchCardB2 = ''
      },
      //时段数
      radioChange(e) {
        if (e == '1') {
          this.form.punchCardB1 = ''
          this.form.punchCardB2 = ''
          // this.form.commuter2 = ''
          this.$set(this.form, 'commuter2', '')
        } else if (e == '2') {
          let h = timeSplit(this.form.commuter[1])[0] + 1
          h = h < 10 ? '0' + h : h
          if (h >= 24) {
            h = 23
          }
          let H = h + ':' + this.form.commuter[1].split(':')[1]
          // this.form.commuter2 = [H, '23:00']
          this.$set(this.form, 'commuter2', [H, '23:00'])

          this.form.punchCard1 = ''
          this.form.punchCard2 = ''
          this.form.punchCardB1 = ''
          this.form.punchCardB2 = ''
        }
      },
      //监控时段二的时间范围
      commuterBChange(val) {
        if (!val) {
          this.form.commuter2 = ''
          return
        }
        if (timeReplace(val[0]) < timeReplace(this.form.commuter[1])) {
          this.$baseMessage(this.$t('attendanceSet.text_84'), 'warning', 4)
          let h = timeSplit(this.form.commuter[1])[0] + 1
          h = h < 10 ? '0' + h : h
          if (h >= 24) {
            h = 23
          }
          let H = h + ':' + this.form.commuter[1].split(':')[1]
          // this.form.commuter2 = [H, '23:00']
          this.$set(this.form, 'commuter2', [H, '23:00'])
        }

        this.form.punchCard1 = ''
        this.form.punchCard2 = ''
        this.form.punchCardB1 = ''
        this.form.punchCardB2 = ''
      },
      //监控时段一的时间范围
      commuter1Change(val) {
        if (!val) {
          this.form.commuter = ''
          return
        }
        if (this.form.radio == '2') {
          if (timeReplace(val[1]) > timeReplace(this.form.commuter2[0])) {
            // this.form.commuter2 = [val[0], this.form.commuter2[0]]
            this.$set(this.form, 'commuter2', [val[0], this.form.commuter2[0]])
          }
          this.form.punchCard1 = ''
          this.form.punchCard2 = ''
          this.form.punchCardB1 = ''
          this.form.punchCardB2 = ''
        }
      },
      //显示上下班有效打卡时间
      setShow() {
        this.isShow = !this.isShow
      },
      //监控休息时间范围
      restChange(val) {
        if (timeReplace(val[0]) < timeReplace(this.form.commuter[0])) {
          this.$baseMessage(this.$t('attendanceSet.text_75'), 'warning')
          this.form.rest = [this.form.commuter[0], val[1]]
          return
        }
        if (timeReplace(val[0]) > timeReplace(this.form.commuter[1])) {
          this.$baseMessage(this.$t('attendanceSet.text_76'), 'warning')
          this.form.rest = ['12:00', this.form.commuter[1]]
          return
        }
        if (timeReplace(val[1]) > timeReplace(this.form.commuter[1])) {
          this.$baseMessage(this.$t('attendanceSet.text_77'), 'warning')
          this.form.rest = [val[0], this.form.commuter[1]]
          return
        }
      },
      //监控白班时段1上班有效打卡时间范围
      punchCard1Change(val) {
        if (!val) {
          this.form.punchCard1 = ''
          return
        }
        // this.form.commuter[0]--时段1上班时间
        // this.form.commuter[1]--时段1下班时间
        // val[0]--上班有效期开始时间
        // val[1]--上班有效期结束时间
        let isFind = false
        if (timeReplace(val[0]) > timeReplace(this.form.commuter[0])) {
          this.$baseMessage(this.$t('attendanceSet.text_79'), 'warning')
          this.form.punchCard1 = ['00:00', val[1]]
          isFind = true
        }
        if (
          timeReplace(val[1]) > timeReplace(this.form.commuter[1]) ||
          timeReplace(val[1]) < timeReplace(this.form.commuter[0])
        ) {
          this.$baseMessage(this.$t('attendanceSet.text_78'), 'warning', 5)
          if (isFind) {
            this.form.punchCard1 = [
              this.form.punchCard1[0],
              this.form.commuter[1],
            ]
          } else {
            this.form.punchCard1 = [val[0], this.form.commuter[1]]
          }
        }
        //预防上下班有效打卡时间重叠
        if (this.form.punchCard2) {
          if (
            timeReplace(this.form.punchCard1[1]) >
            timeReplace(this.form.punchCard2[0])
          ) {
            this.form.punchCard1 = [
              this.form.punchCard1[0],
              this.form.punchCard2[0],
            ]
          }
        }
      },
      //监控白班时段1下班有效打卡时间范围
      punchCard2Change(val) {
        if (!val) {
          this.form.punchCard2 = ''
          return
        }
        // this.form.commuter[0]--时段1上班时间
        // this.form.commuter[1]--时段1下班时间
        // this.form.commuter2[0]--时段2上班时间
        // this.form.commuter2[1]--时段2下班时间
        // val[0]--下班有效期开始时间
        // val[1]--下班有效期结束时间
        if (this.form.radio == '1') {
          let isFind = false
          if (
            timeReplace(val[0]) < timeReplace(this.form.commuter[0]) ||
            timeReplace(val[0]) > timeReplace(this.form.commuter[1])
          ) {
            this.$baseMessage(this.$t('attendanceSet.text_80'), 'warning', 4)
            this.form.punchCard2 = [this.form.commuter[0], val[1]]
            isFind = true
          }
          if (timeReplace(val[1]) < timeReplace(this.form.commuter[1])) {
            this.$baseMessage(this.$t('attendanceSet.text_81'), 'warning', 5)
            if (isFind) {
              this.form.punchCard2 = [this.form.punchCard2[0], '23:59']
            } else {
              this.form.punchCard2 = [val[0], '23:59']
            }
          }
        } else if (this.form.radio == '2') {
          let isFind = false
          if (
            timeReplace(val[0]) < timeReplace(this.form.commuter[0]) ||
            timeReplace(val[0]) > timeReplace(this.form.commuter[1])
          ) {
            this.$baseMessage(this.$t('attendanceSet.text_80'), 'warning', 4)
            this.form.punchCard2 = [this.form.commuter[0], val[1]]
            isFind = true
          }
          if (
            timeReplace(val[1]) < timeReplace(this.form.commuter[1]) ||
            timeReplace(val[1]) > timeReplace(this.form.commuter2[0])
          ) {
            this.$baseMessage(this.$t('attendanceSet.text_83'), 'warning', 5)
            if (isFind) {
              this.form.punchCard2 = [
                this.form.punchCard2[0],
                this.form.commuter2[0],
              ]
            } else {
              this.form.punchCard2 = [val[0], this.form.commuter2[0]]
            }
          }
        }
        //预防上下班有效打卡时间重叠
        if (this.form.punchCard1) {
          if (
            timeReplace(this.form.punchCard2[0]) <
            timeReplace(this.form.punchCard1[1])
          ) {
            this.form.punchCard2 = [
              this.form.punchCard1[1],
              this.form.punchCard2[1],
            ]
          }
        }
      },
      //监控白班时段2上班有效打卡时间范围
      punchCardB1Change(val) {
        if (!val) {
          this.form.punchCardB1 = ''
          return
        }
        // this.form.commuter[0]--时段1上班时间
        // this.form.commuter[1]--时段1下班时间
        // this.form.commuter2[0]--时段2上班时间
        // this.form.commuter2[1]--时段2下班时间
        // val[0]--上班有效期开始时间
        // val[1]--上班有效期结束时间
        let isFind = false
        if (
          timeReplace(val[0]) < timeReplace(this.form.commuter[1]) ||
          timeReplace(val[0]) > timeReplace(this.form.commuter2[0])
        ) {
          this.$baseMessage(this.$t('attendanceSet.text_85'), 'warning', 5)
          this.form.punchCardB1 = [this.form.commuter[1], val[1]]
          isFind = true
        }
        if (
          timeReplace(val[1]) > timeReplace(this.form.commuter2[1]) ||
          timeReplace(val[1]) < timeReplace(this.form.commuter2[0])
        ) {
          this.$baseMessage(this.$t('attendanceSet.text_86'), 'warning', 5)
          if (isFind) {
            this.form.punchCardB1 = [
              this.form.punchCardB1[0],
              this.form.commuter2[1],
            ]
          } else {
            this.form.punchCardB1 = [val[0], this.form.commuter2[1]]
          }
        }
        //预防上下班有效打卡时间重叠
        if (this.form.punchCardB2) {
          if (
            timeReplace(this.form.punchCardB1[1]) >
            timeReplace(this.form.punchCardB2[0])
          ) {
            this.form.punchCardB1 = [
              this.form.punchCardB1[0],
              this.form.punchCardB2[0],
            ]
          }
        }
      },
      //监控白班时段2下班有效打卡时间范围
      punchCardB2Change(val) {
        if (!val) {
          this.form.punchCardB2 = ''
          return
        }
        // this.form.commuter[0]--时段1上班时间
        // this.form.commuter[1]--时段1下班时间
        // this.form.commuter2[0]--时段2上班时间
        // this.form.commuter2[1]--时段2下班时间
        // val[0]--下班有效期开始时间
        // val[1]--下班有效期结束时间
        let isFind = false
        if (
          timeReplace(val[0]) < timeReplace(this.form.commuter2[0]) ||
          timeReplace(val[0]) > timeReplace(this.form.commuter2[1])
        ) {
          this.$baseMessage(this.$t('attendanceSet.text_88'), 'warning', 5)
          this.form.punchCardB2 = [this.form.commuter2[0], val[1]]
          isFind = true
        }
        if (timeReplace(val[1]) < timeReplace(this.form.commuter2[1])) {
          this.$baseMessage(this.$t('attendanceSet.text_81'), 'warning', 4)
          if (isFind) {
            this.form.punchCardB2 = [this.form.punchCardB2[0], '23:59']
          } else {
            this.form.punchCardB2 = [val[0], '23:59']
          }
        }
        //预防上下班有效打卡时间重叠
        if (this.form.punchCardB1) {
          if (
            timeReplace(this.form.punchCardB1[1]) >
            timeReplace(this.form.punchCardB2[0])
          ) {
            this.form.punchCardB2 = [
              this.form.punchCardB1[1],
              this.form.punchCardB2[1],
            ]
          }
        }
      },
      // 设置有效打卡范围
      effectiveClock(property) {
        let time = this.form.commuter
        let time2 = this.form.commuter2
        if (property == 'punchCard1') {
          //白班时段一上班打卡有效期
          let h = timeSplit(time[0])[0]
          let h1 = h - 5
          h1 = h1 <= 0 ? 0 : h1
          h1 = h1 < 10 ? '0' + h1 : h1
          let h2 = h + 2
          h2 = h2 < 10 ? '0' + h2 : h2
          if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 4) {
            h2 = h + 1
          } else if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 2) {
            h2 = time[0].split(':')[0]
          }
          let start = h1 + ':' + time[0].split(':')[1]
          let end = h2 + ':' + time[0].split(':')[1]
          this.form.punchCard1 = [start, end]
          return
        }
        if (this.form.radio == '1') {
          if (property == 'punchCard2') {
            //白班时段一下班打卡有效期
            let h = timeSplit(time[1])[0]
            let h1 = h - 2
            h1 = h1 < 10 ? '0' + h1 : h1
            let h2 = h + 5
            h2 = h2 < 10 ? '0' + h2 : h2
            h2 = h2 >= 23 ? '23' : h2
            if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 4) {
              h1 = h - 1
            } else if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 2) {
              h1 = time[1].split(':')[0]
            }
            let start = h1 + ':' + time[1].split(':')[1]
            let end = h2 + ':' + time[1].split(':')[1]
            this.form.punchCard2 = [start, end]
          }
        } else if (this.form.radio == '2') {
          if (property == 'punchCard2') {
            //白班时段一下班打卡有效期
            let h = timeSplit(time[1])[0]
            let h1 = h - 2
            h1 = h1 < 10 ? '0' + h1 : h1
            if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 4) {
              h1 = h - 1
            } else if (timeSplit(time[1])[0] - timeSplit(time[0])[0] <= 2) {
              h1 = time[1].split(':')[0]
            }
            let h2 = h
            if (timeSplit(time2[0])[0] - timeSplit(time[1])[0] > 1) {
              h2 = h + 1
            }
            h2 = h2 < 10 ? '0' + h2 : h2
            h2 = h2 >= 23 ? '23' : h2
            let start = h1 + ':' + time[1].split(':')[1]
            let end = h2 + ':' + time[1].split(':')[1]
            this.form.punchCard2 = [start, end]
          } else if (property == 'punchCardB1') {
            //白班时段二上班打卡有效期
            let h = timeSplit(time2[0])[0]
            let h1 = h - 2
            if (timeSplit(time2[0])[0] - timeSplit(time[1])[0] <= 2) {
              h1 = h - 1
            }
            h1 = h1 < 10 ? '0' + h1 : h1
            let h2 = h + 2
            if (timeSplit(time2[1])[0] - timeSplit(time2[0])[0] <= 2) {
              h2 = h + 1
            }
            h2 = h2 < 10 ? '0' + h2 : h2
            let start = h1 + ':' + time2[0].split(':')[1]
            let end = h2 + ':' + time2[0].split(':')[1]
            this.form.punchCardB1 = [start, end]
          } else if (property == 'punchCardB2') {
            //白班时段二下班打卡有效期
            let h = timeSplit(time2[1])[0]
            let h1 = h - 2
            h1 = h1 < 10 ? '0' + h1 : h1
            if (timeSplit(time2[1])[0] - timeSplit(time2[0])[0] <= 4) {
              h1 = h - 1
            } else if (timeSplit(time2[1])[0] - timeSplit(time2[0])[0] <= 2) {
              h1 = time2[1].split(':')[0]
            }
            let h2 = h + 5
            h2 = h2 < 10 ? '0' + h2 : h2
            h2 = h2 >= 23 ? '23' : h2
            let start = h1 + ':' + time2[1].split(':')[1]
            let end = h2 + ':' + time2[1].split(':')[1]
            this.form.punchCardB2 = [start, end]
            return
          }
        }
      },
      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        this.isShow = false
        if (data.id) {
          console.log('选中参数', data)
          this.form = {
            id: data.id,
            IsAcrossNight:
              data.IsAcrossNight && data.IsAcrossNight == 'true' ? true : false,
            name: data.name,
            radio: data.gotowork2.replace(' ', '') ? '2' : '1',
            commuter: [
              data.gotowork1.split('-')[0],
              data.gotowork1.split('-')[1],
            ],
            commuter2: [
              data.gotowork2.split('-')[0],
              data.gotowork2.split('-')[1],
            ],
            rest: data.rest_time
              ? [data.rest_time.split('-')[0], data.rest_time.split('-')[1]]
              : '',
            clockIn1: data.gotowork1.split('-')[0],
            clockIn2: data.gotowork1.split('-')[1],
            repose1: data.rest_time.split('-')[0],
            repose2: data.rest_time.split('-')[1],
            time: data.Duration,
            punchCard1: data.EffectiveTime
              ? [
                  data.EffectiveTime.split(',')[0].split('-')[0],
                  data.EffectiveTime.split(',')[0].split('-')[1],
                ]
              : '',
            punchCard2: data.EffectiveTime
              ? [
                  data.EffectiveTime.split(',')[1].split('-')[0],
                  data.EffectiveTime.split(',')[1].split('-')[1],
                ]
              : '',
            punchCardB1: data.EffectiveTime2
              ? [
                  data.EffectiveTime2.split(',')[0].split('-')[0],
                  data.EffectiveTime2.split(',')[0].split('-')[1],
                ]
              : '',
            punchCardB2: data.EffectiveTime2
              ? [
                  data.EffectiveTime2.split(',')[1].split('-')[0],
                  data.EffectiveTime2.split(',')[1].split('-')[1],
                ]
              : '',
            CIARange1: data.EffectiveTime.split(',')[0].split('-')[0],
            CIARange2: data.EffectiveTime.split(',')[0].split('-')[1],
            CIBRange1: data.EffectiveTime.split(',')[1].split('-')[0],
            CIBRange2: data.EffectiveTime.split(',')[1].split('-')[1],
          }
          // console.log(this.form)
        }
      },
      //提交信息
      setFormData(formName) {
        if (!this.form.clockIn1 && this.form.IsAcrossNight) {
          this.$baseMessage(this.$t('attendanceSet.text_70'), 'warning')
          return
        }
        if (!this.form.clockIn2 && this.form.IsAcrossNight) {
          this.$baseMessage(this.$t('attendanceSet.text_71'), 'warning')
          return
        }
        if (!this.form.repose1 && this.form.IsAcrossNight) {
          this.$baseMessage(this.$t('attendanceSet.text_27'), 'warning')
          return
        }
        if (!this.form.repose2 && this.form.IsAcrossNight) {
          this.$baseMessage(this.$t('attendanceSet.text_27'), 'warning')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.punchCard1 == '') {
              this.effectiveClock('punchCard1')
            }
            if (this.form.punchCard2 == '') {
              this.effectiveClock('punchCard2')
            }
            if (this.form.punchCardB1 == '') {
              this.effectiveClock('punchCardB1')
            }
            if (this.form.punchCardB2 == '') {
              this.effectiveClock('punchCardB2')
            }
            if (this.form.IsAcrossNight && this.form.CIARange1 == '') {
              this.form.CIARange1 =
                this.CIARange1SR.split(':')[0] +
                ':' +
                this.CIARange1SR.split(':')[1]
            }
            if (this.form.IsAcrossNight && this.form.CIARange2 == '') {
              this.form.CIARange2 =
                this.CIARange2SR.split('-')[1].split(':')[0] +
                ':' +
                this.CIARange2SR.split('-')[1].split(':')[1]
            }
            if (this.form.IsAcrossNight && this.form.CIBRange1 == '') {
              this.form.CIBRange1 =
                this.CIBRange1SR.split(':')[0] +
                ':' +
                this.CIBRange1SR.split(':')[1]
            }
            if (this.form.IsAcrossNight && this.form.CIBRange2 == '') {
              this.form.CIBRange2 =
                this.CIBRange2SR.split('-')[1].split(':')[0] +
                ':' +
                this.CIBRange2SR.split('-')[1].split(':')[1]
            }
            console.log(this.form)
            let res = setClasses(this.form)
            if (this.form.id) {
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_10'), 'success')
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_11'), 'warning')
              }
            } else {
              if (res.result == 2) {
                this.$baseMessage(this.$t('operation_tips.tips_26'), 'success')
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_27'), 'warning')
              }
            }
            this.closeFn()
            this.init()
          } else {
            return false
          }
        })
      },
      // 关闭弹窗
      closeFn(done) {
        if (done && typeof done == 'function') {
          done()
        } else {
          this.dialogFormVisible = false
        }
        this.form = {
          IsAcrossNight: false,
          name: '',
          radio: '1',
          commuter: ['09:00', '18:00'],
          rest: ['12:00', '13:00'],
          clockIn1: '20:00',
          clockIn2: '08:00',
          repose1: '00:00',
          repose2: '01:00',
          time: '',
          punchCard1: '',
          punchCard2: '',
          CIARange1: '',
          CIARange2: '',
          CIBRange1: '',
          CIBRange2: '',
        }
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
  .el-dialog__body {
    padding: 20px;
  }
  .el-form {
    padding: 0 !important;
  }
  .set_btn {
    color: blueviolet;
    font-size: 16px;
    cursor: pointer;
    margin: 0 10px 20px;
    display: flex;
    align-items: center;
  }
  .set_btn i {
    font-size: 24px;
    margin-left: 5px;
  }
  .el-dialog {
    margin-top: 10vh !important;
  }

  .el-dialog *::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
  .el-dialog *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }
  .el-dialog *::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .el-dialog *::-webkit-scrollbar-track:hover {
    background-color: #f8fafc;
  }
</style>
