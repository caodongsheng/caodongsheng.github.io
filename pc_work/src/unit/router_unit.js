import router from '@/router'
import { constRouterMap } from '@/router'

export function routeMapAdd (){
    let routerArr=[]
    for(let i=0;i<constRouterMap.length;i++){
        if(constRouterMap[i].children && constRouterMap[i].children.length>0){
            for(let j=0;j<constRouterMap[i].children.length;j++){
                routerArr.push(constRouterMap[i].children[j])
            }
        }else{
            routerArr.push(constRouterMap[i])
        }
    }
    router.options.routes[1].children=routerArr
    router.addRoutes(router.options.routes)
    return routerArr ;
}
