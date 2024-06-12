import GridHelper from "./GridHelper.vue"

const GridHelperName = "V3dGridHelper"
const V3dGridHelper = Object.assign(GridHelper, {
    install: function (app) {
        app.component(GridHelperName, GridHelper);
    }
})

export {V3dGridHelper, GridHelperName}
