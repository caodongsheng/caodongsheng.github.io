<template lang="html">
    <div class="header">
        <x-header :left-options="{showBack: true,backText:''}" :title="title" class="zindex" v-show="search_show">
            <a slot="right" ><icon type="search" @click.native="setFocus"></icon></a>
        </x-header>
        <search

          placeholder="输入关键字"
          v-model="search_value"
          position="absolute"
          auto-scroll-to-top
          auto-fixed
          @on-change="setvalue"
          ref="search">
        </search>

    </div>
</template>

<script>
import { XHeader,Icon ,Search} from 'vux'
export default {

    components: {
        XHeader,
        Icon,
        Search
    },
    props:['title'],
    data(){
        return {
            search_show:true,
            search_value:'',
        }
    },
    methods:{
        setFocus () {
            console.log('------')
            this.search_show=false;
            this.$refs.search.setFocus()
        },
        setvalue(v){
            this.$emit('search',v)
        }
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>

.header .vux-header{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9;
}
.weui-icon-search{
    font-size: 18px;
}
.vux-search-box{
    height: 47px;
}
</style>
