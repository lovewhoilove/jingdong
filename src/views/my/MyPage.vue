<template>
  <div class="wrapper">
    我的页面
  </div>
  <Docker :currentIndex= "3" />
</template>

<script>
import Docker from '@/components/Docker'

export default {
  name: 'MyPage',
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
