<template>
  <div class="order">
    <div class="order__price">实付金额&nbsp;<b>&yen;{{calculations.totalPrice}}</b></div>
    <div
      class="order__btn"
      @click="() => handleSubmitClick(true)"
    >提交订单</div>
  </div>
  <div
    class="mask"
    v-if="showConfirm"
    @click="() => handleSubmitClick(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '@/utils/request'
import { useCommonCartEffect } from '@/effects/cartEffect'

const useMakeOrderEffect = (shopId) => {
  const router = useRouter()
  const store = useStore()
  const { shopName, calculations, productList } = useCommonCartEffect(shopId)
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({
        id: parseInt(product._id, 10),
        num: product.count
      })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('cleanCartProducts', { shopId })
        router.push({ name: 'MyOrder' })
      }
    } catch (e) {
      // showToast('请求失败')
    }
  }

  return { calculations, handleConfirmOrder }
}

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleSubmitClick }
}

export default {
  name: 'OrderView',
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, handleConfirmOrder } = useMakeOrderEffect(shopId)
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    return { showConfirm, calculations, handleSubmitClick, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.order{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  font-size: .14rem;

  &__price{
    flex: 1;
    color:$content-fontcolor;
    text-indent: .24rem;
  }

  &__btn{
    width: .98rem;
    text-align: center;
    background: #4fb0f9;
    color:$bgColor;
  }
}

.mask{
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;

  &__content{
    position: absolute;
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: .04rem;
    text-align: center;
    z-index: 2;

    &__title{
      margin: .24rem 0 0 0;
      line-height: .26rem;
      color: #333;
    }

    &__desc{
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666;
    }

    &__btns{
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn{
      flex:1;
      width: .8rem;
      height: .32rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .12rem;
      border: .01rem solid #4fb0f9;

      &--first{
        color: #4fb0f9;
        margin-right: .12rem;
      }

      &--last{
        background: #4fb0f9;
        color: #fff;
        margin-left: .12rem;
      }
    }
  }
}
</style>
