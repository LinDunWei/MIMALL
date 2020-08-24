<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="../assets/imgs/miao.jpg" alt="">
            <p>欢迎启动这个dome</p>
        </div>
        <div class="footer-link">
            <router-link :to="item.path" v-for="(item,index) in footerList" :key="index">
                {{item.name}}
            </router-link>
        </div>
        <div class="copyright">通过Axios的二次封装达到接口api函数化，数据请求自动绑定的效果，为你的项目开发提提速</div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            footerList : [
                { name : 'vue@cli4.x', path : '' },
                { name : 'Axios', path : '' },
                { name : 'element-ui', path : '' },
                { name : 'Sass', path : '' },
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/base.scss';
@import '../assets/sass/config.scss';
    .footer{
        height: 234px;
        border-top: 4px solid $colorA;
        background: $colorB;
        color: $colorD;
        font-size: $fontI;
        text-align: center;
        .footer-logo{
            margin-top: 46px;
            margin-bottom: 31px;
            img{
                width: 53px;
                height: 53px;
                // margin-bottom: 13px;
            }
        }
        .footer-link{
            a{
                color: $colorD;
                display: inline-block;
                &:after{
                    content: '';
                    margin:0 10px;
                }
                &:hover{
                    color: $colorA;
                }
                &:last-child:after{
                    content: '';
                }
            }
            margin-bottom: 13px;
        }
        .copyright{
            &:hover{
                color: $colorA;
            }
        }
    }
</style>