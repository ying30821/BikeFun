<template>
  <nav class="py-1" v-if="pages.total_page > 0">
  <ul class="pagination justify-content-center gap-0.5 mb-0">
    <li class="page-item" :class="{disabled : pages.current_page === 1}">
      <a href="#" class="page-link d-inline-flex rounded-2 px-0.25"
        @click.prevent="updatePage(pages.current_page - 1)">
        <i class="material-icons-outlined fs-4">navigate_before</i>
      </a>
    </li>
    <li class="page-item" v-show="pages.current_page > 2">
      <a href="#" class="page-link rounded-2 px-0.5"
        @click.prevent="updatePage(1)">1
      </a>
    </li>
    <li class="page-item disabled" v-show="pages.current_page > 3">
        <span class="page-link rounded-2 px-0.25">...</span>
    </li>
    <li class="page-item" v-for="item in pages.total_page" :key="item"
        :class="{ active : pages.current_page === item}"
        v-show="item > pages.current_page - 2 && item < pages.current_page + 2">
      <a href="#" class="page-link rounded-2 px-0.5" @click.prevent="updatePage(item)">
        {{ item }}
      </a>
    </li>
    <li class="page-item disabled" v-show="pages.total_page - pages.current_page > 2">
      <span class="page-link rounded-2 px-0.25">...</span>
    </li>
    <li class="page-item" v-show="pages.total_page - pages.current_page > 1">
      <a href="#" class="page-link rounded-2 px-0.5"
        @click.prevent="updatePage(pages.total_page)"> {{ pages.total_page }}
      </a>
    </li>
    <li class="page-item" :class="{ disabled : pages.current_page == pages.total_page }">
      <a href="#" class="page-link d-inline-flex rounded-2 px-0.25"
        @click.prevent="updatePage(pages.current_page + 1)">
        <i class="material-icons-outlined fs-4">navigate_next</i>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
    },
  },
  emits: ['emitUpdate'],
  methods: {
    updatePage(page) {
      this.$emit('emitUpdate', page);
    },
  },
};
</script>
