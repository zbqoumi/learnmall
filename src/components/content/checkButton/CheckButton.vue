<template>
  <div class="check-button" :class="{active: isActive}">
    <img src="~assets/img/cart/tick.svg"/>
  </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props: {
          isActive: {
            type: Boolean,
            default: false
          }
      }
    }
</script>

<style scoped>
  .check-button{
    padding: 2px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .active{
    background-color: red;
    border-color: red;
  }

</style>
