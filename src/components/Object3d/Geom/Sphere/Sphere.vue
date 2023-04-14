<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {Mesh, SphereGeometry} from 'three'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {materialProps, useMaterial} from "../../useMaterial";
import {reactive} from "vue";

export default {
    name: "Sphere",
    props: {
        ...object3dProps,
        ...transformProps,
        ...materialProps,
        radius: {type: Number, default: 1},
        widthSegments: {
            type: Number, default: 64, validate(value) {
                return value >= 3 && value <= 64
            }
        },
        heightSegments: {
            type: Number, default: 32, validate(value) {
                return value >= 2 && value <= 32
            }
        },
        phiStart: {type: Number, default: 0},
        phiLength: {
            type: Number, default() {
                return Math.PI * 2
            }
        },
        thetaStart: {type: Number, default: 0},
        thetaLength: {
            type: Number, default() {
                return Math.PI
            }
        },
        withHelper: {type: Boolean, default: false},
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments, props.phiStart, props.phiLength, props.thetaStart, props.thetaLength);
        const object3d = reactive(new Mesh(geometry, props.material))

        const {process, data} = useObject3d(object3d, props, ctx)
        useTransform(object3d, props, ctx)
        useMaterial(object3d, props.material)

        return {process, data}
    },

}
</script>
