<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {object3dProps, useObject3d,} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {Group} from "three";
import {reactive} from "vue";

export default {
    name: "Group",
    props: {
        ...object3dProps,
        ...transformProps
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const object3d = reactive(new Group())

        const {process} = useObject3d(ctx)
        useTransform(object3d, props, ctx)

        return {process}
    }
}
</script>
