import AmbientLight from "./AmbientLight.vue";

const ComponentName = "V3dAmbientLight"

const V3dAmbientLight = Object.assign(AmbientLight, {
    install: function (app) {
        app.component(ComponentName, AmbientLight);
    }
})

export {V3dAmbientLight, ComponentName}
