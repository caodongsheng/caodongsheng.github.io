<template lang="html">
    <div class="">
        <iframe :src="url" width="100%" height="100%"></iframe>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url:''
        }
    },
    methods:{

    },
    mounted(){

        this.url=this.$route.params.url
    }
}
</script>

<style lang="css">
</style>
