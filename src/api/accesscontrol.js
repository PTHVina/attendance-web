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
