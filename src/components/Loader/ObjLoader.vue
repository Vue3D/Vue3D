<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {LoadingManager, TextureLoader} from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {object3dEmits, object3dProps, useObject3d} from "../../composition/objectd3d";
import {inject, markRaw, provide, watch} from "vue";
import {ceramic} from "../../const/materials";
import Box3 from "../../library/Box3";

export default {
  name: "ObjLoader",
  emits: [...object3dEmits, 'loaded', 'progress', 'error'],
  props: {
    ...object3dProps,
    name: {type: String, default: 'Object3D'},
    path: {type: String},
    material: {
      type: Object, default() {
        return ceramic
      }
    },
    map: {type: [Object, String]},
    centered: {type: Boolean, default: false},
    contain: {type: Boolean, default: false},
  },
  setup(props, ctx) {
    const manager = new LoadingManager()
    const loader = new OBJLoader(manager)

    const {
      process,
      data,
      init,
      mount,
      unmount,
      setScale,
      render
    } = useObject3d(ctx)

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

    const setMaterial = (mtl) => {
      if (data.node && mtl) {
        data.node.traverse((child) => {
          if (child.type === 'Mesh') {
            child.material = mtl;
          }
        });
        render();
      }
    }

    watch(() => props.path, () => {
      loadObject(props.path).then(obj => {
        obj.name = props.name;
        if (data.node) {
          unmount(data.node)
        }
        data.node = obj;
        setMaterial(props.material);
        init(obj, props)
        mount(obj)
        let box3 = new Box3(obj)
        if (props.contain) {
          let scale = box3.getContainedScale()
          setScale(scale)
        }
      })
    }, {immediate: true})

    watch(() => props.map, () => {
      if (props.map) {
        if (typeof props.map === 'object') {
          props.material.map = props.map
        } else if (typeof props.map === 'string') {
          props.material.map = new TextureLoader().load(props.map);
        }
      }
    }, {immediate: true})

    provide('parent', data)
    return {
      process, data
    }
  }
}
</script>