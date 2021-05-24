<template>
    <div>
        <h2 class="centralized"> {{title}} </h2>
        <h4 class="centralized" v-show='photos.length == 0'> {{message}} </h4>
        <div>    
            <ul>
                <li v-for="photo of photosItem" :key="photo.Id">
                    <photo :fileName="photo.FileName" :id="photo.Id" @deleted="deleted($event, id)" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import ItemPhotosService from '../../domain/itemPhotos/ItemPhotosService.js'
import Photo from '../shared/photo/Photo.vue'

export default {
    components:{
        'photo' : Photo
    },
    methods:{
        deleted(id){
            this.photos.splice(this.photos.findIndex(photo => photo.Id == id), 1); 
        }
    },
    computed:{
        photosItem(){
            return this.photos; 
        }
    },
    data(){
        return {
            metal: this.$route.params.metal,
            shape: this.$route.params.shape,
            itemId: this.$route.params.itemId,
            photos: [],
            message: 'No photo registered for this item, metal and shape',
            title: ''
        }
    },created(){
        this.service = new ItemPhotosService(this.$resource);
        
        this.service.search(this.itemId, this.metal, this.shape)
                    .then(photos => this.photos = photos,
                          err => console.error(err));

        this.title = this.metal + " - " + this.shape;
    }
}
</script>
<style scoped>
  .centralized {
    text-align: center;
  }

  ul {
    list-style: none;
  }

  ul li {
      display: inline-block;
  }
</style>