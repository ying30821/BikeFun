<template>
<a class="card d-block fs-7 text-dark border-0 rounded-3 w-100 mb-1.5" href="#"
  @click.prevent="setRoute(cardData.Geometry)">
  <div class="card-body bg-light px-1">
    <h2 class="h5 mb-0.75"> {{ cardData.RouteName }} </h2>
    <p class="d-flex align-items-center mb-0.75">
      <i class="bi bi-geo-alt-fill text-primary fs-4 me-0.5"></i>
      <span> {{ cardData.City ? cardData.City : '' }} </span>
      <span class="ms-0.5"> {{ cardData.Town ? cardData.Town : '' }} </span>
    </p>
    <div class="d-flex alingn-items-center mb-0.75">
      <p class="me-3">
        <i class="material-icons-outlined text-primary fs-4 align-middle me-0.5">swap_vert</i>
        <span> {{ cardData.Direction ? cardData.Direction : '單向' }} </span>
      </p>
      <p>
        <i class="material-icons-outlined text-primary fs-4 align-middle me-0.5">route</i>
        <span> {{ cardData.CyclingLength }}公尺 </span>
      </p>
    </div>
    <p class="d-flex align-items-center mb-0.75">
      <span class="text-primary fs-6 me-0.5">開始</span>{{ cardData.RoadSectionStart }}
    </p>
    <p class="d-flex align-items-center">
      <span class="text-primary fs-6 me-0.5">結束</span>{{ cardData.RoadSectionEnd }}
    </p>
  </div>

</a>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
  emits: ['emitSetroute'],
  data() {
    return {
    };
  },
  methods: {
    setRoute(geo) {
      this.$emit('emitSetroute', geo);
    },
  },
};
</script>
