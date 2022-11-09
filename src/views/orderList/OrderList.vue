<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__bg"></div>
      <div class="top__header">
        <div
          class="top__header__back iconfont"
          @click="handleBackClick"
        >&#xe6db;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">张三（先生）</span>
          <span class="top__receiver__info__phone">18911024266</span>
        </div>
        <div class="top__receiver__icon iconfont">&#xe6f8;</div>
      </div>
    </div>
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
              &yen;{{item.price * item.count}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffect'

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'OrderList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const handleBackClick = useBackRouterEffect()
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { handleBackClick, productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.wrapper{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}

.top{
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, #0091ff00 4%, #0091ff 50%);
  background-repeat: no-repeat;

  &__header{
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: #fff;
    text-align: center;
    font-size: .16rem;

    &__back{
      position: absolute;
      left: .18rem;
      font-size: .24rem;
    }
  }

  &__receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    border-radius: .04rem;
    background: #fff;

    &__title{
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333;
    }

    &__address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: #333;
    }

    &__info{
      line-height: .18rem;
      padding: .06rem 0 0 .16rem;
      font-size: .12rem;
      color: #666;
      &__name,
      &__phone{
        margin-right: .06rem;
      }
    }

    &__icon{
      position: absolute;
      top: 50%;
      right: .16rem;
      transform: translate(0, -50%);
      color: #666;
      font-size: .20rem;
    }
  }
}

.products{
  margin: .16rem .18rem .55rem .18rem;
  background: #fff;
  overflow-y: scroll;
  padding-bottom: .1rem;
  border-radius: .04rem;

  &__title{
    padding: .16rem 0 0 .16rem ;
    font-size: .16rem;
    line-height: .22rem;
    color: #333;
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
      color: #000;
    }

    &__yen{
      font-size: .14rem;
      font-weight: bold;
    }
  }
}
</style>
