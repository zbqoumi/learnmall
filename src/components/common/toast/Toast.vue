<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
    export default {
        name: "Toast",
      data() {
          return {
            message: '',
            isShow: false,
            check: 0,
            timer: null
          }
      },
      methods: {
        show(message,duration=2000) {
          this.check++;
          this.isShow = true;
          this.message = message;
          if(this.check > 1) {
            clearTimeout(this.timer);
            this.isShow = false;
            setTimeout(() => {
              this.isShow = true;
            },50);
          }
          this.timer = setTimeout(() => {
            this.isShow = false;
            this.message = '';
            this.check = 0;
          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,.75);
    color: white;
    z-index: 999;
  }
</style>
