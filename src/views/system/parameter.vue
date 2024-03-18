<template>
  <div class="table-container">
    <ul>
      <!-- 下发方式 -->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.text_7') }}</span>
          <el-switch
            v-model="value"
            :active-text="$t('system.text_8')"
            :inactive-text="$t('system.text_9')"
            @change="setParam"
          ></el-switch>
        </div>
        <span class="item_tips">*{{ $t('system.text_10') }}</span>
      </li>
      <!-- 自动下发 -->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.auto_issue') }}</span>
          <el-switch
            v-model="autoIssue"
            :active-text="$t('system.auto_issue')"
            :inactive-text="$t('system.manual_issue')"
            @change="setParam2"
          ></el-switch>
        </div>
      </li>
      <!-- 时间同步 -->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('device.text_58') }}</span>
          <el-tooltip
            :content="
              synchronizationTime ? $t('device.text_59') : $t('device.text_60')
            "
            placement="top"
          >
            <el-switch
              v-model="synchronizationTime"
              :active-text="$t('device.text_59')"
              :inactive-text="$t('device.text_60')"
              @change="setSynchronizationTime"
            ></el-switch>
          </el-tooltip>
        </div>
      </li>
      <!-- 温度格式 -->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.title_temperature') }}</span>
          <el-tooltip
            :content="
              showTemperatureInCelsius
                ? $t('system.text_celsius')
                : $t('system.text_fahreinheit')
            "
            placement="top"
          >
            <el-switch
              v-model="showTemperatureInCelsius"
              :active-text="$t('system.text_celsius')"
              :inactive-text="$t('system.text_fahreinheit')"
              @change="setShowTemperature"
            ></el-switch>
          </el-tooltip>
        </div>
      </li>
      <!--人员属性-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('personnel.text_4') }}</span>
          <el-popover
            v-model="showExtra"
            placement="bottom"
            width="200"
            trigger="manual"
          >
            <div style="max-height: 90vh; overflow: scroll">
              <el-form ref="form" :model="form" label-width="80px" size="mini">
                <el-form-item :label="$t('personnel.property') + 1">
                  <el-input v-model="form.extra1"></el-input>
                </el-form-item>
                <el-form-item :label="$t('personnel.property') + 2">
                  <el-input v-model="form.extra2"></el-input>
                </el-form-item>
                <el-form-item :label="$t('personnel.property') + 3">
                  <el-input v-model="form.extra3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('personnel.property') + 4">
                  <el-input v-model="form.extra4"></el-input>
                </el-form-item>
                <el-form-item :label="$t('personnel.property') + 5">
                  <el-input v-model="form.extra5"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="onSubmit"
                  >
                    {{ $t('operation_btn.btn_text_5') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-link
              slot="reference"
              type="primary"
              @click="showExtra = !showExtra"
            >
              {{ $t('attendanceSet.text_66') }}
              <i v-if="!showExtra" class="el-icon-arrow-down"></i>
              <i v-else class="el-icon-arrow-up"></i>
            </el-link>
          </el-popover>
        </div>
      </li>
      <!--平台id-->
      <li v-if="lang == 'zh_CN'" class="setting_row">
        <div class="set_item">
          <span class="item_title">下发平台</span>
          <el-select
            v-model="worksiteId"
            placeholder="请选择平台"
            filterable
            @change="setParamWorksiteId"
          >
            <el-option
              v-for="item in worksiteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="setting_row"></li>
      <!--分割线-->
      <el-divider></el-divider>
      <!--自动获取抓拍记录-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.auto_capture_syn') }}*</span>
          <el-switch
            v-model="autoCaptureSyn"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
            @change="setParamCaptureSyn"
          ></el-switch>
        </div>
      </li>
      <!--自动获取设备人员-->
      <!-- <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.auto_datasyn') }}*</span>
          <el-switch
            v-model="autoDataSyn"
            :active-text="$t('device.text_28')"
            :inactive-text="$t('device.text_44')"
            @change="setParamDatasyn"
          ></el-switch>
        </div>
      </li> -->
      <!--自定义系统名称-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <el-switch
            v-model="enableLongTitle"
            :active-text="$t('system.title_10')"
            @change="enableLongTitleOuter"
          ></el-switch>
          <el-input
            v-model="longTitle"
            style="width: 200px"
            :disabled="!enableLongTitle"
            @input="setLongTitleOuter"
          />
        </div>
      </li>

      <!--自定义系统简称-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <el-switch
            v-model="enableShortTitle"
            :active-text="$t('system.title_11')"
            @change="enableShortTitleOuter"
          ></el-switch>
          <el-input
            v-model="shortTitle"
            style="width: 200px"
            :disabled="!enableShortTitle"
            @change="setShortTitleOuter"
          />
        </div>
      </li>
      <!--隐藏页面-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.title_12') }}</span>
          <el-switch
            v-model="hideAttendanceManagementPage"
            :active-text="$t('router.title_16')"
            @change="hideAttendanceManagementPageOuter"
          ></el-switch>
          <el-switch
            v-model="hideAttendanceConfigPage"
            :active-text="$t('router.title_13')"
            @change="hideAttendanceConfigPageOuter"
          ></el-switch>
        </div>
      </li>
      <!--数据目录-->
      <li class="setting_row">
        <div
          class="set_item"
          :style="
            lang == 'en_US'
              ? 'width:800px'
              : lang == 'Fr_fr'
              ? 'width:950px'
              : lang == 'Jan_JPN'
              ? 'width:600px'
              : ''
          "
        >
          <span class="item_title">{{ $t('system.data_folder') }}</span>
          <label
            style="
               {
                flex-grow: 1;
              }
            "
          >
            {{ dataFolder }}
          </label>
          <el-button @click="openFolder">{{ $t('common.open') }}</el-button>
        </div>
      </li>
    </ul>
    <p class="item_tips">{{ $t('system.text_11') }}</p>
  </div>
</template>

<script>
  import { setSwitch, getSwitch } from '@/api/device'
  import {
    setParamWorkSite,
    setParamCaptureSyn,
    setParamDatasyn,
    setParam,
    setParam2,
    getParam,
    enableLongTitle,
    setLongTitle,
    enableShortTitle,
    setShortTitle,
    hideAttendanceManagementPage,
    hideAttendanceConfigPage,
    getUserConfigObject,
    setShowTemperatueInCelsius,
    setPersonProperty,
    getPersonProperty,
    getDataFolderPath,
    openFolder,
  } from '@/api/sysPage'
  export default {
    name: 'Parameter',
    data() {
      return {
        lang: this.$lang,
        value: false,
        synchronizationTime: false, //是否同步时间
        enableLongTitle: false,
        longTitle: '',
        enableShortTitle: false,
        shortTitle: '',
        hideAttendanceManagementPage: false,
        hideAttendanceConfigPage: false,
        showTemperatureInCelsius: true,
        autoIssue: true,
        autoDataSyn: false,
        autoCaptureSyn: true,
        showExtra: false,
        form: {
          extra1: '',
          extra2: '',
          extra3: '',
          extra4: '',
          extra5: '',
        },
        dataFolder: '',
        worksiteId: '', //多平台id
        //平台id列表
        worksiteOptions: [
          { value: '', label: '无' },
          { value: '000001', label: '华安视讯' },
          { value: '000002', label: '济工网' },
          { value: '000003', label: '成都住建部' },
          { value: '000004', label: '浙江工汇' },
          { value: '000005', label: '浙江工汇_成都住建部' },
          { value: '000006', label: '阿里云IOT' },
          { value: '000007', label: '聊城实名制平台' },
          { value: '000009', label: '赣州市建筑工人劳务实名制' },
          { value: '000010', label: '福建平台' },
          { value: '000011', label: '广东平台' },
          { value: '000012', label: '广联达' },
          { value: '000013', label: '武汉平台' },
          { value: '000014', label: '山东省农民工支付平台' },
          { value: '000015', label: '沈阳住建局' },
          { value: '000016', label: '黄石汇聚平台' },
          { value: '000017', label: '数字雄安建设管理平台' },
          { value: '000018', label: '山西住建局' },
          { value: '000019', label: '辽宁盘锦住建局' },
          { value: '000020', label: '云启平台' },
          { value: '000021', label: '黑龙江住建局平台' },
          { value: '000022', label: '信禾巴士' },
          { value: '000023', label: '烽火平台' },
          { value: '000024', label: '宁图平台' },
          { value: '000025', label: '喜鹊云社区平台' },
          { value: '000026', label: '中铁建工智慧管控云平台' },
          { value: '000027', label: '呼呼智慧工地平台' },
          { value: '000028', label: 'linkface2.0' },
          { value: '000029', label: '福建地体平台' },
          { value: '000031', label: '南方电网' },
          { value: '000032', label: '边缘网关（阿里）' },
          { value: '000033', label: '海南实名制' },
          { value: '000034', label: '中山实名制' },
          { value: '000035', label: '会基' },
          { value: '000036', label: '佛山南海实名制' },
          { value: '000037', label: '上海电力系统' },
          { value: '000040', label: '福建顶点' },
          { value: '000041', label: '深圳住建局' },
          { value: '000042', label: '安徽平台' },
          { value: '000044', label: '湖北黄岗' },
          { value: '000046', label: '中建云筑网' },
          { value: '000045', label: '奥力工地平台' },
          { value: '000047', label: '陕西广联达' },
          { value: '000049', label: '智奇实业' },
          { value: '000050', label: '湖南住建局' },
          { value: '000055', label: '闪电face' },
          { value: '000056', label: '安一（珠海A3协议）' },
          { value: '000058', label: '杭州品茗' },
          { value: '000063', label: '横琴' },
          { value: '000065', label: '邦客惠(卡联)' },
          { value: '000067', label: '济南住建平台' },
          { value: 'nvr', label: 'nvr设备' },
          { value: 'workweixin', label: '企业微信' },
          { value: '000069', label: '云南建筑平台' },
          { value: '000070', label: '宁图阜阳(http)' },
          { value: '000073', label: '建造工平台' },
          { value: '000076', label: '重庆智慧工地平台' },
          { value: '000077', label: '好工易平台' },
          { value: '000078', label: '横琴鹤州' },
          { value: '000080', label: '工匠易' },
          { value: '000082', label: '腾辉工地端' },
          { value: '000083', label: '贵州智联（和校园）' },
          { value: '000085', label: '广州住建局' },
          { value: '000079', label: '江西实名制' },
          { value: '000086', label: '鼎力兴' },
          { value: '000087', label: '江门住建监管平台' },
          { value: '000088', label: '合肥实名制平台' },
          { value: '000089', label: 'SH01' },
          { value: '000090', label: '腾辉云筑网' },
          { value: '000091', label: '云雄智慧平台' },
          { value: '000092', label: '佛山工地XY' },
          { value: '000093', label: '中建八局' },
          { value: '000094', label: '中山建筑工地' },
          { value: '000095', label: '珠海腾辉' },
          { value: '000096', label: '设备统一接入平台' },
          { value: '000097', label: '泥蜂平台' },
          { value: '000098', label: '华西智建通平台' },
          { value: '000100', label: '四川省建筑工人管理服务平台' },
          { value: '000101', label: '18号线三期机电装修工区' },
          { value: '000102', label: '内蒙实名制' },
          { value: '000103', label: '宜宾住建局' },
          { value: '000104', label: '一指通' },
          { value: '000105', label: '西安电信疫情防控设备管理平台' },
          { value: '000106', label: '河南郑州平台' },
          { value: '000107', label: '济南轨道' },
          { value: '000108', label: '闽粤北京市政' },
          { value: '000109', label: '新疆实名制' },
          { value: '000110', label: '新疆阿克苏平台' },
          { value: '000111', label: '海鸥平台' },
          { value: '000112', label: '济工旧版本' },
          { value: '000113', label: '德州智慧工地平台' },
          { value: '000114', label: '乐云宝' },
          { value: '000115', label: '河南住建' },
          { value: '000116', label: '浙里建(杭州平台)' },
          { value: '000117', label: '新点智慧工地' },
          { value: '000118', label: '万润平台' },
          { value: '000119', label: '北京住建平台' },
          { value: '000120', label: '华瑆平台(宁波平台)' },
          { value: '000121', label: '新疆云雄平台' },
          { value: '000122', label: '青海' },
          { value: '000123', label: '山西劳务监督平台' },
          { value: '000124', label: '济南智慧工地平台' },
          { value: '000125', label: '广州住建局V3.0' },
          { value: '000126', label: '易建云平台' },
          { value: '000127', label: '湖北黄冈实名制' },
          { value: '000128', label: '珠海腾辉水利' },
          { value: '000129', label: '衢州平台' },
          { value: '000130', label: '德阳住建' },
          { value: '000131', label: '程象智慧工地' },
          { value: '000132', label: '中铁施工协管平台' },
          { value: '000133', label: '浙江丽水' },
          { value: '000134', label: '滁州平台' },
          { value: '000135', label: '湖北住建局' },
          { value: '000136', label: '雄安' },
          { value: '000137', label: '云筑劳务行业版' },
          { value: '000138', label: '成都建工' },
          { value: '000139', label: '智建通' },
        ],
      }
    },
    created() {
      const cfg = getUserConfigObject()
      this.synchronizationTime = getSwitch()
      this.value = getParam()
      this.form = getPersonProperty()
      this.enableLongTitle = cfg.EnableTitleLong
      this.longTitle = cfg.TitleLong
      this.shortTitle = cfg.TitleShort
      this.enableShortTitle = cfg.EnableTitleShort
      this.hideAttendanceManagementPage = cfg.HideAttendanceManagementPage
      this.hideAttendanceConfigPage = cfg.HideAttendanceConfigPage
      this.showTemperatureInCelsius = cfg.ShowTemperatureInCelsius === true
      this.autoIssue = cfg.AutoIssue
      this.autoDataSyn = cfg.AutoDataSyn
      this.autoCaptureSyn = cfg.AutoCaptureSyn
      this.dataFolder = getDataFolderPath()
      this.worksiteId = cfg.WorksiteId
      console.log(cfg)
      // console.log('this.autoDataSyn', this.autoDataSyn)
    },
    methods: {
      //设置多平台ID
      setParamWorksiteId(e) {
        try {
          console.log(e)
          setParamWorkSite(e)
          this.$baseMessage('设置成功', 'success')
        } catch (error) {
          console.log(error)
          this.$baseMessage('设置失败', 'warning')
        }
      },
      //设置自动获取抓拍记录
      setParamCaptureSyn(e) {
        try {
          setParamCaptureSyn(e)
          this.$baseMessage(this.$t('device.text_48'), 'success')
        } catch (error) {
          this.$baseMessage(this.$t('device.text_49'), 'warning')
        }
      },
      //设置自动同步设备人员
      setParamDatasyn(e) {
        try {
          setParamDatasyn(e)
          this.$baseMessage(this.$t('device.text_48'), 'success')
        } catch (error) {
          this.$baseMessage(this.$t('device.text_49'), 'warning')
        }
      },
      //设置下发方式
      setParam(e) {
        let res = setParam(e)
        if (res) {
          this.$baseMessage(this.$t('device.text_48'), 'success')
        } else {
          this.value = !this.value
          this.$baseMessage(this.$t('device.text_49'), 'warning')
        }
      },
      //设置下发方式(自动/手动)
      setParam2(e) {
        try {
          setParam2(e)
          this.$baseMessage(this.$t('device.text_48'), 'success')
        } catch (error) {
          this.$baseMessage(this.$t('device.text_49'), 'warning')
        }
      },
      //设置同步时间
      setSynchronizationTime(e) {
        let res = setSwitch(e)
        if (res) {
          this.$baseMessage(this.$t('device.text_48'), 'success')
        } else {
          this.synchronizationTime = !this.synchronizationTime
          this.$baseMessage(this.$t('device.text_49'), 'warning')
        }
      },
      enableLongTitleOuter(e) {
        enableLongTitle(e.toString())
      },
      setLongTitleOuter() {
        setLongTitle(this.longTitle)
      },
      setShortTitleOuter() {
        setShortTitle(this.shortTitle)
      },
      enableShortTitleOuter(e) {
        enableShortTitle(e.toString())
      },
      hideAttendanceManagementPageOuter(e) {
        hideAttendanceManagementPage(e.toString())
      },
      hideAttendanceConfigPageOuter(e) {
        hideAttendanceConfigPage(e.toString())
      },
      setShowTemperature() {
        setShowTemperatueInCelsius(this.showTemperatureInCelsius)
      },
      onSubmit() {
        setPersonProperty(this.form)
        this.$nextTick(() => {
          this.showExtra = !this.showExtra
        })
      },
      openFolder() {
        this.dataFolder && openFolder(this.dataFolder)
      },
    },
  }
</script>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
  }
  .setting_row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .set_item {
      width: 500px;
      height: 50px;
      border-radius: 5px;
      border: 1px solid rgb(32, 160, 255, 0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin-right: 30px;
      .item_title {
        font-size: 16px;
      }
    }
    .set_item:hover {
      box-shadow: 1px 1px 5px rgb(32, 160, 255, 0.6);
    }
    .item_tips {
      flex: 1;
      color: red;
    }
  }
</style>
