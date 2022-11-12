<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
      <template
        v-for="(cart,index) in cartList"
        :key="index"
      >
        <div
          class="cart"
          v-if="cart.total"
          @click="handleCartClick(index)"
        >
          <div class="cart__title">{{cart.shopName}}</div>
          <div
            class="cart__item"
            v-for="(product,innerIndex) in cart.productList"
            :key="innerIndex"
          >
            <img
              class="cart__item__img"
              :src="product.imgUrl"
            />
            <div class="cart__content">
              <div class="cart__content__title">{{product.name}}</div>
              <p class="cart__content__price">
                <span class="cart__content__yen">
                  &yen;{{product.price}}&times;{{product.count}}
                </span>
                <span class="cart__content__totalPrice">
                  &yen;{{(product.price * product.count).toFixed(2)}}
                </span>
              </p>
            </div>
          </div>
        <div class="cart__total">共计{{cart.total}}件</div>
      </div>
    </template>
  </div>
  <Docker :currentIndex= "1" />
</template>

<script>
import { useRouter } from 'vue-router'
import Docker from '@/components/Docker'

export default {
  name: 'CartList',
  components: {
    Docker
  },
  setup () {
    const cartList = JSON.parse(localStorage.cartList || '{}')
    for (const i in cartList) {
      const cart = cartList[i]
      const productList = cart.productList
      let total = 0
      for (const j in productList) {
        const product = productList[j]
        total += product.count
      }
      cart.total = total
    }
    const router = useRouter()
    const handleCartClick = (index) => {
      router.push(`/orderList/${index}`)
    }
    return { cartList, handleCartClick }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: $order-bgColor;

  .title{
    line-height: .44rem;
    text-align: center;
    background: $bgColor;
    font-size: .16rem;
    color: $content-fontcolor;
  }

  .cart{
    margin: .16rem;
    padding-bottom: .16rem;
    background: #fff;
    border-radius: .04rem;

    &__title{
      padding: .16rem 0 0 .16rem ;
      font-size: .16rem;
      line-height: .22rem;
      color: $content-fontcolor;
      @include ellipse;
    }

    &__item{
      display: flex;
      position: relative;
      padding: .16rem;

      &__title{
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipse;
      }

      &__img{
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;
      }
    }

    &__content{
      overflow: hidden;
      flex:1;

      &__title{
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipse;
      }

      &__price{
        display: flex;
        margin: .06rem 0 0 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-fontColor;
      }

      &__totalPrice{
        flex: 1;
        text-align: right;
        color: $dark-fontColor;
      }

      &__yen{
        font-size: .14rem;
        font-weight: bold;
      }
    }

    &__total{
      line-height: .28rem;
      margin: 0 .16rem;
      text-align: center;
      color: $light-fontColor;
      background: $search-bgColor;
      font-size: .14rem;
    }
  }
}
</style>
