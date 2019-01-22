import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

 function mapIndexofRoute(route){
     let routeArr=router.options.routes[1].children; //左侧列表路由
     for(let i=0;routeArr.length;i++){
         if(routeArr[i].path==route){
             return routeArr[i];
         }
     }
     return {}
 }
const store = new Vuex.Store({
    state:{
        navfalg:false,
        breadcrumb:[],
    },
    mutations: {
        SET_BREADCRUMB(state, route) {
            let routeObj=mapIndexofRoute(route)
            for(let i=0;i<state.breadcrumb.length;i++){
                if(state.breadcrumb[i].path==routeObj.path){
                    return ;
                }
            }
            state.breadcrumb.push(routeObj)
        },
        DETELE_BREADCRUMB(state, i) {
            state.breadcrumb.splice(i,1);
        }
    },
    actions: {
        breadcrumbAsyn({commit},breadcrumbData) {
            commit('SET_BREADCRUMB', breadcrumbData);
        },
        breadcrumbDetele({commit},i) {
            commit('DETELE_BREADCRUMB', i);
        }
    },

})

export default store
