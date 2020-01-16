<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-active="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="settlement">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

    export default {
        name: "CartBottomBar",
      components: {
          CheckButton
        },
      computed: {
        totalPrice() {
          return '￥' + this.$store.state.cartList.filter(item => {
            return item.checked
          }).reduce((preValue, item) => {
            return preValue + item.price * item.count
          },0)
        },

        checkLength() {
          return this.$store.state.cartList.filter(item => {
            return item.checked
          }).length
        },

        isSelectAll() {
          if(this.$store.state.cartList.length === 0) return false;
          return !this.$store.state.cartList.find(item => !item.checked)
        }
      },
      methods: {
        checkClick() {
            if(this.isSelectAll) {
              this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
              this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        settlement() {
          if(this.checkLength === 0)
          {
            this.$toast.show('请选择商品', 1500)
          }
          else {
            this.$toast.show('只支持现金', 1500)
          }

        }
      }
    }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    /*position: relative;*/
    display: flex;
    align-items: center;
  }

  .check-content{
    display: flex;
    align-items: center;
  }

  .check-button{
    margin-left: 5px;
    width: 24px;
    height: 24px;
  }

  .check-content span{
    margin-left: 5px;
  }

  .price{
    margin-left: 30px;
  }

  .calculate{
    background-color: #ff8198;
    position: absolute;
    right: 0;
    height: 40px;
    width: 30%;
    line-height: 40px;
    text-align: center;
  }
</style>
