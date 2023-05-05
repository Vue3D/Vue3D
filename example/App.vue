<template>
    <div class="menu">
        <ul>
            <li v-for="item in routes">
                <router-link :to="item.path">{{ item.meta.label }}</router-link>
            </li>
        </ul>
    </div>
    <div class="views">
        <router-view></router-view>
    </div>
</template>

<script setup>
import {RouterView} from "vue-router"
import {routes} from "./router.js"</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html, body {
    width: 100%;
    height: 100%;
}

#app {
    width: 100%;
    height: 100%;
}

.menu {
    width: 300px;
    height: 100%;
    float: left;
    background-color: #fdfdfd;
    overflow-y: scroll;
}

.menu li {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-indent: 2em;
    border-bottom: 1px dashed #dddddd;
}

.views {
    width: calc(100% - 300px);
    height: 100%;
    float: left;
    overflow: hidden;
}


</style>
