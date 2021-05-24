<template>
    <select @change="$emit('onChange', $event.target.value)">
        <option v-for="item of items" :key="item.Id" :value="item.Id">
            {{item.Name}}
        </option>
    </select>
</template>

<script>

import ItemService from '../../../domain/item/ItemService.js'

export default {
    data(){
        return {
            items: [],
            message: ''
        }
    },
    created(){
    this.service = new ItemService(this.$resource);

    this.service
      .search()
      .then(items => {
                this.items = items;
                this.$emit('onChange', this.items[0].Id);       
            },
            err => this.message = err.message);

    }
    
}
</script>

<style scoped>

</style>