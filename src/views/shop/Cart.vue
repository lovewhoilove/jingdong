<template>
  <div
    class="mask"
    v-if="showCart && calculations.totalCount"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.totalCount">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsCheck(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allCheck ? '&#xe63b;':'&#xe731;'"
          ></span>全选
        </div>
        <div class="product__header__clear">
        <span
          class="product__header__clear__btn"
          @click="() => cleanCartProducts(shopId)"
        >清空购物车</span></div>
      </div>
      <template
        v-for="item in productList"
        :key="item._id"
      >
        <div
          class="product__item"
          v-if="item.count > 0"
        >
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe63b;':'&#xe731;'"
            @click.stop="() => changeCartItemCheck(shopId, item._id)"
          ></div>
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
              {{ item.count}}
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
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.totalCount || 0 }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.totalPrice || 0 }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{path: `/orderList/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '@/effects/cartEffect'

const useCartEffect = (shopId) => {
  const store = useStore()
  const { cartList, changeCartItemInfo, productList } = useCommonCartEffect(shopId)

  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = {
      totalCount: 0,
      totalPrice: 0,
      allCheck: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.totalCount += product.count
        if (product.check) {
          result.totalPrice += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allCheck = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  const changeCartItemCheck = (shopId, prodcuctId) => {
    store.commit('changeCartItemCheck', { shopId, prodcuctId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsCheck = (shopId) => {
    store.commit('setCartItemsCheck', { shopId })
  }

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemCheck,
    cleanCartProducts,
    setCartItemsCheck
  }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'CartView',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsCheck
    } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return {
      calculations,
      shopId,
      productList,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsCheck,
      toggleCartEffect,
      showCart,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.mask{
  position: fixed;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}

.cart{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $bgColor;
  z-index: 2;
}

.product{
  overflow-y: scroll;
  flex:1;
  background-color: $bgColor;

  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: 1px solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;

    &__all{
      width: .64rem;
      margin-left: .16rem;
    }

    &__icon{
      margin-right: .1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: .2rem;
    }

    &__clear{
      flex: 1;
      text-align: right;
      padding-right: .2rem;

      &__btn{
        display: inline-block;
      }
    }
  }

  &__item{
    position: relative;
    display: flex;
    padding: .06rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;

    &__checked{
      padding-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
      line-height: .5rem;
    }

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
        color: $bgColor;
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

    a{
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
