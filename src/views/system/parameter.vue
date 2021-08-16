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
      <!--自定义标题-->
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
        <span class="item_tips">*{{ $t('system.text_11') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { setSwitch, getSwitch } from '@/api/device'
  import {
    setParam,
    getParam,
    enableLongTitle,
    setLongTitle,
    getEnableLongTitle,
    getLongTitle,
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
      }
    },
    created() {
      this.synchronizationTime = getSwitch()
      this.value = getParam()
      this.enableLongTitle = getEnableLongTitle()
      this.longTitle = getLongTitle()
    },
    methods: {
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
