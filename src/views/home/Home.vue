<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex= "0"/>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '@/components/Docker'

export default {
  name: 'HomePage',
  components: {
    StaticPart,
    Nearby,
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
