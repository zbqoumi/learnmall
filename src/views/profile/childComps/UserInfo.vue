<template>
  <div class="user-info">
    <div class="icon">
      <img src="~assets/img/profile/touxiang.jpg"/>
    </div>
    <div class="information">
      <div class="name">登录/注册</div>
      <div class="phone">暂无绑定手机号码</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  .user-info {
  background-color: rgba(255, 133, 133, 0.77);
    position: relative;
    height: 20vh;
    display: flex;
    align-items: center;
    color: white;
  /*padding: 15px;*/
  /*margin-top: -5px;*/
  }

  .icon{
    margin-left: 20px;
  }

  .icon img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .information{
    margin-left: 10px;
    font-size: 18px;

    position: relative;
    top: -5px;
  }

  .phone{
    font-size: 14px;
    margin-top: 20px;
    font-weight: 300;
  }

</style>
