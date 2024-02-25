/**
 * 使用元组件对象
 * @param units {function}
 */
export function useVue3D(...units) {
    const p = {}, e = [], c = [], m = [], u = [], d = []
    for (let unit of units) {
        const {props, emits, bind, mounted, update, unmounted} = unit()
        if (typeof props === "object") {
            Object.assign(p, props)
        }
        console.log(props, emits, bind, mounted, update, unmounted)
        // if (mounted) {
        //     m.push(mounted)
        // }
    }
    return {props:p,}
}

