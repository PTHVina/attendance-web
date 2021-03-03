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
    Duration: data.time.toString(),
    EffectiveTime:
      data.punchCard1 && data.punchCard1[0] != ''
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
      json_data,
      data.id.toString()
    )
  } else {
    res = window.top.myExtension.setShiftData(json_data)
  }
  let res_json = JSON.parse(res)

  return res_json
}

//考勤组列表
export function getGroupList() {
  let res = window.top.myExtension.getGroup()
  let data_json = JSON.parse(res)

  return data_json
}
//获取班次列表
export function getClassesList() {
  let res = window.top.myExtension.getShiftData()
  let data_json = JSON.parse(res)

  return data_json
}
//设置默认
export function setDefault(id) {
  let res = window.top.myExtension.set_default(id.toString())

  return res
}
//删除
export function doDelete(id) {
  let res = window.top.myExtension.DeleteGroup(id.toString())

  return res
}
//人员列表
export function getPersonnelList() {
  let res = window.top.myExtension.getStaffData('0', '10000')
  let data_json = JSON.parse(res)

  return data_json
}
//打卡日期列表总数
export function getDeteCount(type, editId) {
  let res = window.top.myExtension.getSpecial_datecount(
    editId.toString(),
    type.toString()
  )
  let data_json = JSON.parse(res)[0].count

  return data_json
}
//打卡日期列表
export function getDeteList(type, page, editId) {
  let res = window.top.myExtension.getSpecial_date(
    editId.toString(),
    type.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  let data_json = JSON.parse(res)

  return data_json
}
//删除打卡日期
export function delDeteData(id) {
  let res
  if (typeof id == 'object') {
    res = window.top.myExtension.delSpecial_date(id.toString())
    res = JSON.parse(res)
  } else {
    res = window.top.myExtension.delSpecial_date('(' + id + ')')
  }

  return res
}
//新增打卡日期
export function addDete(type, editId, date, radio) {
  let res = window.top.myExtension.saveSpecial_date(
    editId.toString(),
    type.toString(),
    date.toString(),
    radio.toString()
  )

  return res
}
//添加考勤组
export function addGroup(attribute, data, ids, timestamp) {
  var data = window.top.myExtension.setGroup(
    JSON.stringify(attribute),
    data.name,
    data.isdefault,
    ids.toString(),
    timestamp.toString()
  )
  var re_json = JSON.parse(data)

  return re_json
}
//编辑
export function setGroup(attribute, data, ids, editId) {
  var data = window.top.myExtension.editGroup(
    JSON.stringify(attribute),
    data.name,
    data.isdefault,
    ids.toString(),
    editId.toString()
  )
  var re_json = JSON.parse(data)

  return re_json
}
