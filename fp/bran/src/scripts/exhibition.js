


//扶贫展示页面仿原生跳转
export function onItemClick(url=''){
    if(url!=''){
        window.vue.$router.push('/Exh_det/'+url)
    }
}
