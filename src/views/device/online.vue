<template>
  <div id="content" ref="videoBox" class="test-container">
    <div class="device_box">
      <div class="device_title">{{ $t('device.text_25') }}</div>
      <ul class="device_list">
        <li v-for="item in options" :key="item.Deviceid">
          <span>{{ item.DeviceName }}</span>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('device.text_26')"
            placement="top-end"
          >
            <i class="icon el-icon-video-play" @click="playVideo(item)"></i>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { getDeviceList, play, setDome, closePage } from '@/api/device'
  export default {
    name: 'Online',
    data() {
      return {
        value: '', //设备ip
        options: [], //设备列表
        box_width: '', //容器宽度
        box_height: '', //容器高度
        box_left: '', //容器位置
        box_top: '', //容器位置
      }
    },
    created() {},
    mounted() {
      this.box_width = this.$refs.videoBox.offsetWidth - 300
      this.box_height = this.$refs.videoBox.offsetHeight
      this.box_left = this.$refs.videoBox.getBoundingClientRect().left + 300
      this.box_top = this.$refs.videoBox.getBoundingClientRect().top
      this.init()
    },
    beforeDestroy() {
      closePage()
    },
    methods: {
      init() {
        let list = getDeviceList()
        this.options = list
        let data = {
          width: this.box_width,
          height: this.box_height,
          locationW: this.box_left,
          locationH: this.box_top,
        }
        setDome(data)
      },
      playVideo(item) {
        play(item.IP)
      },
    },
  }
</script>

<style lang="scss">
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
    height: 850px;
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
</style>
