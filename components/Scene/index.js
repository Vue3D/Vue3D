import Scene from "./Scene.vue"

Scene.install = function (app, prefix = 'V3d') {
    app.component(`${prefix}${Scene.name}`, Scene);
};

export default Scene
