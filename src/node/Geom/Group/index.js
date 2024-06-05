import Group from "./Group.vue"

const ComponentName = "V3dGroup"

const Group = Object.assign(Group, {
    install(app) {
        app.component(ComponentName, Group)
    }
})

export {ComponentName, Group}
