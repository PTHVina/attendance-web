export function getAllAccessRules() {
  const json = window.top.myExtension.getAllAccessRules()
  return JSON.parse(json)
}

export function addTimeSegment(parentId, from, to) {
  const json = window.top.myExtension.addTimeSegment(parentId, from, to)
  return JSON.parse(json)
}
