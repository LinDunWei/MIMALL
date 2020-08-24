<template>
    <div class="modal" v-show="showModal">
        <div class="mask"></div>
        <div class="modal-dialog">
            <div class="modal-header">
                <span>{{title}}</span>
                <a href="javascript:;" class="icon-close" @click="$emit('close')"></a>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <a href="javascript:;" v-if="btnType==1" class="btn" @click="$emit('submit')">{{sureText}}</a>
                <a href="javascript:;" v-if="btnType==2" class="btn" @click="$emit('close')">{{cancelText}}</a>
                <div class="btn-group" v-if="btnType == 3">
                    <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn btn-defalut" @click="emit('close')">{{cancelText}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        //弹窗类型 small middle large 和 from
        modalType:{
            type : String,
            default : 'from'
        },
        //title
        title : String,
        //btn 类型  1: 确定按钮     2：取消按钮     3：确定取消
        btnType : String,

        sureText : {
            type : String,
            default : '确定'
        },
        cancelText : {
            type : String,
            default : '取消'
        },
        showModal : Boolean
    },
    data(){
        return{

        }
    },
    methods : {

    }
}
</script>

<style lang="scss">
    @import '../assets/sass/config';
    @import '../assets/sass/mixin';
    @import '../assets/sass/modal';
    .modal{
        @include position(fixed);
        z-index: 10;
        transition: all .5s;
        .mask{
            @include position(fixed);
            background-color: $colorI;
            opacity: 0.5;
        }
        &.slide-enter-active{
            top:0 !important;
        }
        &.slide-leave-active{
            top:-100% !important;
        }
        &.slide-enter{
            top:-100% !important;
        }
        &.slide-leave-to{
            top: -100% !important;
        }
        .modal-dialog{
            @include position(absolute,40%,50%,660px,auto);
            background-color: $colorG;
            transform:translate(-50%,-50%);
            .modal-header{
            height:60px;
            background-color: $colorJ;
            padding:0 25px;
            line-height: 60px;
            font-size:$fontI;
            .icon-close{
                @include positionImg(absolute,23px,25px,14px,14px,'../assets/imgs/icon-close.png');
                transition: transform .3s;
                &:hover{
                transform: scale(1.5);
                }
            }
            }
            .modal-body{
            padding:42px 40px 54px;
            font-size:14px;
            }
            .modal-footer{
            height: 82px;
            line-height: 82px;
            text-align: center;
            background-color: $colorJ;
            }
        }
        }
</style>