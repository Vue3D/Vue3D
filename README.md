# Vue3D
基于Vue3的Three.js组件化渲染项目。
本项目经过vue2到vue3.4的多个版本迭代，取消了全局加载模式，
使整体结构更加灵活，支持外部扩展。

# 安装 
```
npm install vue3d
```

# 案例
```vue
  <!--  创建舞台场景 -->
<v3d-stage ref="base" :width="width" :height="800">
    <!--添加主摄像机-->
    <v3d-perspective-camera :position="camPosition" main>
    <!--添加摄像机旋转控制器-->
    <v3d-camera-orbit-control/>
    <v3d-camera-transform-control :target="target" :mode="mode" @change="update"/>
    <!--添加射线检测器-->
    <v3d-camera-raycaster @cast="onCast" @pick="onPick"/>
    <!--添加平行光-->
    <v3d-directional-light :position="{x:0,y:20,z:0}" :intensity="1"></v3d-directional-light>
</v3d-perspective-camera>
<!--添加基础模型-->
<v3d-cube></v3d-cube>
<v3d-sphere :position="{x:1,y:0,z:0}"></v3d-sphere>
<!--添加环境光-->
<v3d-ambient-light></v3d-ambient-light>
<!--添加网格线-->
<v3d-grid-helper></v3d-grid-helper>
</v3d-stage>
```
