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
      render,
      setScale,
      setPosition,
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
      if (!props.path) return
      loadObject(props.path).then(obj => {
        obj.name = props.name;
        if (data.node) {
          unmount(data.node)
        }
        data.node = obj;
        setMaterial(props.material);
        init(obj, props)
        mount(obj)
        if (props.contain) {
          let box3 = new Box3(obj)
          let scale = box3.getContainedScale()

          /**
           * 逐渐缩小到既定比例
           * TODO: 直接缩放scale小于0.02左右会产生一个渲染的bug，
           *        因此通过间接缩小的方式临时处理渲染的问题。
           *        后期看看three更新或者其他渠道修复这个问题
           * @type {number}
           */
          const hi = setInterval(() => {
            if (obj.scale.x <= scale) {
              clearInterval(hi)
            } else {
              let s = obj.scale.x - 0.01
              setScale(s)
            }
          }, 5)

          render()
        }
      })
    }, {immediate: true})

    watch(() => props.map, () => {
      if (props.map) {
        if (typeof props.map === 'object') {
          props.material.map = props.map
          render()
        } else if (typeof props.map === 'string') {
          props.material.map = new TextureLoader().load(props.map, () => {
            render()
          });
        }
      }
    }, {immediate: true})

    provide('parent', data)
    return {
      process, data, render
    }
  }
}
</script>