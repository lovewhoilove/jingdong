<template>
  <div class="wrapper">
    <div class="title">
      {{isEdit ? '编辑':'新建'}}地址
      <div
        class="edit__back iconfont"
        @click="handleBackClick"
      >&#xe6db;</div>
      <span
        class="title__save"
        @click="handleSaveClick"
      >保存</span>
    </div>
    <div class="content">
      <div class="content__item">
        <span class="content__item__label">所在城市：</span>
        <input
          class="content__item__input"
          placeholder="请输入所在城市"
          v-model="address.city"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">小区/大厦/学校：</span>
        <input
          class="content__item__input"
          placeholder="请输入所在小区/大厦/学校"
          v-model="address.department"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">楼号-门牌号：</span>
        <input
          class="content__item__input"
          placeholder="请输入楼号-门牌号"
          v-model="address.houseNumber"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">收货人：</span>
        <input
          class="content__item__input"
          placeholder="请输入收货人姓名"
          v-model="address.name"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">联系电话：</span>
        <input
          class="content__item__input"
          placeholder="请输入收货人联系电话"
          v-model="address.phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { post } from '@/utils/request'

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { router, handleBackClick }
}

export default {
  name: 'AddressEdit',
  setup () {
    const route = useRoute()
    const id = route.query?.id
    const address = reactive({
      city: '',
      department: '',
      houseNumber: '',
      name: '',
      phone: ''
    })
    const { router, handleBackClick } = useBackRouterEffect()

    onBeforeMount(async () => {
      if (id) {
        const result = await post(`/api/user/address/:${id}`)
        if (result?.errno === 0) {
          const data = result.data
          address.city = data.city
          address.department = data.department
          address.houseNumber = data.houseNumber
          address.name = data.name
          address.phone = data.phone
        }
      }
    })

    const handleSaveClick = async () => {
      if (
        !address.city ||
        !address.department ||
        !address.houseNumber ||
        !address.name ||
        !address.phone
      ) {
        alert('存在必填项空白')
      } else {
        if (id) {
          const result = await post(`/api/user/address/:${id}`, {
            city: address.city,
            department: address.department,
            houseNumber: address.houseNumber,
            name: address.name,
            phone: address.phone
          })
          if (result?.errno === 0) {
            router.back()
          }
        } else {
          const result = await post('/api/user/address', {
            city: address.city,
            department: address.department,
            houseNumber: address.houseNumber,
            name: address.name,
            phone: address.phone
          })
          if (result?.errno === 0) {
            router.back()
          }
        }
      }
    }
    return { address, isEdit: !!id, handleBackClick, handleSaveClick }
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

    &__save{
      position: absolute;
      right: .18rem;
      font-size: .14rem;
    }
  }

  .iconfont{
    position: absolute;
    top: 0;
    left: .14rem;
    width: 0.3rem;
    color: #b6b6b6;
    font-size: .24rem;
  }

  .content{
    margin-top: .12rem;
    padding: 0 .18rem;
    background: #fff;

    &__item{
      display: flex;
      height: .44rem;
      line-height: .44rem;
      overflow: hidden;
      border-bottom: .01rem solid #f1f1f1;
      font-size: .14rem;

      &__label{
        color: #333;
      }

      &__input{
        flex: 1;
        border: none;
        outline: none;
        color: #666;
      }
    }
  }
}
</style>
