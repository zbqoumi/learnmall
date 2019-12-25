<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 ref="tabControls"
                 @tabClick="tabClick"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop"

  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from"./childComps/FeatureView"

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        isLoad: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },

    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,100);

      this.$bus.$on('itemImageLoad', () => {
      refresh();
    });
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods: {

      backClick() {
        this.$refs.scroll.scrollTo(0,0,500);
      },

      contentScroll(position) {
        this.isShowBackTop = -position.y >1000;
        this.isTabFixed = this.tabOffsetTop < -(position.y)
      },

      loadMore() {
        this.getHomeGoods(this.currentType);
      },

      swiperImageLoad() {
        if(!this.isLoad)
        {
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
          this.isLoad = true
        }
      },

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControls.currentIndex = index;
      },



      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          //重置下拉
          setTimeout(() => {
            this.$refs.scroll.finishPullUp();
          },1000);
        })
      }
    }
    }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
