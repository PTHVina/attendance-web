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
          <span class="item_num">{{ list.reg }}</span>
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
          <span class="item_num">{{ list.device }}</span>
          <span class="item_tips">{{ $t('home.text_2') }}</span>
        </div>
      </li>
      <!-- 在线设备数 -->
      <li class="box_item">
        <div class="item_title">
          <i class="el-icon-s-help"></i>
        </div>
        <div class="item_body">
          <span class="item_num">{{ list.online }}</span>
          <span class="item_tips">{{ $t('home.text_3') }}</span>
        </div>
      </li>
      <li class="box_item">
        <div class="item_title">
          <i class="el-icon-s-claim"></i>
        </div>
        <div class="item_body">
          <!-- 今日出勤数 -->
          <span class="item_num">{{ list.attendance.all }}</span>
          <span class="item_tips">{{ $t('home.text_4') }}</span>
          <div>
            <!-- 迟到 -->
            <span class="text-nowrap">{{ $t('home.text_5') }}</span>
            <span class="text-danger">{{ list.attendance.count1 }}</span>
            <!-- 早退 -->
            <span class="text-nowrap">{{ $t('home.text_6') }}</span>
            <span class="text-danger">{{ list.attendance.count2 }}</span>
            <!-- 请假 -->
            <span class="text-nowrap">{{ $t('home.text_7') }}</span>
            <span class="text-danger">{{ list.attendance.count3 }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getList } from '@/api/index'
  export default {
    name: 'Index',
    data() {
      return {
        list: '',
      }
    },
    created() {
      this.list = getList()
    },
    methods: {},
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
