<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {inject, reactive, toRaw, watch} from "vue";
import {BoxHelper, Color} from 'three'
import {noop} from "@unjuanable/jokes";
import {object3dProps, useObject3d} from "../../useObjectd3d";

export default {
    name: "BoxHelper",
    props: {
        ...object3dProps,
        target: {
            type: [Object, null], validator(value) {
                if (!value) return true
                return value.isObject3D ?? false
            },
        },
        color: {type: String, default: 'rgb(255,255,0)'},
    },
    setup(props, ctx) {
        const stage = inject('stage')

        const box = reactive(new BoxHelper(undefined, new Color(props.color).getHex()))
        box.isVue3d = false

        const {process} = useObject3d(box, props)

        const setTarget = (target, callback = noop) => {
            if (!target) {
                box.visible = false
                return
            }
            box.visible = true
            if (target && target.hasOwnProperty("isVue3d") && target.isVue3d) {
                box.setFromObject(target)
                stage.render(callback);
            } else {
                setTarget(target.parent)
            }
        }

        watch(() => props.target, (val, oldVal) => {
            if (val === oldVal) return
            setTarget(toRaw(val))
            stage.render();
        }, {deep: false})

        watch([() => props.target.position, () => props.target.rotation, () => props.target.scale], () => {
            setTarget(toRaw(props.target))
            stage.render();
        }, {deep: true})

        stage.scene.add(toRaw(box))

        return {process, box}
    }
}
</script>
