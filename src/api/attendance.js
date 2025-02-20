import dayjs from 'dayjs'

//获取每日考勤列表总条数
export function getEverydayCount(data) {
  var res = window.top.myExtension.queryAttendanceinformationcount(
    data.daterangetime[0],
    data.daterangetime[1],
    data.name,
    data.late.toString(),
    data.Leaveearly.toString(),
    data.isAbsenteeism.toString(),
    data.departments.toString()
  )
  var res_json = JSON.parse(res)[0].count
  return res_json
}
//获取每日考勤列表
export function getEverydayList(data, page) {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.queryAttendanceinformation(
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
      page.pageSize.toString(),
      data.departments.toString()
    )
  })
}
//补卡
export function reissueACard(data) {
  var res = window.top.myExtension.CardReplacement(
    data.type.toString(),
    data.id.toString(),
    data.time.toString(),
    data.setTime.toString(),
    data.timeInterval.toString(),
    data.number.toString()
  )
  return res
}
//导出每日考勤数据
export function exportList(data) {
  window.top.myExtension.exportAttendanceinformation(
    data.daterangetime[0].toString(),
    data.daterangetime[1].toString(),
    data.name.toString(),
    data.late.toString(),
    data.Leaveearly.toString(),
    data.isAbsenteeism.toString(),
    data.departments.toString()
  )
}
//导出设置信息
export function defaultSet() {
  let res = window.top.myExtension.getCsvSettings()
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
  return new Promise(function (resolve, reject) {
    window.top.myExtension.getMonthlyData(
      function (param) {
        let data_json = JSON.parse(param)
        resolve(data_json)
      },
      data.date,
      data.name,
      data.departments
    )
  })
}
//导出数据
export function exportData(data) {
  window.top.myExtension.exportMonthlyData(
    data.date,
    data.name,
    data.departments
  )
}
//导出明细
export function exportDataDetail(data) {
  window.top.myExtension.exportAttendanceinformationCollect(
    data.date,
    data.name,
    data.departments
  )
}
//获取单个人员每天数据
export function getEverydayAllList(data) {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.queryAttendanceinByid(
      (res) => {
        resolve(JSON.parse(res))
      },
      data.personId,
      data.nowdate.toString()
    )
  })
}

export function getCaptureDataByIdForDate(personId, date) {
  let json = window.top.myExtension.getCaptureDataByIdForDate(personId, date)
  return JSON.parse(json)
}

export function exportAttendanceMasterReport(data) {
  window.top.myExtension.ExportAttendanceMasterReport(
    data.date,
    data.name,
    data.departments
  )
}

export function exportPeriodicMasterReport(data) {
  window.top.myExtension.ExportPeriodicMasterReport(
    data.date,
    data.name,
    data.departments
  )
}

export function formatDuration(value) {
  return value?.indexOf('T') > -1 ? dayjs.duration(value).format('HH:mm') : ''
}
