//抓拍列表
export function getRecordList(data, page) {
  let count = window.top.myExtension.getCapture_Datacuont(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.selectedPersonTypes.toString(),
    data.codestus,
    data.temp_from,
    data.temp_to,
    data.wg_card_id,
    data.department,
    data.jobClassification
  )
  let res = window.top.myExtension.getCapture_Data(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.selectedPersonTypes.toString(),
    data.codestus,
    data.temp_from,
    data.temp_to,
    page.pageNo.toString(),
    page.pageSize.toString(),
    data.wg_card_id,
    data.department,
    data.jobClassification
  )
  let counts = JSON.parse(count)[0].count
  let list = JSON.parse(res)

  return { counts, list }
}
//删除
export function delRecord(id) {
  let res = window.top.myExtension.delCapture_DataForid(id)
  return res
}
//按条件批量删除
export function delRecordByDatetime(data) {
  let res = window.top.myExtension.delCapture_DataByDatetime(
    data.startTime,
    data.endTime
  )
  return res
}
// 批量导出
export function BatchXport(data, type, ids) {
  window.top.myExtension.BatchXportforCapture(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.selectedPersonTypes.toString(),
    data.codestus,
    type,
    data.temp_from,
    data.temp_to,
    ids.toString(),
    data.wg_card_id,
    data.department,
    data.jobClassification
  )
}
