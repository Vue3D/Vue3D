import {DefaultLoadingManager} from "three";
import {noop} from "@unjuanable/jokes";

const loaderEmits = ["load:start", "load:progress", "load:complete", "load:error"]
const loaderProps = {
    path: {type: String},
    baseurl: {type: String},
    size: {type: Number, default: 0},
    manager: {type: Object, default: DefaultLoadingManager}
}

function useLoader(object3d, props, emits) {

    const callback = {
        onComplete: noop,
        onProgress: noop,
        onError: noop,
    }

    const onLoad = (loader, url = null) => {
        emits("load:start")
        if (url === null) {
            url = props.baseurl ? props.baseurl + props.path : props.path
        }
        loader.load(url,
            res => {
                res.name = props.name;
                callback.onComplete && callback.onComplete(res)
                emits("load:complete", res)
            },
            xhr => {
                callback.onProgress && callback.onProgress(xhr)
                emits("load:progress", xhr)
            },
            err => {
                callback.onError && callback.onError(err)
                emits("load:error", err)
            }
        )

        const onComplete = (cb) => {
            if (typeof cb === "function") {
                callback.onComplete = cb
            }
        }

        const onProgress = (cb) => {
            if (typeof cb === "function") {
                callback.onProgress = cb
            }
        }

        const onError = (cb) => {
            if (typeof cb === "function") {
                callback.onError = cb
            }
        }

        return {onComplete, onProgress, onError}
    }
    return {onLoad}
}

export {loaderEmits, loaderProps, useLoader}
