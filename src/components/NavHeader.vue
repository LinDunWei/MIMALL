<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="gotoCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/Index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <router-link :to="{path:'Product', query:{id:item.id}}">
                                        <div class="pro-img">
                                            <img :src="item.mainImage">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>Redmi 红米</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in 6" :key="index">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0203f4e7dafcc0c9016a1b48556abf30.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                                        </div>
                                        <div class="pro-name">Redmi K30 系列</div>
                                        <div class="pro-price">2699元起</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in 6" :key="index">
                                    <a href="">
                                        <div class="pro-img">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                                        </div>
                                        <div class="pro-name">Redmi 智能电视 MAX 98''</div>
                                        <div class="pro-price">19999元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="warpper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            // username : this.$store.state.username,
            phoneList : ''
        }
    },
    computed :{
        username(){
            return this.$store.state.username
        },
        cartCount(){
            return this.$store.state.cartCount
        }
    },
    created(){
        this.getProductList();
    },
    methods:{
        getProductList(){
            let params = {
                categoryId : '100012'
            }
            this.axiosFine.shop.products({
                data : params,
                success : res => {
                    res.data.list.length > 6?
                    this.phoneList = res.data.list.slice(0,6) :
                    this.phoneList = res.data.list
                }
            })
        },
        gotoCart(){
            this.$router.push({
                path : 'Cart'
            });
        },
        login(){
            this.$router.push({
                path : 'Login'
            });
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/base.scss';
@import '../assets/sass/mixin.scss';
@import '../assets/sass/config.scss';
    .header{
        .nav-topbar{
            height: 39px;
            line-height: 39px;
            background-color: #333;
            color: #b0b0b0;
            .container{
                @include flex();
                a{
                    display: inline-block;
                    color: #b0b0b0;
                    margin-right: 17px;
                }
                .my-cart{
                    width: 110px;
                    text-align: center;
                    background-color: $colorA;
                    color: #fff;
                    .icon-cart{
                        // display: inline-block;
                        // width: 16px;
                        // height: 12px;
                        // background: url('../assets/imgs/icon-cart-checked.png') no-repeat;
                        // background-size: contain;
                        @include bgImg(16px,12px,'../assets/imgs/icon-cart-checked.png');
                        margin-right: 4px;
                
                    }
                }
            }
        }
        .nav-header{
            .container{
                position: relative;
                height: 112px;
                @include flex();
                .header-logo{
                    display: inline-block;
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
                .header-menu{
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu{
                        display: inline-block;
                        color: #333;
                        font-weight: bold;
                        line-height: 112px;
                        margin-right: 20px;
                        font-size: 16px;
                        span{
                            cursor: pointer;
                        }
                        &:hover{
                            color: $colorA;
                            .children{
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children{
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0px;
                            opacity: 0;
                            transition: all .5s;
                            overflow: hidden;
                            border: 1px solid #e5e5e5;
                            background: #fff;
                            box-shadow: 0 7px 6px 0 rgba(0,0,0,.11);
                            z-index : 10;
                            .product{
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                text-align: center;
                                line-height: 12px;
                                a{
                                    display: inline-block;
                                }
                                img{
                                    height: 111px;
                                    width: auto;
                                    margin-top: 26px;
                                }
                                .pro-img{
                                    height: 137px;
                                }
                                .pro-name{
                                    font-weight: bold;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color: $colorB;
                                }
                                .pro-price{
                                    color:  $colorA;
                                }   
                                &:before{
                                    content: '';
                                    position: absolute;
                                    top: 28px;
                                    right: 0;
                                    border-right: 1px solid $colorF;
                                    height: 100px;
                                    width: 1px;
                                }
                                &:last-child:before{
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .header-search{
                    width: 319px;
                    .warpper{
                        height: 50px;
                        border: 1px solid #e0e0e0;
                        display: flex;
                        align-items: center;
                        input{
                            border:none;
                            border-right: 1px solid #e0e0e0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                            box-sizing: border-box;
                        }
                        a{
                            // display: inline-block;
                            // width: 18px;
                            // height: 18px;
                            // background: url("../assets/imgs/icon-search.png") no-repeat center;
                            // background-size: contain;
                            @include bgImg(18px,18px,'../assets/imgs/icon-search.png');
                            margin-left: 17px; 
                        }
                    }
                }
            }
        }
    }
</style>