import DirectionalLight from './DirectionalLight.vue'

const DirectionalLightName = "V3dDirectionalLight"
const V3dDirectionalLight = Object.assign(DirectionalLight, {
    install: function (app) {
        app.component(DirectionalLightName, DirectionalLight);
    }
})

export {V3dDirectionalLight, DirectionalLightName}
