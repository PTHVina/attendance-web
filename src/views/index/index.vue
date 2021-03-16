<template>
  <div class="index-container">
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
  </div>
</template>

<script>
  import { getList } from '@/api/index'
  import { getDeviceList, openDoor } from '@/api/device'
  export default {
    name: 'Index',
    data() {
      return {
        tag: '',
        list: [],
        listLoading: false, //列表加载
        elementLoadingText: this.$t('operation_tips.tips_12'),
      }
    },
    created() {
      this.tag = getList()
      this.init()
    },
    methods: {
      init() {
        this.listLoading = true
        let list = getDeviceList()
        this.list = list
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
</style>
<style scoped>
  .device_list {
    width: calc(50% - 10px);
    height: 350px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 30px;
    position: relative;
  }
  .device_list .list_title {
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
</style>
