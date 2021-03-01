//设备列表
export function getDeviceList() {
  let res = window.top.myExtension.getDeviceDiscover()
  let data_json = JSON.parse(res)

  return data_json
}
//添加设备
export function addDevice(data) {
  var res = window.top.myExtension.AddIPtoMydevice(data.IP, data.DeviceName)
  var res_json = JSON.parse(res)

  return res_json
}
//修改设备
export function editDevice(data) {
  var res = window.top.myExtension.UpdatIPtoMydevice(
    data.editIp,
    data.IP,
    data.DeviceName
  )
  var res_json = JSON.parse(res)

  return res_json
}
//开闸
export function openDoor(ip) {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.Open((res) => {
      resolve(res)
    }, ip)
  })
}
//删除设备
export function delDevice(data) {
  var res = window.top.myExtension.DeleteIPtoMydevice(data.IP)

  return res
}
//获取局域网设备
export function getDeviceByLocal() {
  return new Promise(function (resolve, reject) {
    window.top.myExtension.getAllDeviceDiscover((res) => {
      var data_json = JSON.parse(res)

      resolve(data_json)
    })
  })
}
//修改IP
export function changeIP(data) {
  let res = window.top.myExtension.changeIP(
    data.mac,
    data.IP,
    data.Netmask,
    data.gateway
  )

  return true
}

//显示监控
export function setDome(data) {
  window.top.myExtension.displayPanel(
    data.width.toString(),
    data.height.toString(),
    data.locationW.toString(),
    data.locationH.toString()
  )
}
//播放视屏
export function play(ip) {
  window.top.myExtension.AppIp(ip)
}
//关闭在线视频界面
export function closePage() {
  window.top.myExtension.NodisplayPanel()
}
