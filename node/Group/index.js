import Group from "./Group.vue"

const GroupName = "V3dGroup"
const V3dGroup = Object.assign(Group, {
    install(app) {
        app.component(GroupName, Group)
    }
})

export {GroupName, V3dGroup}
