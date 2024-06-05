import Stage from "./Stage.vue"

const V3dStage = Object.assign(Stage, {
    install: function (app) {
        app.component(ComponentName, Stage);
    }
})

export const ComponentName = "V3dStage"
export {V3dStage}
