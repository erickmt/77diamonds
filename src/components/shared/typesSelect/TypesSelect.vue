<template>
    <select @change="$emit('onChange', $event.target.value)">
        <option v-for="type of types" :key="type.Id" :value="type.Id">
            {{type.Name}}
        </option>
    </select>
</template>

<script>

import TypeService from '../../../domain/type/TypeService.js'

export default {
    data(){
        return {
            types: [],
            message: ''
        }
    },
    created(){
    this.service = new TypeService(this.$resource);

    this.service
      .search()
      .then(types => {
                this.types = types;
                this.$emit('onChange', this.types[0].Id);       
            }, 
            err => this.message = err.message);
    }
    
}
</script>

<style scoped>

</style>