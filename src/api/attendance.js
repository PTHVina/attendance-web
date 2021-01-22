//获取每日考勤列表
export function getEverydayCount(data) {
  var res = window.top.myExtension.queryAttendanceinformationcount(
    data.daterangetime[0],
    data.daterangetime[1],
    data.name,
    data.late.toString(),
    data.Leaveearly.toString(),
    data.isAbsenteeism.toString()
  )
  var res_json = JSON.parse(res)[0].count
  return res_json
}
//获取每日考勤列表
export function getEverydayList(data, page) {
  return new Promise(function (resolve, reject) {
    myExtension.queryAttendanceinformation(
      function (param) {
        resolve(param)
      },
      data.daterangetime[0],
      data.daterangetime[1],
      data.name,
      data.late.toString(),
      data.Leaveearly.toString(),
      data.isAbsenteeism.toString(),
      page.pageNo.toString(),
      page.pageSize.toString()
    )
  })
}
//补卡
export function reissueACard(data) {
  var res = myExtension.CardReplacement(
    data.type.toString(),
    data.id.toString(),
    data.time.toString(),
    data.setTime.toString()
  )
  return res
}
//导出每日考勤数据
export function exportList(data) {
  myExtension.exportAttendanceinformation(
    data.daterangetime[0].toString(),
    data.daterangetime[1].toString(),
    data.name.toString(),
    data.late.toString(),
    data.Leaveearly.toString(),
    data.isAbsenteeism.toString()
  )
}
//导出设置信息
export function defaultSet() {
  let res = top.myExtension.getCsvSettings()
  let res_data = JSON.parse(res)

  return res_data
}
// 导出设置
export function saveSetting(key, val) {
  var res = window.top.myExtension.setCsvSettings(key, val)
  return res
}

//月度考勤列表
export function getMonthlyList(data) {
  let res = window.top.myExtension.getMonthlyData(data.date, data.name)
  let data_json = JSON.parse(res)

  return data_json
}
//导出数据
export function exportData(data) {
  myExtension.exportMonthlyData(data.date, data.name)
}
