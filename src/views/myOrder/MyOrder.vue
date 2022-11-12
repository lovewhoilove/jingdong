<template>
  <div class="title">我的订单</div>
  <div class="wrapper">
    <div class="order" v-for="(item,index) in orderList" :key="index">
      <div class="order__header">
        <div class="order__header__title">{{item.shopName}}</div>
        <div class="order__header__status">
          {{item.isCanceled ? '已取消':'已下单'}}
        </div>
      </div>
      <div class="order__content">
        <div class="order__content__imgs">
          <template
            v-for="(innerItem,innerIndex) in item.products"
            :key="innerIndex"
          >
            <img
              class="order__content__img"
              :src="innerItem.product.img"
              v-if="innerIndex < 4"
            />
          </template>
        </div>
        <div class="order__content__info">
          <div class="order__content__price">&yen; {{item.totalPrice}}</div>
          <div class="order__content__count">共  {{item.totalCount}} 件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex= "2" />
</template>

<script>
import Docker from '@/components/Docker'
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request'

const useOrderListEffect = () => {
  const data = reactive({ orderList: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalCount = 0
        products.forEach((productItem) => {
          totalCount += productItem?.orderSales || 0
          totalPrice += productItem?.product?.price * productItem?.orderSales || 0
        })
        order.totalCount = totalCount
        order.totalPrice = totalPrice
      })
      data.orderList = result.data
    }
  }
  getOrderList()
  const { orderList } = toRefs(data)
  return { orderList }
}

export default {
  name: 'MyOrder',
  components: {
    Docker
  },
  setup () {
    const { orderList } = useOrderListEffect()
    return { orderList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';

.wrapper {
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: .49rem;
  padding: 0 .18rem .2rem .18rem;
  overflow-y: auto;
  background: $order-bgColor;
}

.title{
  line-height: .44rem;
  text-align: center;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
}

.order{
  padding: .16rem;
  margin-top: .16rem;
  background: $bgColor;
  border-radius: .04rem;

  &__header{
    display: flex;
    line-height: .22rem;

    &__title{
      font-size: .16rem;
      color: $content-fontcolor;
      margin-bottom: .16rem;
    }

    &__status{
      flex: 1;
      color: $light-fontColor;
      text-align: right;
    }
  }

  &__content{
    display: flex;

    &__imgs{
      flex:1;
      display: flex;
    }

    &__img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }

    &__info{
      text-align: right;
    }

    &__price{
      font-size: .14rem;
      color: $highlight-fontColor;
      line-height: .2rem;
      margin-top: .04rem;
    }

    &__count{
      line-height: .14rem;
      font-size: .12rem;
    }
  }
}
</style>
