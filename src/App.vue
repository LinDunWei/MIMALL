<template>
  <div id="app">
    	<router-view></router-view>
  </div>
</template>

<script>
// import {postRequet} from './api/api'
export default {
  name: 'App',
  data(){
    return{
      info : ''
    }
  },
  created(){
    // this.$axios.get("/api/o2o/shopadmin/getproductcategorylist")
    // .then(res=>{
    //   console.log(res);
    // });
    // console.log(this.$url.loginURL)
    // this.$get(this.$url.loginURL,{}).then(res=>{
    //   console.log(res);
    // }) 
    var me = this;
    this.$axios.all([me.getUser(),me.getCartCount()])
  },
  methods:{
    getUser(){
      this.axiosFine.user.User({
        success : res=>{
          // console.log(res);
          //to do vuex
          this.$store.dispatch('saveUserName',res.data.username);
        }
      })
    },
    getCartCount(){
      this.axiosFine.shop.cartSum({
        success : res=>{
          // console.log(res);
          this.$store.dispatch('saveCartCount',res.data);
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/sass/reset.scss';
@import './assets/sass/modal.scss';
@import './assets/sass/mixin.scss';
@import './assets/sass/button.scss';
</style>
