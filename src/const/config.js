// 是否全局引用
export const globalImport = false
// 全局引用组件前缀
export const componentsPrefix = 'V3d'
// 主要舞台组件名
export const mainComponentName = 'Vue3d'

export function getPrefixComponent(name) {
    return componentsPrefix + name
}
