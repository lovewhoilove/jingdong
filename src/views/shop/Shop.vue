<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick"
      >&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe6ac;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName="item.name"/>
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'ShopView',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.wrapper{
  padding: 0 .18rem;

  .search{
    display: flex;
    margin: .16rem 0 .04rem 0;

    &__back{
      width: 0.3rem;
      line-height: .32rem;
      color: #b6b6b6;
      font-size: .32rem;
    }

    &__content{
      display: flex;
      flex: 1;
      border-radius: .16rem;
      background: $search-bgColor;

      &__icon{
        width: .44rem;
        line-height: .32rem;
        text-align: center;
        color: $search-fontColor;
      }

      &__input{
        flex: 1;
        display: block;
        padding-right: .2rem;
        border: none;
        outline: none;
        background: none;
        color: $content-fontcolor;
        font-size: .14rem;

        &::placeholder{
          color: $content-fontcolor;
        }
      }
    }
  }
}
</style>
