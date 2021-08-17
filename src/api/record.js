//抓拍列表
export function getRecordList(data, page) {
  let count = window.top.myExtension.getCapture_Datacuont(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.stranger ? '1' : '0',
    data.codestus,
    data.temp_from,
    data.temp_to
  )
  let res = window.top.myExtension.getCapture_Data(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.stranger ? '1' : '0',
    data.codestus,
    data.temp_from,
    data.temp_to,
    page.pageNo.toString(),
    page.pageSize.toString()
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
// 批量导出
export function BatchXport(data, type) {
  window.top.myExtension.BatchXportforCapture(
    data.startTime,
    data.endTime,
    data.name,
    data.no,
    data.stranger,
    data.codestus,
    type,
    data.temp_from,
    data.temp_to
  )
}
