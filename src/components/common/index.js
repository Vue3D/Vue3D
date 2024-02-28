export const TYPE={
    STAGE:"stage"
}
/**
 * 使用元组件对象
 * @param units {function}
 */
export function Vue3D(...units) {
    const _props = {}, _emits = [], _start = [], _mounted = [], _update = [], _unmounted = []
    for (let unit of units) {
        const {props, emits, onStart, onMounted, onUpdate, onUnmounted} = unit()
        if (typeof props === "object") {
            Object.assign(_props, props)
        }
        for (let e of emits) {
            if (!_emits.includes(e)) {
                _emits.push(e)
            }
        }
        if (typeof onStart === "function") {
            _start.push(onStart)
        }
        if (typeof onMounted === "function") {
            _mounted.push(onMounted)
        }
    }

    function bind(object, props, emits) {
        for (let start of _start) {
            start(object, props, emits)
        }
    }

    function mount() {
        for (let mounted of _mounted) {
            mounted()
        }
    }

    return { _props, emits: _emits, bind, mount}
}

