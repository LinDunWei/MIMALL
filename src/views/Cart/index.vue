<template>
    <div class="cart">
        <order-header title="我的购物车">
            <template v-slot:tip>
                <span>温馨提示：产品是否购买成功，以最终下单为准</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="cart-box">
                    <ul class="cart-item-head">
                        <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                    </ul>
                    <ul class="cart-item-list">
                        <li class="cart-item" v-for="(item,index) in list" :key="index">
                            <div class="item-check">
                                <span class="checkbox" :class="{'checked' : item.productSelected}" @click="upDateCart(item)"></span>
                            </div>
                            <div class="item-name">
                                <img v-lazy="item.productMainImage" alt="">
                                <span>{{item.productName +','+ item.productSubtitle}} </span>
                            </div>
                            <div class="item-price">{{item.productPrice}}元</div>
                            <div class="item-num">
                                <div class="num-box">
                                <a href="javascript:;" @click="upDateCart(item,'-')">-</a>
                                <span>{{item.quantity}}</span>
                                <a href="javascript:;" @click="upDateCart(item,'+')">+</a>
                                </div>
                            </div>
                            <div class="item-total">{{item.productTotalPrice}}元</div>
                            <div class="item-del" @click="delProduct(item)"></div>
                        </li>
                    </ul>
                </div>
                <div class="order-wrap clearfix">
                    <div class="cart-tip fl">
                        <a href="/">继续购物</a>
                        共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum.length}}</span>件
                    </div>
                    <div class="total fr">
                        合计：<span>{{cartTotalPrice}}</span>元
                        <a href="javascript:;" class="btn" @click="order">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <ServiceBar />
        <nav-footer></nav-footer>
    </div>

</template>

<script>
import OrderHeader from '../../components/OrderHeader'
import NavFooter from '../../components/NavFooter'
import ServiceBar from '../../components/ServiceBar'
export default {
    data(){
        return {
            list : [],
            allChecked : false,
            cartTotalPrice : 0,
            checkedNum : 0
        }
    },
    components:{
        OrderHeader,NavFooter,ServiceBar
    },
    mounted(){
        this.getCartList();
    },
    methods:{
        getCartList(){
            this.axiosFine.shop.getCart({
                success : success => {
                    // console.log(success);
                        this.list = success.data.cartProductVoList || [];
                        this.allChecked = success.data.selectedAll;
                        this.cartTotalPrice = success.data.cartTotalPrice;
                        this.checkedNum = this.list.filter(item => item.productSelected)
                }
            })
        },
        toggleAll(){
            if(this.allChecked){
                this.axiosFine.shop.unSelectAll({
                    type : 'put',
                    noQuestion : true,
                    success : success =>{
                        this.renderData(success);
                    }
                })
            }else{
                this.axiosFine.shop.selectAll({
                    type : 'put',
                    noQuestion : true,
                    success : success =>{
                        this.renderData(success);
                    }
                })
            }
        },
        //结算
        order(){
            //every 会返回一个布尔值
            let isCheck = this.list.every(item => !item.productSelected);   
            if(isCheck){
                this.$message.warning('请选择一件商品');
            }else{
                this.$router.push({
                    path : 'Order/confirm'
                });
            }
        },
        renderData(success){
            this.list = success.data.cartProductVoList || [];
            this.allChecked = success.data.selectedAll;
            this.cartTotalPrice = success.data.cartTotalPrice;
            this.checkedNum = this.list.filter(item => item.productSelected)
        },
        //更新单选状态和购物车数量
        upDateCart(item,type){
            let quantity = item.quantity,selected = item.productSelected;
            if(type == '-'){
                if(quantity == 1){
                    // this.$message({
                    //     type : 'error',
                    //     msg : '商品至少保留1件'
                    // })
                    this.$message.warning('商品至少保留1件')
                    return
                }
                --quantity;
            }else if(type == '+'){
                if(quantity > item.productStock){
                    this.$message.warning('商品超过库存')
                    return
                }
                ++quantity;
            }else{
                selected = !item.productSelected;
            }
            this.axiosFine.shop.upDateCart({
                type : 'put',
                parameterId : item.productId,
                data : {
                    quantity,
                    selected
                },
                noQuestion : true,
                success : res=>{
                    console.log(res);
                    this.renderData(res);
                }
            })
        },
        delProduct(item){
            this.axiosFine.shop.upDateCart({
                type : 'delete',
                parameterId : item.productId,
                noQuestion : true,
                success : res=>{
                    console.log(res);
                    this.renderData(res);
                }
            })
        }
    }
}
</script>

<style lang="scss">
.cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('../../assets/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('../../assets/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>