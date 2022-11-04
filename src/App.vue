<template>
  <div class="wrapper">
    <!-- 定位 -->
    <div class="position">
      <span class="iconfont position__icon">&#xe7f1;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe7c4;</span>
    </div>
    <!-- 搜索 -->
    <div class="search"></div>
  </div>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe6bb;</div>
      <div class="docker__item__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe638;</div>
      <div class="docker__item__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe7b3;</div>
      <div class="docker__item__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe663;</div>
      <div class="docker__item__title">我的</div>
    </div>
  </div>
</template>

<style lang="scss">
@import './style/variable.scss';
@import './style/mixins.scss';

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  padding: 0 .18rem;

  .position {
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    @include ellipse;
    color: $content-fontcolor;

    .position__icon {
      position: inherit;
      top: .01rem;
      font-size: .2rem;
    }

    .position__notice {
      position: absolute;
      right: 0;
      top: .17rem;
      font-size: .2rem;
    }
  }
}

.docker {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid #f1f1f1;
  padding: 0 .18rem;
  box-sizing: border-box;
  /*指定的width和height属性包括填充和边框，但不包括边距*/
  color: $content-fontcolor;

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

    &--active {
      color: #1fa4fc;
    }
  }
}
</style>
