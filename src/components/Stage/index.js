export const ComponentName = "V3dStage"
import Stage from "./Stage.vue"

const V3dStage = Object.assign(Stage, {
    install: function (app) {
        app.component(ComponentName, Stage);
    }
})

export {V3dStage}
