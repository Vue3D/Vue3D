<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {inject, provide, toRaw, watch} from "vue";
import {BoxHelper, Color, Object3D} from 'three'
import useLifecycle from '../../useLifecycle'
import useLayers, {layersProps} from "../../useLayers";
import {noop} from "@unjuanable/jokes";

export default {
    name: "BoxHelper",
    props: {
        target: {
            type: [Object, null], validator(value) {
                if (!value) return true
                return value.isObject3D ?? false
            },
        },
        color: {type: String, default: 'rgb(255,255,0)'},
        ...layersProps
    },
    setup(props) {
        const vue3d = inject('vue3d')
        const stage = inject('stage')

        const box = new BoxHelper();

        const {process} = useLifecycle()
        const {setLayer} = useLayers(box, props.layer)

        const color = new Color(props.color).getHex()

        stage.scene.add(box)

        const setTarget = (target, callback = noop) => {
            if (!target) {
                box.visible = false
                return
            }
            box.visible = true
            if (target && target.hasOwnProperty("isVue3d") && target.isVue3d) {
                box.setFromObject(target, color)
                vue3d.render(callback);
            } else {
                setTarget(target.parent)
            }
        }

        watch(() => props.target, (val) => {
            setTarget(toRaw(val))
            vue3d.render();
        }, {deep: false})
        return {process, box}
    }
}
</script>
