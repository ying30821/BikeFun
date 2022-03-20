<template>
<a class="card d-block border-0 rounded-3 w-100 mb-1.5" href="#"
  @click.prevent="setStnView(cardData.StationPosition)">
  <div class="card-body bg-light px-1">
    <h2 class="card-title h5 mb-0.75"> {{ cardData.StationName.Zh_tw }} </h2>
    <p class="card-text fs-7 text-dark d-flex align-items-center mb-0.75">
      <i class="bi bi-geo-alt-fill text-primary fs-4 me-0.5"></i>
      <span> {{ cardData.StationAddress.Zh_tw ? cardData.StationAddress.Zh_tw : '無此地址' }} </span>
    </p>
    <div class="d-flex gap-0.75">
      <span v-if="cardData.ServiceStatus === 0" class="border border-gray-600 bg-gray-300
        rounded-1 text-gray-600 fs-8 fw-normal px-0.5 py-0.25">停止營運
      </span>
      <span v-else-if="cardData.ServiceStatus === 1" class="border border-primary bg-secondary
        rounded-1 text-primary fs-8 fw-normal px-0.5 py-0.25">正常營運
      </span>
      <span v-else-if="cardData.ServiceStatus === 2" class="border border-gray-600 bg-gray-300
        rounded-1 text-gray-600 fs-8 fw-normal px-0.5 py-0.25">暫停營運
      </span>
      <span v-if="cardData.AvailableRentBikes === 0" class="border border-danger bg-notify-danger
        rounded-1 text-danger fs-8 fw-normal px-0.5 py-0.25">已無單車
      </span>
      <span v-if="cardData.AvailableReturnBikes === 0" class="border border-warning
        bg-notify-warning rounded-1 text-warning fs-8 fw-normal px-0.5 py-0.25">車位已滿
      </span>
    </div>
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
  emits: ['emitSetview'],
  data() {
    return {
    };
  },
  methods: {
    setStnView(pos) {
      this.$emit('emitSetview', pos);
    },
  },
};
</script>
