<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import { mapGetters } from "vuex"

    export default {
        name: "Cart",
      components: {
        CartBottomBar,
        CartList,
        NavBar
      },
      computed: {
        ...mapGetters(['cartLength'])
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .cart-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .cart-list{
    width: 100%;
  }
</style>
