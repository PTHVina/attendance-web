<template>
  <div class="table-container flex_box">
    <ul class="aside">
      <li>
        <a href="#1" @click="jump('1')">1. 总体概述</a>
        <ol>
          <li><a href="#1.1" @click="jump('1.1')">1.1. 核心模块</a></li>
          <li><a href="#1.2" @click="jump('1.2')">1.2. 使用流程</a></li>
        </ol>
      </li>
      <li>
        <a href="#2" @click="jump('2')">2. 软件功能操作说明</a>
        <ol>
          <li><a href="#2.1" @click="jump('2.1')">2.1. 登录界面</a></li>
          <li><a href="#2.2" @click="jump('2.2')">2.2. 首页统计</a></li>
          <li>
            <a href="#2.3" @click="jump('2.3')">2.3. 系统设置</a>
            <ol>
              <li>
                <a href="#2.3.1" @click="jump('2.3.1')">2.3.1. 组织机构设置</a>
              </li>
              <li>
                <a href="#2.3.2" @click="jump('2.3.2')">2.3.2. 参数设置</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#2.4" @click="jump('2.4')">2.4. 设备管理</a>
            <ol>
              <li>
                <a href="#2.4.1" @click="jump('2.4.1')">2.4.1. 设备列表</a>
              </li>
              <li>
                <a href="#2.4.2" @click="jump('2.4.2')">2.4.2. 在线视频</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#2.5" @click="jump('2.5')">2.5. 考勤设置</a>
            <ol>
              <li>
                <a href="#2.5.1" @click="jump('2.5.1')">2.5.1. 考勤班次</a>
              </li>
              <li><a href="#2.5.2" @click="jump('2.5.2')">2.5.2. 考勤组</a></li>
            </ol>
          </li>
          <li>
            <a href="#2.6" @click="jump('2.6')">2.6. 人员管理</a>
            <ol>
              <li>
                <a href="#2.6.1" @click="jump('2.6.1')">2.6.1. 员工管理</a>
                <ol>
                  <li>
                    <a href="#2.6.1.1" @click="jump('2.6.1.1')">
                      2.6.1.1. 本地上传人脸照片注册
                    </a>
                  </li>
                  <li>
                    <a href="#2.6.1.2" @click="jump('2.6.1.2')">
                      2.6.1.2. USB摄像头拍照注册
                    </a>
                  </li>
                  <li>
                    <a href="#2.6.1.3" @click="jump('2.6.1.3')">
                      2.6.1.3. excel表格批量导入人脸
                    </a>
                  </li>
                  <li>
                    <a href="#2.6.1.4" @click="jump('2.6.1.4')">
                      2.6.1.4. 抓拍记录注册人脸
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <a href="#2.6.2" @click="jump('2.6.2')">2.6.2. 访客管理</a>
              </li>
              <li>
                <a href="#2.6.3" @click="jump('2.6.3')">2.6.3. 下发记录</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#2.7" @click="jump('2.7')">2.7. 抓拍管理</a>
            <ol>
              <li>
                <a href="#2.7.1" @click="jump('2.7.1')">2.7.1. 抓拍记录</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#2.8" @click="jump('2.8')">2.8. 考勤管理</a>
            <ol>
              <li>
                <a href="#2.8.1" @click="jump('2.8.1')">2.8.1. 每日考勤</a>
              </li>
              <li>
                <a href="#2.8.2" @click="jump('2.8.2')">2.8.2. 月度考勤</a>
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ul>
    <div class="main">
      <h1 name="1">1. 总体概述</h1>
      <h2 name="1.1">1.1. 核心模块</h2>
      <img src="./static/1-1_1.png" alt="img" />
      <h2 name="1.2">1.2. 使用流程</h2>
      <img src="./static/1-2_1.png" alt="img" />

      <h1 name="2">2. 软件功能操作说明</h1>
      <h2 name="2.1">2.1. 登录界面</h2>
      <img src="./static/2-1_1.png" alt="img" />
      <h2 name="2.2">2.2. 首页统计</h2>
      <img src="./static/2-2_1.png" alt="img" />

      <h2 name="2.3">2.3. 系统设置</h2>
      <h3 name="2.3.1">2.3.1. 组织机构设置</h3>
      <img src="./static/2-3_1.png" alt="img" />
      <h3 name="2.3.1">2.3.1. 参数设置</h3>
      <p>系统关联设备参数开关设置</p>
      <img src="./static/2-3_2.png" alt="img" />

      <h2 name="2.4">2.4. 设备管理</h2>
      <h3 name="2.4.1">2.4.1. 设备列表</h3>
      <img src="./static/2-4_1.png" alt="img" />
      <h3 name="2.4.2">2.4.2. 在线视频</h3>
      <img src="./static/2-4_2.png" alt="img" />

      <h2 name="2.5">2.5. 考勤设置</h2>
      <h3 name="2.5.1">2.5.1. 考勤班次</h3>
      <img src="./static/2-5_1.png" alt="img" />
      <h3 name="2.5.2">2.5.2. 考勤组</h3>
      <img src="./static/2-5_2.png" alt="img" />

      <h2 name="2.6">2.6. 人员管理</h2>
      <h3 name="2.6.1">2.6.1. 员工管理</h3>
      <img src="./static/2-6_1.png" alt="img" />
      <h4 name="2.6.1.1">2.6.1.1. 本地上传人脸照片注册</h4>
      <img src="./static/2-6_2.png" alt="img" />
      <h4 name="2.6.1.2">2.6.1.2. USB摄像头拍照注册</h4>
      <img src="./static/2-6_3.png" alt="img" />
      <h4 name="2.6.1.3">2.6.1.3. excel表格批量导入人脸</h4>
      <img src="./static/2-6_4.png" alt="img" />
      <img src="./static/2-6_4_1.png" alt="img" />
      <img src="./static/2-6_4_2.png" alt="img" />
      <h4 name="2.6.1.4">2.6.1.4. 抓拍记录注册人脸</h4>
      <img src="./static/2-6_5.png" alt="img" />
      <h3 name="2.6.2">2.6.2. 访客管理</h3>
      <img src="./static/2-6_6.png" alt="img" />
      <h3 name="2.6.3">2.6.3. 下发记录</h3>
      <img src="./static/2-6_7.png" alt="img" />

      <h2 name="2.7">2.7. 抓拍管理</h2>
      <h3 name="2.7.1">2.7.1. 抓拍记录</h3>
      <img src="./static/2-7_1.png" alt="img" />

      <h2 name="2.8">2.8. 考勤管理</h2>
      <h3 name="2.8.1">2.8.1. 每日考勤</h3>
      <img src="./static/2-8_1.png" alt="img" />
      <img src="./static/2-8_2.png" alt="img" />
      <img src="./static/2-8_3.png" alt="img" />
      <h3 name="2.8.2">2.8.2. 月度考勤</h3>
      <img src="./static/2-8_4.png" alt="img" />
      <img src="./static/2-8_5.png" alt="img" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DocumentationIndex',
    data() {
      return {}
    },
    created() {},
    methods: {
      jump(domName) {
        // 当前窗口正中心位置到指定dom位置的距离

        let dom2 = document.getElementsByClassName('main')[0]
        //页面滚动了的距离
        let height =
          dom2.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          dom2.scrollTop

        //指定dom到页面顶端的距离
        let dom = document.getElementsByName(domName)[0]
        let domHeight = dom.offsetTop - 60

        //滚动距离计算
        var S = Number(height) - Number(domHeight)

        //判断上滚还是下滚
        if (S < 0) {
          //下滚
          S = Math.abs(S)
          dom2.scrollBy({ top: S, behavior: 'smooth' })
        } else if (S == 0) {
          //不滚
          dom2.scrollBy({ top: 0, behavior: 'smooth' })
        } else {
          //上滚
          S = -S
          dom2.scrollBy({ top: S, behavior: 'smooth' })
        }
      },
    },
  }
</script>

<style lang="scss">
  .flex_box {
    display: flex;
  }
  .aside {
    width: 300px;
    height: calc(100vh - 160px);
    background: #fafafa;
    margin: 0 20px 0 0;
    padding: 10px 0;
    border-radius: 5px;
    li {
      list-style: none;
      padding-left: 10px;
      a {
        display: inline-block;
        width: 100%;
        height: 25px;
      }
      a:hover {
        text-decoration: underline;
      }
      ol {
        margin: 0;
        padding-left: 10px;
      }
    }
  }
  .main {
    flex: 1;
    height: calc(100vh - 160px);
    overflow-y: auto;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
</style>
