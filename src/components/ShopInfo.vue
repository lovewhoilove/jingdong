<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" />
    <div
      :class="{
        'shop__content':true,
        'shop__content--bordered': hideBorder ? false:true
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales }}+</span>
        <span class="shop__content__tag">起送&yen;{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费&yen;{{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
      <div
        class="shop__products"
        v-if="item.products"
      >
        <div
          class="shop__product"
          v-for="(product,index) in item.products"
          :key="index"
        >
          <img :src="product.imgUrl" class="shop__product__img"/>
          <div class="shop__product__title">{{product.name}}</div>
          <div class="shop__product__price">
            <span class="shop__product__new">&yen;{{product.price}}</span>
            <span class="shop__product__origin">&yen;{{product.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.shop{
  display: flex;
  padding-top: .12rem;

  &__img{
    width: .56rem;
    height: .56rem;
    margin-right: .16rem;
  }

  &__content{
    flex:1;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }

    &__title{
      margin-top: .08rem;
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__tags{
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }

    &__tag{
      margin-right: .16rem;
    }

    &__highlight{
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color:$highlight-fontColor;
    }
  }

  &__products{
    overflow: hidden;
    margin: .08rem .07rem 0 -.14rem;
  }

  &__product{
    box-sizing: border-box;
    padding-left: .14rem;
    width: 33.3%;
    float: right;

    &__img{
      width: 100%;
    }

    &__title{
      margin: .04rem 0 0 0;
      line-height: .17rem;
      font-size: .12rem;
      color: $content-fontcolor;
      @include ellipse;
    }

    &__price{
      line-height: .2rem;
      margin: .02rem 0 0 0;
      @include ellipse;
    }

    &__new{
      font-size: .14rem;
      color: $highlight-fontColor;
    }

    &__origin{
      font-size: .12rem;
      color: $light-fontColor;
      margin-left: .02rem;
      text-decoration: line-through;
    }
  }
}
</style>
