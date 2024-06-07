export function usePlugin(node, props, emits) {
    if (props && Array.isArray(props)) {
        props.plugins.forEach(plugin => {
            if (typeof plugin === 'function') {
                plugin(node, props, emits);
            }
        })
    }
    return {}
}

export const pluginEmits = [
    "onPlugin"
]
export const pluginProps = {
    plugins: {
        type: Array,
        default() {
            return []
        }
    }
}
