import EditorCamera from "./EditorCamera.vue";

const ComponentName = "V3dEditorCamera"

const V3dEditorCamera = Object.assign(EditorCamera, {
    install: function (app) {
        app.component(ComponentName, EditorCamera);
    }
})

export {ComponentName, V3dEditorCamera}
