<template>
  <div class="table-container">
    <div class="group">
      <div class="form_group">
        <el-form
          ref="queryForm"
          :model="queryForm"
          :inline="true"
          size="medium"
          @submit.native.prevent
        >
          <!-- 姓名 -->
          <el-form-item>
            <span>{{ $t('personnel.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('personnel.pl_1')"
              :style="lang == 'en_US' ? 'width:150px;' : ''"
            />
          </el-form-item>
          <!-- 电话号码 -->
          <el-form-item>
            <span>{{ $t('personnel.text_3') }}</span>
            <el-input
              v-model="queryForm.phone"
              :placeholder="$t('personnel.text_3')"
              :style="lang == 'en_US' ? 'width:150px;' : ''"
            />
          </el-form-item>
          <!-- 授权起始时间 -->
          <el-form-item>
            <span>{{ $t('personnel.text_6') }}</span>
            <el-date-picker
              v-model="queryForm.accreditTime"
              type="datetimerange"
              :range-separator="$t('personnel.text_7')"
              :start-placeholder="$t('personnel.text_8')"
              :end-placeholder="$t('personnel.text_9')"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 330px"
              @change="checkTime"
            ></el-date-picker>
          </el-form-item>
          <!-- 授权结束时间 -->
          <el-form-item>
            <span>{{ $t('personnel.text_15') }}</span>
            <el-date-picker
              v-model="queryForm.accreditTime2"
              type="datetimerange"
              :range-separator="$t('personnel.text_7')"
              :start-placeholder="$t('personnel.text_8')"
              :end-placeholder="$t('personnel.text_9')"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 330px"
              @change="checkTime2"
            ></el-date-picker>
          </el-form-item>
          <!-- 是否下发 -->
          <el-form-item>
            <span>{{ $t('personnel.text_10') }}</span>
            <el-select
              v-model="queryForm.isDown"
              clearable
              :placeholder="$t('personnel.text_11')"
              :style="
                lang == 'zh_CN'
                  ? 'width: 80px'
                  : lang == 'en_US'
                  ? 'width:90px;'
                  : 'width:150px;'
              "
            >
              <el-option
                v-for="item in issueOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-right: -10px !important">
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery('queryForm')"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
            <!-- 重置 -->
            <el-button
              type="info"
              plain
              style="margin-right: 0 !important"
              @click="reset"
            >
              {{ $t('operation_btn.btn_text_18') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <!-- 新增 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog">
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
        <!-- 导出列表 -->
        <!-- <el-button icon="el-icon-upload2" type="primary" @click="downList">
          {{ $t('operation_btn.btn_text_8') }}
        </el-button> -->
        <!-- 批量删除 -->
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="handleDelete"
        >
          {{ $t('operation_btn.btn_text_13') }}
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="650"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <!-- 照片 -->
      <el-table-column show-overflow-tooltip :label="$t('personnel.title_12')">
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.imge"></el-image>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('personnel.text_1')"
      ></el-table-column>
      <!-- 电话号码 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_3')"
        prop="phone"
      ></el-table-column>
      <!-- 授权起始时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_8')"
        prop="staTime"
        sortable
      ></el-table-column>
      <!-- 授权结束时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_9')"
        prop="endTime"
        sortable
      ></el-table-column>
      <!-- 是否下发 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_10')"
        prop="isDown"
        sortable
      >
        <template #default="{ row }">
          <span v-if="row.isDown == 1">{{ $t('personnel.text_12') }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('personnel.title_9')" fixed="right">
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 下发 -->
          <el-button type="text" icon="el-icon-thumb" @click="issue(row)">
            {{ $t('operation_btn.btn_text_15') }}
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
    <el-pagination
      :current-page="page.pageNo"
      :layout="layout"
      :page-size="page.pageSize"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <!-- 人员信息 -->
    <el-dialog
      :title="$t('personnel.text_4')"
      :visible.sync="dialogFormVisible"
      :width="lang == 'en_US' ? '700px' : '600px'"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="form"
        :model="form"
        :label-width="lang == 'en_US' ? '220px' : '120px'"
        :rules="rules"
        size="medium"
      >
        <!-- 姓名 -->
        <el-form-item :label="$t('personnel.text_1')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('personnel.pl_1')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item
          :label="$t('personnel.text_3')"
          :prop="lang == 'zh_CN' ? 'phone' : ''"
        >
          <el-input
            v-model="form.phone"
            :placeholder="$t('personnel.text_3')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 授权时间区间 -->
        <el-form-item :label="$t('personnel.text_13')" prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            :range-separator="$t('personnel.text_7')"
            :start-placeholder="$t('personnel.text_8')"
            :end-placeholder="$t('personnel.text_9')"
            style="width: 100%"
            @change="checkInfoTime"
          ></el-date-picker>
        </el-form-item>
        <!-- 照片 -->
        <el-form-item :label="$t('personnel.title_12')" prop="img">
          <div class="add_img">
            <el-image
              v-if="form.picture"
              class="show_img"
              :src="form.picture"
              :preview-src-list="[form.picture]"
              fit="contain"
            ></el-image>
            <i v-else class="el-icon-picture-outline"></i>
            <div class="add_box">
              <span
                class="uploading"
                :style="lang == 'zh_CN' ? '' : 'font-size:12px !important;'"
                @click="checkImg"
              >
                {{ $t('operation_btn.btn_text_16') }}
              </span>
              <span
                class="photo"
                :style="lang == 'zh_CN' ? '' : 'font-size:12px !important;'"
                @click="photograph"
              >
                {{ $t('operation_btn.btn_text_17') }}
              </span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setInfo('form')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getVisitorCount,
    getVisitorList,
    openImg,
    addVisitor,
    editVisitor,
    delVisitor,
    issueVisitor,
    photograph,
  } from '@/api/personnel'
  export default {
    name: 'Visitor',
    data() {
      return {
        lang: this.$lang,
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        queryForm: {
          name: '',
          phone: '',
          accreditTime: [], //授权时间范围
          accreditTime2: [], //授权时间范围
          startdate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          isDown: '', //是否下发
        }, //搜索表单
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        // 下发option
        issueOption: [
          {
            value: '1',
            label: this.$t('operation_tips.tips_30'),
          },
          {
            value: '0',
            label: this.$t('operation_tips.tips_31'),
          },
        ],
        dialogFormVisible: false, //表单弹窗控制
        selectRows: '', //选中行
        // 新增、编辑
        form: {
          name: '',
          phone: '',
          date: '',
          startTime: '',
          endTime: '',
          img: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: this.$t('operation_tips.tips_32'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 10,
              message: this.$t('operation_tips.tips_2'),
              trigger: 'blur',
            },
          ],
          phone: [
            {
              pattern: /^1[345789]\d{9}$/,
              message: this.$t('operation_tips.tips_3'),
              trigger: 'blur',
            },
          ],
          date: [
            {
              required: true,
              message: this.$t('operation_tips.tips_33'),
              trigger: 'blur',
            },
          ],
          img: [
            {
              required: true,
              message: this.$t('operation_tips.tips_19'),
              trigger: 'blur',
            },
          ],
        },
      }
    },
    created() {
      this.init()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      init() {
        this.listLoading = true
        let count = getVisitorCount(this.queryForm)
        let list = getVisitorList(this.queryForm, this.page)
        this.page.total = count
        this.list = list
        let imageList = []
        list.forEach((item, index) => {
          imageList.push(item.imge)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //日期时间选择
      checkTime(e) {
        if (e.length == 2) {
          this.queryForm.startdate = e[0]
          this.queryForm.startTime = e[1]
        } else {
          this.queryForm.startdate = ''
          this.queryForm.startTime = ''
        }
      },
      checkTime2(e) {
        if (e.length == 2) {
          this.queryForm.endDate = e[0]
          this.queryForm.endTime = e[1]
        } else {
          this.queryForm.endDate = ''
          this.queryForm.endTime = ''
        }
      },
      //查询
      handleQuery(formName) {
        console.log(this.queryForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.page.pageNo = 1
            this.init()
          } else {
            return false
          }
        })
      },
      //重置
      reset() {
        this.queryForm = {
          name: '',
          phone: '',
          accreditTime: [],
          accreditTime2: [],
          startdate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          isDown: '',
        }
        this.page.pageNo = 1
        this.init()
      },

      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      // 切换显示条数
      handleSizeChange(val) {
        this.page.pageSize = val
        this.init()
      },
      //切换页数
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.init()
      },

      // 选中
      setSelectRows(val) {
        this.selectRows = val
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            this.$t('operation_tips.tips_4'),
            null,
            async () => {
              let res = delVisitor(row.id + ',')
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_5'), 'success')
              }
              this.init()
            }
          )
        } else {
          if (this.selectRows.length > 0) {
            let ids = ''
            this.selectRows.forEach((item) => {
              ids += item.id + ','
            })
            let res = delVisitor(ids)
            this.init()
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
      },
      // 下发
      issue(row) {
        let res = issueVisitor(row)
        if (res) {
          this.$baseMessage(this.$t('operation_tips.tips_24'), 'success')
        } else {
          this.$baseMessage(this.$t('operation_tips.tips_25'), 'error')
        }
      },
      //导出
      downList() {},
      //打开弹窗
      openFormDialog(data) {
        this.dialogFormVisible = true
        if (data.id) {
          data.endTime = data.endTime.replace(/^\s*|\s*$/g, '')
          this.form = {
            name: data.name,
            phone: data.phone,
            date: [],
            startTime: data.staTime,
            endTime: data.endTime,
            img: data.imge,
          }
          this.form.date.push(this.changTime(data.staTime))
          this.form.date.push(this.changTime(data.endTime))
        }
      },
      // 转换标准时间
      changTime(time) {
        var timeArr = time.split(' ')
        var d = timeArr[0].split('-')
        var t = timeArr[1].split(':')
        return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2])
      },
      //选择授权时间
      checkInfoTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.form.startTime = start[0] + ' ' + start[1]
          this.form.endTime = end[0] + ' ' + end[1]
        } else {
          this.form.startTime = ''
          this.form.endTime = ''
        }
      },
      //选择图片
      checkImg() {
        let img = openImg()
        if (!img) {
          return
        }
        this.form.img = img
      },
      //拍照
      photograph() {
        let img = photograph()
        if (!img) {
          return
        }
        this.form.img = img
      },
      //添加/修改
      setInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res
            if (this.form.id) {
              res = editVisitor(this.form)
            } else {
              res = addVisitor(this.form)
            }
            if (res.result == 2) {
              this.$baseMessage(this.$t('operation_tips.tips_26'), 'success')
              this.dialogFormVisible = false
              this.page.pageNo = 1
              this.init()
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_27'), 'warning')
            }
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
          phone: '',
          date: '',
          startTime: '',
          endTime: '',
          img: '',
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

  .add_img {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 146px;
    position: relative;
    z-index: 0;
    .show_img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    > i {
      width: 100%;
      height: 100%;
      line-height: 146px;
      vertical-align: top;
      font-size: 40px;
      color: #ccc;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .add_box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      border-radius: 6px;
      background: rgba($color: #666, $alpha: 0.6);
      display: none;
      // display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: white;
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
      }
      .uploading {
        margin-right: 20px;
      }
    }
  }
  .add_img:hover .add_box {
    display: flex;
  }
</style>
