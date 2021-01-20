<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          新增
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="publish_time"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="班次名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="班次时长"
        prop="Duration"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="工作时段一"
        prop="gotowork1"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        label="工作时段二"
        prop="gotowork2"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="工作时段三"
        prop="gooffwork3"
      ></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="休息时间段"
        prop="rest_time"
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改弹窗 -->
    <el-dialog
      title="班次信息"
      :visible.sync="dialogFormVisible"
      width="600px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formData"
        :model="form"
        label-width="130px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="班次" prop="name">
          <el-input
            v-model="form.name"
            placeholder="班次名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="时段数">
          <el-radio v-model="form.radio" label="1" border>时段一</el-radio>
          <el-radio v-if="false" v-model="form.radio" label="2" border>
            时段二
          </el-radio>
          <el-radio v-if="false" v-model="form.radio" label="3" border>
            时段三
          </el-radio>
        </el-form-item>
        <el-form-item label="上下班时间段" prop="commuter">
          <el-time-picker
            is-range
            v-model="form.commuter"
            range-separator="至"
            value-format="HH:mm"
            format="HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息时间段" prop="rest">
          <el-time-picker
            is-range
            v-model="form.rest"
            range-separator="至"
            value-format="HH:mm"
            format="HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="出勤时长">
          <el-tag size="medium">{{ timeLong }}小时</el-tag>
        </el-form-item>
        <el-form-item label="上班有效打卡区间">
          <el-time-picker
            is-range
            v-model="form.punchCard1"
            range-separator="至"
            value-format="HH:mm"
            format="HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="下班有效打卡区间">
          <el-time-picker
            is-range
            v-model="form.punchCard2"
            range-separator="至"
            value-format="HH:mm"
            format="HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="setFormData('formData')">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getshiftlist, delClasses, setClasses } from '@/api/attendanceSet'
  export default {
    name: 'classes',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        elementLoadingText: '正在加载...',
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
            { required: true, message: '请输入班次名称', trigger: 'blur' },
          ],
          commuter: [
            { required: true, message: '请选择上班时间段', trigger: 'blur' },
          ],
          rest: [
            { required: true, message: '请选择休息时间段', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.init()
    },
    watch: {
      'form.commuter'(val, old) {
        this.form.commuter = val
      },
      'form.rest'(val, old) {
        this.form.rest = val
      },
    },
    computed: {
      //计算出勤时长
      timeLong: function () {
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
        this.form.time = time.toFixed(2)
        return time.toFixed(2)
      },
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
        this.$baseConfirm('你确定要删除当前项吗', null, () => {
          let res = delClasses(row.id)
          if (res) {
            this.$baseMessage('删除成功', 'success')
          } else {
            this.$baseMessage('删除失败', 'warning')
          }
          this.init()
        })
      },
      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
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
            punchCard1: [
              data.EffectiveTime
                ? data.EffectiveTime.split(',')[0].split('-')[0]
                : '',
              data.EffectiveTime
                ? data.EffectiveTime.split(',')[0].split('-')[1]
                : '',
            ],
            punchCard2: [
              data.EffectiveTime
                ? data.EffectiveTime.split(',')[1].split('-')[0]
                : '',
              data.EffectiveTime
                ? data.EffectiveTime.split(',')[1].split('-')[1]
                : '',
            ],
          }
        }
      },
      //提交信息
      setFormData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = setClasses(this.form)
            if (this.form.id) {
              if (res.result == 2) {
                this.$baseMessage('修改成功', 'success')
              } else {
                this.$baseMessage('修改失败', 'warning')
              }
            } else {
              if (res.result == 2) {
                this.$baseMessage('保存成功', 'success')
              } else {
                this.$baseMessage('保存失败', 'warning')
              }
            }
            this.dialogFormVisible = false
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
</style>
