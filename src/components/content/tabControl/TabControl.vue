<template>
    <div class="tab-control">
      <div class="tab-control-item"
           v-for="(item, index) in titles"
           :class="{active: index==currentIndex}"
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    import index from "../../../store";

    export default {
        name: "TabControl",
      props: {
          titles:{
            type: Array,
            default() {
              return []
            }
          }
      },
      data() {
          return {
            currentIndex: 0
          }
      },
      methods: {
          itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick',index)
          }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

  .active{
    color: var(--color-high-text);
  }
</style>
