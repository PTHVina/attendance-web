<template>
  <div id="content" ref="videoBox" class="test-container">
    <div ref="videoList" class="device_box">
      <div class="device_title">{{ $t('device.text_25') }}</div>
      <ul class="device_list">
        <li
          v-for="item in options"
          :key="item.Deviceid"
          @dblclick.stop="playVideo(item)"
        >
          <span>{{ item.DeviceName }}</span>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('device.text_26')"
            placement="top-end"
          >
            <i class="icon el-icon-video-play" @click="playVideo(item)"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('operation_btn.btn_text_24')"
            placement="top-end"
          >
            <i class="icon el-icon-thumb" @click="openDoor(item)"></i>
          </el-tooltip>
        </li>
      </ul>
      <div class="scale-container">
        <label for="">{{ $t('device.playerPosAdjustment') }}</label>
        <el-input-number
          v-model="scaleInPercent"
          controls-position="right"
          :min="100"
          :max="300"
          step="1"
          @change="setScale"
        ></el-input-number>
      </div>
    </div>
    <div ref="player" class="player"></div>
  </div>
</template>
<script>
  import {
    getDeviceList,
    play,
    closePage,
    openDoor,
    setPlayerPos,
    displayPlayer,
  } from '@/api/device'
  import { getUserConfigObject, setScaleInPercent } from '@/api/sysPage'
  export default {
    name: 'Online',
    data() {
      return {
        value: '', //设备ip
        options: [], //设备列表
        box_num: 1, //选择按钮编号
        scaleInPercent: 100,
      }
    },
    created() {},
    mounted() {
      let config = getUserConfigObject()
      this.scaleInPercent = config.CurrentScaleInPercent

      this.init()
    },
    beforeDestroy() {
      closePage()
    },
    methods: {
      playerPos() {
        let boundingRect = this.$refs.player.getBoundingClientRect()
        let left = (boundingRect.left * this.scaleInPercent) / 100
        let top = (boundingRect.top * this.scaleInPercent) / 100
        let width = (boundingRect.width * this.scaleInPercent) / 100
        let height = (boundingRect.height * this.scaleInPercent) / 100

        return {
          left,
          top,
          width,
          height,
        }
      },
      init() {
        let list = getDeviceList()
        this.options = list
        setPlayerPos(this.playerPos())
        displayPlayer()
      },

      changeVideoType(num) {
        this.box_num = num
      },

      //播放视频
      playVideo(item) {
        play(item.IP)
      },

      openDoor(item) {
        openDoor(item.IP).then((res) => {
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_40'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_41'), 'warning')
          }
        })
      },

      setScale() {
        setScaleInPercent(this.scaleInPercent)
        setPlayerPos(this.playerPos())
      },
    },
  }
</script>

