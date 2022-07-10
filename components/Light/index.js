import Light from "./Light.vue"

Light.install = function (app, prefix = 'V3d') {
    app.component(`${prefix}${Light.name}`, Light);
};

export default Light
