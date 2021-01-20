<template>
  <div class="test-container" ref="videoBox" id="content">
    <div class="select">
      <el-select v-model="value" placeholder="请选择设备">
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
        播放视屏
      </el-button>
    </div>
    <div class="video_box row">
      <div class="col-12">
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDeviceList, play, setDome } from '@/api/device'
  export default {
    name: 'online',
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
      this.box_width = this.$refs.videoBox.offsetWidth - 40
      this.box_height = this.$refs.videoBox.offsetHeight - 60 - 53
      this.box_left = this.$refs.videoBox.getBoundingClientRect().left + 20
      this.box_top = this.$refs.videoBox.getBoundingClientRect().top + 93
      this.init()
    },
    beforeDestroy() {
      console.log(111111)
      let data = {
        width: 0,
        height: 0,
        locationW: 0,
        locationH: 0,
      }
      setDome(data)
    },
    destroyed() {
      console.log(22222)
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
          this.$baseMessage('请选择设备', 'warning')
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
    z-index: 99999;
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
