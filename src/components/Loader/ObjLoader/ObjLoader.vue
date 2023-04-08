<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {LoadingManager, TextureLoader, Object3D} from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {useTransform, transformProps, transformEmits} from "../../useTransform";
import {useMaterial, materialProps} from "../../useMaterial";
import {provide, watch, inject} from "vue";
import Box3 from "../../../library/Box3";

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
        const render = inject("render")
        const manager = new LoadingManager()
        const loader = new OBJLoader(manager)
        const object3d = new Object3D();

        const {process, data} = useObject3d(object3d, props, ctx)
        const {setScale} = useTransform(object3d, props, ctx)
        const {setMaterial} = useMaterial(object3d, props.material)

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

        const setMtl = (mtl) => {
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
                node.name = props.name;
                obj.traverse((child) => {
                    node.add(child)
                });

                if (data.node) {
                    unmount(data.node)
                }

                setMaterial(props.material);
                init(node, props)
                mount(node)
                if (props.contain) {
                    let box3 = new Box3(node)
                    let scale = box3.getContainedScale()

                    /**
                     * 逐渐缩小到既定比例
                     * TODO: 直接缩放scale小于0.02左右会产生一个渲染的bug，
                     *        因此通过间接缩小的方式临时处理渲染的问题。
                     *        后期看看three更新或者其他渠道修复这个问题
                     * @type {number}
                     */
                    const hi = setInterval(() => {
                        if (node.scale.x <= scale) {
                            clearInterval(hi)
                        } else {
                            let s = node.scale.x - 0.01
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
