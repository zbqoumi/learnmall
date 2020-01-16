<template>
    <div class="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="center"
              ref="scroll"
              @scroll="contentScroll"
              :probe-type="3">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="itemParams" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="list"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import {getDetail,Goods,Shop,getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {backTopMixin} from "common/mixin"
    export default {
        name: "Detail",
      mixins: [backTopMixin],
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
      },
      data() {
          return{
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            itemParams: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopYs: null,
            currentIndex: 0
          }
      },
      created() {
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then(res => {
          // console.log(res);
          const data = res.data.result;
          this.topImages = data.itemInfo.topImages;
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
          this.shop = new Shop(data.shopInfo);
          this.detailInfo = data.detailInfo;
          this.itemParams = data.itemParams;
          this.commentInfo = data.rate.list[0];
        });
        getRecommend().then(res => {
          this.recommends = res.data.data.list
        });

        this.getThemeTopYs = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.list.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        },200)
      },
      mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,100);
        this.$bus.$on('detailItemImageLoad', () => {
          refresh();
          console.log('detail刷新');
          this.getThemeTopYs();
        });
      },
      methods: {
          imageLoad() {
            this.$refs.scroll.refresh();
            this.getThemeTopYs();
          },
        titleClick(index) {
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index] + 44,300)
        },
        contentScroll(position) {
            this.isShowBackTop = -position.y >1000;
            const positionY = -position.y + 44;
            let length = this.themeTopYs.length;
            for(let i = 0;i < length-1; i++)
            {
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
            {
              this.currentIndex = i;
              // console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
        },
        addToCart() {
          const product = {};
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.checked = false;
          product.count = 1;
          product.iid = this.iid;
          this.$store.dispatch('addCart',product).then(res =>{
            this.$toast.show(res,1500)
            // console.log(this.$toast);
            // console.log(res);
          })
        }
      }
    }
</script>

<style scoped>
  .detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .center{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
