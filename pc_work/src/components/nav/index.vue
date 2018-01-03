<template lang="html">
    <div class="box">
        <el-menu  :class="['el-menu-vertical-demo',{'flexStyle':!$store.state.navfalg}]" :default-active="routerPath" :collapse="$store.state.navfalg" background-color="rgb(48, 65, 86)" text-color="#fff" router @select="goRouter">
            <template v-for="(item,index) in list" >
                <el-submenu :index="item.path" :key="item.path"  v-if="item.children && item.children.length && item.children.length>0"  >
                    <template slot="title">
                      <i :class="item.meta.icon"></i>
                      <span slot="title">{{item.meta.title}}</span>
                    </template>
                    <el-menu-item :index="vt.path" v-for="(vt,i) in item.children" :key="vt.path">{{vt.meta.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.path" :key="item.path"  v-else>
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </template>


        </el-menu>
    </div>
</template>

<script>
import { constRouterMap} from '@/router'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return {
            isCollapse: this.$store.state.navfalg,
            list:constRouterMap,
            routerPath:''
        };
    },
    methods: {
        goRouter(router,b){
            this.breadcrumbAsyn(router)
        },
        ...mapMutations({
            setBreadcrumb: 'SET_BREADCRUMB',
        }),
        ...mapActions([
            'breadcrumbAsyn'
        ])

   },
   watch:{
       rout(n){
           this.routerPath=n
       }
   },
   computed:{
       rout(){
           return this.$route.path
       }
   },
   mounted(){
       // console.log('/////',constRouterMap);
   },
}
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        height: auto;
        min-height: 100vh;
    }
    .el-menu-vertical-demo{
        // transition: width ease .5s;
    }
    .flexStyle{
        min-width: 201px;
    }
</style>
