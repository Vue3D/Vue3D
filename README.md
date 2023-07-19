# Vue3D
基于Vue3的三维场景加载组件

# 安装 
```
npm install vue3d
```

# 全局引用
```javascript
import {createApp} from 'vue'
import App from './App.vue'
import vue3d from "vue3d"; // import vue3d

const app = createApp(App)

app.use(vue3d) // 全局引用

app.mount('#app')
```

全局引用会在vue实例中注入名为 $vue3d 的全局属性，同时通过provide()提供给所有组件。
该操作仅将启动Vue3D中的事件引擎，并不会将.vue系列组件引用到项目中来。因此其他组件仍需在使用时按需引用。
app.use(vue3d, options)可以使用第二个参数，自定义基础舞台的组件名称。

```javascript
app.use(vue3d, {
    globalImport: false,
    componentsPrefix: "V3d",
    mainComponentName: "V3dStage"
})
```

参数释义：

|参数|解释|默认值|可选值|
|-|-|-|-|
|globalImport|全局引用时可以修改组件前缀|false|[Boolean]|
|componentsPrefix|全局引用时可以修改组件前缀|V3d| |
|mainComponentName|主舞台组件的默认组件名称|V3dStage| |

# 组件引用

```javascript
// 按需引用
import {V3dDirectionalLight, V3dObjLoader, V3dPerspectiveCamera, ...} from "vue3d";
// 全部引用
import {*} from "vue3d"
```

# methods

### render([callback,uuid])

指定某个舞台渲染一帧
@params callback function 渲染后回调
@params uuid 舞台唯一ID，若不填则默认渲染当前激活的场景




[Event System](https://docs.qq.com/aio/DYk5GTUVLbkZtUkJ5?p=WPAjxsQw2ePBPsYm7hC7ux)
