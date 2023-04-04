<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {object3dEmits, object3dProps, useObject3d} from "../../../composition/objectd3d";
import {Group} from "three";
import {provide} from "vue";

export default {
    name: "Group",
    emits: [...object3dEmits],
    props: {...object3dProps},
    setup(props, ctx) {
        const {process, data, init} = useObject3d(ctx)

        const object3d = new Group();

        init(object3d, props)

        provide('parent', data)

        return {process, data}
    }
}
</script>
