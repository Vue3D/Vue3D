import Stage from "./Stage.vue"

const StageName = "V3dStage"
const V3dStage = Object.assign(Stage, {
    install: function (app) {
        app.component(StageName, Stage);
    }
})

export {V3dStage, StageName}
