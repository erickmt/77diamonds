<template>
    <div>
        <div class="box">
            <div>
                <router-link :to="{name :'add', params:{ metalEdit: this.metal, shapeEdit: this.shape } }" > 
                    <button tipo="button" > Add image </button> 
                </router-link>
                <hr />
            </div>
            <div>
                <div>
                    <img :src="url" class="thumb-image">
                    <delete-button v-show="id" :id="id" @confirmed="deleted($event, id)" class="button-delete"/>
                </div>
                <div>
                    <router-link :to="{name :'itemPhotos', params:{ itemId: this.itemId, metal: this.metal, shape: this.shape } }" > 
                        <button tipo="button" >See images </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DeleteButton from '../deleteButton/DeleteButton.vue';

export default {
    props: ['shape', 'metal', 'thumbs', 'itemId'],
    components:{
        'delete-button' : DeleteButton
    },
    data(){
        return { url: '../../../dist/noPicture.png', id: null }
    },
    created(){
        console.log(this.$http.options.root);
        let photo = this.thumbs
            .filter(thumb=>
                    thumb.TypeId == 2 &&
                    thumb.ItemPhotoPropertys.some(x=> x.TypeId = 1 && x.Value == this.metal) &&
                    thumb.ItemPhotoPropertys.some(x=> x.TypeId = 2 && x.Value == this.shape) 
            )[0];
            if(photo)
            {
                this.url = this.$http.options.root + '/api/Photo?FileName=' + photo.FileName;
                this.id = photo.Id;
            }
    },methods:{
        deleted(id){
            this.url = '';
        }
    }
}
</script>

<style scoped>
.box {
    padding: 0 auto;
    display: inline-block;
    margin: 5px;
    width: 200px;
    height: 150px;
    position:relative;
    text-align: center;
}
.thumb-image {
    width: 80px;
    height: 80px;
}
.button-delete{
    position: absolute;
    right: 0;
}
hr{
  border-top: 1px solid #DCDCDC;
}

</style>