//抓拍列表
export function getRecordList(data, page) {
  let json = JSON.stringify(data)
  let count = window.top.myExtension.getCapture_Datacuont(json)
  let paged = Object.assign(
    { pageNo: page.pageNo, pageSize: page.pageSize },
    data
  )

  let pagedJson = JSON.stringify(paged)
  let res = window.top.myExtension.getCapture_Data(pagedJson)

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
  let cretia = Object.assign({ type, ids }, data)
  let json = JSON.stringify(cretia)
  window.top.myExtension.BatchXportforCapture(json)
}
