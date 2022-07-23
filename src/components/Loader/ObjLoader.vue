<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {LoadingManager, TextureLoader} from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {object3dProps, useObject3d} from "../../composition/objectd3d";
import {computed, onBeforeMount, onMounted, provide} from "vue";
import {ceramic} from "../../const/materials";

export default {
  name: "ObjLoader",
  emits: ['loaded', 'progress', 'error'],
  props: {
    ...object3dProps,
    name: {type: String, default: 'Object3D'},
    path: {type: String},
    material: {
      type: Object, default() {
        return ceramic
      }
    },
    map: {type: [Object, String]}
  },
  setup(props, ctx) {
    const manager = new LoadingManager()
    const loader = new OBJLoader(manager)

    const {
      process,
      data,
      init,
      mount,
      render
    } = useObject3d()

    loader.load(props.path, object => {
      object.name = props.name;
      data.node = object;
      setMaterial(props.material);
      init(object, props)
      mount(object)

      ctx.emit('loaded', object);
      process.mounted = true
    }, xhr => {
      ctx.emit('progress', xhr);
    }, err => {
      ctx.emit('error', err);
    });

    if (props.map) {
      if (typeof props.map === 'object') {
        props.material.map = props.map
      } else if (typeof props.map === 'string') {
        props.material.map = new TextureLoader().load(props.map);
      }
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

    provide('parent', data)
    return {
      process, data
    }
  }
}
</script>