<template>
  <div>
    <h1 class="centralized">Item Photo</h1>
    <div>    
      <ul>
        <li>
          <div>
              <form @submit.prevent='gravar()'>
              
              <div class="control">
                  <label for="itemId" ref="item">Item</label>
                  <items-select @onChange='itemChanged($event)' />
              </div>

              <div class="control">
                  <label for="typeId">Type</label>
                  <types-select @onChange='typeChanged($event)' />
              </div>
              
              <div class="control">
                  <label for="metal">Metal</label>
                  <input autocomplete="off" v-model='metal.Value' :disabled='edit' v-validate data-vv-rules='required' data-vv-as='metal' id="metal" name="metal">
                  <div>
                    <span class="error" v-show="errors.has('metal')">{{errors.first('metal')}}</span>
                  </div>
              </div>

              <div class="control">
                  <label for="shape">Shape</label>
                  <input autocomplete="off" v-model='shape.Value' :disabled='edit' v-validate data-vv-rules='required' data-vv-as='shape' id="metal" name="shape">
                <div>
                  <span class="error" v-show="errors.has('shape')">{{errors.first('shape')}}</span>
                </div>
              </div>

              <div class="control">
                  <input id="file" ref="file" type="file" accept="image/*" class="input-file"  @change="fileChange()" >
                  <div>
                    <span class="error" v-show="errorFile">{{errorFile}}</span>
                  </div>
              </div>
              
              <div class="centralized">
                  <router-link :to="{name :'home'}" ><button rotulo="BACK" tipo="button" > Back </button> </router-link>
                  <input type="submit" value="Save" /> 
              </div>
              
              <div class="control centralized">
                <span class="success" v-show="success">{{success}}</span>
                <span class="error-server" v-show="error">{{error}}</span>
              </div>

              </form>
          </div>
        </li>
        <li>
          <div class="box-image">
            <img v-show="imagePreview" :src="imagePreview" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import TypesSelect from '../shared/typesSelect/TypesSelect.vue'
import ItemsSelect from '../shared/itemsSelect/ItemsSelect.vue'
import ItemPhotos from '../../domain/itemPhotos/ItemPhotos.js'
import ItemPhotosService from '../../domain/itemPhotos/ItemPhotosService.js'
import ItemPhotoProperty from '../../domain/itemPhotoProperty/ItemPhotoProperty.js'

export default {

  components: {
        'items-select': ItemsSelect,
        'types-select': TypesSelect
  },
  data(){
      return {
          photo: new ItemPhotos(),
          metal: new ItemPhotoProperty(),
          shape: new ItemPhotoProperty(),
          file: '',
          imagePreview: '',
          edit: false,
          success:'',
          error: '',
          errorFile: ''
    }
  }, 
  methods: {
      gravar(){
        this.success = '';
        
        this.metal.PropertyId = 1;
        this.shape.PropertyId = 2;

        this.photo.ItemPhotoPropertySet.push(this.metal);
        this.photo.ItemPhotoPropertySet.push(this.shape);
        
        let fileValide = true;
        if(this.file == '')
        {  this.errorFile = 'The file is required'; fileValide = false }
          
        this.$validator
          .validateAll()
          .then(validate =>  {
              if(validate && fileValide){
                this.service
                  .create(this.photo, this.file)
                  .then(() => { 
                    this.success = 'Successful registration'; 
                    this.clear()  
                  }, err => { this.error = err.body.Message; console.log(err) })
              }
          });

        },
        itemChanged(selected){
            this.photo.itemId = parseInt(selected);
        },
        typeChanged(selected){
            this.photo.TypeId = parseInt(selected);
        },
        fileChange() {
            this.error = '';
            this.success = '';
            this.file = this.$refs.file.files[0];   
            let reader  = new FileReader();

            reader.addEventListener("load", function () {
            this.showPreview = true;
            this.imagePreview = reader.result;
            }.bind(this), false);

            if( this.file ){
              this.errorFile = '';
              if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                reader.readAsDataURL( this.file );
            }
        }
      },
      clear(){
        if(!this.edit){
          this.photo = new ItemPhotos();
          this.metal = new ItemPhotoProperty();
          this.shape = new ItemPhotoProperty();
        }
        this.$refs.file.value=null;
        this.file='';
        this.imagePreview = '';
        this.error = '';
        this.errorFile = '';
      }
  },
  created(){
    this.service = new ItemPhotosService(this.$resource);

    if(this.$route.params.metalEdit){
      this.metal.Value = this.$route.params.metalEdit;
      this.shape.Value = this.$route.params.shapeEdit;
      this.edit = true;
    }

  }
}

</script>
<style scoped>
  .centralized {
    text-align: center;
    margin-bottom: 10px;
  }
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;
    width: 400px;
  }
  .control label {
    display: block;
    font-weight: bold;
  }
  .error {
    color: red;    
    font-size: 70%;
  }
  .success{
    color: green;
    font-size: 80%;
    font-weight: bold;
  }
  .error-server{
    color: red;    
    font-size: 80%;
    font-weight: bold;
  }
  ul {
    list-style: none;
  }
  ul li {
    display: inline-block;
  }
  
  .box-image{
    width: 200px;
    height: 250px;
  }

  img {
    width: 100%;
}
</style>