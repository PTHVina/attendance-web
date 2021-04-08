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
              clearable
              :placeholder="$t('personnel.pl_1')"
            />
          </el-form-item>
          <!-- 角色 -->
          <el-form-item>
            <span>{{ $t('personnel.text_16') }}</span>
            <el-select
              v-model="queryForm.role"
              clearable
              :placeholder="$t('snapshot.text_9')"
            >
              <el-option
                key="0"
                :label="$t('personnel.pl_10')"
                value="0"
              ></el-option>
              <el-option
                key="1"
                :label="$t('personnel.pl_11')"
                value="1"
              ></el-option>
              <el-option
                key="2"
                :label="$t('personnel.pl_12')"
                value="2"
              ></el-option>
              <!-- <el-option
                key="-1"
                :label="$t('personnel.pl_13')"
                value="-1"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item>
            <span>{{ $t('personnel.text_17') }}</span>
            <el-select
              v-model="queryForm.status"
              clearable
              :placeholder="$t('snapshot.text_9')"
            >
              <el-option key="0" label="否" value="0"></el-option>
              <el-option key="1" label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery()"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      stripe
      :data="list"
      height="calc(100vh - 258px)"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_15')"
        :width="lang == 'en_US' ? '120px' : '95px'"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column show-overflow-tooltip :label="$t('personnel.title_1')">
        <template #default="{ row }">
          <el-image :preview-src-list="[row.imge]" :src="row.imge"></el-image>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('personnel.text_1')"
      ></el-table-column>
      <!-- 角色 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_16')"
        prop="role"
        sortable
      >
        <template #default="{ row }">
          <span v-if="row.role == 0">{{ $t('personnel.pl_10') }}</span>
          <span v-else-if="row.role == 1">{{ $t('personnel.pl_11') }}</span>
          <span v-else-if="row.role == 2">{{ $t('personnel.pl_12') }}</span>
          <span v-else-if="row.role == -1">{{ $t('personnel.pl_13') }}</span>
          <span v-else>{{ $t('personnel.pl_14') }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_17')"
        prop="status"
        sortable
      ></el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_13')"
        prop="addr_name"
        sortable
      ></el-table-column>
      <!-- 同步时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_16')"
        prop="publishtime"
        sortable
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('personnel.title_9')" fixed="right">
        <template #default="{ row }">
          <!-- 注册 -->
          <el-button
            v-if="row.role == 0"
            type="text"
            icon="el-icon-edit"
            style="margin-right: 10px"
            @click="openFormDialog(row)"
          >
            {{ $t('operation_btn.btn_text_27') }}
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

    <!-- 人员信息 -->
    <el-dialog
      :title="$t('personnel.text_4')"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :width="lang == 'zh_CN' ? '600px' : '720px'"
      :destroy-on-close="true"
      :before-close="closeFn"
      top="50px"
    >
      <el-form
        ref="setForm"
        :model="form"
        :label-width="
          lang == 'zh_CN' ? '80px' : lang == 'Jan_JPN' ? '140px' : '160px'
        "
        :rules="rules"
        size="medium"
      >
        <!-- 姓名 -->
        <el-form-item :label="$t('snapshot.text_1')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('snapshot.text_2')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- Line_ueserid -->
        <el-form-item v-if="lang == 'Jan_JPN'" label="Line_ueserid">
          <el-input
            v-model="form.line_userid"
            placeholder="Line_ueserid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 送信モード -->
        <el-form-item v-if="lang == 'Jan_JPN'" label="送信モード">
          <el-radio-group v-model="form.line_type">
            <el-radio label="1">Line</el-radio>
            <el-radio label="2">メール</el-radio>
            <el-radio label="3">Line メール</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 编号 -->
        <el-form-item :label="$t('snapshot.text_39')" prop="Employee_code">
          <el-input
            v-model="form.Employee_code"
            :placeholder="$t('snapshot.text_25')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item
          :label="$t('snapshot.text_26')"
          :prop="lang == 'zh_CN' ? 'phone' : ''"
        >
          <el-input
            v-model="form.phone"
            :placeholder="$t('snapshot.text_26')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 门禁卡号 -->
        <el-form-item :label="$t('snapshot.text_18')">
          <el-input
            v-model="form.face_idcard"
            :placeholder="$t('snapshot.text_18')"
            autocomplete="off"
            style="width: 60%; margin-right: 20px"
          ></el-input>
          <el-radio-group v-model="form.idcardtype">
            <el-radio label="32">32{{ $t('snapshot.text_27') }}</el-radio>
            <el-radio label="64">64{{ $t('snapshot.text_27') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item :label="$t('snapshot.text_28')" prop="Email">
          <el-input
            v-model="form.Email"
            :placeholder="$t('snapshot.text_29')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 部门 -->
        <el-form-item :label="$t('snapshot.text_30')">
          <el-cascader
            v-model="form.departmentname"
            :options="option"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id',
              emitPath: false,
            }"
            :show-all-levels="false"
            :placeholder="$t('snapshot.text_31')"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <!-- 工作分类 -->
        <el-form-item :label="$t('snapshot.text_32')" prop="Employetypename">
          <el-select
            v-model="form.Employetypename"
            :placeholder="$t('snapshot.text_33')"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 照片 -->
        <el-form-item :label="$t('snapshot.text_34')" prop="picture">
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
        <el-button type="primary" @click="setFormData('setForm')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getTypeList,
    getDeviceList,
    openImg,
    setData,
    photograph,
    getDataSyncList,
  } from '@/api/personnel'
  export default {
    name: 'DataSync',
    data() {
      return {
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        // layout: 'total, sizes, prev, pager, next, jumper',
        layout: 'total',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        queryForm: {
          name: '',
          role: '', //0:普通人员\1:白名单人员\2:黑名单人员\-1:所有人员
          stutas: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        form: {
          name: '',
          Employee_code: '', //编号
          phone: '',
          face_idcard: '', //门禁编号
          idcardtype: '32', //门禁编号位数
          Email: '',
          departmentname: '', //部门
          Employetypename: '', //工作分类
          picture: '',
          line_userid: '', //Line_ueserid
          line_type: '1', //送信モード
        },
        rules: {
          name: [
            {
              required: true,
              message: this.$t('operation_tips.tips_13'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 10,
              message: this.$t('operation_tips.tips_2'),
              trigger: 'blur',
            },
          ],
          Employee_code: [
            {
              required: true,
              message: this.$t('operation_tips.tips_14'),
              trigger: 'blur',
            },
            {
              min: 1,
              max: 18,
              message: this.$t('operation_tips.tips_20'),
              trigger: 'blur',
            },
            {
              pattern: /^[A-Za-z0-9]*$/,
              message: this.$t('operation_tips.tips_15'),
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
          Email: [
            {
              pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
              message: this.$t('operation_tips.tips_16'),
              trigger: 'blur',
            },
          ],
          departmentname: [
            {
              required: true,
              message: this.$t('operation_tips.tips_17'),
              trigger: 'blur',
            },
          ],
          Employetypename: [
            {
              required: true,
              message: this.$t('operation_tips.tips_18'),
              trigger: 'blur',
            },
          ],
          picture: [
            {
              required: true,
              message: this.$t('operation_tips.tips_19'),
              trigger: 'blur',
            },
          ],
        },
        option: [], // 部门列表
        options: [], // 工作分类
      }
    },
    created() {
      this.init()
      this.typeList()
    },
    mounted() {},
    methods: {
      typeList() {
        // 人员分类、部门列表
        let list = getTypeList()
        this.option = list[0]
        this.options = list[1]
        //设备列表
        this.gridData = getDeviceList()
      },
      init() {
        this.listLoading = true
        let { count, list } = getDataSyncList(this.queryForm, this.page)
        this.page.total = count
        this.list = list
        console.log('人员列表', this.list)
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
      //查询
      handleQuery() {
        this.page.pageNo = 1
        this.init()
      },

      //注册弹窗
      openFormDialog(data) {
        this.form = {
          id: data.id,
          name: data.name,
          Employee_code: '',
          phone: '',
          face_idcard: data.long_card_id,
          idcardtype:
            data.long_card_id < 4294967295 || !data.long_card_id ? '32' : '64',
          Email: '',
          departmentname: '',
          Employetypename: '',
          picture: data.imge,
          line_userid: '',
          line_type: '1',
        }
        if (!this.form.Employee_code) {
          this.form.Employee_code = new Date().getTime().toString()
        }
        if (this.options.length != 0) {
          this.form.Employetypename = this.options[0].value
        }
        this.dialogFormVisible = true
      },
      //选择图片
      checkImg() {
        let imageurl = openImg()
        if (imageurl.length < 4) {
          var re = this.showImgTip(imageurl)
          this.$baseMessage(re, 'warning')
          return
        }
        this.form.picture = imageurl
      },
      // 图片上传失败提示
      showImgTip(type) {
        var re = ''
        switch (type) {
          case '-14':
            re = this.$t('operation_tips.tips_50')
            break
          case '-17':
            re = this.$t('operation_tips.tips_51')
            break
          case '-38':
            re = this.$t('operation_tips.tips_52')
            break
          case '-39':
            re = this.$t('operation_tips.tips_53')
            break
          case '-40':
            re = this.$t('operation_tips.tips_54')
            break
          case '-41':
            re = this.$t('operation_tips.tips_55')
            break
          case '-46':
            re = this.$t('operation_tips.tips_56')
            break
          case '-47':
            re = this.$t('operation_tips.tips_57')
            break
          case '-48':
            re = this.$t('operation_tips.tips_58')
            break
          case '-49':
            re = this.$t('operation_tips.tips_59')
            break
          case '-50':
            re = this.$t('operation_tips.tips_60')
            break
          case '-51':
            re = this.$t('operation_tips.tips_61')
            break
          case '-52':
            re = this.$t('operation_tips.tips_62')
            break
          case '100':
            re = this.$t('operation_tips.tips_63')
            break
          default:
            re = this.$t('operation_tips.tips_64')
        }
        return re
      },
      //拍照
      photograph() {
        let img = photograph()
        if (!img) {
          return
        }
        this.form.picture = img
      },
      //设置人员信息
      setFormData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.face_idcard.length == 0) {
              this.form.idcardtype = ''
            }
            if (this.form.idcardtype == 32) {
              if (this.form.face_idcard > 4294967295) {
                this.$baseMessage(this.$t('operation_tips.tips_28'), 'warning')
                return
              }
            } else if (this.form.idcardtype == 64) {
              if (this.form.face_idcard > 18446744073709551615) {
                this.$baseMessage(this.$t('operation_tips.tips_29'), 'warning')
                return
              }
            }
            let res = setData(this.form)
            if (res.result == 2) {
              this.$baseMessage(res.data, 'success')
              this.dialogFormVisible = false
            } else {
              this.$baseMessage(res.data, 'warning')
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
          Employee_code: '',
          phone: '',
          face_idcard: '',
          idcardtype: '32',
          Email: '',
          departmentname: '',
          Employetypename: '',
          picture: '',
          line_userid: '',
          line_type: '1',
        }
        if (done && typeof done == 'function') {
          done()
        } else {
          this.dialogFormVisible = false
        }
      },
    },
  }
</script>

<style lang="scss">
  .form_group {
    height: auto;
    margin-bottom: 20px;
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
  .el-cascader-node__postfix {
    position: unset;
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
