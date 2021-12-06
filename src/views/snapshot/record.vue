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
            <span>{{ $t('snapshot.text_1') }}</span>
            <el-input
              v-model="queryForm.name"
              :placeholder="$t('snapshot.text_2')"
              style="width: 170px"
            />
          </el-form-item>
          <!-- 设备编号 -->
          <el-form-item>
            <span>{{ $t('snapshot.text_19') }}</span>
            <el-select
              v-model="queryForm.devname"
              clearable="true"
              style="width: 170px"
              :placeholder="$t('snapshot.text_19')"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.id"
                :label="item.DeviceName"
                :value="item.number"
              >
                <span style="float: left">{{ item.DeviceName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  {{ item.number }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 抓拍时间 -->
          <el-form-item>
            <span>{{ $t('snapshot.text_4') }}</span>
            <el-date-picker
              v-model="queryForm.accreditTime"
              type="datetimerange"
              :range-separator="$t('snapshot.text_5')"
              :start-placeholder="$t('snapshot.text_6')"
              :end-placeholder="$t('snapshot.text_7')"
              style="width: 360px"
              @change="checkTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>{{ $t('snapshot.text_16') }}</span>
            <el-input
              v-model="queryForm.temp_from"
              type="number"
              step="0.01"
              maxlength="4"
              style="width: 100px"
              @change="checkLowerTemp"
            />
            -
            <el-input
              v-model="queryForm.temp_to"
              type="number"
              step="0.01"
              maxlength="4"
              style="width: 100px"
              @change="checkUpperTemp"
            />
          </el-form-item>
          <!-- 人员类别 -->
          <el-form-item>
            <span>{{ $t('snapshot.text_50') }}</span>
            <el-select v-model="queryForm.selectedPersonTypes" multiple>
              <el-option
                v-for="item in personTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 健康码状态 -->
          <el-form-item v-if="lang == 'zh_CN'">
            <span>{{ $t('snapshot.text_11') }}</span>
            <el-select
              v-model="queryForm.codestus"
              clearable
              :placeholder="$t('snapshot.text_9')"
              style="width: 140px"
            >
              <el-option
                key="0"
                :label="$t('snapshot.text_46')"
                value="0"
              ></el-option>
              <el-option key="1" :label="$t('snapshot.text_12')" value="1">
                {{ $t('snapshot.text_12') }}
              </el-option>
              <el-option key="2" :label="$t('snapshot.text_13')" value="2">
                {{ $t('snapshot.text_13') }}
              </el-option>
              <el-option key="3" :label="$t('snapshot.text_14')" value="3">
                {{ $t('snapshot.text_14') }}
              </el-option>
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
            <!-- 重置 -->
            <el-button type="info" plain @click="reset">
              {{ $t('operation_btn.btn_text_18') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_group">
        <!-- 批量导出 -->
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          @click="exportList('1')"
        >
          {{ $t('operation_btn.btn_text_26') }}(Excel)
        </el-button>
        <!-- 批量导出 -->
        <el-button
          icon="el-icon-folder-opened"
          type="primary"
          @click="exportList('0')"
        >
          {{ $t('operation_btn.btn_text_26') }}(CSV)
        </el-button>
        <!-- <el-button icon="el-icon-upload2" type="primary">导出列表</el-button> -->
        <!-- 批量删除 -->
        <el-button
          icon="el-icon-delete"
          type="danger"
          style="opacity: 0.6"
          @click="handleDelete"
        >
          {{ $t('operation_btn.btn_text_13') }}
        </el-button>
        <!-- 是否显示健康码 -->
        <div v-if="lang == 'zh_CN'" style="margin-left: 20px">
          <span style="margin-right: 5px">{{ $t('snapshot.text_47') }}</span>
          <el-switch v-model="showCode" @change="changeCode"></el-switch>
        </div>
        <div v-if="lang == 'zh_CN'" style="margin-left: 20px">
          <span style="margin-right: 5px">{{ $t('snapshot.text_48') }}</span>
          <el-switch v-model="showMask" @change="showMaskChanged"></el-switch>
        </div>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border="true"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      :height="lang == 'zh_CN' ? '700' : '650'"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <!-- 特写图 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_15')"
        :width="lang == 'zh_CN' ? '' : '100px'"
      >
        <template #default="{ row }">
          <el-image :preview-src-list="imageList" :src="row.closeup"></el-image>
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_22')"
        :width="lang == 'zh_CN' ? '' : '120px'"
      >
        <template #default="{ row }">
          <el-image
            v-if="row.TemplateImage"
            :src="row.TemplateImage"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        show-overflow-tooltip
        prop="person_name"
        :label="$t('snapshot.text_1')"
        width="100px"
      ></el-table-column>
      <!--Person ID-->
      <el-table-column
        show-overflow-tooltip
        prop="person_id"
        :label="$t('snapshot.text_49')"
        width="100px"
      ></el-table-column>
      <!-- 体温 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_16')"
        prop="body_temp"
        sortable
        :width="lang == 'zh_CN' ? '100px' : lang == 'Fr_fr' ? '210px' : '130px'"
      >
        <template #default="{ row }">
          <div
            v-if="
              row.QRcodestatus != null &&
              row.QRcodestatus.toString().indexOf('体温异常') != -1
            "
          >
            <span style="color: red">
              {{ formatTemperatureString(row.body_temp) }}
            </span>
          </div>
          <span v-else>
            {{ formatTemperatureString(row.body_temp) }}
          </span>
        </template>
      </el-table-column>
      <!-- 抓拍时间 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_4')"
        prop="time"
        sortable
        width="200"
      >
        <template #default="{ row }">
          <span>{{ row.time.split('.')[0] }}</span>
        </template>
      </el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_19')"
        prop="addr_name"
        width="140px"
      ></el-table-column>
      <!-- 健康码 -->
      <el-table-column
        v-if="showCode"
        show-overflow-tooltip
        :label="$t('snapshot.text_38')"
        prop="QRcodestatus"
        sortable
        :width="lang == 'zh_CN' ? '90px' : lang == 'Fr_fr' ? '150px' : '130px'"
      >
        <template #default="{ row }">
          <el-tag v-if="row.QRcodestatus == '0'" type="success">
            {{ $t('snapshot.text_12') }}
          </el-tag>
          <el-tag v-else-if="row.QRcodestatus == '1'" type="danger">
            {{ $t('snapshot.text_14') }}
          </el-tag>
          <el-tag v-else-if="row.QRcodestatus == '2'" type="warning">
            {{ $t('snapshot.text_13') }}
          </el-tag>
          <div v-else-if="row.QRcodestatus != '' && row.QRcodestatus != null">
            <el-tag
              v-if="
                row.QRcodestatus.split(':')[0].toString().indexOf('绿码') != -1
              "
              type="success"
            >
              {{ $t('snapshot.text_12') }}
            </el-tag>
            <el-tag
              v-else-if="
                row.QRcodestatus.split(':')[0].toString().indexOf('红码') != -1
              "
              type="danger"
            >
              {{ $t('snapshot.text_14') }}
            </el-tag>
            <el-tag
              v-else-if="
                row.QRcodestatus.split(':')[0].toString().indexOf('黄码') != -1
              "
              type="warning"
            >
              {{ $t('snapshot.text_13') }}
            </el-tag>
            <span v-else></span>
          </div>
          <span v-else></span>
        </template>
      </el-table-column>
      <!-- 健康码类型 -->
      <el-table-column
        v-if="showCode"
        show-overflow-tooltip
        :label="$t('snapshot.text_43')"
        prop="QRcodestatus"
        :width="lang == 'Fr_fr' ? '180px' : '160px'"
      >
        <template #default="{ row }">
          <span
            v-if="
              row.QRcodestatus != '' &&
              row.QRcodestatus != null &&
              row.QRcodestatus.length > 1
            "
          >
            <span v-if="row.QRcodestatus.split('(')[0].split(':').length > 1">
              {{ row.QRcodestatus.split('(')[0].split(':')[1] }}
            </span>
          </span>
        </template>
      </el-table-column>
      <!-- 健康码备注 -->
      <el-table-column
        v-if="showCode"
        show-overflow-tooltip
        :label="$t('snapshot.text_45')"
        prop="QRcodestatus"
        :width="lang == 'Fr_fr' ? '220px' : '160px'"
      >
        <template #default="{ row }">
          <span
            v-if="
              row.QRcodestatus != '' &&
              row.QRcodestatus != null &&
              row.QRcodestatus.length > 1
            "
          >
            <span v-if="row.QRcodestatus.split(';').length > 1">
              {{ row.QRcodestatus.split(';')[1] }}
            </span>
          </span>
        </template>
      </el-table-column>
      <!-- 行程信息 -->
      <el-table-column
        v-if="showCode"
        :label="$t('snapshot.text_44')"
        prop="trip_infor"
        :width="lang == 'Fr_fr' ? '200px' : '160px'"
      >
        <template #default="{ row }">
          <el-popover placement="right" width="300" trigger="hover">
            <ul v-if="row.trip_infor" class="stroke_tips">
              <li
                v-for="(item, index) in row.trip_infor
                  .replace(/(^\s*)|(\s*$)/g, '')
                  .split('*')"
                :key="index"
                class="tips_item"
              >
                <div v-if="item != null && item != ''">
                  <span>{{ item.split(':')[0] }}</span>
                  <span
                    v-if="item.split(':')[1] == '绿码'"
                    style="color: green"
                  >
                    {{ $t('snapshot.text_12') }}
                  </span>
                  <span
                    v-else-if="item.split(':')[1] == '红码'"
                    style="color: red"
                  >
                    {{ $t('snapshot.text_14') }}
                  </span>
                  <span
                    v-else-if="item.split(':')[1] == '黄码'"
                    style="color: rgb(182, 240, 46)"
                  >
                    {{ $t('snapshot.text_13') }}
                  </span>
                  <span v-else>{{ item.split(':')[1] }}</span>
                </div>
              </li>
            </ul>
            <span slot="reference" style="white-space: nowrap">
              {{ row.trip_infor }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 身份证号码 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_17')"
        prop="idcard_number"
        :width="lang == 'Fr_fr' ? '240px' : '160px'"
      ></el-table-column>
      <!-- 门禁卡号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_18')"
        prop="wg_card_id"
        :width="lang == 'Fr_fr' ? '200px' : '160px'"
      ></el-table-column>
      <!-- 是否佩戴口罩 -->
      <el-table-column
        v-if="showMask"
        show-overflow-tooltip
        :label="$t('snapshot.text_20')"
        prop="exist_mask"
        sortable
        :width="lang == 'zh_CN' ? '140px' : lang == 'Fr_fr' ? '260px' : '190px'"
      >
        <template #default="{ row }">
          <span v-if="row.exist_mask == '0'">{{ $t('snapshot.text_21') }}</span>
          <span v-else-if="row.exist_mask == '1'">
            {{ $t('snapshot.text_10') }}
          </span>
        </template>
      </el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('snapshot.text_3')"
        prop="device_sn"
        sortable
        width="200px"
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column
        :label="$t('snapshot.text_23')"
        :min-width="
          lang == 'zh_CN' ? '150px' : lang == 'Fr_fr' ? '200px' : '170px'
        "
        fixed="right"
      >
        <template #default="{ row }">
          <!-- 注册 -->
          <el-button
            v-if="
              String(row.person_id).length == 0 ||
              row.person_id == null ||
              row.person_id == 0
            "
            type="text"
            icon="el-icon-edit"
            @click="register(row)"
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
      :page-sizes="[10, 20, 30, 40, 50, 100, 200, 300, 500, 1000]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 新增/修改弹窗 -->
    <el-dialog
      :title="$t('snapshot.text_24')"
      :visible.sync="dialogFormVisible"
      :width="lang == 'zh_CN' ? '600px' : '710px'"
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
            ? '130px'
            : lang == 'Fr_fr'
            ? '180px'
            : '160px'
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
            :placeholder="
              deliveryMethod ? $t('personnel.pl_15') : $t('snapshot.text_25')
            "
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
    <!-- 批量导出 -->
    <el-dialog
      :title="$t('snapshot.text_40')"
      :visible.sync="dialogTableVisible"
      :width="lang == 'zh_CN' ? '530px' : '630px'"
    >
      <el-form
        ref="export"
        :model="exportData"
        :rules="rule"
        :label-width="lang == 'zh_CN' ? '110px' : '170px'"
        size="medium"
      >
        <!-- 姓名 -->
        <el-form-item :label="$t('snapshot.text_1')">
          <el-input
            v-model="exportData.name"
            :placeholder="$t('snapshot.text_2')"
          />
        </el-form-item>
        <!-- 设备编号 -->
        <el-form-item :label="$t('snapshot.text_3')">
          <el-input
            v-model="exportData.no"
            :placeholder="$t('snapshot.text_3')"
          />
        </el-form-item>
        <!-- 时间范围 -->
        <el-form-item :label="$t('snapshot.text_41')" prop="exportTime">
          <el-date-picker
            v-model="exportData.exportTime"
            type="datetimerange"
            :range-separator="$t('snapshot.text_5')"
            :start-placeholder="$t('snapshot.text_36')"
            :end-placeholder="$t('snapshot.text_37')"
            style="width: 100%"
            @change="exportTime"
          ></el-date-picker>
        </el-form-item>
        <!-- 陌生人 -->
        <el-form-item :label="$t('snapshot.text_8')">
          <el-select
            v-model="exportData.stranger"
            clearable
            :placeholder="$t('snapshot.text_9')"
            style="width: 100%"
          >
            <el-option
              key="1"
              :label="$t('snapshot.text_10')"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 健康码状态 -->
        <el-form-item :label="$t('snapshot.text_11')">
          <el-select
            v-model="exportData.codestus"
            clearable
            :placeholder="$t('snapshot.text_9')"
            style="width: 100%"
          >
            <el-option
              key="0"
              :label="$t('snapshot.text_46')"
              value="0"
            ></el-option>
            <el-option key="1" :label="$t('snapshot.text_12')" value="1">
              {{ $t('snapshot.text_12') }}
            </el-option>
            <el-option key="2" :label="$t('snapshot.text_13')" value="2">
              {{ $t('snapshot.text_13') }}
            </el-option>
            <el-option key="3" :label="$t('snapshot.text_14')" value="3">
              {{ $t('snapshot.text_14') }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="exportList('export')">
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
  } from '@/api/personnel'
  import { getRecordList, delRecord, BatchXport } from '@/api/record'
  import { getParam } from '@/api/sysPage'
  import { getAllMyDevices } from '@/api/device'
  import {
    formatCellTemperatureString,
    formatTemperatureString,
  } from '@/utils/index'

  export default {
    name: 'Record',
    data() {
      return {
        lang: this.$lang,
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        layout: 'total, sizes, prev, pager, next, jumper',
        selectRows: '', //选中行
        elementLoadingText: this.$t('operation_tips.tips_12'),
        queryForm: {
          name: '',
          devname: '',
          accreditTime: [], //授权时间范围
          statime: '',
          endtime: '',
          selectedPersonTypes: [], //人员类别
          codestus: '', //健康码
          temp_from: '',
          temp_to: '',
        },
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        option: [], // 部门列表
        options: [], // 工作分类
        gridData: [], //设备列表
        // 注册
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
          line_userid: '',
          line_type: '1',
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
          // picture: [
          //   {
          //     required: true,
          //     message: this.$t('operation_tips.tips_19'),
          //     trigger: 'blur',
          //   },
          // ],
        },
        dialogTableVisible: false,
        exportData: {
          exportTime: '',
          startTime: '',
          endTime: '',
          name: '',
          no: '',
          codestus: '',
          stranger: '',
        },
        rule: {
          exportTime: [
            {
              required: true,
              message: this.$t('snapshot.text_42'),
              trigger: 'blur',
            },
          ],
        },
        deliveryMethod: false, //下发方式

        showCode: false, //健康码显示
        showMask: false, //是否显示口罩状态
        deviceList: [], //设备列表
        personTypes: [
          //人员类别选项
          { label: this.$t('snapshot.text_51'), value: 1 }, //白名单
          { label: this.$t('snapshot.text_8'), value: 0 }, //陌生人
        ],
      }
    },
    created() {
      this.deliveryMethod = getParam()
      this.typeList()
      this.init()

      let code = JSON.parse(localStorage.getItem('codeData'))
      let mask = JSON.parse(localStorage.getItem('showMask'))
      this.showMask = mask
      if (code && this.lang == 'zh_CN') {
        this.showCode = code
      } else {
        this.showCode = false
      }
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      formatCellTemperatureString,
      formatTemperatureString,
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
        this.queryForm.stranger ? this.queryForm.stranger : '0'
        this.queryForm.codestus < 3 ? this.queryForm.codestus : '3'
        let { counts, list } = getRecordList(this.queryForm, this.page)
        this.page.total = counts
        this.list = list
        let imageList = []
        this.deviceList = getAllMyDevices()
        list.forEach((item, index) => {
          imageList.push(item.closeup)
        })
        this.imageList = imageList
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //日期时间选择
      checkTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.queryForm.startTime = start[0] + ' ' + start[1]
          this.queryForm.endTime = end[0] + ' ' + end[1]
        } else {
          this.queryForm.startTime = ''
          this.queryForm.endTime = ''
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
      //表格排序
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
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
            let res = delRecord(row.id + ',')
            if (res) {
              this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
            } else {
              this.$baseMessage(this.$t('operation_tips.tips_5'), 'error')
            }
            this.init()
          })
        } else {
          if (this.selectRows.length > 0) {
            let ids = ''
            this.selectRows.forEach((item) => {
              ids += item.id + ','
            })
            this.$baseConfirm(this.$t('operation_tips.tips_21'), null, () => {
              let res = delRecord(ids)
              if (res) {
                this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
              } else {
                this.$baseMessage(this.$t('operation_tips.tips_5'), 'error')
              }
              this.init()
            })
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_22'), 'error')
            return false
          }
        }
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
      //重置
      reset() {
        this.queryForm = {
          name: '',
          devname: '',
          accreditTime: [],
          statime: '',
          endtime: '',
          selectedPersonTypes: [],
          codestus: '',
          temp_from: '',
          temp_to: '',
        }
        this.page.pageNo = 1
        this.init()
      },

      //打开弹窗
      register(data) {
        if (data.id) {
          this.form = {
            id: data.id,
            name: data.person_name,
            Employee_code: '',
            phone: '',
            face_idcard: data.wg_card_id,
            idcardtype: '32',
            Email: '',
            departmentname: '',
            Employetypename: '',
            picture: data.closeup,
            line_userid: '',
            line_type: '1',
          }
        }
        if (!this.form.Employee_code && !this.deliveryMethod) {
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
            if (this.deliveryMethod && this.lang == 'zh_CN') {
              if (!this.IdCodeValid(this.form.Employee_code)) {
                this.$baseMessage(this.$t('personnel.pl_16'), 'warning')
                return
              }
            }
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
            try {
              let res = setData(this.form)
              if (res.result == 2) {
                this.$baseMessage(res.data, 'success')
                this.dialogFormVisible = false
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
        }
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

      exportTime(e) {
        if (e) {
          let start = this.getTime(e[0])
          let end = this.getTime(e[1])
          this.exportData.startTime = start[0] + ' ' + start[1]
          this.exportData.endTime = end[0] + ' ' + end[1]
        } else {
          this.exportData.startTime = ''
          this.exportData.endTime = ''
        }
      },
      exportList(type) {
        let ids = []
        if (this.selectRows.length > 0) {
          this.selectRows.forEach((item) => {
            ids.push(item.id)
          })
          this.queryForm = {
            name: '',
            devname: '',
            accreditTime: [],
            statime: '',
            endtime: '',
            selectedPersonTypes: [],
            codestus: '',
            temp_from: '',
            temp_to: '',
          }
        }
        BatchXport(this.queryForm, type, ids)
      },

      refreshList() {
        let list = this.list
        this.list = ''
        setTimeout(() => {
          this.list = list
        })
      },

      //显示健康码
      changeCode(e) {
        this.showCode = e
        localStorage.setItem('codeData', e)
        if (e) {
          this.refreshList()
        }
      },
      //是否显示戴口罩
      showMaskChanged(e) {
        this.showMask = e
        localStorage.setItem('showMask', e)
        if (e) {
          this.refreshList()
        }
      },
      //检查温度输入范围是否上限大于下限
      checkUpperTemp() {
        if (
          this.queryForm.temp_from &&
          parseFloat(this.queryForm.temp_to) <
            parseFloat(this.queryForm.temp_from)
        ) {
          this.queryForm.temp_to = this.queryForm.temp_from
        }
      },
      checkLowerTemp() {
        if (
          this.queryForm.temp_to &&
          parseFloat(this.queryForm.temp_to) <
            parseFloat(this.queryForm.temp_from)
        ) {
          this.queryForm.temp_from = this.queryForm.temp_to
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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

  .el-popover {
    padding: 5px 10px !important;
  }
  .stroke_tips {
    padding: 0;
    margin: 0;
    .tips_item {
      list-style: none;
      padding: 5px 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #888;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span:nth-child(2) {
          min-width: 30px;
          margin-left: 10px;
        }
      }
    }
    .tips_item:last-child {
      border: none;
    }
  }
</style>
