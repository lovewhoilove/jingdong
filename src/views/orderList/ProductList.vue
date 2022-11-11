<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
      <div
      class="products__item"
      v-for="item in productList"
      :key="item._id"
    >
      <img
        class="products__item__img"
        :src="item.imgUrl" />
      <div class="products__item__detail">
        <h4 class="products__item__title">{{item.name}}</h4>
        <p class="products__item__price">
          <span class="products__item__yen">
            &yen;{{item.price}}&times;{{item.count}}
          </span>
          <span class="products__item__totalPrice">
            &yen;{{(item.price * item.count).toFixed(2)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffect'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.products{
  margin: .16rem .18rem .55rem .18rem;
  background: #fff;
  padding-bottom: .1rem;
  border-radius: .04rem;

  &__title{
    padding: .16rem 0 0 .16rem ;
    font-size: .16rem;
    line-height: .22rem;
    color: $content-fontcolor;
  }

  &__item{
    position: relative;
    display: flex;
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

    &__detail{
      overflow: hidden;
      flex:1;
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
}
</style>
