<template>
  <div class="card w-100">
    <div class="bg-primary h-24px">
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center mb-1">
        <h1 class="h2 text-primary me-1.25 mb-0">
          <slot>尋找</slot>
        </h1>
        <i class="bi bi-chevron-up d-flex text-primary fs-3"></i>
      </div>
      <div class="input-group mb-0.75">
        <label for="keyword"
          class="search-line input-group-text text-primary bg-light border-primary
            border-end-0 p-0.5 pe-0.25">
            <i class="bi bi-search fs-5"></i>
        </label>
        <input type="text" v-model="searchData.keyword" class="form-control bg-light border-primary
          border-start-0 py-0.5 ps-0.25" placeholder="輸入關鍵字" id="keyword">
      </div>
      <div class="d-flex gap-0.75">
        <select v-model="searchData.city" class="form-select bg-white text-primary text-center
          border-primary w-50 ps-1 py-0.5">
          <option selected disabled value="">縣市</option>
          <option :value="item.en" v-for="item in city" :key="item.en">
            {{ item.tw }}
          </option>
        </select>
        <button type="button" @click="searchStn"
          class="btn hvr_search btn-primary w-50 py-0.5">搜尋
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .card{
    z-index: 450;
    box-shadow: 0px 0px 10px rgba(38, 38, 38, 0.25);
    border-radius: .5rem;
    overflow: hidden;
  }
</style>

<script>
export default {
  props: {
    city: {
      type: Object,
    },
  },
  emits: ['emitSearch'],
  data() {
    return {
      searchData: {
        city: '',
        keyword: '',
      },
    };
  },
  methods: {
    searchStn() {
      this.$emit('emitSearch', this.searchData);
      this.searchData = {
        city: '',
        keyword: '',
      };
    },
  },
};
</script>
