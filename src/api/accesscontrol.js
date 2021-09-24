export function getAllAccessRules() {
  const json = window.top.myExtension.getAllAccessRules()
  return JSON.parse(json)
}

export function addTimeSegment(parentId, from, to) {
  const json = window.top.myExtension.addTimeSegment(parentId, from, to)
  return JSON.parse(json)
}

export function removeTimeSegment(segmentId) {
  window.top.myExtension.removeTimeSegment(segmentId)
}

export function removeAccessRule(Id) {
  window.top.myExtension.removeAccessRule(Id)
}

export function addWeekAccessRule(name) {
  const json = window.top.myExtension.addWeekAccessRule(name)
  return JSON.parse(json)
}

export function addDayAccessRule(name) {
  const json = window.top.myExtension.addDayAccessRule(name)
  return JSON.parse(json)
}

export function getAllRuleDistribution() {
  const json = window.top.myExtension.getAllRuleDistribution()
  return JSON.parse(json)
}

export function removeRuleDistributionItem(Id) {
  window.top.myExtension.removeRuleDistributionItem(Id)
}

export function removeRuleDistributionDevice(Id) {
  window.top.myExtension.removeRuleDistributionDevice(Id)
}

export function setAccessRuleForRuleDistribution(distributionId, accessRuleId) {
  window.top.myExtension.setAccessRuleForRuleDistribution(
    distributionId,
    accessRuleId
  )
}

export function addEmployeeTypeDistribution(name) {
  let data = window.top.myExtension.addEmployeeTypeDistribution(name)
  return JSON.parse(data)
}

export function addDepartmentDistribution(name) {
  let data = window.top.myExtension.addDepartmentDistribution(name)
  return JSON.parse(data)
}

export function addStaffDistribution(name) {
  let data = window.top.myExtension.addStaffDistribution(name)
  return JSON.parse(data)
}

export function getAllEmployeeType() {
  const json = window.top.myExtension.getAllEmployeeType()
  return JSON.parse(json)
}

export function getAllDepartment() {
  let data = window.top.myExtension.getAllDepartment()
  return JSON.parse(data)
}

export function removeDistribution(Id) {
  window.top.myExtension.removeDistribution(Id)
}

export function addGroupIdToDistribution(distId, groupId, groupIdType) {
  let data = window.top.myExtension.addGroupIdToDistribution(
    distId,
    groupId,
    groupIdType
  )
  return JSON.parse(data)
}

export function getStaffByNameFuzzy(query) {
  let json = window.top.myExtension.getStaffByNameFuzzy(query)
  return JSON.parse(json)
}

export function addStaffIdToDistribution(distId, staffId) {
  let json = window.top.myExtension.addStaffIdToDistribution(distId, staffId)
  return JSON.parse(json)
}

export function addDeviceIdToDistribution(distId, deviceId) {
  let json = window.top.myExtension.addDeviceIdToDistribution(distId, deviceId)
  return JSON.parse(json)
}

export function buildRuleDeploymentTask() {
  window.top.myExtension.buildRuleDeploymentTask()
}

export function getRuleDeployTasks() {
  let json = window.top.myExtension.getAllAccessRuleDeployTasks()
  return JSON.parse(json)
}

export function canAddAccessControlDeployTask() {
  return window.top.myExtension.canAddAccessControlDeployTask()
}

export function removeAccessControlDeployTask(id) {
  window.top.myExtension.removeAccessControlDeployTask(id)
}
