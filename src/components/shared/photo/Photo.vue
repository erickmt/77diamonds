 <template>
    <div class="panel">
        <div>
            <delete-button :id="id" @confirmed="deleted($event, id)"/>
            <img class="responsive" :src="src" />
        </div>
    </div>
</template>
                    
<script>
import DeleteButton from '../deleteButton/DeleteButton.vue';

export default {
    props: ['fileName', 'id'],
    components:{
        'delete-button' : DeleteButton
    },
    data(){
        return { url: this.$http.options.root + '/api/Photo?FileName=', src: '' }
    },
    created(){
        this.src = this.url + this.fileName;
    },methods:{
        deleted(id){
            this.$emit("deleted", id);
        }
    }
}
</script>

<style scoped>
.panel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 250px;
    vertical-align: top;
    text-align: right;
}

.responsive {
    width: 100%;
}
</style>
