<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"
                       ref="tab"></tab-control>
          <goods-list :goods="showCategoryDetail" @refresh="refresh"></goods-list>
        </div>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList"

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";

  export default {
		name: "Category",
    components: {
      GoodsList,
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
    },
    mixins: [backTopMixin],
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        timer: null,
        currentType: [],
        currentIndex: -1,
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {};
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return [];
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType[this.currentIndex]].data
      }
    },
    methods: {
      refresh() {
        if(this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$refs.scroll.refresh.apply();
        },200);
          console.log('category刷新');
      },

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType.splice(this.currentIndex,1,'pop');
            break;
          case 1:
            this.currentType.splice(this.currentIndex,1,'new');
            break;
          case 2:
            this.currentType.splice(this.currentIndex,1,'sell');
            break;
        }
      },

      contentScroll(position) {
        this.isShowBackTop = -position.y >1000;
        this.isTabFixed = this.tabOffsetTop < -(position.y)
      },

		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
          this.categories = res.data.data.category.list;
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.currentType.push('pop');
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data.data;
          this.categoryData = {...this.categoryData};
          this._getCategoryDetail('pop');
          this._getCategoryDetail('sell');
          this._getCategoryDetail('new');
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData};
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index);
        switch (this.currentType[index]) {
          case 'pop':
            this.$refs.tab.currentIndex = 0;
            break;
          case 'new':
            this.$refs.tab.currentIndex = 1;
            break;
          case 'sell':
            this.$refs.tab.currentIndex = 2;
            break;
        }
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
