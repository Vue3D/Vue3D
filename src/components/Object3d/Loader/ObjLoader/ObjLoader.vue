<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {LoadingManager, Object3D} from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {materialEmits, materialProps, object3dProps, useMaterial} from "@vue3d/core";
import {inject, reactive, watch} from "vue";
import Box3 from "../../../../utils/Box3";

export default {
  name: "ObjLoader",
  emits: [...materialEmits, 'loaded', 'progress', 'error'],
  props: {
    ...object3dProps,
    ...materialProps,
    name: {type: String, default: 'Object3D'},
    path: {type: String},
    size: {type: Number},
  },
  setup(props, ctx) {
    const stage = inject("stage")
    const manager = new LoadingManager()
    const loader = new OBJLoader(manager)
    const object3d = reactive(new Object3D());

    const {process, data, unmount, mount, setChildLayer} = object3d(object3d, props, ctx)
    const {setScale} = transform(object3d, props, ctx)
    const {setMaterial} = useMaterial(object3d, props, ctx)

    const loadObject = (path) => {
      return new Promise((resolve, reject) => {
        loader.load(path, object => {
          ctx.emit('loaded', object);
          process.mounted = true
          resolve(object)
        }, xhr => {
          ctx.emit('progress', xhr);
        }, err => {
          ctx.emit('error', err);
          reject(err)
        });
      })
    }

    watch(() => props.path, () => {
      if (!props.path) return
      if (object3d) {
        unmount(object3d)
      }
      loadObject(props.path).then(obj => {
        obj.name = props.name;
        obj.traverse((child) => {
          child.name = object3d.uuid
          setChildLayer(child, props.layer)
          object3d.add(child)
        });

        setMaterial(props.material);

        mount(object3d)

        if (props.size > 0) {
          let box3 = new Box3(object3d)
          let scale = box3.getContainedScale(props.size)
          setScale(scale)
          stage.render()
        }
      })
    }, {immediate: true})

    return {
      process, data
    }
  }
}
</script>
