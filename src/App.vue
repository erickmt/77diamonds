<template>
    <div class="body">
        <h1 class="centralized">{{ title }}</h1>
        <nav-menu :routes="routes"/>

        <transition name="page">
            <router-view></router-view>
        </transition>
    </div>
    
</template>

<script>
import {routes} from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {

    components: {
        'nav-menu' : Menu
    },

    data() {
        return {
            routes : routes.filter(route => route.menu),
            title: '77 Diamonds'
        }
    }
}

</script>

<style scoped>
    .body {
        font-family: Helvetica, sans-serif;
        width: 96%;
        margin: 0 auto;
    }
    
    .centralized {
        text-align: center;
    }
</style>