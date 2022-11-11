<template>
  <div class="wrapper">
    购物车列表
  </div>
  <Docker :currentIndex= "1" />
</template>

<script>
import Docker from '@/components/Docker'

export default {
  name: 'CartList',
  components: {
    Docker
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  padding: 0 .18rem .2rem .18rem;
  overflow-y: auto;
}
</style>
