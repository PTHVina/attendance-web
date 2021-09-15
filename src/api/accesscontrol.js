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
