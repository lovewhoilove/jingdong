<template>
  <div class="nearby">
    <div class="nearby__title">附近店铺</div>
    <div
      class="nearby__item"
      v-for="item in nearbyList"
      :key="item.id"
    >
      <img :src="item.imgUrl" class="nearby__item__img" />
      <div class="nearby__content">
        <div class="nearby__content__title">{{ item.title }}</div>
        <div class="nearby__content__tags">
          <span
            class="nearby__content__tag"
            v-for="(tag, index) in item.tags"
            :key="index"
          >{{ tag }}</span>
        </div>
        <p class="nearby__content__highlight">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNearby',
  setup () {
    const nearbyList = [{
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售10万+', '起送￥0', '基础运费￥5'],
      desc: 'VIP尊享满80元减4元运费券（每月3张）'
    }, {
      id: 2,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售3万+', '起送￥1', '基础运费￥5'],
      desc: 'VIP尊享满80元减4元运费券（每月4张）'
    }, {
      id: 3,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售5万+', '起送￥2', '基础运费￥5'],
      desc: 'VIP尊享满80元减4元运费券（每月5张）'
    }, {
      id: 4,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售6万+', '起送￥3', '基础运费￥5'],
      desc: 'VIP尊享满80元减4元运费券（每月6张）'
    }]

    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

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
</style>
