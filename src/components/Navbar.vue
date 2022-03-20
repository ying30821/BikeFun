<template>
  <nav class="navbar bg-white px-0.25 px-md-1.25 py-0.5">
    <div class="container-fluid">
      <router-link to="/">
        <img src="@/assets/images/LOGO.svg" alt="logo"
          class="w-auto h-40px h-md-60px me-0">
      </router-link>
      <div class="navlink d-flex me-lg-5">
        <router-link class="hvr_navBtn btn text-primary px-0.75 py-0.25
          px-md-1 py-md-0.5 me-0.25 me-md-1.5" to="/searchBike">尋找單車
        </router-link>
        <router-link class="hvr_navBtn btn text-primary px-0.75 py-0.25
          px-md-1 py-md-0.5" to="/searchRoute">尋找車道
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  .navbar {
  box-shadow: 0px 2px 6px rgba(38, 38, 38, 0.1);
  }
  .navlink {
    & .active {
      color: #fff !important;
      background: #0E5978;
    }
  }
</style>
