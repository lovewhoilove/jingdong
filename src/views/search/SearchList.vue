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
          v-model="keyword"
          @change="handleSearchInputChange"
        />
      </div>
    </div>
    <router-link
      v-for="item in searchList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

const useSearchListEffect = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    const result = await get('/api/shop/search', { keyword })
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data
    }
  }
  return { searchList, getSearchList }
}

export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup () {
    const route = useRoute()
    const keyword = ref(route.query.keyword || '')
    const handleBackClick = useBackRouterEffect()
    const handleSearchInputChange = () => {
      // const searchValue = e.target.value
      getSearchList(keyword.value)
    }

    const { searchList, getSearchList } = useSearchListEffect()
    getSearchList(keyword.value)
    return {
      keyword,
      searchList,
      handleBackClick,
      handleSearchInputChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.wrapper {
  padding: 0 .18rem;

  .search{
    display: flex;
    margin: .16rem 0 .04rem 0;

    &__back{
      width: 0.3rem;
      line-height: .32rem;
      color: $search-fontColor;
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

  a{
    text-decoration: none;
  }
}
</style>
