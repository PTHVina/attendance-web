<template>
  <div v-cloak class="index-container">
    <ul class="home_list">
      <li class="box_item">
        <div class="item_title">
          <!-- <i class="el-icon-s-custom"></i> -->
          <vab-icon :icon="['fas', 'user-friends']"></vab-icon>
        </div>
        <!-- 注册人数 -->
        <div class="item_body">
          <span class="item_num">{{ tag.reg }}</span>
          <span class="item_tips">{{ $t('home.text_1') }}</span>
        </div>
      </li>
      <!-- 设备数量 -->
      <li class="box_item">
        <div class="item_title">
          <!-- <i class="el-icon-s-promotion"></i> -->
          <vab-icon :icon="['fas', 'video']"></vab-icon>
        </div>
        <div class="item_body">
          <span class="item_num">{{ tag.device }}</span>
          <span class="item_tips">{{ $t('home.text_2') }}</span>
        </div>
      </li>
      <!-- 在线设备数 -->
      <li class="box_item">
        <div class="item_title">
          <i class="el-icon-s-help"></i>
        </div>
        <div class="item_body">
          <span class="item_num">{{ tag.online }}</span>
          <span class="item_tips">{{ $t('home.text_3') }}</span>
        </div>
      </li>
      <li class="box_item">
        <div class="item_title">
          <i class="el-icon-s-claim"></i>
        </div>
        <div class="item_body">
          <!-- 今日出勤数 -->
          <span class="item_num">{{ tag.attendance.all }}</span>
          <span class="item_tips">{{ $t('home.text_4') }}</span>
          <div>
            <!-- 迟到 -->
            <span class="text-nowrap">{{ $t('home.text_5') }}</span>
            <span class="text-danger">{{ tag.attendance.count1 }}</span>
            <!-- 早退 -->
            <span class="text-nowrap">{{ $t('home.text_6') }}</span>
            <span class="text-danger">{{ tag.attendance.count2 }}</span>
            <!-- 请假 -->
            <span class="text-nowrap">{{ $t('home.text_7') }}</span>
            <span class="text-danger">{{ tag.attendance.count3 }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="device_list">
      <div class="list_title">{{ $t('home.text_8') }}</div>
      <el-table
        ref="tableSort"
        v-loading="listLoading"
        :data="list"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
        height="350"
      >
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
          prop="IP"
          sortable
        ></el-table-column>
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
        <el-table-column :label="$t('device.text_6')">
          <template #default="{ row }">
            <!-- 开闸 -->
            <el-button type="text" @click="openDoor(row)">
              <i style="font-size: 18px" class="el-icon-thumb"></i>
              {{ $t('operation_btn.btn_text_24') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="capture_box">
      <div class="list_title">{{ $t('home.text_9') }}</div>
      <el-table
        ref="tableSort"
        v-loading="capture_Loading"
        :data="capture_list"
        :highlight-current-row="true"
        :element-loading-text="elementLoadingText"
        height="680"
      >
        <!-- 特写图 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('snapshot.text_15')"
          width="100px"
        >
          <template #default="{ row }">
            <el-image
              :preview-src-list="imageList"
              :src="row.closeup"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 头像 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('snapshot.text_22')"
          width="100px"
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
        ></el-table-column>
        <!-- 体温 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('snapshot.text_16')"
          prop="body_temp"
          sortable
        >
          <template #default="{ row }">
            <div
              v-if="
                row.QRcodestatus != null &&
                row.QRcodestatus.toString().indexOf('体温异常') != -1
              "
            >
              <span style="color: red">
                {{ Number(row.body_temp).toFixed(2) }}
              </span>
            </div>
            <span v-else>{{ Number(row.body_temp).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <!-- 抓拍时间 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('snapshot.text_4')"
          prop="time"
          sortable
        >
          <template #default="{ row }">
            <span>{{ row.time.split('.')[0] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="echart_box">
      <div id="echarts" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
  import { getList, isFirstStart, chartData } from '@/api/index'
  import { getDeviceList, openDoor } from '@/api/device'
  import { getRecordList } from '@/api/record'
  export default {
    name: 'Index',
    data() {
      return {
        interval: '',
        interval2: '',
        tag: '',
        list: [],
        imageList: [],
        listLoading: false, //列表加载
        elementLoadingText: this.$t('operation_tips.tips_12'),

        queryForm: {
          name: '',
          devname: '',
          accreditTime: [], //授权时间范围
          statime: '',
          endtime: '',
          stranger: '', //是否陌生人
          codestus: '', //健康码
        },
        page: {
          pageNo: 1,
          pageSize: 20,
        },
        capture_Loading: false,
        capture_list: [],

        chartData: '',
      }
    },
    created() {
      this.tag = getList()
      this.chartData = chartData()
      this.init()
      let firstStart = isFirstStart()
      if (firstStart) {
        this.$confirm(
          this.$t('operation_tips.tips_65'),
          this.$t('operation_tips.tips_42'),
          {
            confirmButtonText: this.$t('operation_btn.btn_text_5'),
            cancelButtonText: this.$t('operation_btn.btn_text_4'),
            type: 'warning',
            closeOnClickModal: false,
            closeOnPressEscape: false,
          }
        )
          .then(() => {
            localStorage.setItem('firstLogin', true)
            this.setGuide()
          })
          .catch(() => {
            localStorage.setItem('firstLogin', false)
          })
      }
    },
    destroyed() {
      clearInterval(this.interval)
      clearInterval(this.interval2)
    },
    mounted() {
      let myEchart = this.$echarts.init(document.getElementById('echarts'))
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(this.chartData).reverse(),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: Object.values(this.chartData).reverse(),
            type: 'line',
            areaStyle: {},
            label: {
              show: true,
              position: 'top',
            },
            smooth: true,
          },
        ],
      }
      myEchart.setOption(option)
    },
    methods: {
      // 新手引导
      setGuide() {
        let dom = document.getElementsByClassName('el-menu')[0]
        let children = dom.childNodes
        children[4].lastChild.style.removeProperty('display')
        let data = [
          {
            title: this.$t('operation_tips.tips_76'),
            element: '.el-menu li:nth-child(3)>ul li:first-child',
            intro: this.$t('operation_tips.tips_70'),
            position: 'right',
          },
        ]
        this.$intro()
          .setOptions({
            skipLabel: this.$t('operation_tips.tips_75'),
            doneLabel: this.$t('operation_tips.tips_68'),
            steps: data,
            exitOnOverlayClick: false, //是否允许点击空白处退出
            overlayOpacity: 0.6, //遮罩层的透明度
            showBullets: false, //是否使用点点点显示进度
            showProgress: false, //是否显示进度条
          })
          .oncomplete(() => {
            this.$router.push('/device/deviceIndex')
          })
          .onskip(() => {
            console.log('跳过')
            localStorage.setItem('firstLogin', false)
          })
          .start()
      },
      async init() {
        this.listLoading = true
        // 设备列表
        this.list = await getDeviceList()
        //抓拍记录
        this.capture_Loading = true
        let list2 = await getRecordList(this.queryForm, this.page)
        this.capture_list = list2.list
        let imageList = []
        list2.list.forEach((item, index) => {
          imageList.push(item.closeup)
        })
        this.imageList = imageList

        this.listLoading = false
        this.capture_Loading = false

        this.interval = setInterval(() => {
          this.list = getDeviceList()
        }, 10000)
        this.interval2 = setInterval(() => {
          let list2 = getRecordList(this.queryForm, this.page)
          this.capture_list = list2.list
          list2.list.forEach((item, index) => {
            imageList.push(item.closeup)
          })
          this.imageList = imageList
        }, 60000)
      },
      //开闸
      openDoor(row) {
        openDoor(row.IP).then((res) => {
          if (res) {
            this.$baseMessage(this.$t('operation_tips.tips_40'), 'success')
          } else {
            this.$baseMessage(this.$t('operation_tips.tips_41'), 'warning')
          }
        })
      },
    },
  }
</script>
<style scoped>
  .home_list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    margin: 0;
  }
  .home_list .box_item {
    background: white;
    flex: 1;
    max-width: 24%;
    min-width: 250px;
    height: 150px;
    border-radius: 5px;
    border: 1px solid #eee;
    list-style: none;
    display: flex;
  }
  .home_list .box_item .item_title {
    width: 150px;
    height: 100%;
    color: white;
    text-align: center;
    line-height: 150px;
    font-size: 60px;
    border-radius: 5px 0 0 5px;
  }
  .home_list .box_item:nth-child(1) .item_title {
    background: #098ddf;
  }
  .home_list .box_item:nth-child(2) .item_title {
    background: #64d572;
  }
  .home_list .box_item:nth-child(3) .item_title {
    background: #f25e43;
  }
  .home_list .box_item:nth-child(4) .item_title {
    background: #42b983;
  }
  .home_list .box_item .item_body {
    width: calc(100% - 150px);
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
  }
  .home_list .box_item .item_body .item_num {
    font-size: 1.5rem;
    color: #6c757d;
    font-weight: 600;
    height: 90px;
    line-height: 110px;
    overflow: hidden;
  }
  .home_list .box_item .item_body .item_tips {
    font-size: 15px;
    color: #98a6ad;
  }
  .home_list .box_item .item_body div {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
  .home_list .box_item .item_body .text-danger {
    margin-right: 10px;
    margin-left: 2px;
    color: red;
  }

  @media (max-width: 1600px) {
    .home_list .box_item {
      height: 100px;
    }
    .home_list .box_item .item_title {
      width: 100px;
      line-height: 100px;
      font-size: 45px;
    }
    .home_list .box_item .item_body {
      width: calc(100% - 100px);
    }
    .home_list .box_item .item_body .item_num {
      height: 50px;
      line-height: 60px;
    }
  }

  .device_list {
    width: calc(50% - 10px);
    height: 350px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 20px;
    position: relative;
    float: left;
  }
  .list_title {
    width: 100%;
    height: 47px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: #f9f9f9;
    border-radius: 10px 10px 0 0;
    text-align: center;
    line-height: 47px;
    font-size: 18px;
  }

  .capture_box {
    width: calc(50% - 10px);
    height: 680px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 20px;
    position: relative;
    float: right;
  }

  .echart_box {
    width: calc(50% - 10px);
    height: 308px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin-top: 20px;
    float: left;
  }
</style>
