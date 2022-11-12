<template>
  <div class="wrapper">
    <div class="title">
      管理收货地址
      <span class="title__create">
        <router-link to="/addressEdit">新建</router-link>
      </span>
    </div>
    <div class="address">
      <div
        class="address__item"
        v-for="(item,index) in addressList"
        :key="index"
      >
        <div class="address__item__basic">
          {{item.name}}
          <span class="address__item__phone">{{item.phone}}</span>
        </div>
        <div class="address__item__address">{{item.city}} {{item.department}} {{item.houseNumber}}</div>
        <div class="address__item__icon iconfont">&#xe6f8;</div>
      </div>
    </div>
  </div>
  <Docker :currentIndex= "3" />
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import Docker from '@/components/Docker'

const useAddressListEffect = () => {
  const addressList = ref([])
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data
    }
  }
  return { addressList, getAddressList }
}

export default {
  name: 'MyPage',
  components: {
    Docker
  },
  setup () {
    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()
    return { addressList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: $order-bgColor;

  .title{
    position: relative;
    line-height: .44rem;
    text-align: center;
    background: $bgColor;
    font-size: .16rem;
    color: $content-fontcolor;

    &__create{
      position: absolute;
      right: .18rem;
      font-size: .14rem;

      a{
        text-decoration: none;
        color: $content-fontcolor;
      }
    }
  }

  .address{
    margin: .16rem .18rem 0 .18rem;

    &__item{
      position: relative;
      padding: .18rem .63rem .18rem .16rem;
      margin-bottom: .16rem;
      background: $bgColor;
      border-radius: .04rem;
      font-size: .14rem;
      line-height: .2rem;

      &__basic{
        color: $light-fontColor;
      }

      &__phone{
        margin-left: .66rem;
      }

      &__address{
        margin-top: .08rem;
        color: $content-fontcolor;
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
}
</style>
