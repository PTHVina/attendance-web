// 人员列表
export function getDataList(page) {
  let list = window.top.myExtension.getStaffData(
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  let d = list.replace(/\"id\":(\d+)/g, '"id": "$1"') //id长度超过53位转换为字符串
  let re_json1 = JSON.parse(d)
  let count = window.top.myExtension.getStaffDatacount()
  let re_json2 = JSON.parse(count)

  return [re_json1, re_json2[0].count]
}
// 查询人员列表
export function queryList(page, data) {
  let list = window.top.myExtension.getStaffDataQuey(
    data.name,
    data.no.toString(),
    data.qu_phone.toString(),
    page.pageNo.toString(),
    page.pageSize.toString(),
    data.dep ? data.dep.toString() : ''
  )
  let re_json1 = JSON.parse(list)
  let count = window.top.myExtension.getStaffDataQueyforcount(
    data.name,
    data.no.toString(),
    data.qu_phone.toString(),
    data.dep ? data.dep.toString() : ''
  )
  let re_json2 = JSON.parse(count)

  return [re_json1, re_json2[0].count]
}
//获取部门列表、工作分类
export function getTypeList() {
  var data = window.top.myExtension.getDepartmentData()
  data = JSON.parse(data)
  let type = window.top.myExtension.getlEmployetypedata()
  type = JSON.parse(type)

  return [data, type]
}
//获取设备列表
export function getDeviceList() {
  let res = window.top.myExtension.getDeviceDiscover()
  let data_json = JSON.parse(res)

  return data_json
}
// 添加人员
export function setData(data) {
  var re = window.top.myExtension.setStaff(
    data.name,
    data.Employee_code.toString(),
    data.phone.toString(),
    data.Email,
    data.departmentname.toString(),
    data.Employetypename.toString(),
    data.picture.toString(),
    data.line_type.toString(),
    data.line_userid.toString(),
    data.face_idcard.toString(),
    data.idcardtype.toString(),
    data.customer_text ? data.customer_text.toString() : '',
    data.term_start ? data.term_start.toString() : '',
    data.term ? data.term.toString() : ''
  )
  var re_json = JSON.parse(re)

  return re_json
}
// 编辑人员
export function editData(data) {
  var re = window.top.myExtension.EditStaff(
    data.name || '',
    data.Employee_code || '',
    data.phone || '',
    data.Email || '',
    data.departmentname.toString(),
    data.Employetypename.toString(),
    data.picture.toString(),
    data.line_userid.toString(),
    data.line_type.toString(),
    data.id.toString(),
    data.face_idcard.toString(),
    data.idcardtype.toString(),
    data.customer_text.toString(),
    data.term_start.toString(),
    data.term.toString()
  )
  var re_json = JSON.parse(re)

  return re_json
}
//获取电脑图片
export function openImg() {
  return window.top.myExtension.openImgeUrl()
}
//拍照
export function photograph() {
  return window.top.myExtension.OpenCamera()
}
//删除人员
export function delData(data) {
  let type = false
  data.forEach((item, index) => {
    type = window.top.myExtension.DeleteUser(item.toString())
  })

  return type
}
//查询下发人员是否正确
export function queryPerson(id) {
  let res = window.top.myExtension.queryPerson(id.toString())
  let data_json = JSON.parse(res)

  return data_json
}
//下发所有人员到某相机
export function toIssue2(deviceId) {
  let flag = false
  try {
    let res = window.top.myExtension.AddPersonToEquipment_distribution(
      deviceId.toString()
    )
    flag = true
  } catch {
    flag = false
  }
  return flag
}
//人员下发
export function toIssue(data) {
  let res = window.top.myExtension.AddPersonToEquipment_distribution(
    JSON.stringify(data)
  )

  return true
}
//一键下发
export function oneClickIssue() {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.One_click_distribution((res) => {
      resolve(res)
    })
  })
}
//下载模板
export function download() {
  window.top.myExtension.Download()
}
//批量导入
export function importExcel() {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.BatchIimport((res) => {
      var re_json = JSON.parse(res)
      resolve(re_json)
    })
  })
}
//导出
export function downList() {
  window.top.myExtension.export()
}
//获取通知设置
export function getInformList() {
  let res = window.top.myExtension.getstaffforlineAdmin()
  var datastr = window.top.myExtension.getstaffforlineAdminData()
  let res_data = JSON.parse(res)
  let data = JSON.parse(datastr)

  return { res_data, data }
}
//通知设置
export function setInform(str) {
  var re = window.top.myExtension.setstaffforlineAdmin(str.toString())

  return re
}

