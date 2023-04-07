<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {CameraHelper, PerspectiveCamera, Raycaster, Vector2, Vector4} from 'three'
import {inject, provide, reactive, watch} from "vue";
import Orbit from "../../../library/Orbit";
import {object3dEmits, object3dProps, useObject3d} from "../../useObjectd3d";
import useRaycaster from "../useRaycaster";

export default {
    name: "PerspectiveCamera",
    props: {
        ...object3dProps,
        x: {type: Number, default: 0}, // viewport x 原点（x=0）：左
        y: {type: Number, default: 0}, // viewport y 原点（y=0）：下
        width: {type: Number}, // viewport width
        height: {type: Number}, // viewport height
        near: {type: Number, default: 0.1},
        far: {type: Number, default: 2000},
        fov: {type: Number, default: 50},
        /* helper */
        withHelper: {type: Boolean, default: false},
        visibleHelper: {type: Boolean, default: false},
        withOrbit: {type: Boolean, default: true},
        withRay: {type: Boolean, default: true},
        rayLayer: {type: Array},
        main: {type: Boolean, default: false}
    },
    emits: [...object3dEmits, 'cast'],
    setup(props, ctx) {
        const vWidth = inject('width')
        const vHeight = inject('height')
        const {vue3d, stage, parent, process, data, init, render} = useObject3d(ctx)

        const viewport = reactive({
            width: props.width ? props.width : vWidth.value,
            height: props.height ? props.height : vHeight.value
        })

        const camera = new PerspectiveCamera(props.fov, viewport.width / viewport.height, props.near, props.far);

        const updateCamera = () => {
            camera.fov = props.fov;
            camera.aspect = viewport.width / viewport.height
            camera.viewport = new Vector4(Math.floor(props.x), Math.floor(props.y), Math.ceil(viewport.width), Math.ceil(viewport.height))
            camera.updateProjectionMatrix();
            render()
        }

        updateCamera()

        if (props.withHelper) {
            const helper = new CameraHelper(camera);
            helper.visible = props.visibleHelper;
            camera.helper = helper;
            stage.scene.add(helper)
        }

        if (props.withRay) {
            const {raycaster} = useRaycaster(camera, stage, props.rayLayer, (targets) => {
                ctx.emit("cast", targets)
            })
        }

        let orbit = null
        if (props.withOrbit) {
            orbit = new Orbit(camera, stage.dom)
            orbit.control.addEventListener('change', render, true);
        }

        let transform = null
        if (props.transform) {
            transform = new Transform()
        }

        props.main && (stage.camera = camera)

        watch([() => props.width, () => props.height, () => vWidth.value, () => vHeight.value, () => props.fov], () => {
            viewport.width = props.width ? props.width : vWidth.value
            viewport.height = props.height ? props.height : vHeight.value
            updateCamera()
        })

        init(camera, props)
        provide('parent', data)

        return {
            process, viewport, orbit, data, updateCamera
        }
    }
}
</script>
