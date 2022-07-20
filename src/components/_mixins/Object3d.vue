<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
/**
 * 所有mixins需要在mounted之前创建Object3d对象
 */
import * as THREE from 'three'
import {angle2euler} from "../../utils";
import {ev} from "../../const/event";
import {computed, markRaw} from "vue";

export default {
  name: "Object3d",
  inject: ['vue3d', 'handler', 'parent'],
  props: {

  },
  setup(){
    console.log("asdasd")
  },
  object3d: null,
  data() {
    return {
      process: {
        mounted: false
      },
      visible: true, // 是否可见
    }
  },
  provide() {
    return {
      parent: computed(() => this.object3d.value)
    };
  },
  created() {
    // console.log(this.object3d)
  },
  mounted() {
    if (this.object3d) this.init();
    // console.log(this.parent, this.object3d)
  },
  updated() {
    this.render();
  },
  beforeUnmount() {
    this.$emit('remove', this.object3d);
    this.removeObject3d(this.object3d);
    this.object3d = null
    this.process.mounted = false;
  },
  methods: {
    init() {
      // // this.object3d.vComponent = this;
      // this.object3d.name = this.name || this.$options.name;
      //
      // this.setPosition(this.position);
      // this.setRotation(this.rotation);
      // this.setScale(this.scale);
      //
      // this.addObject3d(this.object3d);
      //
      this.process.mounted = true
      //
      // this.$emit('ready', this.object3d);
      // this.render();
    },
    addObject3d(object3d) {
      if (this.parent) {
        this.parent.add(object3d);
      }
    },
    removeObject3d(object3d) {
      if (this.parent) {
        this.parent.remove(object3d);
      }
    },
    setPosition(val) {
      if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
        this.object3d.position.set(this.position.x, this.position.y, this.position.z)
      }
      this.$emit("update:position", this.object3d.position);
      this.render();
    },
    setRotation(val) {
      if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
        const x = angle2euler(val.x);
        const y = angle2euler(val.y);
        const z = angle2euler(val.z);
        let euler = new THREE.Euler(x, y, z);
        this.object3d.setRotationFromEuler(euler);
      }
      this.$emit("update:rotation", this.object3d.rotation);
      this.render();
    },
    setScale(val) {
      if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
        this.object3d.scale.set(this.scale.x, this.scale.y, this.scale.z)
      }
      this.$emit("update:scale", this.object3d.scale);
      this.render();
    },
    setTarget() {
      this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
      this.render();
    },
    // 渲染
    render() {
      this.vue3d.fire(ev.renderer.render.handler)
      this.$emit('update', this.object3d);
    },
  },
  watch: {
    name(val, oldVal) {
      if (val === oldVal) return;
      this.object3d.name = val;
    },
    target(val, oldVal) {
      if (val && val === oldVal) return;
      this.setTarget();
    },
    position(val) {
      if (Object.is(this.object3d.position, val)) return;
      this.setPosition(val);
    },
    rotation(val) {
      if (Object.is(this.object3d.rotation, val)) return;
      this.setRotation(val);
    },
    scale(val) {
      if (Object.is(this.object3d.scale, val)) return;
      this.setScale(val);
    }
  }
}
</script>
