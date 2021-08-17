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
          <span
            class="item_num"
            :style="lang == 'Fr_fr' ? 'line-height:70px;' : ''"
          >
            {{ tag.attendance.all }}
          </span>
          <span class="item_tips">
            {{ $t('home.text_4') }}
          </span>
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
        <el-table-column show-overflow-tooltip width="50px">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- 设备名称 -->
        <el-table-column
          show-overflow-tooltip
          :label="$t('device.text_3')"
          sortable
        >
          <template #default="{ row }">
            <p style="margin: 0">{{ row.DeviceName }}</p>
            <p
              style="margin: 0; color: #999; font-size: 13px; line-height: 16px"
            >
              {{ row.DeviceNo }}
            </p>
          </template>
        </el-table-column>
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
          width="150px"
        >
          <template #default="{ row }">
            <el-tag v-if="row.IsConnected">{{ $t('device.text_7') }}</el-tag>
            <el-tag v-else type="danger">{{ $t('device.text_8') }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('device.text_6')" width="150px">
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
        <el-table-column show-overflow-tooltip label="" width="90px">
          <template #default="{ row }">
            <el-image
              :preview-src-list="imageList"
              :src="row.closeup"
              style="width: 68px; height: 68px"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 头像 -->
        <el-table-column show-overflow-tooltip label="" width="100px">
          <template #default="{ row }">
            <el-image
              v-if="row.TemplateImage"
              :preview-src-list="imageList2"
              :src="row.TemplateImage"
              style="width: 68px; height: 68px"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column
          show-overflow-tooltip
          prop="person_name"
          label=""
        ></el-table-column>
        <!-- 体温 -->
        <el-table-column
          show-overflow-tooltip
          label=""
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
        <!-- 设备名称 -->
        <el-table-column
          show-overflow-tooltip
          label=""
          prop="addr_name"
        ></el-table-column>
        <!-- 抓拍时间 -->
        <el-table-column
          show-overflow-tooltip
          label=""
          prop="time"
          sortable
          width="180px"
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
  import { getList, isFirstStart, chartData, getUserList } from '@/api/index'
  import { getDeviceList, openDoor } from '@/api/device'
  export default {
    name: 'Index',
    data() {
      return {
        lang: this.$lang,
        interval: '',
        interval2: '',
        tag: '',
        list: [],
        imageList: [],
        imageList2: [],
        listLoading: false, //列表加载
        elementLoadingText: this.$t('operation_tips.tips_12'),

        queryForm: {
          name: '',
          devname: '',
          accreditTime: [], //授权时间范围
          statime: '',
          endtime: '',
          selectedPersonTypes: ['1', '0'], //所有人员类型
          codestus: '', //健康码
        },
        page: {
          pageNo: 1,
          pageSize: 7,
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
        this.setGuide()
      }
    },
    destroyed() {
      clearInterval(this.interval)
      clearInterval(this.interval2)
    },
    mounted() {
      let myEchart = this.$echarts.init(document.getElementById('echarts'))
      let option = {
        title: {
          text: this.$t('home.text_10'),
          textStyle: {
            fontSize: 18,
            fontWeight: 'normal',
          },
          top: 10,
          left: 20,
        },
        grid: {
          bottom: 40,
        },
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
            this.$router.push('/device/deviceIndex')
          })
          .catch(() => {
            localStorage.setItem('firstLogin', false)
          })
      },
      async init() {
        this.listLoading = true
        // 设备列表
        this.list = await getDeviceList()
        console.log('设备列表', this.list)
        //抓拍记录
        this.capture_Loading = true
        await getUserList(this.queryForm, this.page)
          .then((res) => {
            this.capture_list = res

            let imageList = []
            let imageList2 = []
            res.forEach((item, index) => {
              imageList.push(item.closeup)
              if (item.TemplateImage) {
                imageList2.push(item.TemplateImage)
              }
            })
            this.imageList = imageList
            this.imageList2 = imageList2
          })
          .catch((res) => {
            this.$baseMessage(this.$t('personnel.pl_17'), 'warning')
          })

        this.listLoading = false
        this.capture_Loading = false

        this.interval = setInterval(() => {
          this.list = getDeviceList()
        }, 10000)
        this.interval2 = setInterval(() => {
          getUserList(this.queryForm, this.page)
            .then((res) => {
              this.capture_list = res

              let imageList = []
              let imageList2 = []
              res.forEach((item, index) => {
                imageList.push(item.closeup)
                if (item.TemplateImage) {
                  imageList2.push(item.TemplateImage)
                }
              })
              this.imageList = imageList
              this.imageList2 = imageList2
            })
            .catch((res) => {
              this.$baseMessage(this.$t('personnel.pl_17'), 'warning')
            })
        }, 5000)
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
    text-align: center;
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
