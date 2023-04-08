import {inject} from 'vue'

export function useDelegation() {
    const v3d = inject("v3d")
    const _delegations = []

    /**
     * 向委托中添加方法
     * @param func
     */
    const add = (func) => {
        if (typeof func === 'function') {
            _delegations.push(func);
        } else {
            v3d.error('delegation need a function');
        }
    }

    /**
     * 从委托中移除方法
     * @param func
     */
    const remove = (func) => {
        let index = _delegations.indexOf(func);
        if (index >= 0) {
            _delegations.slice(index, 1);
        } else {
            v3d.warn('Function is not found in delegation');
        }
    }

    /**
     * 执行委托
     * @param renderer
     */
    const call = (renderer) => {
        _delegations.forEach((func) => {
            func && func(renderer);
        });
    }

    return {add, remove, call}
}
