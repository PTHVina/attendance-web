//获取班次列表
export function getshiftlist() {
  var res = window.top.myExtension.getShiftData()
  var data_json = JSON.parse(res)

  return data_json
}
//删除班次
export function delClasses(id) {
  var res = window.top.myExtension.DeleteShift(id.toString())
  return res
}
//新增/修改班次
export function setClasses(data) {
  let json = {
    name: data.name,
    Duration: data.time,
    EffectiveTime: data.punchCard1
      ? data.punchCard1[0] +
        '-' +
        data.punchCard1[1] +
        ',' +
        data.punchCard2[0] +
        '-' +
        data.punchCard2[1]
      : '',
    gotowork1: data.commuter[0] + '-' + data.commuter[1],
    gotowork2: '',
    gooffwork3: '',
    rest_time: data.rest[0] + '-' + data.rest[1],
  }
  let json_data = JSON.stringify(json)
  let res
  if (data.id) {
    res = window.top.myExtension.setShiftData_edit(
      json_data.toString(),
      data.id
    )
  } else {
    res = window.top.myExtension.setShiftData(json_data.toString())
  }
  let res_json = JSON.parse(res)

  return res_json
}
