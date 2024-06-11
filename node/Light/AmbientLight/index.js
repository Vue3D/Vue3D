import AmbientLight from "./AmbientLight.vue";

const AmbientLightName = "V3dAmbientLight"
const V3dAmbientLight = Object.assign(AmbientLight, {
    install: function (app) {
        app.component(AmbientLightName, AmbientLight);
    }
})

export {V3dAmbientLight, AmbientLightName}
