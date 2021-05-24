const Item = () => System.import('./components/item/Item.vue');

import Home from './components/home/Home.vue'

export const routes = [
    {path: '', name:'home', component: Home, titulo: 'Início', menu: true},
    {path: '/item', name:'create', component: Item, titulo: 'Item', menu: true},
    {path: '/item/:id', name:'edit', component: Item, titulo: 'Item', menu: false},
    {path: '*', component: Home, menu: false}
]