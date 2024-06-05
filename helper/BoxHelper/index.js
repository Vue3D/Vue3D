import BoxHelper from "./BoxHelper.vue"

const ComponentName = "V3dBoxHelper"

const V3dBoxHelper = Object.assign(BoxHelper, {
    install: function (app) {
        app.component(ComponentName, BoxHelper);
    }
})

export {V3dBoxHelper, ComponentName}
