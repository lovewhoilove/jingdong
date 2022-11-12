<template>
  <div class="wrapper">
    <div class="title">地址选择</div>
    <div class="address">
      <div
        class="address__item"
        v-for="(item,index) in addressList"
        :key="index"
        @click="() => handleAddressEdit(item._id)"
      >
        <div class="address__item__basic">
          {{item.name}}
          <span class="address__item__phone">{{item.phone}}</span>
        </div>
        <div class="address__item__address">
          {{item.city}} {{item.department}} {{item.houseNumber}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'

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
  name: 'AddressSelect',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()
    const handleAddressEdit = (id) => {
      const path = route.query.path
      router.push(`${path}?id=${id}`)
    }
    return { addressList, handleAddressEdit }
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
  bottom: 0;
  background: $order-bgColor;

  .title{
    position: relative;
    line-height: .44rem;
    text-align: center;
    background: $bgColor;
    font-size: .16rem;
    color: $content-fontcolor;
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
    }
  }
}
</style>
