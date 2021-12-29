export function getList() {
  var data = window.top.myExtension.getDepartmentData()
  data = JSON.parse(data)
  return data
}
export function editTree(data) {
  var res = window.top.myExtension.updatDepartmentData(
    data.name,
    data.explain,
    data.phone,
    data.address,
    data.no
  )
  var datajson = JSON.parse(res)
  return datajson
}
export function delTree(data) {
  var res = window.top.myExtension.delDepartmentData(
    data.no,
    JSON.stringify(data)
  )
  return res
}
export function getTreeNo() {
  var res = window.top.myExtension.getDepartmentNo()
  var re_json = JSON.parse(res)

  return re_json
}
export function addTree(data) {
  var res = window.top.myExtension.AddDepartmentData(
    data.name,
    data.explain,
    data.phone,
    data.address,
    JSON.stringify(data.no),
    data.ParentId
  )
  var datajson = JSON.parse(res)
  return datajson
}
export function getTag() {
  var res = window.top.myExtension.getEmployetype()
  var json = JSON.parse(res)

  return json
}
export function delTag(value) {
  let val = value.replace(/\s/g, '')
  window.top.myExtension.deleteEmployetype(val)

  return true
}
export function addTag(value) {
  window.top.myExtension.addEmployetype(value)

  return true
}

// line设置信息
export function getLineData() {
  var data = window.top.myExtension.getline()
  var data_json = JSON.parse(data)
  return data_json
}
//设置line
export function setLineData(data) {
  var re = window.top.myExtension.EditLine(
    data.text1.toString(),
    data.text6.toString(),
    data.text7.toString(),
    data.text8.toString(),
    data.text9.toString(),
    data.text10.toString(),
    data.text11.toString(),
    data.text12.toString(),
    data.text13.toString(),
    data.text14.toString(),
    data.text15.toString(),
    data.text16.toString(),
    data.text17.toString(),
    data.text2.toString(),
    data.text3.toString(),
    data.text5.toString(),
    data.text4.toString()
  )
  // console.log(re)
  var re_json = JSON.parse(re)
  return re_json
}

//获取pdf信息
export function getPdfData() {
  var data = window.top.myExtension.getPdfconfiguration()
  var data_json = JSON.parse(data)
  return data_json
}
//设置pdf信息
export function setPdfData(data) {
  var re = window.top.myExtension.EdPdfconfiguration(
    data.text1.toString(),
    data.text2.toString(),
    data.text3.toString(),
    data.text4.toString(),
    data.text5.toString(),
    data.text6.toString(),
    data.text7.toString(),
    data.text8.toString(),
    data.text9.toString(),
    data.text10.toString(),
    data.text11.toString(),
    data.text12.toString(),
    data.text13.toString()
  )
  var re_json = JSON.parse(re)
  return re_json
}

// 获取下发方式参数
export function getParam() {
  var data = window.top.myExtension.getIscode_syn()
  var data_json = JSON.parse(data)
  return data_json
}
// 设置下发方式参数
export function setParam(data) {
  var data = window.top.myExtension.setIscode_syn(data.toString())
  var data_json = JSON.parse(data)
  return data_json
}
// 设置下发方式（自动/手动）
export function setParam2(data) {
  window.top.myExtension.setIsauto_syn(data.toString())
}

export function enableLongTitle(enable) {
  window.top.myExtension.enableLongTitle(enable)
}

export function enableShortTitle(enable) {
  window.top.myExtension.enableShortTitle(enable)
}

export function setLongTitle(title) {
  window.top.myExtension.setLongTitle(title)
}

export function setShortTitle(title) {
  window.top.myExtension.setShortTitle(title)
}

export function hideAttendanceManagementPage(hide) {
  window.top.myExtension.hideAttendanceManagementPage(hide)
}

export function hideAttendanceConfigPage(hide) {
  window.top.myExtension.hideAttendanceConfigPage(hide)
}

export function getUserConfigObject() {
  return JSON.parse(window.top.myExtension.getUserConfigObject())
}

export function setShowTemperatueInCelsius(show) {
  window.top.myExtension.setShowCelsius(show)
}

export function getBrandObject() {
  return JSON.parse(window.top.myExtension.getBrandObject())
}

export function execCommand(command) {
  window.top.myExtension.ExecCommand(command)
}
