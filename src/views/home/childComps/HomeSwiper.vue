<template>
  <div id="homeSwiper">
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper , SwiperItem} from "components/common/swiper"
    export default {
        name: "HomeSwiper",
      components: {
        Swiper,
        SwiperItem
      },
      props: {
          banners: {
            type: Array,
            default() {
              return []
            }
          }
      },
      methods: {
          imageLoad() {
            this.$emit('swiperImageLoad')
          }
      }
    }
</script>

<style scoped>

</style>
