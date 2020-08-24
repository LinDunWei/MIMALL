<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="header-logo">
                <a href="/#/Index"></a>
            </div>
            <div class="title">
                <h2>{{title}} <slot name="tip"></slot></h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        title : String,
    },
    data(){
        return {

        }
    },
    computed :{
        ...mapState(['username'])
    }
}
</script>

<style lang="scss">
@import '../assets/sass/base.scss';
@import '../assets/sass/mixin.scss';
@import '../assets/sass/config.scss';
    .order-header{
        padding: 30px 0;
        border-bottom: 2px solid #FF6600;
        .header-logo{
            display: inline-block;
            float: left;
            width: 55px;
            height: 55px;
            background-color: $colorA;
            a{
                display: inline-block;
                width: 110px;
                height: 55px;
                &:before{
                    content: '';
                    // display: inline-block;
                    // width: 55px;
                    // height: 55px;
                    // background: url('../assets/imgs/mi-logo.png') no-repeat center;
                    // background-size: 55px;
                    @include bgImg(55px,55px,'../assets/imgs/mi-logo.png');
                    transition: margin .2s;
                }
                &:after{
                    content: '';
                    // display: inline-block;
                    // width: 55px;
                    // height: 55px;
                    // background: url('../assets/imgs/mi-home.png') no-repeat center;
                    @include bgImg(55px,55px,'../assets/imgs/mi-home.png');
                    background-size: 55px;
                }
                &:hover:before{
                    margin-left: -55px;
                    transition: margin .2s;
                }
            }
        }
        .title,.username{
            display: inline-block;
            height: 55px;
            line-height: 55px;
        }
        .title{
            float: left;
            margin-left: 54px;
            h2{
                color: #333;
                font-size: 28px;
            }
            span{
                font-size: 14px;
                margin-left: 17px;
                color: #999;
                font-weight: 200;
            }
        }
        .username{
            float: right;
            a{
                color: #666;
                font-style: 16px;
            }
        }
    }
</style>