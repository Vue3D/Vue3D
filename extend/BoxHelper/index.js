import BoxHelper from "./BoxHelper.vue"

const BoxHelperName = "V3dBoxHelper"
const V3dBoxHelper = Object.assign(BoxHelper, {
    install: function (app) {
        app.component(BoxHelperName, BoxHelper);
    }
})

export {V3dBoxHelper, BoxHelperName}
