<template>
  <main class="position-relative pt-7.5 pb-2.5">
  <div class="container">
    <div class="row mb-7.5">
      <div class="col-md-8 col-lg-6 mx-md-auto mx-lg-0">
        <img src="@/assets/images/LOGO.svg" alt="logo" class="mb-3.25">
        <h1 class="fs-3 fs-md-2 fs-lg-1 text-primary mb-2.5">尋找單車,<br>來場悠閒的放鬆之旅!</h1>
        <div class="input-group mb-0.75">
          <label for="keyword" class="search-line input-group-text text-primary
            bg-light border-primary border-end-0 p-0.5 pe-0.25">
            <i class="bi bi-search fs-5"></i>
          </label>
          <input type="text" v-model="searchData.keyword" class="form-control bg-light
            border-primary border-start-0 py-0.5 ps-0.25"
            placeholder="輸入關鍵字" id="keyword">
        </div>
        <div class="d-flex gap-0.75">
          <select v-model="searchData.city" class="form-select bg-white text-primary
            text-center border-primary w-50 ps-1 py-0.5">
            <option selected disabled value="">縣市</option>
            <option :value="item.en" v-for="item in $filters.allCity" :key="item.en">
              {{ item.tw }}
            </option>
          </select>
          <button type="button" @click="passSearchData" class="hvr_search btn
            btn-primary w-50 py-0.5">搜尋</button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-1.5 gap-md-3.25">
      <img src="@/assets/images/02.png" alt="illustration-2" class="w-30 w-md-auto">
      <img src="@/assets/images/01.png" alt="illustration-1" class="w-30 w-md-auto">
      <img src="@/assets/images/03.png" alt="illustration-3" class="w-30 w-md-auto">
    </div>
    <img src="@/assets/images/Vector2.png" alt="vector2" class="position-absolute
      top-0 end-0 -zindex-1">
    <img src="@/assets/images/Vector1.png" alt="vector1"
      class="d-none d-md-block position-absolute bottom-0 start-0 -zindex-1">
  </div>
  </main>
</template>

<style lang="scss">
.-zindex-1 {
  z-index: -1;
}
</style>

<script>
export default {
  data() {
    return {
      searchData: {
        city: '',
        keyword: '',
      },
    };
  },
  methods: {
    passSearchData() {
      const indexSearch = this.searchData;
      this.$router.push({
        name: 'SearchBike',
        params: { indexSearch: JSON.stringify(indexSearch) },
      });
    },
  },

};
</script>
