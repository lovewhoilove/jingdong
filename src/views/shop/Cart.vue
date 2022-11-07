<template>
  <div class="cart">
    <div class="products">
      <template
        v-for="item in productList"
        :key="item._id"
      >
        <div
          class="product__item"
          v-if="item.count > 0"
        >
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;{{item.price}}</span>
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"
            >-</span>
              {{ item.count || 0}}
            <span
              class="product__number__plus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
        />
        <div class="check__icon__tag">{{ totalCount || 0 }}</div>
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
import { useCommonCartEffect } from './commonCartEffect'

const useCartEffect = (shopId) => {
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

  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  return { totalCount, totalPrice, productList }
}

export default {
  name: 'CartView',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { totalCount, totalPrice, productList } = useCartEffect(shopId)
    const { changeCartItemInfo } = useCommonCartEffect()
    return { totalCount, totalPrice, shopId, productList, changeCartItemInfo }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.cart{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.product{
  overflow-y: scroll;
  flex:1;

  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    cursor: pointer;

    &__img{
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipse;
    }

    &__detail{
      overflow: hidden;
    }

    &__price{
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }

    &__yen{
      font-size: .14rem;
      font-weight: bold;
    }

    &__origin{
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }

    .product__number{
      position: absolute;
      bottom: .12rem;
      right: 0;

      &__minus,
      &__plus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .18rem;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
      }

      &__minus{
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus{
        border: .01rem solid $btn-bgColor;
        background: $btn-bgColor;
        color: #fff;
        margin-left: .05rem;
      }
    }
  }
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