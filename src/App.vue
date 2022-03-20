<template>
  <Navbar></Navbar>
  <main><router-view/></main>
  <footer class="footer bg-primary text-white text-center p-1">
    <small>
      Copyright © 2022 BikeFun. All rights reserved.
      <span class="ms-0.5">Design : Hao , Front Developed : lumei.</span>
    </small>
  </footer>
</template>

<style lang="scss">
@import '@/assets/style/all.scss';

main {
  min-height: calc(100vh - 146px) ;
  @include media-breakpoint-up(md) {
    min-height: calc(100vh - 186px) ;
  }
}
</style>

<script>
import Navbar from '@/components/Navbar.vue';
import getAuthorizationHeader from '@/methods/getAuthorizationHeader';

export default {
  components: {
    Navbar,
  },
  mounted() {
    this.axios.defaults.headers = getAuthorizationHeader();
  },
};
</script>
