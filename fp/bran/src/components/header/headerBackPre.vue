<template>
  <div class="header-wrap">
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">{{headerTitle}}</x-header>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    name: 'headerBackPre',
    components: {XHeader},
    props: ['headerTitle','routePath'],
    data() {
    	return{

    	}
    },
    methods: {
  	backToPre() {
  		this.$router.push({name: this.routePath});
  	}
  }

  }
</script>

<style lang="less" scoped>

</style>

