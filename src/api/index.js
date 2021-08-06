export function getList() {
  var reg = 0,
    device = 0,
    online = 0,
    attendance = {
      all: 0,
      count1: 0,
      count2: 0,
      count3: 0,
    }
  //注册人数
  let re1 = window.top.myExtension.getindexforNumberRegist()
  reg = JSON.parse(re1)[0].count
  //设备数量
  let re2 = window.top.myExtension.getindexforNumberequipments()
  device = JSON.parse(re2)[0].count
  //在线设备数
  let re3 = window.top.myExtension.getindexforNumberequipment()
  online = JSON.parse(re3)
  //今日出勤数
  let re4 = window.top.myExtension.getindexforAttendanceToday()
  attendance.all = JSON.parse(re4)[0].count
  //迟到
  let re5 = window.top.myExtension.getindexforlate()
  attendance.count1 = JSON.parse(re5)[0].count
  //早退
  let re6 = window.top.myExtension.getindexforLeaveEarly()
  attendance.count2 = JSON.parse(re6)[0].count
  //请假
  let re7 = window.top.myExtension.getindexforleave()
  attendance.count3 = JSON.parse(re7)[0].count

  let datas = {
    reg: reg,
    device: device,
    online: online,
    attendance: attendance,
  }
  return datas
}
//判断是否是首次启动
export function isFirstStart() {
  let res = window.top.myExtension.IsNoNoviceGuide()
  return JSON.parse(res)
}
//获取进出闸机数据
export function chartData() {
  let res = window.top.myExtension.getCapture_Data7day()
  return JSON.parse(res)
}
//抓拍人员
export function getUserList(data, page) {
  return new Promise(function (resolve, reject) {
    try {
      window.top.myExtension.getCapture_Dataforindex(
        (res) => {
          var re_json = JSON.parse(res)
          resolve(re_json)
        },
        data.startTime,
        data.endTime,
        data.name,
        data.devname,
        data.stranger,
        data.codestus,
        null,
        null,
        page.pageNo.toString(),
        page.pageSize.toString()
      )
    } catch {
      reject(false)
    }
  })
}

//获取logo
export function getLogo() {
  try {
    return window.top.myExtension.getLogo()
  } catch {
    return false
  }
}
