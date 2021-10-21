<template>
  <div class="table-container">
    <div class="group">
      <div class="btn_group">
        <!-- 添加设备 -->
        <el-button icon="el-icon-plus" type="primary" @click="openFormDialog()">
          {{ $t('operation_btn.btn_text_22') }}
        </el-button>
        <!-- 搜索设备 -->
        <el-button
          icon="el-icon-search"
          type="primary"
          class="btn_guide_a"
          @click="openTabelDialog"
        >
          {{ $t('operation_btn.btn_text_23') }}
        </el-button>
        <span class="tips">
          <el-alert
            :title="$t('operation_tips.tips_42')"
            type="info"
            :description="$t('operation_tips.tips_39')"
            show-icon
            :closable="false"
          ></el-alert>
        </span>
      </div>
    </div>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :highlight-current-row="true"
      :element-loading-text="elementLoadingText"
      height="calc(100vh - 258px)"
      border="true"
    >
      <!-- 序号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_1')"
        :width="lang == 'en_US' ? '120px' : lang == 'Fr_fr' ? '150' : '95'"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_2')"
        prop="number"
        sortable
      ></el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_3')"
        prop="DeviceName"
        sortable
      ></el-table-column>
      <!-- IP地址 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_4')"
        prop="ipAddress"
        sortable
      ></el-table-column>
      <!-- 进出 -->
      <el-table-column :label="$t('device.text_64')" prop="IsEnter" sortable>
        <template #default="{ row }">
          <span v-if="row.IsEnter === -1">
            <img :src="require('@/assets/undefined.svg')" alt="door icon" />
          </span>
          <span v-else-if="row.IsEnter === 1">
            <img :src="require('@/assets/in.svg')" alt="in icon" />
          </span>
          <span v-else-if="row.IsEnter === 0">
            <img :src="require('@/assets/out.svg')" alt="out icon" />
          </span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column
        show-overflow-tooltip
        :label="$t('device.text_5')"
        prop="IsConnected"
        sortable
      >
        <template #default="{ row }">
          <el-tag v-if="row.IsConnected">{{ $t('device.text_7') }}</el-tag>
          <el-tag v-else type="danger">{{ $t('device.text_8') }}</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        :label="$t('device.text_6')"
        fixed="right"
        :width="
          lang == 'Jan_JPN'
            ? '420px'
            : lang == 'en_US'
            ? '380px'
            : lang == 'Fr_fr'
            ? '420'
            : '350'
        "
      >
        <template #default="{ row }">
          <!--下发-->
          <el-button
            type="text"
            icon="el-icon-s-promotion"
            @click="oneClickIssue(row)"
          >
            {{ $t('operation_btn.btn_text_15') }}
          </el-button>
          <!-- 开闸 -->
          <el-button type="text" icon="el-icon-thumb" @click="openDoor(row)">
            {{ $t('operation_btn.btn_text_24') }}
          </el-button>
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="openIPSetting(row)"
          >
            {{ $t('operation_btn.btn_text_14') }}
          </el-button>
          <!-- 设置 -->
          <el-button type="text" icon="el-icon-setting" @click="handleSet(row)">
            {{ $t('device.text_27') }}
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
    ></el-pagination>

    <!-- 新增弹窗 -->
    <el-dialog
      :title="form.editIp ? $t('device.text_9') : $t('device.text_10')"
      :visible.sync="dialogFormVisible"
      width="400px"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-form
        ref="formInfo"
        :model="form"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <!-- IP地址 -->
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="form.IP"
            :placeholder="$t('device.text_4')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 名称 -->
        <el-form-item :label="$t('device.text_11')" prop="DeviceName">
          <el-input
            v-model="form.DeviceName"
            :placeholder="$t('device.text_3')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 进出类型 -->
        <el-form-item :label="$t('device.text_64')" prop="InOut">
          <el-radio-group v-model="form.InOut">
            <el-radio :label="-1">{{ $t('device.text_65') }}</el-radio>
            <el-radio :label="1">{{ $t('device.text_66') }}</el-radio>
            <el-radio :label="0">{{ $t('device.text_67') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="addDevice('formInfo')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 设备列表 -->
    <!-- 设备IP -->
    <el-dialog
      :title="
        IPList.length === 0
          ? $t('device.text_12')
          : `${$t('device.text_12')}(${IPList.length})`
      "
      :visible.sync="dialogTableVisible"
      :width="lang == 'zh_CN' ? '600px' : '700px'"
      :destroy-on-close="true"
      :before-close="closeFn"
    >
      <el-table
        ref="tableIP"
        v-loading="listLoading2"
        :data="IPList"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
        class="dialog_size"
        max-height="60vh"
      >
        <!-- IP地址 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('device.text_4')"
          prop="Item2"
        ></el-table-column>
        <!-- 设备型号 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('device.text_13')"
          prop="Item4"
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('device.text_6')">
          <template #default="{ row, idx }">
            <el-button type="text" icon="el-icon-edit" @click="addIP(row, idx)">
              {{ $t('operation_btn.btn_text_1') }}
            </el-button>
            <!-- 修改IP -->
            <el-button type="text" icon="el-icon-thumb" @click="editIP(row)">
              {{ $t('operation_btn.btn_text_25') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <p
        style="
          margin-top: 20px;
          color: red;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <span style="min-width: 60%">
          {{ $t('device.text_63') }}：{{ localIP[0] }}
          <span v-if="localIP[1]">/ {{ localIP[1] }}</span>
        </span>
        <span>{{ $t('device.text_61') }}</span>
      </p>
    </el-dialog>
    <!-- 搜索设备列表中修改IP信息 -->
    <el-dialog
      :title="$t('device.text_14')"
      :visible.sync="dialogIPVisible"
      width="350px"
      :destroy-on-close="true"
    >
      <el-form
        ref="IPform"
        :model="ipForm"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="IP" prop="IP">
          <el-input
            v-model="ipForm.IP"
            placeholder="IP"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 子网掩码 -->
        <el-form-item :label="$t('device.text_15')" prop="Netmask">
          <el-input
            v-model="ipForm.Netmask"
            :placeholder="$t('device.text_15')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 默认网关 -->
        <el-form-item :label="$t('device.text_16')" prop="gateway">
          <el-input
            v-model="ipForm.gateway"
            :placeholder="$t('device.text_16')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIPVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="changeIP('IPform')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置 -->
    <el-dialog
      :title="$t('device.text_27')"
      :visible.sync="dialogTypeVisible"
      :width="lang == 'zh_CN' ? '600px' : '800px'"
      :destroy-on-close="true"
      class="set_form"
    >
      <el-form
        ref="SetForm"
        :model="setForm"
        :rules="rules"
        :label-width="lang == 'zh_CN' ? '160px' : '230px'"
        size="medium"
      >
        <!-- 允许注册重复 -->
        <!-- <el-form-item :label="$t('device.text_29')">
          <el-switch
            v-model="setForm.dereplication"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
            :disabled="true"
          ></el-switch>
        </el-form-item> -->

        <!-- 补光模式 -->
        <el-form-item :label="$t('device.text_34')">
          <el-radio-group v-model="setForm.fillLight">
            <el-radio label="2">{{ $t('device.text_36') }}</el-radio>
            <el-radio label="1">{{ $t('device.text_35') }}</el-radio>
            <el-radio label="3">{{ $t('device.text_37') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 补光灵敏度 -->
        <!-- <el-form-item :label="$t('device.text_38')">
          <el-radio-group v-model="setForm.sensitivity">
            <el-radio label="low">{{ $t('device.text_39') }}</el-radio>
            <el-radio label="mid">{{ $t('device.text_40') }}</el-radio>
            <el-radio label="high">{{ $t('device.text_41') }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- 补光灯亮度 -->
        <el-form-item :label="$t('device.text_42')">
          <el-slider v-model="setForm.brightness" show-input></el-slider>
        </el-form-item>
        <!-- 音量大小 -->
        <el-form-item
          v-if="setForm.volume != 'no'"
          :label="$t('device.text_53')"
        >
          <el-slider v-model="setForm.volume" show-input></el-slider>
        </el-form-item>
        <!-- 活体检测 -->
        <el-form-item :label="$t('device.text_30')">
          <el-switch
            v-model="setForm.enableAlive"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
          ></el-switch>
        </el-form-item>
        <!-- 自动息屏 -->
        <el-form-item :label="$t('device.text_43')">
          <el-switch
            v-model="setForm.screensaver_mode"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
            active-value="extinguish"
            inactive-value="none"
          ></el-switch>
        </el-form-item>
        <!-- 陌生人上传 -->
        <el-form-item
          v-if="setForm.output_not_matched != 'no'"
          :label="$t('device.text_52')"
        >
          <el-switch
            v-model="setForm.output_not_matched"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
          ></el-switch>
        </el-form-item>
        <!-- 体温检测 -->
        <el-form-item :label="$t('device.text_31')">
          <el-switch
            v-model="setForm.enable"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
          ></el-switch>
        </el-form-item>
        <!-- 体温预警阀值 -->
        <el-form-item :label="$t('device.text_32')" prop="limit">
          <el-input
            v-model="setForm.limit"
            :placeholder="$t('device.text_33')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTypeVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="setting('SetForm')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 相机IP编辑 -->
    <el-dialog
      :title="$t('operation_btn.btn_text_14')"
      :visible.sync="dialogCameraVisible"
      :width="lang == 'zh_CN' ? '400px' : '500px'"
      :destroy-on-close="true"
    >
      <el-form
        ref="Cameraform"
        :model="ipParameters"
        :label-width="lang == 'zh_CN' ? '90px' : '190px'"
        :rules="rules"
        size="medium"
      >
        <!-- 名称 -->
        <el-form-item :label="$t('device.text_11')" prop="DeviceName">
          <el-input
            v-model="ipParameters.DeviceName"
            :placeholder="$t('device.text_3')"
          ></el-input>
        </el-form-item>
        <!-- IP -->
        <el-form-item :label="$t('device.text_4')" prop="ip">
          <el-input v-model="ipParameters.ip" placeholder="IP"></el-input>
        </el-form-item>
        <!-- 进出类型 -->
        <el-form-item :label="$t('device.text_64')" prop="inout">
          <el-radio-group v-model="ipParameters.inout">
            <el-radio :label="-1">{{ $t('device.text_65') }}</el-radio>
            <el-radio :label="1">{{ $t('device.text_66') }}</el-radio>
            <el-radio :label="0">{{ $t('device.text_67') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 子网掩码 -->
        <el-form-item
          :label="$t('device.text_15')"
          :prop="form.IsConnected ? 'netmask' : ''"
        >
          <el-input
            v-model="ipParameters.netmask"
            :placeholder="$t('device.text_15')"
            :disabled="!form.IsConnected"
          ></el-input>
        </el-form-item>
        <!-- 默认网关 -->
        <el-form-item
          :label="$t('device.text_16')"
          :prop="form.IsConnected ? 'gateway' : ''"
        >
          <el-input
            v-model="ipParameters.gateway"
            :placeholder="$t('device.text_16')"
            :disabled="!form.IsConnected"
          ></el-input>
        </el-form-item>
        <!-- DNS -->
        <el-form-item
          :label="$t('device.text_54')"
          :prop="form.IsConnected ? 'dns' : ''"
          style="color: #999"
        >
          <el-input
            v-model="ipParameters.dns"
            placeholder="dns"
            :disabled="!form.IsConnected"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCameraVisible = false">
          {{ $t('operation_btn.btn_text_4') }}
        </el-button>
        <el-button type="primary" @click="settingCameraIP('Cameraform')">
          {{ $t('operation_btn.btn_text_5') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDeviceList,
    addDevice,
    editDevice,
    openDoor,
    delDevice,
    getDeviceByLocal,
    changeIP,
    getCameraParameters,
    setCameraParameters,
    getCameraIp,
    setCameraIP,
    getLocalIp,
    getAllMyDevices,
  } from '@/api/device'
  import { toIssue2 } from '@/api/personnel'
  export default {
    name: 'DeviceIndex',
    data() {
      return {
        lang: this.$lang,
        list: [],
        listLoading: false, //列表加载
        layout: 'total',
        elementLoadingText: this.$t('operation_tips.tips_12'),
        page: {
          pageNo: 1,
          pageSize: 100,
          title: '',
          total: 0, //总数
        },
        dialogFormVisible: false, //表单弹窗控制
        // 新增
        form: {
          IP: '',
          DeviceName: '',
          InOut: -1,
        },
        rules: {
          IP: [
            {
              required: true,
              message: this.$t('device.text_17'),
              trigger: 'blur',
            },
            {
              pattern:
                /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_18'),
              trigger: 'blur',
            },
          ],
          DeviceName: [
            {
              required: true,
              message: this.$t('device.text_19'),
              trigger: 'blur',
            },
          ],
          Netmask: [
            {
              required: true,
              message: this.$t('device.text_20'),
              trigger: 'blur',
            },
            {
              pattern:
                /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
              message: this.$t('device.text_23'),
              trigger: 'blur',
            },
          ],
          gateway: [
            {
              required: true,
              message: this.$t('device.text_21'),
              trigger: 'blur',
            },
            {
              pattern:
                /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_22'),
              trigger: 'blur',
            },
          ],
          ip: [
            {
              required: true,
              message: this.$t('device.text_17'),
              trigger: 'blur',
            },
            {
              pattern:
                /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_18'),
              trigger: 'blur',
            },
          ],
          netmask: [
            {
              required: true,
              message: this.$t('device.text_20'),
              trigger: 'blur',
            },
            {
              pattern:
                /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
              message: this.$t('device.text_23'),
              trigger: 'blur',
            },
          ],
          dns: [
            {
              required: true,
              message: this.$t('device.text_55'),
              trigger: 'blur',
            },
            {
              pattern:
                /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
              message: this.$t('device.text_56'),
              trigger: 'blur',
            },
          ],
          limit: [
            {
              pattern: /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/,
              message: this.$t('device.text_50'),
              trigger: 'blur',
            },
          ],
        },
        dialogTableVisible: false, //表格弹窗控制
        IPList: [], //IP列表
        listLoading2: false,
        dialogIPVisible: false, //IP信息弹窗
        ipForm: {
          IP: '',
          Netmask: '',
          gateway: '',
        },

        dialogTypeVisible: false, //表格弹窗控制
        setForm: {
          dereplication: '', //允许注册重复
          enableAlive: '', //活体检测开关
          enable: '', //体温监测
          limit: '', //开闸体温限制数值
          fillLight: '', //补光模式
          sensitivity: '', //灵敏度
          brightness: '', //led亮度
          screensaver_mode: '', //屏保模式
          output_not_matched: 'no', //是否输出对比失败图像
          volume: 'no', //音量
        }, //设置

        ipParameters: {
          DeviceName: '',
          ip: '',
          netmask: '',
          gateway: '',
          dns: '',
          cameraIp: '',
          inout: -1,
        }, //相机ip参数
        dialogCameraVisible: false,

        localIP: [], //本地IP地址
      }
    },
    created() {
      this.init()
      this.localIP = getLocalIp()
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
              title: this.$t('operation_tips.tips_70'),
              element: '.btn_guide_a',
              intro: this.$t('operation_tips.tips_71'),
              position: 'bottom',
            },
          ]
          this.$intro()
            .setOptions({
              prevLabel: this.$t('operation_tips.tips_66'),
              nextLabel: this.$t('operation_tips.tips_67'),
              skipLabel: this.$t('operation_tips.tips_75'),
              doneLabel: this.$t('operation_tips.tips_67'),
              steps: data,
              exitOnOverlayClick: false, //是否允许点击空白处退出
              overlayOpacity: 0.6, //遮罩层的透明度
              showBullets: false, //是否使用点点点显示进度
              showProgress: false, //是否显示进度条
            })
            .oncomplete(() => {
              //点击结束按钮后执行的事件
              console.log('结束')
              this.$router.push('/personnel/personnelIndex')
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
      init() {
        this.listLoading = true
        this.loadMyDevices()
        setTimeout(() => {
          this.listLoading = false
          this.updateConnectState()
        }, 500)
        setInterval(() => {
          this.updateConnectState()
        }, 10000)
      },
      loadMyDevices() {
        let list = getAllMyDevices()
        list.forEach((element) => {
          element.IsConnected = false
        })
        this.list = list
        this.page.total = list.length
      },
      update() {
        this.listLoading = true
        setTimeout(() => {
          this.loadMyDevices()
          this.updateConnectState()
          this.listLoading = false
        }, 3000)
      },
      updateConnectState() {
        let state = getDeviceList()
        state.forEach((el) => {
          let idx = this.list.findIndex((e) => e.ipAddress === el.IP)
          if (idx !== -1) {
            this.list[idx].IsConnected = el.IsConnected
            if (el.DeviceNo) {
              this.list[idx].number = el.DeviceNo
            }
            this.list[idx].state = el
          }
        })
      },
      //一键下发
      oneClickIssue(row) {
        this.$baseConfirm(this.$t('operation_tips.tips_79'), null, () => {
          let res = toIssue2(row.id)
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_24'), 'success')
          } else {
            this.$baseMessage(this.$t('personnel.pl_17'), 'warning')
          }
        })
      },
      //开闸
      openDoor(row) {
        openDoor(row.ipAddress).then((res) => {
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_40'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_41'), 'warning')
          }
        })
      },
      // 删除
      handleDelete(row) {
        this.$baseConfirm(this.$t('operation_tips.tips_4'), null, () => {
          let res = delDevice(row.ipAddress)
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_6'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_5'), 'warning')
          }
          this.update()
        })
      },

      //打开弹窗 添加设备
      openFormDialog(ip, name, inout = -1) {
        this.form = {
          IP: ip,
          DeviceName: name,
          InOut: inout,
        }
        this.dialogFormVisible = true
      },
      //添加设备
      addDevice(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = addDevice(this.form)
            if (res.result == 2) {
              this.$baseMessage(this.$t('operation_tips.tips_8'), 'success')
              this.dialogFormVisible = false
              this.update()
            } else if (res.result == 1) {
              this.$baseMessage(this.$t('device.text_24'), 'warning')
            } else if (res.result == 3) {
              this.$baseMessage(this.$t('operation_tips.tips_9'), 'error')
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
          IP: '',
          DeviceName: '',
          InOut: -1,
        }
      },

      //打开表格弹窗 搜索设备
      openTabelDialog(type) {
        if (type !== 'update') {
          this.IPList = []
        }

        this.dialogTableVisible = true

        if (type !== 'update') {
          this.listLoading2 = true
          getDeviceByLocal().then((res) => {
            this.IPList = res
            this.listLoading2 = false
            //添加设备后没有搜索到设备关闭会话框
            //if (type == 'update' && this.IPList.length == 0) {
            //  this.dialogTableVisible = false
            //}
          })
        }
      },
      //添加IP
      addIP(row, idx) {
        this.openFormDialog(row.Item2)
      },

      // 搜索设备列表修改ip
      editIP(row) {
        this.dialogIPVisible = true
        let a = row.Item2.split('.')
        this.ipForm = {
          mac: row.Item1,
          IP: row.Item2,
          Netmask: row.Item3,
          gateway: row.Item5
            ? row.Item5
            : a[0] + '.' + a[1] + '.' + a[2] + '.1',
        }
      },
      //修改ip
      changeIP(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            changeIP(this.ipForm)
            this.dialogIPVisible = false
            this.listLoading2 = true
            setTimeout(() => {
              this.openTabelDialog()
            }, 3000)
          } else {
            return false
          }
        })
      },

      //打开相机参数设置
      handleSet(row) {
        if (!row.IsConnected) {
          this.$baseMessage(this.$t('device.text_47'), 'warning')
          return
        }
        let res = getCameraParameters(row.ipAddress)
        if (res == -1) {
          this.$baseMessage(this.$t('device.text_51'), 'warning')
          return
        }
        this.dialogTypeVisible = true
        // console.log('res', res)
        this.setForm = {
          ip: row.ipAddress,
          // dereplication: res.face.enable_dereplication, //允许注册重复
          dereplication: 'false', //允许注册重复
          enableAlive: res.face.enable_alive, //活体检测开关
          enable: res.face.body_temperature.enable, //体温监测
          limit: Number(res.face.body_temperature.limit).toFixed(2).toString(), //开闸体温限制数值
          fillLight: res.led_control.led_mode.toString(), //补光模式
          sensitivity: res.led_control.led_sensitivity, //灵敏度
          brightness: res.led_control.led_brightness, //led亮度
          screensaver_mode: res.screensaver_mode
            ? res.screensaver_mode
            : 'none', //屏保模式
          output_not_matched:
            res.face.output_not_matched == true ||
            res.face.output_not_matched == false
              ? res.face.output_not_matched
              : 'no',
          volume: res.volume ? Number(res.volume) : 'no',
        }
        // console.log(this.setForm)
      },
      // 设置相机参数
      setting(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = setCameraParameters(this.setForm)
            if (res) {
              this.$baseMessage(this.$t('device.text_48'), 'success')
              this.dialogTypeVisible = false
              this.update()
            } else {
              this.$baseMessage(this.$t('device.text_49'), 'warning')
            }
          } else {
            return false
          }
        })
      },

      //打开相机ip设置
      openIPSetting(row) {
        this.dialogCameraVisible = true
        this.form = row
        this.ipParameters = {
          DeviceName: row.DeviceName,
          ip: row.ipAddress,
          netmask: '',
          gateway: '',
          dns: '',
          cameraIp: row.ipAddress,
          inout: row.IsEnter,
        }
        if (row.IsConnected) {
          let res = getCameraIp(row.state.IP)
          this.ipParameters = {
            DeviceName: row.state.DeviceName,
            ip: row.state.IP,
            netmask: res.netmask,
            gateway: res.gateway,
            dns: res.dns,
            cameraIp: row.state.IP,
            inout: row.IsEnter,
          }
        }
      },
      // 设置相机ip
      settingCameraIP(formName) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.9)',
        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let res = ''
            if (this.form.IsConnected) {
              res = setCameraIP(this.ipParameters)
              // console.log('res', res)
            }
            let data = {
              editIp: this.ipParameters.cameraIp,
              IP: this.ipParameters.ip,
              DeviceName: this.ipParameters.DeviceName,
              InOut: this.ipParameters.inout,
            }
            // console.log('data', this.form, data, this.ipParameters)
            setTimeout(() => {
              let result = editDevice(data)
              // console.log('result', result)
              if (!this.form.IsConnected) {
                if (result && result.result == 2 && !this.form.IsConnected) {
                  this.$baseMessage(this.$t('device.text_48'), 'success')
                  this.dialogCameraVisible = false
                  this.update()
                } else {
                  this.$baseMessage(this.$t('device.text_49'), 'warning')
                }
              } else {
                this.$baseMessage(this.$t('device.text_62'), 'success')
                this.dialogCameraVisible = false
                this.update()
              }
              loading.close()
            }, 1500)
          } else {
            loading.close()
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .tips {
    margin-bottom: 0 !important;
    margin-left: 20px;
  }
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
  .set_form .el-form-item__label {
    padding-right: 30px !important;
  }
  .dialog_size {
    max-height: 70vh;
    overflow-y: scroll;
  }
  .dialog_size::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }
  .dialog_size::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }
  .dialog_size::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .dialog_size::-webkit-scrollbar-track:hover {
    background-color: #f8fafc;
  }
</style>
