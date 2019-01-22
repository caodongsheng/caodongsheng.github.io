<template lang="html">
    <div class="box">
        <div class="left">
            <navs></navs>
        </div>
        <div class="right">
            <div class="head">
                <icon-nav class="scale"></icon-nav>
                <div class="scaleright">
                    <el-breadcrumb separator="/">
                      <el-breadcrumb-item >首页</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="breadcrumb">
                <breadcrumb></breadcrumb>
            </div>
            <div class="centent">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
import navs from '@/components/nav/index'
import iconNav from '@/components/nav_icon'
import breadcrumb from '@/components/breadcrumb'
export default {
    components:{
        navs,
        iconNav,
        breadcrumb
    }
}
</script>

<style lang="scss" scoped>
    $headheight: 50px;
    $breadcrumb: 35px;
    .box{
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        .left{
            flex:0 0 auto;
            height: 100%;
            overflow: hidden;
        }
        .right{
            flex:1;
            width: calc(100% - #{201px});
            height: 100%;
            min-height: 100vh;
            overflow: hidden;
            .head{
                width: 100%;
                height:$headheight;
                border-bottom: solid 1px #e6e6e6;
                .scale{
                    transform:scale(0.6);
                    width: 50px;
                    margin-left: -5px;
                    margin-top: -10px;
                    float: left;
                }
                .scaleright{
                    float: left;
                    padding: 18px;
                }
            }
            .breadcrumb{
                width: 100%;
                height: $breadcrumb;
                border-bottom: solid 1px #e6e6e6;
                box-shadow: 0px 2px 5px 0px #e6e6e6;
            }
            .centent{
                width: 100%;
                min-height: calc(100vh - #{$headheight + $breadcrumb});
            }
        }
    }
</style>
