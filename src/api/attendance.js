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
