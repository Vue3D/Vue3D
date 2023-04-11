<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {inject, reactive} from "vue";
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

export default {
    name: "DirectionalLight",
    props: {
        ...object3dProps,
        ...transformProps,
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
        withHelper: {type: Boolean, default: true},
        visibleHelper: {type: Boolean, default: false},
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const light = reactive(new DirectionalLight(props.color, props.intensity))

        const {process, data} = useObject3d(light, props, ctx)
        useTransform(light, props, ctx)

        if (props.withHelper) {
            const helper = new DirectionalLightHelper(light);
            helper.visible = props.visibleHelper;
            light.helper = helper;
            light.add(helper)
        }

        return {
            process, data
        }
    }
}
</script>
