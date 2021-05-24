<template>
    <div>
        <div class="filter">
            <label class="filter-label">Filter by item: </label>
            <items-select @onChange='itemChanged($event)' />        
        </div>
        <div>
            <table> 
                <thead> 
                <th>  </th>
                <th v-for="metal of metalsOfItem" :key="metal.Value"> {{metal.Value}} </th>
                </thead>
                <tbody>
                <tr v-for="shape of shapesOfItem" :key="shape.Value"> 
                    <td class="bold"> {{shape.Value}}  </td>
                    <td v-for="metal of metalsOfItem" :key="metal.Value" class="td-border">
                        <thumb :shape="shape.Value" :metal="metal.Value" :thumbs="photos" :itemId="itemId" />
                    </td>
                </tr>
                </tbody>
            </table>        
        </div>
    </div>
</template>

<script>

import ItemsSelect from '../shared/itemsSelect/ItemsSelect.vue'
import ItemPhotosService from '../../domain/itemPhotos/ItemPhotosService.js'
import ItemPhotoPropertyService from '../../domain/itemPhotoProperty/ItemPhotoPropertyService.js'
import Thumb from '../shared/thumb/Thumb.vue'


export default {
    data() {
        return {
        photos: [],
        metals: [],
        shapes: [],
        itemId: 1
        };
    },
    created() {
        this.service = new ItemPhotosService(this.$resource);
        this.propertiesService = new ItemPhotoPropertyService(this.$resource);
    
        this.service
        .search()
        .then(photos => this.photos = photos, err => this.mensagem = err.message);
            
        this.propertiesService
        .searchMetals()
        .then(metals => this.metals = metals, err => this.mensagem = err.message);

        this.propertiesService
        .searchShapes()
        .then(shapes => this.shapes = shapes, err => this.mensagem = err.message);
    },
    components:{
        'items-select': ItemsSelect,
        'thumb': Thumb
    },
    
    methods:{
        itemChanged(selected){
            this.itemId = parseInt(selected);
        }
    },
    
    computed: {
      metalsOfItem()
      {
          return this.metals.filter(metal=>metal.ItemId == this.itemId);
      },
      shapesOfItem(){
          return this.shapes.filter(shape=>shape.ItemId == this.itemId);
      }
  }
}
</script>

<style scoped>
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;
    width: 400px;
  }
  .control label {
    display: block;
    font-weight: bold;
    font-size: 80%;
  }
  .centralized {
    text-align: center;
  }
  .td-border {
    border: 1px solid black;
  }
 table {
   margin-top: 15px;
   border-collapse: collapse;
 }
 .bold {
   font-weight: bold;
 }
 .filter-label{
   font-weight: bold;
 }
 .filter{
     margin-top: 35px;
     margin-bottom: 35px;
 }
</style>