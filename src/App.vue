<template>
  <div class="wrapper">
    <!-- 定位 -->
    <div class="position">
      <span class="iconfont position__icon">&#xe7f1;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe7c4;</span>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <span class="iconfont">&#xe6ac;</span>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <!-- 横幅 -->
    <div class="banner">
      <img
          class="banner__img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        />
    </div>
    <!-- icons -->
    <div class="icons">
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/超市.png"
        />
        <p class="icons__item__desc">超市便利</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/菜市场.png"
        />
        <p class="icons__item__desc">菜市场</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/水果店.png"
        />
        <p class="icons__item__desc">水果店</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/鲜花.png"
        />
        <p class="icons__item__desc">鲜花绿植</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/医药健康.png"
        />
        <p class="icons__item__desc">医药健康</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/家居.png"
        />
        <p class="icons__item__desc">家居时尚</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/蛋糕.png"
        />
        <p class="icons__item__desc">烘焙蛋糕</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/签到.png"
        />
        <p class="icons__item__desc">签到</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/大牌免运.png"
        />
        <p class="icons__item__desc">大牌免运</p>
      </div>
      <div class="icons__item">
        <img
            class="icons__item__img"
            src="http://www.dell-lee.com/imgs/vue3/红包.png"
        />
        <p class="icons__item__desc">红包套餐</p>
      </div>
    </div>
    <!-- gap -->
    <div class="gap"></div>
    <!-- 附近 -->
    <div class="nearby">
      <div class="nearby__title">附近店铺</div>
      <!-- 店铺1 -->
      <div class="nearby__item">
        <img
            src="http://www.dell-lee.com/imgs/vue3/near.png"
            class="nearby__item__img"
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">起送￥0</span>
            <span class="nearby__content__tag">基础运费￥5</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享满80元减4元运费券（每月3张）</p>
        </div>
      </div>
      <!-- 店铺2 -->
      <div class="nearby__item">
        <img
            src="http://www.dell-lee.com/imgs/vue3/near.png"
            class="nearby__item__img"
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">起送￥0</span>
            <span class="nearby__content__tag">基础运费￥5</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享满80元减4元运费券（每月3张）</p>
        </div>
      </div>
      <!-- 店铺3 -->
      <div class="nearby__item">
        <img
            src="http://www.dell-lee.com/imgs/vue3/near.png"
            class="nearby__item__img"
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">起送￥0</span>
            <span class="nearby__content__tag">基础运费￥5</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享满80元减4元运费券（每月3张）</p>
        </div>
      </div>
    </div>
  </div>
  <!-- doccker -->
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  padding: 0 .18rem .2rem .18rem;
  overflow-y: auto;

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

  .search{
    line-height: .32rem;
    background:#f5f5f5;
    border-radius: .16rem;
    color: #b7b7b7;
    margin-bottom: .12rem;

    .iconfont{
      font-size: .15rem;
      display: inline-block;
      padding: 0 .08rem 0 .16rem;
    }

    &__text{
      display: inline-block;
      font-size: .14rem;
    }
  }

  .banner{
    height:0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img{
      width: 100%;
    }
  }

  .icons{
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;

    &__item{
      width: 20%;

      &__img{
        display: block;
        width:.4rem;
        height: .4rem;
        margin: 0 auto;
      }

      &__desc{
        margin:.06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }

  .gap{
    height: .1rem;
    background: $content-bgColor;
    margin:0 -.18rem;
  }

  .nearby{
    &__title{
      margin: .16rem 0 .04rem 0;
      font-size: .18rem;
      color: $content-fontcolor;
    }

    &__item{
      display: flex;
      padding-top: .12rem;

      &__img{
        width: .56rem;
        height: .56rem;
        margin-right: .16rem;
      }
    }

    &__content{
      flex:1;
      padding-bottom: .12rem;
      border-bottom: 1px solid $content-bgColor;

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
        color:#e93b3b;
      }
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
  border-top: .01rem solid $content-bgColor;
  padding: 0 .18rem;
  box-sizing: border-box;
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
