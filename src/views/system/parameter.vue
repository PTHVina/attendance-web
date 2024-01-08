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
      // console.log(cfg)
      // console.log('this.autoDataSyn', this.autoDataSyn)
    },
    methods: {
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
