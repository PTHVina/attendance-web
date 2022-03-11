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
            />
          </el-form-item>
          <!-- 编号 -->
          <el-form-item>
            <span>{{ $t('personnel.text_2') }}</span>
            <el-input
              v-model="queryForm.no"
              :placeholder="$t('personnel.title_5')"
            />
          </el-form-item>
          <!-- 部门 -->
          <el-form-item>
            <span>{{ $t('attendance.text_12') }}</span>
            <el-select
              v-model="queryForm.dep"
              multiple
              collapse-tags
              :placeholder="$t('accessControl.pleaseChooseDepartment')"
            >
              <el-option
                v-for="item in allDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 人员分类 -->
          <el-form-item>
            <span>{{ $t('personnel.title_6') }}</span>
            <el-select
              v-model="queryForm.employeeTypeName"
              multiple
              collapse-tags
              :placeholder="$t('personnel.pl_4')"
            >
              <el-option
                v-for="item in allEmployeeTypes"
                :key="item.id"
                :label="item.Employetype_name"
                :value="item.Employetype_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 电话号码 -->
          <el-form-item>
            <span>{{ $t('personnel.text_3') }}</span>
            <el-input
              v-model="queryForm.qu_phone"
              :placeholder="$t('personnel.text_3')"
            />
          </el-form-item>
          <el-form-item>
            <!-- 查询 -->
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery('queryForm')"
            >
              {{ $t('operation_btn.btn_text_6') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <el-button
          v-if="lang == 'Jan_JPN'"
          icon="el-icon-chat-line-round"
          type="primary"
          @click="lineDialogVisible = true"
        >
          Line ヘルプを使う
        </el-button>
        <el-button
          v-if="lang == 'Jan_JPN'"
          icon="el-icon-setting"
          type="primary"
          @click="openInform"
        >
          通知先設定
        </el-button>
        <!-- 新增 -->
        <el-button
          icon="el-icon-plus"
          type="primary"
          class="btn_guide_b"
          @click="openFormDialog"
        >
          {{ $t('operation_btn.btn_text_7') }}
        </el-button>
        <!-- 导出列表 -->
        <el-button icon="el-icon-upload2" @click="downList">
          {{ $t('operation_btn.btn_text_8') }}
        </el-button>
        <!-- 下载模板 -->
        <el-button
          icon="el-icon-download"
          type="primary"
          plain
          @click="downDemo"
        >
          {{ $t('operation_btn.btn_text_10') }}
        </el-button>
        <!-- 批量导入 -->
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          plain
          @click="importExcel"
        >
          {{ $t('operation_btn.btn_text_9') }}
        </el-button>
        <!-- 批量下发 -->
        <el-button icon="el-icon-connection" @click="issue">
          {{ $t('operation_btn.btn_text_11') }}
        </el-button>
        <!-- 全员下发 -->
        <el-button icon="el-icon-thumb" type="primary" @click="oneClickIssue">
          {{ $t('operation_btn.btn_text_12') }}
        </el-button>
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
      height="calc(100vh - 305px)"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <!-- 头像 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_1')"
        :width="lang == 'en_US' ? '120' : lang == 'Fr_fr' ? '90' : ''"
      >
        <template #default="{ row }">
          <el-image
            v-if="row.picture"
            :preview-src-list="imageList"
            :src="row.picture"
          ></el-image>
          <span
            v-else
            class="el-icon-user-solid"
            style="
              width: 50px;
              height: 50px;
              font-size: 30px;
              color: #999;
              text-align: center;
              line-height: 50px;
            "
          ></span>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="name"
        :label="$t('personnel.text_1')"
        sortable
        :width="lang == 'en_US' ? '120' : lang == 'Fr_fr' ? '180' : ''"
      ></el-table-column>
      <!-- 电话号码 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.text_3')"
        prop="phone"
        sortable
        :width="
          lang == 'en_US'
            ? '175'
            : lang == 'Fr_fr'
            ? '200'
            : lang == 'Jan_JPN'
            ? '100'
            : ''
        "
      ></el-table-column>
      <!-- 部门 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_4')"
        prop="departmentname"
        sortable
        :width="lang == 'en_US' ? '130' : lang == 'Fr_fr' ? '140' : ''"
      ></el-table-column>
      <!-- 人员编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_5')"
        prop="Employee_code"
        sortable
        :width="
          lang == 'en_US'
            ? '170'
            : lang == 'Fr_fr'
            ? '180'
            : lang == 'Jan_JPN'
            ? '100'
            : ''
        "
      ></el-table-column>
      <!-- 工作分类 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_6')"
        prop="Employetypename"
        sortable
        :width="
          lang == 'en_US'
            ? '180'
            : lang == 'Fr_fr'
            ? '210'
            : lang == 'Jan_JPN'
            ? '115'
            : ''
        "
      ></el-table-column>
      <!-- 已下发总数 -->
      <!-- <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_7')"
        prop="eqcount"
        sortable
        :width="
          lang == 'en_US'
            ? '140'
            : lang == 'Fr_fr'
            ? '200'
            : lang == 'Jan_JPN'
            ? '100'
            : ''
        "
      ></el-table-column> -->
      <!-- 相机总数 -->
      <!-- <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_8')"
        prop="decount"
        sortable
        :width="lang == 'en_US' ? '220' : lang == 'Fr_fr' ? '220' : '140'"
      ></el-table-column> -->
      <!--下发详情-->
      <el-table-column :label="$t('personnel.issue_details')">
        <template slot-scope="scope">
          <el-tooltip effect="dark">
            <el-link type="primary" @click="issueRecord(scope.row)">
              {{ scope.row.eqcount }}/{{ scope.row.decount }}
            </el-link>
            <div slot="content">
              {{ $t('personnel.title_7') }}/{{ $t('personnel.title_8') }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 人员来源 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('personnel.title_17')"
        sortable
        :width="lang == 'en_US' ? '170' : lang == 'Fr_fr' ? '200' : '120'"
      >
        <template #default="{ row }">
          <span v-if="row.source === 'ManualAdd'">
            {{ $t('personnel.pl_32') }}
          </span>
          <span v-else-if="row.source === 'BatchImport'">
            {{ $t('personnel.pl_33') }}
          </span>
          <span v-else-if="row.source">
            {{ $t('personnel.pl_31') }}
          </span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        :label="$t('personnel.title_9')"
        fixed="right"
        :width="
          lang == 'Jan_JPN'
            ? '560'
            : lang == 'Fr_fr'
            ? '420'
            : lang == 'en_US'
            ? '310'
            : '280'
        "
      >
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
          <span v-if="lang == 'Jan_JPN'" class="jan_btn">
            <span v-if="row.line_type == '2'">
              <el-button
                v-if="
                  row.line_codemail != null && row.line_codemail.length == 6
                "
                type="text"
                icon="el-icon-message"
                @click="addEmailforline(row)"
              >
                Email取得
              </el-button>
              <el-button
                v-else
                type="text"
                icon="el-icon-pie-chart"
                @click="generatecodemail(row)"
              >
                LINE認証
              </el-button>
              <el-button
                type="text"
                icon="el-icon-printer"
                @click="Prinpdf(row.id, row.line_type)"
              >
                LINE印刷
              </el-button>
            </span>
            <span v-if="row.line_type == '3'">
              <span>
                <el-button
                  v-if="
                    row.line_codemail != null && row.line_codemail.length == 6
                  "
                  type="text"
                  icon="el-icon-message"
                  @click="addEmailforline(row)"
                >
                  Email取得
                </el-button>
                <el-button
                  v-else
                  type="text"
                  icon="el-icon-pie-chart"
                  @click="generatecodemail(row)"
                >
                  メール認証
                </el-button>
              </span>
              <span>
                <el-button
                  v-if="row.line_code != null && row.line_code.length == 6"
                  type="text"
                  icon="el-icon-connection"
                  @click="addUserforline(row)"
                >
                  LINE ID取得
                </el-button>
                <el-button
                  v-else
                  type="text"
                  icon="el-icon-pie-chart"
                  @click="generatecode(row)"
                >
                  LINE認証
                </el-button>
              </span>
              <el-button
                type="text"
                icon="el-icon-printer"
                @click="Prinpdf(row.id, '1')"
              >
                LINE印刷
              </el-button>
              <el-button
                type="text"
                icon="el-icon-printer"
                @click="Prinpdf(row.id, '2')"
              >
                メール印刷
              </el-button>
            </span>
            <span v-else>
              <el-button
                v-if="row.line_code != null && row.line_code.length == 6"
                type="text"
                icon="el-icon-connection"
                @click="addUserforline(row)"
              >
                LINE ID取得
              </el-button>
              <el-button
                v-else
                type="text"
                icon="el-icon-pie-chart"
                @click="generatecode(row)"
              >
                LINE認証
              </el-button>
              <el-button
                type="text"
                icon="el-icon-printer"
                @click="Prinpdf(row.id, row.line_type)"
              >
                LINE印刷
              </el-button>
            </span>
          </span>
          <!-- 下发记录 -->
          <!-- <el-button
            type="text"
            icon="el-icon-document"
            @click="issueRecord(row)"
          >
            {{ $t('operation_btn.btn_text_33') }}
          </el-button> -->
          <!-- 删除 -->
          <el-button
            type="text"
            class="btn_red"
            icon="el-icon-delete"
            style="margin-left: 10px"
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
          lang == 'zh_CN'
            ? '80px'
            : lang == 'Jan_JPN'
            ? '140px'
            : lang == 'en_US'
            ? '160px'
            : '180px'
        "
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
        <!-- Line_userid -->
        <el-form-item v-if="lang == 'Jan_JPN'" label="Line_userid">
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
        <el-form-item :label="$t('personnel.text_2')" prop="Employee_code">
          <el-input
            v-model="form.Employee_code"
            :disabled.sync="isEdit"
            :placeholder="
              deliveryMethod ? $t('personnel.pl_15') : $t('personnel.title_5')
            "
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
        <!-- 门禁卡号 -->
        <el-form-item :label="$t('personnel.title_10')">
          <el-input
            v-model="form.face_idcard"
            :placeholder="$t('personnel.title_10')"
            autocomplete="off"
            type="number"
            style="width: 60%; margin-right: 20px"
            :style="lang == 'Fr_fr' ? 'width:50%;' : ''"
          ></el-input>
          <el-radio-group v-model="form.idcardtype">
            <el-radio label="32">32{{ $t('personnel.title_2') }}</el-radio>
            <el-radio label="64">64{{ $t('personnel.title_2') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item :label="$t('personnel.title_11')" prop="Email">
          <el-input
            v-model="form.Email"
            :placeholder="$t('personnel.pl_2')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 部门 -->
        <el-form-item v-if="form.id" :label="$t('personnel.title_4')">
          <!-- 归属=>编辑 -->
          <el-cascader
            ref="cascader"
            key="cascader1"
            v-model="form.departmentname"
            :options="option"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'name',
              emitPath: false,
            }"
            :show-all-levels="false"
            :placeholder="$t('personnel.pl_3')"
            style="width: 100%"
            @change="changeDepartment"
          ></el-cascader>
        </el-form-item>
        <el-form-item v-else :label="$t('personnel.title_4')">
          <!-- 归属=>新增 -->
          <el-cascader
            ref="cascader"
            key="cascader2"
            v-model="form.departmentname"
            :options="option"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id',
              emitPath: false,
            }"
            :show-all-levels="false"
            :placeholder="$t('personnel.pl_3')"
            style="width: 100%"
            @change="changeDepartment"
          ></el-cascader>
        </el-form-item>
        <!-- 工作分类 -->
        <el-form-item :label="$t('personnel.title_6')" prop="Employetypename">
          <el-select
            v-model="form.Employetypename"
            :placeholder="$t('personnel.pl_4')"
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
        <el-form-item :label="$t('personnel.title_12')" prop="picture">
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
                :style="
                  lang == 'zh_CN'
                    ? ''
                    : 'font-size:12px !important;margin-right:10px;'
                "
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
        <!--授权时间-->
        <el-form-item :label="$t('personnel.authorized_time')">
          <el-date-picker
            v-model="authorized_time"
            type="datetimerange"
            unlink-panels="true"
            :range-separator="$t('personnel.text_7')"
            :start-placeholder="$t('personnel.text_8')"
            :end-placeholder="$t('personnel.text_9')"
            :default-time="['00:00:00', '23:59:59']"
            style="width: 100%"
            @change="checkTime"
          ></el-date-picker>
        </el-form-item>
        <!-- 自定义字段 -->
        <el-form-item :label="$t('personnel.title_18')" prop="customer_text">
          <el-input
            v-model="form.customer_text"
            :placeholder="$t('personnel.pl_35')"
            autocomplete="off"
          ></el-input>
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

    <!-- 设备弹窗 -->
    <!-- 下发设备 -->
    <el-dialog
      :title="$t('personnel.text_5')"
      :visible.sync="dialogTableVisible"
    >
      <el-table
        ref="multipleTable"
        :data="gridData"
        @selection-change="getSelectRows"
      >
        <el-table-column
          show-overflow-tooltip
          type="selection"
          width="55"
        ></el-table-column>
        <!-- IP地址 -->
        <el-table-column
          property="IP"
          sortable
          :label="$t('personnel.title_3')"
        ></el-table-column>
        <!-- 设备名称 -->
        <el-table-column
          property="DeviceName"
          sortable
          :label="$t('personnel.title_13')"
        ></el-table-column>
        <!-- 设备编号 -->
        <el-table-column
          property="DeviceNo"
          sortable
          :label="$t('personnel.title_14')"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button
          type="primary"
          :disabled="deviceRows.length == 0"
          @click="setIssue"
        >
          {{ $t('operation_btn.btn_text_15') }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 提示 -->
    <el-dialog
      :visible.sync="lineDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
      width="400px"
      class="line_dialog"
    >
      <div
        style="
          padding: 30px;
          line-height: 22px;
          background-color: #393d49;
          color: #fff;
          font-weight: 300;
        "
      >
        【LINE連携の操作説明】
        <div>①端末を登録。（学校管理者）</div>
        <div>②QRコードを登録（学校管理者）</div>
        <div>③ユーザーを登録（学校管理者）</div>
        <div>
          ④登録したいユーザー欄の”コードを生成”を押下する。（学校管理者）
        </div>
        <div>
          ⑤登録したいユーザー欄の”プリント”を押下し、表示されたプリント用紙を印刷し対象の保護者へ渡す。（学校管理者）
        </div>
        <div>
          ⑥使用するユーザーはプリント用紙に記載のQRコードをスマホで読み取り表示された公式アカウントとお友達登録を行う。（保護者）
        </div>
        <div>
          ⑦使用するユーザーは公式アカウントのLINEで”認証コード入力”を押下しプリント用紙に記載された６桁の数字を入力する。
        </div>
        <div>
          ⑧登録したいユーザー欄の”登録するLINE”を押下する。（学校管理者）成功すると該当ユーザーの編集画面内にある”LINE_USER_IDにサーバー側から取得されたIDが登録される。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lineDialogVisible = false">
          了解済み
        </el-button>
      </span>
    </el-dialog>

    <!-- 设置 -->
    <el-dialog
      title="通知先設定"
      :visible.sync="informDialogVisible"
      width="650px"
    >
      <el-transfer
        v-model="setData"
        :props="{
          key: 'value',
          label: 'title',
        }"
        :titles="['デフォルト', '管理者']"
        :data="setList"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setInform">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDataList,
    queryList,
    getTypeList,
    setData,
    openImg,
    editData,
    delData,
    queryPerson,
    getDeviceList,
    toIssue,
    oneClickIssue,
    download,
    importExcel,
    downList,
    photograph,
    getInformList,
    setInform,
  } from '@/api/personnel'
  import { getParam } from '@/api/sysPage'
  import { getAllDepartment, getAllEmployeeType } from '@/api/accesscontrol'
  export default {
    name: 'PersonnelIndex',
    data() {
      return {
        //departments: [],
        allDepartments: [],
        allEmployeeTypes: [],
        isEdit: false,
        authorized_time: [],
        lang: this.$lang,
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: this.$t('operation_tips.tips_12'),
        // 查询表单
        queryForm: {
          name: '',
          no: '',
          qu_phone: '',
          dep: '',
          employeeTypeName: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        option: [], // 部门列表
        options: [], // 工作分类
        // 新增、编辑
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
          customer_text: '', //用户自定义文本内容（不超过67字节）
          term_start: '', //有效期起始时间
          term: '', //有效期截止时间
        },
        departmentData: {}, //选中部门数据
        rules: {
          name: [
            {
              required: true,
              message: this.$t('operation_tips.tips_13'),
              trigger: 'blur',
            },
            // {
            //   min: 1,
            //   max: 10,
            //   message: this.$t('operation_tips.tips_2'),
            //   trigger: 'blur',
            // },
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
              pattern: /^1[3456789]\d{9}(,1[3456789]\d{9})*$/,
              message: this.$t('operation_tips.tips_3'),
              trigger: 'blur',
            },
          ],
          Email: [
            {
              pattern:
                /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
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
          customer_text: [
            {
              max: 200,
              message: this.$t('operation_tips.tips_78'),
              trigger: 'blur',
            },
          ],
          // picture: [
          //   {
          //     required: true,
          //     message: this.$t('operation_tips.tips_19'),
          //     trigger: 'blur',
          //   },
          // ],
        },
        dialogTableVisible: false, //表格弹窗控制
        gridData: [], //设备列表
        deviceRows: [], //设备选中列表
        issueUser: [], //选中人员
        lineDialogVisible: false,
        informDialogVisible: false,
        setList: [],
        setData: [],

        deliveryMethod: false, //下发方式
      }
    },
    watch: {},
    created() {
      if (Object.keys(this.$route.query).length != 0) {
        this.queryForm.name = this.$route.query.name
        let path = this.$router.history.current.path
        this.$router.push({ path, query: {} })
      }

      this.deliveryMethod = getParam()
      this.typeList()
      this.init()
      this.loadAllDepartments()
      this.loadAllEmployeeTypes()
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
          let dom = document.getElementsByClassName('el-menu')[0]
          let children = dom.childNodes
          children[5].lastChild.style.removeProperty('display')
          let data = [
            {
              title: this.$t('operation_tips.tips_72'),
              element: '.btn_guide_b',
              intro: this.$t('operation_tips.tips_73'),
              position: 'bottom',
            },
            {
              title: this.$t('operation_tips.tips_69'),
              element: '.el-menu li:nth-child(4)>ul li:first-child',
              intro: this.$t('operation_tips.tips_74'),
              position: 'right',
            },
          ]
          this.$intro()
            .setOptions({
              prevLabel: this.$t('operation_tips.tips_66'),
              nextLabel: this.$t('operation_tips.tips_67'),
              skipLabel: this.$t('operation_tips.tips_75'),
              doneLabel: this.$t('operation_tips.tips_68'),
              steps: data,
              exitOnOverlayClick: false, //是否允许点击空白处退出
              overlayOpacity: 0.6, //遮罩层的透明度
              showBullets: false, //是否使用点点点显示进度
              showProgress: false, //是否显示进度条
            })
            .oncomplete(() => {
              //点击结束按钮后执行的事件
              console.log('结束')
              this.$router.push('/snapshot/record')
              localStorage.setItem('firstLogin', false)
            })
            .onskip(() => {
              console.log('跳过')
              localStorage.setItem('firstLogin', false)
            })
            .start()
        } catch {
          //路由跳转过来无法调起引导，使用刷新页面调起引导
          location.reload()
        }
      },
      typeList() {
        // 人员分类、部门列表
        let list = getTypeList()
        this.option = list[0]
        this.options = list[1]
        //设备列表
        let deviceList = getDeviceList()
        this.gridData = deviceList
      },
      init() {
        this.listLoading = true
        //let list = getDataList(this.page)
        let list = queryList(this.page, this.queryForm)
        this.list = list[0]
        console.log('人员列表', list)
        this.page.total = list[1]
        let imageList = []
        this.list.forEach((item, index) => {
          imageList.push(item.picture)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.picture)
        })
        this.imageList = imageList
      },
      // 选中
      setSelectRows(val) {
        this.selectRows = val
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
            let res = delData([row.id])
            if (res) {
              this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
              this.init()
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
              this.init()
            }
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = []
            this.selectRows.forEach((item) => {
              ids.push(item.id)
            })
            this.$baseConfirm(this.$t('operation_tips.tips_21'), null, () => {
              let res = delData(ids)
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
                this.init()
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
                this.init()
              }
            })
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
      },
      //下发按钮
      issue(row) {
        if (row.id) {
          let res = queryPerson(row.id)
          if (res.result == 'error') {
            this.$baseMessage(this.$t('operation_tips.tips_19'), 'warning')
            return
          } else if (res.result == 'success') {
            this.deviceRows = []
            this.issueUser = []
            this.issueUser.push(row)
            this.dialogTableVisible = true
            this.$nextTick(() => this.$refs.multipleTable.clearSelection())
          }
        } else {
          if (this.selectRows.length > 0) {
            this.deviceRows = []
            this.issueUser = []
            let isFind = true
            this.selectRows.forEach((item) => {
              let res = queryPerson(item.id)
              if (res.result == 'error') {
                this.$baseMessage(this.$t('operation_tips.tips_19'), 'warning')
                isFind = false
              } else if (res.result == 'success') {
                this.issueUser.push(item)
              }
            })
            if (isFind) {
              this.dialogTableVisible = true
            } else {
              this.issueUser = []
              this.deviceRows = []
              this.dialogTableVisible = fasle
            }
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
      },
      //下发记录
      issueRecord(row) {
        this.$router.push({ path: '/personnel/issue', query: row })
      },
      //设备列表选中
      getSelectRows(val) {
        this.deviceRows = val
      },
      //人员下发
      setIssue() {
        let data = []
        this.issueUser.forEach((item, index) => {
          this.deviceRows.forEach((item2) => {
            let obj = { userid: item.id, deviceid: item2.Deviceid }
            data.push(obj)
          })
        })
        let res = toIssue(data)
        if (res) {
          this.$baseMessage(this.$t('operation_tips.tips_23'), 'success')
          this.dialogTableVisible = false
          this.init()
        }
      },
      //全员下发
      oneClickIssue() {
        this.$baseConfirm(this.$t('operation_tips.tips_49'), null, () => {
          oneClickIssue().then((res) => {
            if (res) {
              this.$baseMessage(this.$t('operation_tips.tips_24'), 'success')
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_25'), 'warning')
            }
            this.init()
          })
        })
      },
      //下载模板
      downDemo() {
        download()
      },
      //批量导入
      importExcel() {
        importExcel().then((res) => {
          if (res.result == 2) {
            this.$baseMessage(this.$t('operation_tips.tips_26'), 'success')
          } else if (res.result == 1) {
            this.$baseMessage(res.data, 'warning')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_27'), 'error')
          }
          this.init()
        })
      },
      //导出
      downList() {
        this.$baseConfirm(
          this.$t('operation_tips.tips_export_staff'),
          null,
          () => {
            downList()
          }
        )
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
      handleQuery(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.page.pageNo = 1
            let list = queryList(this.page, this.queryForm)
            this.list = list[0]
            this.page.total = list[1]
            let imageList = []
            this.list.forEach((item, index) => {
              imageList.push(item.picture)
            })
            this.imageList = imageList
            setTimeout(() => {
              this.listLoading = false
            }, 500)
          } else {
            return false
          }
        })
      },

      //编辑打开弹窗
      openFormDialog(data) {
        if (this.options.length != 0) {
          this.form.Employetypename = this.options[0].value
        }
        if (data.id) {
          this.isEdit = true
          this.form = {
            id: data.id,
            name: data.name,
            Employee_code: data.Employee_code,
            phone: data.phone ?? '',
            face_idcard: data.face_idcard,
            idcardtype: data.idcardtype ? data.idcardtype : '32',
            Email: data.Email?.replace(/\s*/g, ''),
            departmentname: data.departmentname,
            Employetypename: data.Employetype_id,
            picture: data.picture,
            line_userid: data.line_userid ? data.line_userid : '',
            line_type: data.line_type ? data.line_type : '1',
            customer_text: data.customer_text ?? '',
            term_start: data.term_start ?? '',
            term: data.term ?? '',
          }
          this.departmentData = {
            id: data.department_id,
            name: data.departmentname,
            title: data.departmentname,
          }
        } else {
          this.isEdit = false
          this.form.face_idcard = 8
        }
        this.form.term_start &&
          this.authorized_time.push(new Date(this.form.term_start))
        this.form.term && this.authorized_time.push(new Date(this.form.term))
        if (!this.form.Employee_code && !this.deliveryMethod) {
          this.form.Employee_code = new Date().getTime().toString()
        }
        this.dialogFormVisible = true
      },
      //部门切换
      changeDepartment(e) {
        let data = this.$refs.cascader.panel.getNodeByValue(e)
        if (data.level == 1) {
          this.$baseMessage(this.$t('personnel.pl_7'), 'warning')
          this.form.departmentname = ''
          this.departmentData = {}
          setTimeout(() => {
            this.$refs.cascader.panel.clearCheckedNodes()
            this.$refs.cascader.dropDownVisible = false
          }, 300)
          return
        } else {
          this.departmentData = data.data
          this.$refs.cascader.dropDownVisible = false
        }
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
            re = this.$t('operation_tips.tips_64') + ' ' + type
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
            if (this.deliveryMethod && !this.form.id && this.lang == 'zh_CN') {
              if (!this.IdCodeValid(this.form.Employee_code)) {
                this.$baseMessage(this.$t('personnel.pl_16'), 'warning')
                return
              }
            }
            let res
            if (this.form.face_idcard.length == 0) {
              this.form.idcardtype = ''
            }
            if (this.form.idcardtype == 32) {
              // Math.pow(2,32)=4294967296
              if (this.form.face_idcard > 4294967295) {
                this.$baseMessage(this.$t('operation_tips.tips_28'), 'warning')
                return
              }
            } else if (this.form.idcardtype == 64) {
              // Math.pow(2,64)
              if (this.form.face_idcard > 18446744073709551615) {
                this.$baseMessage(this.$t('operation_tips.tips_29'), 'warning')
                return
              }
            }
            try {
              if (this.form.id) {
                this.form.departmentname = this.departmentData.id
                res = editData(this.form)
              } else {
                res = setData(this.form)
              }
              if (res.result == 2) {
                this.$baseMessage(res.data, 'success')
                this.closeFn()
                this.init()
              } else {
                this.$baseMessage(res.data, 'warning')
              }
            } catch {
              this.$baseMessage(this.$t('personnel.pl_17'), 'error')
              if (!this.form.idcardtype) {
                this.form.idcardtype = '32'
              }
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
          customer_text: '',
          term: '',
          term_start: '',
        }
        this.authorized_time = []
        this.departmentData = {}
      },
      // 验证身份证号是否正确
      IdCodeValid(code) {
        //身份证号合法性验证
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        var city = {
          11: '北京',
          12: '天津',
          13: '河北',
          14: '山西',
          15: '内蒙古',
          21: '辽宁',
          22: '吉林',
          23: '黑龙江 ',
          31: '上海',
          32: '江苏',
          33: '浙江',
          34: '安徽',
          35: '福建',
          36: '江西',
          37: '山东',
          41: '河南',
          42: '湖北 ',
          43: '湖南',
          44: '广东',
          45: '广西',
          46: '海南',
          50: '重庆',
          51: '四川',
          52: '贵州',
          53: '云南',
          54: '西藏 ',
          61: '陕西',
          62: '甘肃',
          63: '青海',
          64: '宁夏',
          65: '新疆',
          71: '台湾',
          81: '香港',
          82: '澳门',
          91: '国外 ',
        }
        var row = {
          pass: true,
          msg: '验证成功',
        }
        if (
          !code ||
          !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
            code
          )
        ) {
          row = {
            pass: false,
            msg: '身份证号格式错误',
          }
        } else if (!city[code.substr(0, 2)]) {
          row = {
            pass: false,
            msg: '身份证号地址编码错误',
          }
        } else {
          //18位身份证需要验证最后一位校验位
          if (code.length == 18) {
            code = code.split('')
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            var sum = 0
            var ai = 0
            var wi = 0
            for (var i = 0; i < 17; i++) {
              ai = code[i]
              wi = factor[i]
              sum += ai * wi
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
              row = {
                pass: false,
                msg: '身份证号校验位错误',
              }
            }
          }
        }
        return row.pass
      },

      //打开通知设置
      openInform() {
        //通知设置列表
        let { res_data, data } = getInformList()
        this.setList = data
        this.setData = []
        res_data.forEach((item) => {
          this.setData.push(item.value)
        })
        this.informDialogVisible = true
      },
      //保存通知设置
      setInform() {
        if (this.setData.length > 5) {
          this.$baseMessage('管理者は5つを超えてはいけません。', 'warning')
          return
        }
        let str = this.setData.join(',')
        let res = setInform(str)
        if (res) {
          this.$baseMessage('保存しました', 'success')
          this.informDialogVisible = false
        } else {
          this.$baseMessage('設定できませんでした!', 'warning')
        }
      },

      // Email取得
      addEmailforline(row) {
        const loading = this.$loading({
          lock: true,
          text: '登録しています',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
        })
        window.top.myExtension.addEmailforline((param) => {
          loading.close()
          if (param.indexOf('success') >= 0) {
            this.$baseMessage('登録成功', 'success')
            this.init()
          } else {
            this.$baseMessage('登録に失敗しました。', 'warning')
          }
        }, row.id.toString())
      },
      // LINE認証\メール認証
      generatecodemail(row) {
        if (row.id) {
          const loading = this.$loading({
            lock: true,
            text: '取得中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
          })
          window.top.myExtension.generatecodemail((param) => {
            loading.close()
            if (param == 'success') {
              this.$baseMessage('送信成功。', 'success')
              this.init()
              return
            } else {
              this.$baseMessage('獲得に失敗する。', 'warning')
            }
          }, row.id.toString())
        }
      },
      // LINE印刷\メール印刷
      Prinpdf(id, type) {
        window.top.myExtension.Prinpdf(
          JSON.stringify(id),
          type ? JSON.stringify(type) : ''
        )
      },
      // LINE ID取得
      addUserforline(row) {
        if (row.id) {
          const loading = this.$loading({
            lock: true,
            text: '登録しています',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
          })
          window.top.myExtension.addUserforline((param) => {
            loading.close()
            if (param.indexOf('success') >= 0) {
              this.$baseMessage('登録成功。', 'success')
              this.init()
              return
            } else {
              this.$baseMessage('登録に失敗しました。', 'warning')
            }
          }, row.id.toString())
        }
      },
      // LINE認証
      generatecode(row) {
        if (row.id) {
          const loading = this.$loading({
            lock: true,
            text: '取得中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
          })
          window.top.myExtension.generatecode((param) => {
            loading.close()
            if (param == 'success') {
              this.$baseMessage('送信成功。', 'success')
              this.init()
              return
            } else {
              this.$baseMessage('獲得に失敗する。', 'warning')
            }
          }, row.id.toString())
        }
      },
      //日期时间选择
      checkTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.form.term_start = start[0] + ' ' + start[1]
          this.form.term = end[0] + ' ' + end[1]
          // alert(this.form.term_start+"\n"+this.form.term)
        } else {
          this.form.term_start = ''
          this.form.term = ''
        }
      },
      //处理时间
      getTime(time) {
        var date = new Date(time)
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        M = M <= 9 ? '0' + M : M
        D = D <= 9 ? '0' + D : D
        h = h <= 9 ? '0' + h : h
        m = m <= 9 ? '0' + m : m
        s = s <= 9 ? '0' + s : s

        return [Y + '-' + M + '-' + D, h + ':' + m + ':' + s]
      },
      //加载组织机构
      loadAllDepartments() {
        const depts = getAllDepartment()
        this.allDepartments = depts
      },
      loadAllEmployeeTypes() {
        const types = getAllEmployeeType()
        this.allEmployeeTypes = types
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

  .line_dialog .el-dialog__header {
    padding: 0 !important;
  }
  .line_dialog .el-dialog__body {
    padding: 0 !important;
    border: none;
  }

  .jan_btn {
    .el-button {
      margin-left: 10px !important;
    }
  }
</style>
