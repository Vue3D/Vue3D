const pluginEmits = ["onPlugin"]
const pluginProps = {
    plugins: {
        type: Array,
        default() {
            return []
        }
    }
}

function usePlugin(node, props, emits) {
    if (props && Array.isArray(props)) {
        props.plugins.forEach(plugin => {
            if (typeof plugin === 'function') {
                plugin(node, props, emits);
            }
        })
    }
    return {}
}

export {pluginProps, pluginEmits, usePlugin}
