<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          'category__item': true,
          'category__item--active': (currentTab === item.tab)
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in list"
        :key="item._id"
      >
        <img
          class="product__item__img"
          :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__sales">月售 {{item.sales}} 件</p>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;{{item.price}}</span>
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus iconfont"
              @click="() => { changeCartItem(shopId, shopName, item._id, item, -1) }"
            >&#xe780;</span>
              {{ getProductCount(shopId, item._id) }}
            <span
              class="product__number__plus iconfont"
              @click="() => { changeCartItem(shopId, shopName, item._id, item, 1) }"
            >&#xe845;</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '@/utils/request'
import { useCommonCartEffect } from '@/effects/cartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和 tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取当前 tab 数据的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data) {
      content.list = result.data
    }
  }

  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId, shopName
    })
  }
  const changeCartItem = (shopId, shopName, productId, item, num) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }

  const getProductCount = (shopId, prodcuctId) => {
    return cartList?.[shopId]?.productList?.[prodcuctId]?.count || 0
  }

  return { cartList, changeCartItem, getProductCount }
}

export default {
  name: 'ShopContent',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCount } = useCartEffect()
    return {
      categories,
      list,
      currentTab,
      handleTabClick,
      cartList,
      shopId,
      changeCartItem,
      getProductCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
@import '@/style/mixins.scss';

.content{
  display: flex;
  position: fixed;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: .50rem;
}

.category{
  overflow-y: scroll;
  width: .76rem;
  background: $search-bgColor;

  &__item{
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;

    &--active{
      background: $bgColor;
    }
  }
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
      width: .68rem;
      height: .68rem;
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

    &__sales{
      margin:.06rem 0;
      font-size: .12rem;
      color: $content-fontcolor;
    }

    &__price{
      margin: 0;
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
      line-height: .18rem;

      &__minus{
        position: relative;
        top:.01rem;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus{
        position: relative;
        top:.01rem;
        color: $btn-bgColor;
        margin-left: .05rem;
      }
    }
  }
}
</style>
