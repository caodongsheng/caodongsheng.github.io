<template>
  <div class="city">
    <v-cityHeader :cities="this.cities"></v-cityHeader>
    <div class="box-withheader">
      <keep-alive>
        <v-cityList :hotCities="hotCities" :cities="cities" :letter="letter"></v-cityList>
      </keep-alive>
      <v-cityAlphabet :cities="cities" @change="handleLetterChange"></v-cityAlphabet>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cityHeader from '../city/componets/cityheader/cityheader.vue'
  import cityList from '../city/componets/lisiview/listview.vue'
  import cityAlphabet from '../city/componets/alphabet/alphabet.vue'
  import axois from 'axios'
  import getPy from './ChinesePY'
  export default {
    data(){
      return{
        hotCities:[],
        cities:{},
        letter:'',
      }
    },
    components: {
      "v-cityHeader": cityHeader,
      "v-cityList": cityList,
      "v-cityAlphabet": cityAlphabet
    },
    created() {
      axois.get('static/city.json').then((res) => {
        this.hotCities=res.data.data.hotCities
        this.cities=res.data.data.cities
      })
    },
    methods:{
      kk(){
        localStorage.setItem('js',JSON.stringify(this.c))
      },
      handleLetterChange(letter){
        this.letter=letter
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
