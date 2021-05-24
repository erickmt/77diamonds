<template>
    <button type="button" value="" class="delete-button" @click="deleteItem()">
        <img src="../../../assets/delete.png" alt="delete"/>
    </button>
</template>
<script>

import ItemPhotosService from '../../../domain/itemPhotos/ItemPhotosService.js'

export default {
    props: ['id'],
    methods:{
        deleteItem(){
            if(confirm("Are you sure you want to delete?"))
             {
                this.service.delete(this.id);
                this.$emit("confirmed", this.id);
             }
        }
    },
    created(){
        this.service = new ItemPhotosService(this.$resource);
    }
}
</script>
<style scoped>
  .delete-button{
    margin: 5px;
  }
    
  img{
      width: 18px;
      height: 18px;
  }
</style>