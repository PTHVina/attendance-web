//设备列表
export function getDeviceList() {
  let res = window.top.myExtension.getDeviceDiscover()
  let data_json = JSON.parse(res)

  return data_json
}
//设备人员数量统计
export function getDeviceListExt() {
  let res = window.top.myExtension.getDevicePerconCount()
  let data_json = JSON.parse(res)

  return data_json
}
//添加设备
export function addDevice(data) {
  var res = window.top.myExtension.AddIPtoMydevice(
    data.IP,
    data.DeviceName,
    data.InOut,
    data.username,
    data.password
  )
  var res_json = JSON.parse(res)

  return res_json
}
//修改设备
export function editDevice(data) {
  var res = window.top.myExtension.UpdatIPtoMydevice(
    data.editIp,
    data.IP,
    data.DeviceName,
    data.InOut,
    data.username,
    data.password
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
export function delDevice(ip) {
  var res = window.top.myExtension.DeleteIPtoMydevice(ip)

  return res
}
//清空设备人脸
export function emptyDeviceFace(addr_name) {
  var res = window.top.myExtension.emptyDeviceFaceByAddr(addr_name)
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
//获取下发状态(0代表未完成，1代表已完成)
export function getDistributeStatus() {
  var res = window.top.myExtension.getDistributePersonStatus()
  var data_json = JSON.parse(res)
  return data_json
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
//获取相机参数
export function getCameraParameters(ip) {
  let res = window.top.myExtension.getCameraParameters(ip)
  let data_json = JSON.parse(res)

  return data_json
}
//设置相机参数
export function setCameraParameters(data) {
  let res = window.top.myExtension.setCameraParameters(
    data.ip,
    data.dereplication.toString(),
    data.enableAlive.toString(),
    data.enable.toString(),
    data.limit.toString(),
    data.fillLight.toString(),
    data.brightness.toString(),
    data.sensitivity,
    data.screensaver_mode.toString(),
    data.output_not_matched.toString(),
    data.volume.toString()
  )
  let data_json = JSON.parse(res)

  return data_json
}
//获取相机ip参数
export function getCameraIp(ip) {
  let res = window.top.myExtension.GetNetworkInfo(ip)
  let data_json = res ? JSON.parse(res) : ''

  return data_json
}
//设置相机ip参数
export function setCameraIP(data) {
  let res = window.top.myExtension.SetNetworkInfo(
    data.ip,
    data.cameraIp,
    data.gateway,
    data.netmask,
    data.dns
  )
  let data_json = JSON.parse(res)

  return data_json
}
//获取同步时间开关
export function getSwitch() {
  let res = window.top.myExtension.gettime_syn()
  let data_json = JSON.parse(res)

  return data_json
}
//设置同步时间
export function setSwitch(type) {
  let res = window.top.myExtension.setSystem_setting(type.toString())
  let data_json = JSON.parse(res)

  return data_json
}
//获取本机ip地址
export function getLocalIp() {
  let res = window.top.myExtension.GetIpforPC()
  res = res.split(';')

  return res
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

export function getAllMyDevices() {
  return JSON.parse(window.top.myExtension.getAllMyDevices())
}
