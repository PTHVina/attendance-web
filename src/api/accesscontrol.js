export function getAllAccessRules() {
  const json = window.top.myExtension.getAllAccessRules()
  return JSON.parse(json)
}
