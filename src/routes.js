import Home from './components/home/Home.vue'
import Item from './components/item/Item.vue'
import ItemPhotos from './components/itemPhotos/ItemPhotos.vue'

export const routes = [
    {path: '', name:'home', component: Home, title: 'Home', menu: true},
    {path: '/item', name:'create', component: Item, title: 'New Item Photo', menu: true},
    {path: '/item/:metalEdit/:shapeEdit', name:'add', component: Item, title: 'Item', menu: false},
    {path: '/itemPhotos/:itemId/:metal/:shape', name:'itemPhotos', component: ItemPhotos, title: 'Item', menu: false},
    {path: '*', component: Home, menu: false}
]