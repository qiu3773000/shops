<template>
  <div id="app">
    <Header :seller="seller" :arr="arr"></Header>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/goods" >商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings" >评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller" >商家</router-link>
        </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      我是脚步
    </div>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default{
      data(){
          return {
              seller: {},
              arr:1,
          }
      },
      created(){
          this.$api.get('/api/seller', null, r => {
              //console.log(r)
                this.seller = r.data
          console.log(this.seller)
      })
      },
      components: {
          Header
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
    #app
        .tab
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            border-1px(rgba(7,17,27,0.1))
            .tab-item
                flex: 1
                text-align: center
                & > a
                    display:block
                    font-size:14px
                    color:rgb(77,85,93)
                    &.active
                        color: rgb(240 , 20 , 20)
</style>
