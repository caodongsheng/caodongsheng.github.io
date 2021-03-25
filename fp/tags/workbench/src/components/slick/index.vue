<template lang="html">
    <div class="root">
      <SortableList  axis="xy" v-model="items" @input="changes"  :distance="5"  >
          <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" :ref="'refs'+index" @remove="remove">
          </SortableItem>
            <upload  limit="10" ref="upload" @upchange="upchange"></upload>
      </SortableList>
    </div>
</template>

<script>
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
import upload from '@/components/slick/upload'
function picToStr(list){
    let str=''
    for(let i=0;i<list.length;i++){
        if(i==list.length-1){
            str+=list[i].response.urls
        }else{
            str+=list[i].response.urls+','
        }
    }
    return str
}
const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list-slick">
      <slot />
    </ul>
  `,
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item','index'],
  template: `
    <li class="list-item-slick" ><div class="po"><i @click="asd(item,index)" class="el-icon-delete"></i></div><img :src="item"/></li>
  `,
  methods:{
      asd(item,i){
          this.$emit('remove',i)
      }
  }
};
export default {
    props:['datas'],
    components:{
        SortableItem,
        SortableList,
        upload
    },
    data(){
        return {
            items: [],
        }
    },
    methods:{
        remove(i){
            this.items.splice(i,1)
            this.$emit('album',this.items)
        },
        changes(q){
            // console.log('2222',q)
            this.$emit('album',this.items)
        },
        upchange(data){
            // console.log('3333',data)
            this.$refs.upload.remove()
            this.items.push(picToStr(data))
            this.$emit('album',this.items)
        },

    },
    watch:{
        'datas':function(n,v){
            this.items=n
            // console.log('9999',this.items)
        }
    },
    mounted(){
        this.items=this.datas
        // console.log('8888',this.items)
    }

}
</script>

<style lang="scss" scope>
li{
    list-style: none;
}
    .list-slick{
        width: 100%;
        height: auto;
    }
    .list-item-slick{
        width: 148px;
        background-color: #ccc;
        border-radius: 1px solid #000;
        float: left;
        height: 148px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        border-radius:6px;
        z-index:9999;
        overflow: hidden;
        .po{
            background:rgba( 0, 0, 0,.0);
            transition: background 0.5s;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
            z-index: 99;
            i{
                font-size: 20px;
                position: absolute;
                left: 50%;
                margin-left: -10px;
                top: 50%;
                margin-top: -10px;
                display: none;
                color: #fff;
            }
        }
        &:hover{
            .po{
                background:rgba( 0, 0, 0,.5);
                i{
                    display: block;
                }
            }
        }
        &:active{
            .po{
                background:rgba( 0, 0, 0,.5);
                i{
                    display: block;
                }
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
