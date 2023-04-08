<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {useObject3d, object3dProps,} from "../../useObjectd3d";
import {useTransform, transformEmits, transformProps} from "../../useTransform";
import {Group} from "three";
import {provide} from "vue";

export default {
    name: "Group",
    props: {
        ...object3dProps,
        ...transformProps
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const object3d = new Group();

        const {process} = useObject3d(ctx)
        useTransform(object3d, props, ctx)

        return {process}
    }
}
</script>
