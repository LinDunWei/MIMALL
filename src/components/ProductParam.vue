<template>
    <div class="nav-bar" :class="{'is-fixed':isFixed}">
        <div class="container">
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <a href="">概述</a><span>|</span>
                <a href="">参数</a><span>|</span>
                <a href="">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props:{
        title : String
    },
    data(){
        return{
            isFixed : false
        }
    },
    methods:{
        initHeight(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > 150 ? true : false;
        }
    },
    mounted(){
        window.addEventListener('scroll',this.initHeight)
    },
    destroyed(){
        window.removeEventListener('scroll',this.initHeight,false)
    }
}
</script>

<style lang="scss">
@import '../assets/sass/config';
@import '../assets/sass/mixin';
    .nav-bar{
        height: 70px;
        line-height: 70px;
        background-color: #fff;
        border-top: 1px solid #e5e5e5;
        z-index: 10;
        transition: all .5s;
        &.is-fixed{
            position: fixed;
            top: 0;
            box-shadow: 0 5px 5px #ccc;
            width: 100%;
        }
        .container{
            @include flex();
            .pro-title{
                font-size: $fontH;
                color: $colorB;
                font-weight: bold;
            }
            .pro-param{
                font-size: $fontJ;
                span{
                    margin : 0 10px;
                }
                a{
                    color: $colorC;
                    &:hover{
                        color: $colorA;
                    }
                }
            }
        }
    }
</style>