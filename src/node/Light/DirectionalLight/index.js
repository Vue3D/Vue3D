import DirectionalLight from './DirectionalLight.vue'

const V3dDirectionalLight = Object.assign(DirectionalLight, {
    install: function (app) {
        app.component("V3dDirectionalLight", DirectionalLight);
    }
})

export {V3dDirectionalLight}
