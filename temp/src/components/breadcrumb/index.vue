<template lang="html">
    <div class="">
        <div :class="['mar_rig',{'active':index==navIndex}]" v-for="(item,index) in breadcrumbData">
            <span @click="handleActive(item)">{{item.meta.title}}</span>
            <b @click="handleClose(index,item)">
                <i class="el-icon-circle-close" ></i>
                <i class="el-icon-close" ></i>
            </b>

        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return {
            navIndex:0,

        }
    },
    methods:{
        handleClose(i,item){
            // console.log(this.breadcrumbData)
            let length=this.breadcrumbData.length-1;
            if(item.path===this.$route.path){
                if(length==i){
                    length--;
                }
                if(length<=0){
                    length=0
                }
                this.$router.push(this.breadcrumbData[length].path)
            }
            this.breadcrumbDetele(i)
        },
        handleActive(route){
            this.$router.push(route.path)
        },
        ...mapActions([
            'breadcrumbDetele'
        ])
    },
    watch:{
        breadcrumbData(n){
            if(n.length==0){
                this.$router.push('/angular')
            }
        },
        rout(n){
            for(let i=0;i<this.breadcrumbData.length;i++){
                if(this.breadcrumbData[i].path==n){
                    this.navIndex=i
                }
            }
        }
    },
    computed:{
        breadcrumbData () {
          return this.$store.state.breadcrumb
        },
        rout(){
              return this.$route.path
        }
    }

}
</script>

<style lang="scss">
    .mar_rig{
        margin-left:10px;
        margin-top: 5px;
        cursor: pointer;
        float: left;
        border-radius: 2px;
        background-color: rgba(64,158,255,.1);
        display: inline-block;
        padding: 0 10px;
        height: 24px;
        line-height: 22px;
        font-size: 12px;
        color: #409eff;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
        &:hover{
            background-color: rgba(64,158,255,.2);
        }
        b{
            i:first-child{
                display: none;
            }
            &:hover :first-child{
                display: inline-block;
            }
            &:hover :last-child{
                display: none;
            }
        }

    }
    .active{
        background-color: rgba(64,158,255,.3);
    }
</style>
