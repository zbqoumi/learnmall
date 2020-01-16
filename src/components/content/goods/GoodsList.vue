<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item="item" @refresh="refresh"></goods-list-item>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"
    export default {
        name: "GoodsList",
      components: {
          GoodsListItem
      },
      props: {
          goods: {
            type: Array,
            default() {
              return []
            }
          }
      },
      methods: {
        refresh() {
          this.$emit('refresh')
        }
      }
    }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
