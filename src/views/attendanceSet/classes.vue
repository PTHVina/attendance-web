<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <!-- 新增 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
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
      height="790"
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
      <!-- 工作时段二
        <el-table-column
        show-overflow-tooltip
        :label="$t('attendanceSet.text_6')"
        prop="gotowork2"
      ></el-table-column>
      工作时段三
      <el-table-column
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
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formData"
        :model="form"
        :label-width="
          lang == 'zh_CN' ? '130px' : lang == 'Jan_JPN' ? '140px' : '210px'
        "
        :rules="rules"
        size="medium"
      >
        <!-- 班次 -->
        <el-form-item :label="$t('attendanceSet.text_3')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('attendanceSet.text_3')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 时段数 -->
        <el-form-item :label="$t('attendanceSet.text_12')">
          <el-radio v-model="form.radio" label="1" border>
            {{ $t('attendanceSet.text_13') }}
          </el-radio>
          <el-radio v-if="false" v-model="form.radio" label="2" border>
            {{ $t('attendanceSet.text_14') }}
          </el-radio>
          <el-radio v-if="false" v-model="form.radio" label="3" border>
            {{ $t('attendanceSet.text_15') }}
          </el-radio>
        </el-form-item>
        <!-- 上下班时间段 -->
        <el-form-item :label="$t('attendanceSet.text_16')" prop="commuter">
          <el-time-picker
            v-model="form.commuter"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <!-- 休息时间段 -->
        <el-form-item :label="$t('attendanceSet.text_8')" prop="rest">
          <el-time-picker
            v-model="form.rest"
            is-range
            :range-separator="$t('attendanceSet.text_17')"
            value-format="HH:mm"
            format="HH:mm"
            :start-placeholder="$t('attendanceSet.text_18')"
            :end-placeholder="$t('attendanceSet.text_19')"
            :placeholder="$t('attendanceSet.text_20')"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <!-- 出勤时长 -->
        <el-form-item :label="$t('attendanceSet.text_21')">
          <el-tag size="medium">
            {{ timeLong }}{{ $t('attendanceSet.text_22') }}
          </el-tag>
        </el-form-item>
        <div class="set_btn el-icon-thumb" @click="setShow">
          &nbsp;{{ $t('attendanceSet.text_28') }}
        </div>
        <!-- 上班有效打卡区间 -->
        <el-form-item v-if="isShow" :label="$t('attendanceSet.text_23')">
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
          ></el-time-picker>
        </el-form-item>
        <!-- 下班有效打卡区间 -->
        <el-form-item v-if="isShow" :label="$t('attendanceSet.text_24')">
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
          ></el-time-picker>
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
          name: '',
          radio: '1',
          commuter: ['09:00', '18:00'],
          rest: ['12:00', '13:00'],
          time: '',
          punchCard1: '',
          punchCard2: '',
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
          rest: [
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
        if (!this.form.commuter || !this.form.rest) {
          return ''
        }
        if (this.form.commuter.length != 2 || this.form.rest.length != 2) {
          return ''
        }
        let commuter1H = this.form.commuter[0].split(':')[0] - 0 //9-上班小时
        let commuter1M = this.form.commuter[0].split(':')[1] - 0 //00-上班分钟
        let commuter2H = this.form.commuter[1].split(':')[0] - 0 //18-下班小时
        let commuter2M = this.form.commuter[1].split(':')[1] - 0 //00-下班分钟
        let rest1H = this.form.rest[0].split(':')[0] - 0 //12-休息小时
        let rest1M = this.form.rest[0].split(':')[1] - 0 //00-休息分钟
        let rest2H = this.form.rest[1].split(':')[0] - 0 //13-休息结束小时
        let rest2M = this.form.rest[1].split(':')[1] - 0 //00-休息结束分钟
        let time = 0
        time += rest1H - commuter1H
        if (commuter1M > 0 || rest1M > 0) {
          let a = (commuter1M / 60).toFixed(2)
          let b = (rest1M / 60).toFixed(2)
          let c = b - a
          time += c
        }
        time += commuter2H - rest2H
        if (commuter2M > 0 || rest2M > 0) {
          let a = (commuter2M / 60).toFixed(2)
          let b = (rest2M / 60).toFixed(2)
          let c = a - b
          time += c
        }
        time = time.toFixed(1)
        if (String(time).split('.')[1] == 0) {
          time = String(time).split('.')[0]
        }

        return time
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
    },
    created() {
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
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
      setShow() {
        this.isShow = !this.isShow
      },
      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        this.isShow = false
        if (data.id) {
          // console.log('选中参数', data)
          this.form = {
            id: data.id,
            name: data.name,
            radio: '1',
            commuter: [
              data.gotowork1.split('-')[0],
              data.gotowork1.split('-')[1],
            ],
            rest: [data.rest_time.split('-')[0], data.rest_time.split('-')[1]],
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
          }
          // console.log(this.form)
        }
      },
      //提交信息
      setFormData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.punchCard1 == '') {
              this.form.punchCard1 = ['00:01', '11:00']
            }
            if (this.form.punchCard2 == '') {
              this.form.punchCard2 = ['16:00', '23:59']
            }
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
          name: '',
          radio: '1',
          commuter: ['09:00', '18:00'],
          rest: ['12:00', '13:00'],
          time: '',
          punchCard1: '',
          punchCard2: '',
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
    display: inline-block;
    color: blueviolet;
    font-size: 16px;
    cursor: pointer;
    margin: 0 10px 20px;
  }
</style>
