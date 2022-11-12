<template>
  <div class="top">
    <div class="top__bg"></div>
    <div class="top__header">
      <div
        class="top__header__back iconfont"
        @click="handleBackClick"
      >&#xe6db;</div>
      确认订单
    </div>
    <div class="top__receiver" @click="handleAddressClick">
      <div class="top__receiver__title">收货地址</div>
      <div v-if="hasAddress" class="top__receiver__address">
        {{data.city}}{{data.department}}{{data.houseNumber}}
      </div>
      <div v-else class="top__receiver__address">
        请选择收货地址
      </div>
      <div
        v-if="hasAddress"
        class="top__receiver__info"
      >
        <span class="top__receiver__info__name">{{data.name}}</span>
        <span class="top__receiver__info__phone">{{data.phone}}</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe6f8;</div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({})
    const id = route.query.id
    const handleBackClick = () => {
      router.back()
    }

    const handleAddressClick = () => {
      router.push(`/addressSelect?path=${route.path}`)
    }

    onBeforeMount(async () => {
      if (id) {
        const result = await get(`/api/user/address/${id}`)
        if (result?.errno === 0) {
          data.city = result.data.city
          data.department = result.data.department
          data.houseNumber = result.data.houseNumber
          data.name = result.data.name
          data.phone = result.data.phone
        }
      }
    })
    return {
      hasAddress: !!id,
      data,
      handleBackClick,
      handleAddressClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.top{
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;

  &__header{
    position: relative;
    padding-top: .2rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    font-size: .16rem;

    &__back{
      position: absolute;
      left: .18rem;
      font-size: .24rem;
    }
  }

  &__receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    border-radius: .04rem;
    background: $bgColor;

    &__title{
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: $content-fontcolor;
    }

    &__info{
      line-height: .18rem;
      padding: .06rem 0 0 .16rem;
      font-size: .12rem;
      color: $medium-fontColor;
      &__name,
      &__phone{
        margin-right: .06rem;
      }
    }

    &__icon{
      position: absolute;
      top: 50%;
      right: .16rem;
      transform: translate(0, -50%);
      color: $medium-fontColor;
      font-size: .20rem;
    }
  }
}
</style>
