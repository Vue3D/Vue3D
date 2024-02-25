import Stage from "./Stage.vue"

const V3dStage = Object.assign(Stage, {
    install: function (app) {
        app.component("V3dStage", Stage);
    }
})

export {V3dStage}
