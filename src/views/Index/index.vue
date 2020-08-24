<template>
    <div class="index">
        <div class="container">
            <div class="swiper-banner">
                <div class="nav-menu">
                    <ul class="menu-wrap">
                        <li class="menu-item" v-for="item in 8" :key="item">
                            <a href="javascript:;">手机卡 电话卡</a>
                            <div class="children">
                                <ul v-for="(item,index) in menuList" :key="index">
                                    <li v-for="(sub,subIndex) in item" :key="subIndex">
                                        <router-link :to="{path:'Product',query:{id: sub.id}}">
                                            <img :src="sub?sub.img : require('../../assets/imgs/item-box-1.png')" alt="">
                                            {{sub? sub.name : '小米9'}}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <el-carousel height="451px">
                    <el-carousel-item v-for="(item,index) in slideList" :key="index">
                        <router-link :to="{path:'Product', query:{id:item.id}}">
                            <img v-lazy="item.img" alt="">
                        </router-link>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="ads-box">
                <router-link :to="{path: 'Product',query:{id:item.id}}" v-for="(item,index) in adsList" :key="index">
                    <img v-lazy="item.img" alt="">
                </router-link>
            </div>
            <div class="banner">
                <router-link :to="{path:'Product',query:{id:30}}">
                    <img v-lazy="require('../../assets/imgs/banner-1.png')" alt="">
                </router-link>
            </div>
        </div>
        <div class="product-box" v-for="i in 2" :key="i">
                <div class="container">
                    <h2 style="font-weight:100">手机</h2>
                    <div class="wrapper">
                        <div class="banner-left">
                            <router-link :to="{path:'Product',query:{id:35}}">
                                <img v-lazy="require('../../assets/imgs/mix-alpha.jpg')" alt="">
                            </router-link>
                        </div>
                        <div class="list-box">
                            <div class="list" v-for="(arr,index) in phoneList" :key="index">
                                <div class="item" v-for="(item,idx) in arr" :key="idx">
                                    <span :class="idx%2==0? 'new-pro': 'kill-pro'">{{idx%2==0? '新品': '秒杀'}}</span>
                                    <div class="item-img">
                                        <img v-lazy="item.mainImage" alt="">
                                    </div>
                                    <div class="item-info">
                                        <h3>{{item.name}}</h3>
                                        <p>{{item.subtitle}}</p>
                                        <p class="price" @click="addCart(item.id)">{{item.price | currency}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="banner" style="margin-top:22px">
                        <router-link :to="{path:'Product',query:{id:30}}">
                            <img src="../../assets/imgs/banner-1.png" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
        <ServiceBar />
        <Modal title="提示" 
               sureText="查看购物车" 
               btnType="1" 
               modalType="middle" 
               :showModal="showModal" 
               @close="showModal=false" 
               @submit="submit">
            <template v-slot:body>
                <p>商品添加成功</p>
            </template>
        </Modal>
    </div>

</template>

<script>
import ServiceBar from '../../components/ServiceBar'
import Modal from '../../components/Modal'
import qs from 'qs'
export default {
    data(){
        return{
            slideList:[
                { id : '42',img:require('../../assets/imgs/slider/slide-1.jpg') },
                { id : '45',img:require('../../assets/imgs/slider/slide-2.jpg') },
                { id : '46',img:require('../../assets/imgs/slider/slide-3.jpg') },
                { id : '',img:require('../../assets/imgs/slider/slide-4.jpg') },
                { id : '',img:require('../../assets/imgs/slider/slide-5.jpg') },
            ],
            menuList: [
                [
                    {
                        id : 30, img : require('../../assets/imgs/item-box-1.png'), name : '小米CC9'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-2.png'), name : '小米8青春版'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-3.jpg'), name : 'Redmi K20 Pro'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-4.jpg'), name : '移动4G专区'
                    },
                ],[
                    {
                        id : 30, img : require('../../assets/imgs/item-box-1.png'), name : '小米CC9'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-2.png'), name : '小米8青春版'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-3.jpg'), name : 'Redmi K20 Pro'
                    },
                    {
                        id : 30, img : require('../../assets/imgs/item-box-4.jpg'), name : '移动4G专区'
                    },
                ],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
            ],
            adsList:[
                { id: 33, img : require('../../assets/imgs/ads/ads-1.png') },
                { id: 48, img : require('../../assets/imgs/ads/ads-2.jpg') },
                { id: 45, img : require('../../assets/imgs/ads/ads-3.png') },
                { id: 47, img : require('../../assets/imgs/ads/ads-4.jpg') }
            ],
            phoneList:[],
            showModal : false
        }
    },
    created(){
        this.init();
    },
    mounted(){
        
    },
    components :{
        ServiceBar,
        Modal
    },
    methods:{
        init(){
            let params = {
                categoryId : '100012',
                pageSize : 14
            }
            // this.axiosFine.shop.products({
            //     data : params,
            //     success : res=>{
            //         console.log(res.data.list);
            //         res.data.list = res.data.list.slice(6,14)
            //         this.phoneList = [res.data.list.slice(0,4),res.data.list.slice(4,8)]
            //     }
            // })
            this.$http.get('/products?' + qs.stringify(params)).then(res=>{
                // console.log(res.data.list);
                res.data.list = res.data.list.slice(6,14)
                this.phoneList = [res.data.list.slice(0,4),res.data.list.slice(4,8)]
            })
        },
        addCart(id){
            this.axiosFine.shop.addCart({
                type : 'post',
                data: {
                    productId: id,
                    selected : true
                },
                success : res=>{
                    console.log(res.data)
                    this.showModal = true;
                    this.$store.dispatch('saveCartCount',res.data.cartTotalQuantity);
                }
            })
        },
        submit(){
            // console.log('go to cart');
            this.$router.push('/Cart');
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/mixin';
@import '../../assets/sass/config';
    .el-carousel__arrow--left{
        left: 274px !important;
    }
    .index{
        .container{
            .swiper-banner{
                a{
                    display: inline-block;
                    width: 100%;
                    height: 451px;
                    img{
                        width: 100%;
                        height: 451px;
                    }
                }
                .nav-menu{
                    box-sizing: border-box;;
                    position: absolute;
                    width: 264px;
                    height: 451px;
                    padding: 26px 0;
                    background-color: #55585A7A;
                    z-index: 9;
                    .menu-wrap{
                        .menu-item{
                            &:hover{
                                background-color: $colorA;
                                .children{
                                    display: block;
                                }
                            }
                            height: 50px;
                            line-height: 50px;
                            a{
                                position: relative;
                                font-size: 16px;
                                box-sizing: border-box;
                                display: block;
                                width: 100%;
                                height: 100%;
                                color: #fff;
                                padding-left: 30px;
                                &:after{
                                    content: '';
                                    @include bgImg(10px,15px,'../../assets/imgs/icon-arrow.png');
                                    position: absolute;
                                    right: 30px;
                                    top: 17.5px;
                                }
                            }
                            .children{
                                display: none;
                                width: 962px;
                                height: 451px;
                                background-color: $colorG;
                                position: absolute;
                                left: 264px;
                                top: 0;
                                border: 1px solid #e5e5e5;
                                ul{
                                    display: flex;
                                    justify-content: space-between;
                                    height: 75px;
                                    li{
                                        height: 75px;
                                        line-height: 75px;
                                        flex: 1;
                                        padding-left: 23px;
                                    }
                                    a{
                                        color: $colorB;
                                        font-size: 14px;
                                    }
                                    img{
                                        width: 42px;
                                        height: 35px;
                                        vertical-align: middle;
                                        margin-right: 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .ads-box{
                margin: 14px 0 31px;
                @include flex();
                a{
                    width: 24%;
                    height: 167px;
                }
            }
            .banner{
                margin-bottom: 50px;
            }
        }
        .product-box{
            background-color: $colorJ;
            padding: 30px 0 50px;
            h2{
                font-size: 22px;
                height: 21px;
                line-height: 21px;
                color: #333;
                margin-bottom: 20px;
            }
            .wrapper{
                display: flex;;
                .banner-left{
                    margin-right: 16px;
                    a {
                        img{
                            width: 224px;
                            height: 619px;
                        }
                    }
                }
                .list-box{
                    .list{
                        @include flex();
                        width: 986px;
                        margin-bottom: 14px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .item{
                            width: 236px;
                            height: 302px;
                            background-color: $colorG;
                            text-align: center;
                            span{
                                display: inline-block;
                                width: 67px;
                                height: 24px;
                                color: #fff;
                                font-size: 14px;
                                line-height: 24px;
                                &.new-pro{
                                    background-color: #7ECF68;
                                }
                                &.kill-pro{
                                    background-color: #E82626;
                                }
                            }
                            .item-img{
                                img{
                                    width: 100%;
                                    height: 195px;
                                }
                            }
                            .item-info{
                                h3{
                                    font-size: $fontJ;
                                    color: $colorB;
                                    line-height: $fontJ;
                                    font-weight: bold;
                                }
                                p{
                                    color: $colorD;
                                    line-height: 13px;
                                    margin: 6px auto 13px;
                                }
                                .price{
                                    font-size: $fontJ;
                                    font-weight: bold;
                                    color: #f20a0a;
                                    cursor: pointer;
                                    &:after{
                                        content: '';
                                        @include bgImg(22px,22px,'../../assets/imgs/icon-cart-hover.png');
                                        margin-left: 5px;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>