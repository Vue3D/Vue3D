import GridHelper from "./GridHelper.vue"

const ComponentName = "V3dGridHelper"

const V3dGridHelper = Object.assign(GridHelper, {
    install: function (app) {
        app.component(ComponentName, GridHelper);
    }
})

export {V3dGridHelper}
