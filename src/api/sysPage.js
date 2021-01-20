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
  var res = myExtension.getEmployetype()
  var json = JSON.parse(res)

  return json
}

export function delTag(value) {
  let val = value.replace(/\s/g, '')
  myExtension.deleteEmployetype(val)

  return true
}

export function addTag(value) {
  myExtension.addEmployetype(value)

  return true
}
