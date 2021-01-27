<template>
  <div id="content" ref="videoBox" class="test-container">
    <div class="select">
      <el-select
        v-model="value"
        :placeholder="$t('device.text_25')"
        style="width: 150px"
      >
        <el-option
          v-for="item in options"
          :key="item.Deviceid"
          :label="item.DeviceName"
          :value="item.IP"
        ></el-option>
      </el-select>
      <el-button
        class="btn"
        icon="el-icon-caret-right"
        type="primary"
        @click="playVideo"
      >
        {{ $t('device.text_26') }}
      </el-button>
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
      // this.box_width = this.$refs.videoBox.offsetWidth - 40
      // this.box_height = this.$refs.videoBox.offsetHeight - 60 - 53
      // this.box_left = this.$refs.videoBox.getBoundingClientRect().left + 20
      // this.box_top = this.$refs.videoBox.getBoundingClientRect().top + 93
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
      playVideo() {
        if (!this.value) {
          this.$baseMessage(this.$t('device.text_25'), 'warning')
          return
        }
        play(this.value)
      },
    },
  }
</script>

<style>
  .select {
    padding-bottom: 20px;
    position: relative;
    z-index: 99999 !important;
  }
  .btn {
    margin-left: 10px;
  }
  .video_box {
    width: 100% !important;
    height: 100% !important;
    background: red;
  }
</style>
