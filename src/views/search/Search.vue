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
        >{{item}}</li>
      </ul>
    </div>
    <div class="area">
      <h3 class="area__title">热门搜索</h3>
      <ul class="area__list">
        <li class="area__list__item">尖椒肉丝</li>
        <li class="area__list__item">鲜花</li>
        <li class="area__list__item">山姆会员商店</li>
        <li class="area__list__item">新鲜水果</li>
        <li class="area__list__item">生日鲜花</li>
        <li class="area__list__item">香槟玫瑰</li>
        <li class="area__list__item">酸奶</li>
        <li class="area__list__item">牛奶</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

    return { history, handleSearchChange, handleCancelSearchClick, handleClearHistoryClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 .18rem;
}

.search {
  position: relative;
  display: flex;
  line-height: .32rem;
  margin-top: .16rem;
  color: #333;

  .iconfont{
    position: absolute;
    left: .16rem;
    color: #b7b7b7;
  }

  &__area{
    flex: 1;
    border: none;
    outline: none;
    background: #f5f5f5;
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
    color: #333;
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
      background: #f5f5f5;
      color: #666;
      border-radius: .02rem;
    }
  }
}
</style>
