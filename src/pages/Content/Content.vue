<template>
    <div class="contentBox">
        <div class="contentLeft">
            <LeftNav @getId='getId'/>
        </div>
        <div class="contentRight">
            <ContentPart :id='id' :name='name'/>
        </div>
    </div>
</template>

<script>
import LeftNav from './leftNav/LeftNav.vue'
import ContentPart from './contentPart/ContentPart.vue'
    export default {
        components:{
            LeftNav,
            ContentPart

        },data() {
            return {
                id:'',
                name:''
            }
        },
        methods: {
            getId(obj){
                this.id=obj.id;
                this.name=obj.name

            }

        },

        
    }
</script>

<style lang="scss" scoped>


.contentBox{
    overflow: hidden;
    width: 70%;
    
    margin: 10px auto;
    .contentLeft{
        float: left;
        width:30%;

    }
    .contentRight{
        float: left;
        width:70%;
           

    }
}
</style>