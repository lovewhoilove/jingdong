<template>
  <!-- doccker -->
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        'docker__item': true,
        'docker__item--active': index === currentIndex
      }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__item__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeDocker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe6bb;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe638;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe7b3;', text: '订单', to: { name: 'MyOrder' } },
      { icon: '&#xe663;', text: '我的', to: { name: 'MyPage' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.docker {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  padding: 0 .18rem;
  box-sizing: border-box;

  &__item {
    flex: 1;
    text-align: center;

    .iconfont {
      font-size: .18rem;
      margin: .07rem 0 .02rem 0;
    }

    &__title {
      font-size: .2rem;
      transform: scale(.5, .5);
      transform-origin: center top;
    }

    a {
      color: $content-fontcolor;
      text-decoration: none;
    }

    &--active {
      a{
        color: #1fa4fc;
      }
    }
  }
}
</style>
