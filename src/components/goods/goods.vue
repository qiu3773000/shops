<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <icon v-show="item.type>0" :type="item.type"></icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="food-title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="图片">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import icon from '../../components/icon/icon.vue'
  import BTscroll from 'better-scroll'
  export default{
    data(){
      return {
        goods:[],
        listHeight:[]
      }
    },
    created(){
      this.$api.get('/api/goods', null, r => {
        //console.log(r)
        this.goods = r.data
        console.log(this.goods)
      //
        this.$nextTick(()=>{
          this.__initScroll()
          this.__calculateHeight()
        })
    })
    },
    methods:{
      __initScroll(){
        this.menuScroll=new BTscroll(this.$refs.menuWapper,{})
        this.foodScroll=new BTscroll(this.$refs.foodWapper,{})
      },
      __calculateHeight(){
        let foodList=this.$refs.foodWapper.getElementsByClassName('food-list-hook')
        let height=0
        this.listHeight.push(height);
        for (let i=0;i<foodList.length;i++){
          let item=foodList[i]
          height+=item.clientHeight
          this.listHeight.push(height);
        }
        //console.log(foodList[0].clientHeight)
      }
    },
    components:{
      icon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display :flex
    position :absolute
    top :174px
    top :174px
    bottom :46px
    width :100%
    overflow :hidden
    .menu-wrapper
      flex:0 0 80px
      width: 80px
      background :#f3f5f7
      .menu-item
        display :table
        width :56px
        height :54px
        padding :0 12px
        line-height :14px
        .text
          display :table-cell
          width :56px
          vertical-align :middle
          border-1px(rgba(7,17,27,0.1))
          font-size :13px

    .foods-wrapper
      flex:1
      .food-title
        padding-left:14px
        height :26px
        line-height :26px
        border-left :2px solid #d9dde1
        font-size: 12px
        color:rgb(147,153,159)
        background :#f3f5f7
      .food-item
        display :flex
        margin :18px
        padding-bottom :18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom :0
        .icon
          flex:0 0 57px
          margin-right :10px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height :14px
            line-height :14px
            font-size :14px
            color :rgb(7,17,27)
          .desc,.extra
            line-height :10px
            font-size: 10px
            color rgb(147,153,159)
          .desc
            margin-bottom :8px
            line-height 14px
          .extra
            .count
              margin-right :12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color :rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
</style>
