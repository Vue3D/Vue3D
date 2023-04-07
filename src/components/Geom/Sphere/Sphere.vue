<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {provide, watch} from "vue";
import {Mesh, SphereGeometry} from 'three'
import {object3dEmits, object3dProps, useObject3d} from "../../../composition/objectd3d";
import {ceramic} from "../../../const/materials";

export default {
    name: "Sphere",
    props: {
        ...object3dProps,
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
        material: {
            type: Object, default() {
                return ceramic()
            }
        },
        withHelper: {type: Boolean, default: false}
    },
    emits: [...object3dEmits],
    setup(props, ctx) {
        const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments, props.phiStart, props.phiLength, props.thetaStart, props.thetaLength);
        const object3d = new Mesh(geometry, props.material);

        const {process, data, init,} = useObject3d(ctx)

        watch(() => props.material, (val) => {
            setMaterial(val)
        })

        const setMaterial = (mtl) => {
            if (geometry) {
                object3d.material = mtl;
            }
        }

        setMaterial(props.material)

        init(object3d, props)

        provide('parent', data)

        return {process, data}
    },

}
</script>