<style lang="scss" scoped>
  .player {
    flex: 1;
  }
  #content {
    height: calc(100vh - 145px) !important;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .videoPage {
    width: calc(100% - 280px);
    height: 100%;
    background: #333;
    .video_title {
      width: 100%;
      height: 40px;
      padding: 5px 10px;
      border-bottom: 1px solid #999;
      box-sizing: border-box;
      .title_btn {
        display: inline-block;
        width: 44px;
        height: 30px;
        margin-right: 6px;
        background-image: url('../../assets/video_btn.png');
        background-repeat: no-repeat;
        background-size: auto 30px;
        cursor: pointer;
      }
      .title_btn:hover {
        background-image: url('../../assets/video_btn_2.png');
      }
      .is_active {
        background-image: url('../../assets/video_btn_2.png');
      }
      .btn_1 {
        background-position: 0 0;
      }
      .btn_2 {
        background-position: -46px 0;
      }
      .btn_3 {
        background-position: -93px 0;
      }
      .btn_4 {
        background-position: -139px 0;
      }
      .btn_5 {
        background-position: -186px 0;
      }
      .btn_6 {
        background-position: -232px 0;
      }
      .btn_7 {
        background-position: -279px 0;
      }
      .btn_8 {
        background-position: -325px 0;
      }
      .btn_9 {
        background-position: -372px 0;
      }
      .btn_10 {
        background-position: -418px 0;
      }
      .btn_11 {
        background-position: -465px 0;
      }
      .btn_12 {
        background-position: -511px 0;
      }
    }
    .video_box {
      width: 100%;
      height: calc(100% - 45px);
      padding-top: 5px;
      > div {
        width: calc(100% - 5px);
        height: 100%;
        padding-left: 5px;
        > div {
          border: 1px solid #999;
          box-sizing: border-box;
          margin-bottom: 5px;
          margin-right: 5px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          video {
            width: 100%;
            height: calc(100% - 32px);
            background: #333;
          }
          .video_btn {
            width: calc(100% - 20px);
            height: 30px;
            background: #666;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            color: #ccc;
            font-size: 20px;
            span {
              cursor: pointer;
            }
          }
        }
      }
      .box_1 > div {
        width: calc(100% - 5px);
        height: calc(100% - 5px);
      }
      .box_2,
      .box_3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          width: calc(50% - 5px);
          height: calc(100% - 5px);
        }
      }
      .box_3 > div {
        height: calc(50% - 5px);
      }
      .box_4 {
        > div {
          float: left;
          width: calc(33.3% - 5px);
          height: calc(33.3% - 5px);
        }
        > div:nth-child(1) {
          float: left;
          width: calc(66.6% - 5px);
          height: calc(100% - 5px);
        }
      }
      .box_5 {
        > div {
          float: left;
          width: calc(33.3% - 5px);
          height: calc(33.3% - 5px);
        }
        > div:nth-child(1) {
          float: left;
          width: calc(66.6% - 5px);
          height: calc(66.6% - 5px);
        }
      }
      .box_6 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          width: calc(33.3% - 5px);
          height: calc(50% - 5px);
        }
      }
      .box_7 {
        > div {
          float: left;
          width: calc(25% - 5px);
          height: calc(25% - 5px);
        }
        > div:nth-child(1) {
          float: left;
          width: calc(75% - 5px);
          height: calc(75% - 5px);
        }
      }
      .box_8 {
        > div {
          float: left;
          width: calc(25% - 5px);
          height: calc(33.3% - 5px);
        }
        > div:nth-child(1) {
          float: left;
          width: calc(50% - 5px);
          height: calc(66.6% - 5px);
        }
      }
      .box_9 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          width: calc(33.3% - 5px);
          height: calc(33.3% - 5px);
        }
      }
      .box_10 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          width: calc(25% - 5px);
          height: calc(33.3% - 5px);
        }
        > div:nth-child(1),
        > div:nth-child(2) {
          width: calc(50% - 5px);
          height: calc(33.3% - 5px);
        }
      }
      .box_11 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          width: calc(25% - 5px);
          height: calc(33.3% - 5px);
        }
      }
      .box_12 {
        position: relative;
        > div {
          float: left;
          width: calc(25% - 5px);
          height: calc(25% - 5px);
        }
        > div:nth-child(6) {
          float: left;
          width: calc(50% - 5px);
          height: calc(50% - 5px);
        }
        > div:last-child {
          width: calc(25% - 7px);
          position: absolute;
          top: 50%;
          left: 5px;
        }
      }
    }
  }

  .device_list::-webkit-scrollbar {
    width: 5px;
  }
  .device_list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  .device_list::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0);
  }
  .device_box {
    // height: 850px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .device_title {
    width: 250px;
    height: 35px;
    border-radius: 5px 5px 0 0;
    border: 1px solid #eee;
    border-bottom: none;
    text-align: center;
    line-height: 35px;
    font-size: 16px;
    color: #1890ff;
    background: #fafafa;
    position: relative;
    z-index: 2;
  }
  .device_list {
    width: 230px;
    // height: 836px;
    flex: 1;
    margin: 0;
    padding: 10px;
    list-style: none;
    overflow-y: scroll;
    background: white;
    border: 1px solid #eee;
    border-radius: 0 0 5px 5px;
    li {
      width: calc(100% - 20px);
      min-height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      span {
        flex: 1;
        margin-right: 10px;
      }
      .item {
        display: none;
      }
      i {
        font-size: 20px;
        cursor: pointer;
        color: #1890ff;
      }
    }
    li:hover {
      background: rgba($color: #1890ff, $alpha: 0.1);
      color: #1890ff;
      .item {
        display: inline-block;
      }
    }
    li:last-child() {
      border: none;
    }
  }
  .scale-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