//访客管理
//访客列表
export function getVisitorList(data, page) {
  var res = window.top.myExtension.getVisitor(
    data.startdate.toString(),
    data.startTime.toString(),
    data.endDate.toString(),
    data.endTime.toString(),
    data.name.toString(),
    data.phone.toString(),
    data.isDown.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//访客总数
export function getVisitorCount(data) {
  let res = window.top.myExtension.getVisitorcuont(
    data.startdate.toString(),
    data.startTime.toString(),
    data.endDate.toString(),
    data.endTime.toString(),
    data.name.toString(),
    data.phone.toString(),
    data.isDown.toString()
  )
  let res_json = JSON.parse(res)[0].count

  return res_json
}
//添加访客
export function addVisitor(data) {
  var res = window.top.myExtension.setVisitor(
    data.name.toString(),
    data.phone.toString(),
    data.img.toString(),
    data.startTime.toString(),
    data.endTime.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//修改访客
export function editVisitor(data) {
  var res = window.top.myExtension.EditVisitor(
    data.name.toString(),
    data.phone.toString(),
    data.img.toString(),
    data.startTime.toString(),
    data.endTime.toString(),
    data.id.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//删除访客
export function delVisitor(id) {
  let res = window.top.myExtension.delVisitorForid(id)

  return res
}
// 下发访客
export function issueVisitor(data) {
  let res = window.top.myExtension.downVisitorForid(
    data.name.toString(),
    data.imge.toString(),
    data.staTime.toString(),
    data.endTime.toString(),
    data.id.toString()
  )

  return res
}
//下发统计
export function getIssueInfo() {
  var success_res = window.top.myExtension.getcountforEquipment_distribution(
    '',
    '',
    '0',
    ''
  )
  var fail_res = window.top.myExtension.getcountforEquipment_distribution(
    '',
    '',
    '1',
    ''
  )
  var all_res = window.top.myExtension.getcountforEquipment_distribution(
    '',
    '',
    '',
    ''
  )
  var success_count = JSON.parse(success_res)[0].count
  var fail_count = JSON.parse(fail_res)[0].count
  var all_count = JSON.parse(all_res)[0].count
  return [success_count, fail_count, all_count]
}

// 下发记录
export function getIssueList(page, data) {
  var res = window.top.myExtension.getcountforEquipment_distribution(
    data.name,
    data.ip,
    data.status,
    data.DeviceName
  )
  var re_json = JSON.parse(res)
  var DevicedataStr = window.top.myExtension.getforEquipment_distribution(
    page.pageNo.toString(),
    page.pageSize.toString(),
    data.name,
    data.ip,
    data.status,
    data.DeviceName
  )
  var re_json_2 = JSON.parse(DevicedataStr)

  return [re_json_2, re_json]
}

//LINE送信
export function getLineSendCount(data) {
  var re = window.top.myExtension.getcountforLineFor_list(
    data.name,
    data.date[0].toString(),
    data.date[1].toString(),
    data.status.toString()
  )
  var re_json = JSON.parse(re)[0].count

  return re_json
}
export function getLineSendList(data, page) {
  var res = window.top.myExtension.getforLineFor_list(
    data.name,
    data.date[0].toString(),
    data.date[1].toString(),
    data.status.toString(),
    page.pageNo.toString(),
    page.total.toString()
  )
  let res_data = JSON.parse(res)

  return res_data
}
export function setSend(id) {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.sendOutforLine(function (param) {
      resolve(param)
    }, id.toString())
  })
}

//实时设备人员列表
export function getDataSyncListRealTime(data, page) {
  let res = window.top.myExtension.getDataSynRealTime(
    data.name.toString(),
    data.role.toString(),
    data.stutas.toString(),
    data.addr_name.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  var res_data = JSON.parse(res)
  return res_data
}

//设备人员列表
export function getDataSyncList(data, page) {
  let res = window.top.myExtension.getDataSyn(
    data.name.toString(),
    data.role.toString(),
    data.stutas.toString(),
    data.addr_name.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  var res_data = JSON.parse(res)
  let count = window.top.myExtension.getDataSynCount(
    data.name.toString(),
    data.role.toString(),
    data.stutas.toString(),
    data.addr_name.toString()
  )
  count = JSON.parse(count)

  return { count: count[0].count, list: res_data }
}
//删除实时设备人员
export function deleteDataSynRealTime(data) {
  let res = window.top.myExtension.deleteDataSynRealTime(
    data.id.toString(),
    data.device_sn
  )
  var res_data = JSON.parse(res)
  return res_data
}

//删除设备人员
export function deleteDataSync(data) {
  let res = window.top.myExtension.deleteDataSyn(
    data.id.toString(),
    data.personid.toString(),
    data.device_sn
  )
  var res_data = JSON.parse(res)
  return res_data
}
// 设备人员注册
export function registerDataSync(data) {
  let res = window.top.myExtension.setStaffForsynchronization(
    // let res = window.top.myExtension.setStafforDataSyn(
    data.id.toString(),
    data.name,
    data.Employee_code.toString(),
    data.phone.toString(),
    data.Email,
    data.departmentname.toString(),
    data.Employetypename.toString(),
    data.picture.toString(),
    data.line_type.toString(),
    data.line_userid.toString(),
    data.face_idcard.toString(),
    data.idcardtype.toString(),
    data.device_sn
  )

  var res_data = JSON.parse(res)
  return res_data
}
//一键注册
export function registerAll(data) {
  window.top.myExtension.registDataSynTostaff(
    data.name.toString(),
    data.role.toString(),
    data.stutas.toString(),
    data.addr_name.toString()
  )
  return true
}
