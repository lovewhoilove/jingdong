<template>
  <div class="wrapper">
    <div class="search">
      <span class="iconfont">&#xe6ac;</span>
      <input
        class="search__area"
        @change="handleSearchChange"
        placeholder="山姆会员商店优惠商品"
      />
      <div
        class="search__cancel"
        @click="handleCancelSearchClick"
      >取消</div>
    </div>
    <div
      class="area"
      v-if="history.length"
    >
      <h3 class="area__title">
        搜索历史
        <span
          class="area__title__clear"
          @click="handleClearHistoryClick"
        >清除搜索历史</span>
      </h3>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="(item,index) in history"
          :key="index"
          @click="() => goToSearchValue(item)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="area">
      <h3 class="area__title">热门搜索</h3>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="(item,index) in hotWordList"
          :key="index"
          @click="() => goToSearchValue(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'

const useHotWordListEffect = () => {
  const hotWordList = ref([])
  const getHotWordList = async () => {
    const result = await get('/api/shop/search/hot-words')
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data
    }
  }
  return { hotWordList, getHotWordList }
}

export default {
  name: 'SearchView',
  setup () {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.history || '[]'))
    const handleSearchChange = (e) => {
      const searchValue = e.target.value
      if (!searchValue) return
      const hasValue = history.value.find(item => item === searchValue)
      if (!hasValue) {
        history.value.push(searchValue)
        localStorage.history = JSON.stringify(history.value)
      }

      router.push(`/searchList?keyword=${searchValue}`)
    }

    const handleCancelSearchClick = () => {
      router.back()
    }

    const handleClearHistoryClick = () => {
      history.value = []
      localStorage.history = JSON.stringify([])
    }

    const { hotWordList, getHotWordList } = useHotWordListEffect()
    getHotWordList()

    const goToSearchValue = (keyword) => {
      router.push(`/searchList?keyword=${keyword}`)
    }

    return {
      history,
      hotWordList,
      handleSearchChange,
      handleCancelSearchClick,
      handleClearHistoryClick,
      goToSearchValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.wrapper {
  margin: 0 .18rem;
}

.search {
  position: relative;
  display: flex;
  line-height: .32rem;
  margin-top: .16rem;
  color: $content-fontcolor;

  .iconfont{
    position: absolute;
    left: .16rem;
    color: $search-fontColor;
  }

  &__area{
    flex: 1;
    border: none;
    outline: none;
    background: $search-bgColor;
    border-radius: .16rem;
    padding: 0 .12rem 0 .44rem;
    font-size: .14rem;
  }

  &__cancel{
    margin-left: .12rem;
    font-size: .16rem;
  }
}

.area{
  margin-top: .24rem;

  &__title{
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
    margin: 0;

    &__clear{
      float: right;
      font-weight: normal;
      font-size: .14rem;
    }
  }

  &__list{
    margin: 0 0 0 -.1rem;
    padding: 0;
    list-style-type: none;

    &__item{
      padding: 0 .1rem;
      margin: .12rem 0 0 .1rem;
      display: inline-block;
      line-height: .32rem;
      font-size: .14rem;
      background: $search-bgColor;
      color: $medium-fontColor;
      border-radius: .02rem;
    }
  }
}
</style>
