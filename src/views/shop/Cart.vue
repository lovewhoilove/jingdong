<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
        />
        <div class="check__icon__tag">{{ totalCount || 0 }}3333</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ totalPrice || 0 }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const useCartEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const store = useStore()
  const cartList = store.state.cartList
  const totalCount = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  const totalPrice = computed(() => {
    const productList = cartList[shopId]
    let price = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        price += (product.count * product.price)
      }
    }
    return price.toFixed(2)
  })

  return { totalCount, totalPrice }
}

export default {
  name: 'CartView',
  setup () {
    const { totalCount, totalPrice } = useCartEffect()
    return { totalCount, totalPrice }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.cart{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.check{
  display: flex;
  box-sizing: border-box;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;

  &__icon{
    position: relative;
    width: .84rem;
    text-align: center;

    &__img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag{
      position: absolute;
      left: .45rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      transform: scale(.5);
      transform-origin: left center;
      background: $highlight-fontColor;
      color: $bgColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
    }
  }

  &__info{
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;

    &__price{
      color: $highlight-fontColor;
      font-size: .18rem;
    }
  }

  &__btn{
    width: .98rem;
    text-align: center;
    font-size: .14rem;
    background: #4fb0f9;
    color: $bgColor;
  }
}
</style>
