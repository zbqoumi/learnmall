export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) =>{
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if(oldProduct)
      {
        context.commit('addCounter',oldProduct)
      }
      else{
        context.commit('addToCart',payload);
      }
      resolve('加入购物车成功')
    })
  }

}
