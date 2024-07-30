<script setup>
import {inject, reactive, ref} from "vue";
import {Object3D, DefaultLoadingManager} from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode";
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {materialEmits, materialProps, useMaterial} from "../../../use/useMaterial";
import {ObjLoaderName} from "./";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...nodeEmits, ...object3dEmits, ...materialEmits, "load:start", "load:progress", "load:complete", "load:error"])
const props = defineProps({
  ...nodeProps,
  ...object3dProps,
  ...materialProps,
  path: {type: String},
  size: {type: Number, default: 0},
  manager: {type: Object, default: DefaultLoadingManager}
})

const stage = inject("stage")

const object3d = reactive(new Object3D());

const {status, node} = useNode(object3d, props, emits, ObjLoaderName);
const {setChildLayer, setSize} = useObject3d(object3d, props, emits)
const {setMaterial} = useMaterial(object3d, props, emits)

const loader = new OBJLoader(props.manager)

emits("load:start")
loader.load(props.path,
    (group) => {
      group.name = props.name;
      group.traverse((child) => {
        child.name = object3d.uuid
        setChildLayer(child, props.layer)
        object3d.add(child)
      });
      setMaterial(props.material)
      setSize(props.size)
      stage.render()
      emits("load:complete", group)
    },
    xhr => {
      emits("load:progress", xhr)
    },
    err => {
      emits("load:error", err)
    }
)

</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
