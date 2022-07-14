import Camera from "./Camera.vue"

Camera.install = function (app, prefix = 'V3d') {
    app.component(`${prefix}${Camera.name}`, Camera);
};

export default Camera
