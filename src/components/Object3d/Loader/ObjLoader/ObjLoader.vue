<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {LoadingManager, Object3D, TextureLoader} from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {materialProps, useMaterial} from "../../useMaterial";
import {inject, reactive, watch} from "vue";
import Box3 from "../../../../library/Box3";

export default {
    name: "ObjLoader",
    emits: [...transformEmits, 'loaded', 'progress', 'error'],
    props: {
        ...object3dProps,
        ...transformProps,
        ...materialProps,
        name: {type: String, default: 'Object3D'},
        path: {type: String},
        map: {type: [Object, String]},
        centered: {type: Boolean, default: false},
        contain: {type: Boolean, default: false},
    },
    setup(props, ctx) {
        const stage = inject("stage")
        const manager = new LoadingManager()
        const loader = new OBJLoader(manager)
        const object3d = reactive(new Object3D());

        const {process, data, unmount, mount, setChildLayer} = useObject3d(object3d, props, ctx)
        const {setScale} = useTransform(object3d, props, ctx)
        useMaterial(object3d, props.material)

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
                stage.render();
            }
        }

        watch(() => props.path, () => {
            if (!props.path) return
            loadObject(props.path).then(obj => {
                obj.name = props.name;
                obj.traverse((child) => {
                    setChildLayer(child, props.layer)
                    object3d.add(child)
                });

                if (object3d) {
                    unmount(object3d)
                }

                setMaterial(props.material);
                mount(object3d)
                if (props.contain) {
                    let box3 = new Box3(object3d)
                    let scale = box3.getContainedScale()
                    setScale(scale)
                    stage.render()
                }
            })
        }, {immediate: true})

        watch(() => props.map, () => {
            if (props.map) {
                if (typeof props.map === 'object') {
                    props.material.map = props.map
                    stage.render()
                } else if (typeof props.map === 'string') {
                    props.material.map = new TextureLoader().load(props.map, () => {
                        stage.render()
                    });
                }
            }
        }, {immediate: true})

        return {
            process, data
        }
    }
}
</script>
