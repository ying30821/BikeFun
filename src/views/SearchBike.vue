<template>
  <Loading :active="isLoading" class="z-index-500"></Loading>
  <div class="container-fluid px-0">
    <div class="row gx-0">
      <div class="d-md-block col-md-6 col-lg-4 bg-white" ref="searchList">
        <div class="border-bottom p-1">
          <SearchCard @emit-search="searchStn"  :city="$filters.allCity">尋找單車</SearchCard>
        </div>
        <div class="scrollbar px-1 py-0.75">
          <template v-if="pagination.current_page_data.length > 0">
            <StnCard v-for="item in pagination.current_page_data" :key="item.StationUID"
            :cardData="item" @emit-setview="setStnView">
          </StnCard>
          </template>
          <p v-else class="fs-5 text-center py-1 mb-0">
            <i class="material-icons-outlined fs-2 align-middle">search_off</i>
            目前查無資料 請重新搜尋
          </p>
        </div>
        <Pagination :pages="pagination" @emit-update="updatePage"></Pagination>
      </div>
      <div class="d-md-block col-md-6 col-lg-8" ref="map">
        <div id="map"></div>
      </div>
    </div>
    <div class="d-flex d-md-none justify-content-end px-1 py-0.5">
      <button @click="toggleMapAndList"
        class="hvr_showMap btn btn-outline-primary bg-secondary px-0.5 py-0.25">
        {{ showMap ? "顯示地圖" : "顯示列表" }}
      </button>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import {
  bikeIcon,
  getCurrentPosition,
  initMap,
  initMarkerLayer,
} from '@/methods/map';
import paginationMixin from '@/mixins/paginationMixin';
import Pagination from '@/components/Pagination.vue';
import SearchCard from '@/components/SearchCard.vue';
import StnCard from '@/components/StnCard.vue';

export default {
  props: {
    indexSearch: {
      type: String,
    },
  },
  mixins: [paginationMixin],
  components: {
    SearchCard,
    StnCard,
    Pagination,
  },
  data() {
    return {
      map: '',
      markerLayer: '',
      bikeIcon: '',
      myPos: { lon: 0, lat: 0 },
      apiData: [],
      isLoading: false,
      showMap: true,
    };
  },
  methods: {
    getStnData(city, keyword = '') {
      const api = `${process.env.VUE_APP_BASEAPI}/Bike/Station/${city}?$filter=contains(StationName%2FZh_tw%2C'${keyword}')%20or%20contains(StationAddress%2FZh_tw%2C'${keyword}')&$format=JSON`;
      return this.axios.get(api);
    },
    getAvlData(city) {
      const api = `${process.env.VUE_APP_BASEAPI}/Bike/Availability/${city}?%24format=JSON`;
      return this.axios.get(api);
    },
    getNearByStnData(longitude = 0, latitude = 0, keyword = '') {
      const api = `${process.env.VUE_APP_BASEAPI}/Bike/Station/NearBy?$filter=contains(StationName%2FZh_tw%2C'${keyword}')%20or%20contains(StationAddress%2FZh_tw%2C'${keyword}')&$spatialFilter=nearby(${latitude},${longitude},1000)&$format=JSON`;
      return this.axios.get(api);
    },
    getNearByAvlData(longitude = 0, latitude = 0) {
      const api = `${process.env.VUE_APP_BASEAPI}/Bike/Availability/NearBy?$spatialFilter=nearby(${latitude},${longitude},1000)`;
      return this.axios.get(api);
    },
    recombineStnData(tempStnData, tempAvlData) {
      this.apiData = [];
      tempStnData.forEach((stn) => {
        tempAvlData.forEach((avl) => {
          if (stn.StationUID === avl.StationUID) {
            const obj = {
              StationUID: stn.StationUID,
              StationName: stn.StationName,
              StationAddress: stn.StationAddress,
              StationPosition: stn.StationPosition,
              ServiceStatus: avl.ServiceStatus,
              AvailableRentBikes: avl.AvailableRentBikes,
              AvailableReturnBikes: avl.AvailableReturnBikes,
              UpdateTime: avl.UpdateTime,
            };
            this.apiData.push(obj);
          }
        });
      });
    },
    renderStn() {
      this.getPage();
      if (this.markerLayer) {
        this.markerLayer.clearLayers();
      }
      const lon = this.pagination.current_page_data[0].StationPosition.PositionLon;
      const lat = this.pagination.current_page_data[0].StationPosition.PositionLat;
      this.map.setView([lat, lon], 18);

      this.apiData.forEach((item) => {
        const itemLon = item.StationPosition.PositionLon;
        const itemLat = item.StationPosition.PositionLat;
        this.markerLayer.addLayer(
          L.marker([itemLat, itemLon], { icon: bikeIcon, id: item.StationUID }).bindPopup(`
            <div class="p-0.75">
              <h5 class="h4">${item.StationName.Zh_tw}</h5>
              <p class="fs-7 text-dark d-flex align-items-center mt-0 mb-0.5">
              <i class="bi bi-geo-alt-fill text-primary fs-4 me-0.5"></i>${item.StationAddress.Zh_tw}
              </p>
              <p class="fs-7 text-dark d-flex align-items-center mt-0 mb-0.75">
              <i class="material-icons-outlined text-primary fs-4 me-0.5">history</i>${item.UpdateTime}
              </p>
              <div class="d-flex gap-0.5 mb-0.75">
                ${item.ServiceStatus === 0 ? '<p class="border border-gray-600 bg-gray-300 rounded-2 text-gray-600 fs-7 fw-normal px-0.5 py-0.25 my-0">停止營運</p>' : ''}
                ${item.ServiceStatus === 1 ? '<p class="border border-primary bg-secondary rounded-2 text-primary fs-7 fw-normal px-0.5 py-0.25 my-0">正常營運</p>' : ''}
                ${item.ServiceStatus === 2 ? '<p class="border border-gray-600 bg-gray-300 rounded-2 text-gray-600 fs-7 fw-normal px-0.5 py-0.25 my-0">暫停營運</p>' : ''}
                ${item.AvailableRentBikes > 1 ? '<p class="border border-primary bg-secondary rounded-2 text-primary fs-7 fw-normal px-0.5 py-0.25 my-0">尚有單車</p>' : ''}
                ${item.AvailableRentBikes === 0 ? '<p class="border border-danger bg-notify-danger rounded-2 text-danger fs-7 fw-normal px-0.5 py-0.25 my-0">已無單車</p>' : ''}
                ${item.AvailableReturnBikes === 0 ? '<p class="border border-warning bg-notify-warning rounded-2 text-warning fs-7 fw-normal px-0.5 py-0.25 my-0">車位已滿</p>' : ''}
              </div>
              <div class="d-flex">
                <p class="border border-primary rounded-3 fs-6 text-primary text-center w-50 p-0.25 me-1 my-0">可借單車
                  <span class="d-block fs-3 text-black mt-0.25">${item.AvailableRentBikes}</span>
                </p>
                <p class="border border-primary rounded-3 fs-6 text-primary text-center w-50 p-0.25 m-0">可停車位
                  <span class="d-block fs-3 text-black mt-0.25">${item.AvailableReturnBikes}</span>
                </p>
              </div>
            </div>
          `),
        );
        this.map.addLayer(this.markerLayer);
      });
    },
    searchStn(searchData) {
      this.isLoading = true;
      if (!searchData.city) {
        Promise.all([this.getNearByStnData(this.myPos.lon, this.myPos.lat, searchData.keyword),
          this.getNearByAvlData(this.myPos.lon, this.myPos.lat)])
          .then((res) => {
            const tempStnData = res[0].data;
            const tempAvlData = res[1].data;
            this.recombineStnData(tempStnData, tempAvlData);
            this.renderStn();
            this.isLoading = false;
          });
      } else {
        Promise.all([this.getStnData(searchData.city, searchData.keyword),
          this.getAvlData(searchData.city)])
          .then((res) => {
            const tempStnData = res[0].data;
            const tempAvlData = res[1].data;
            this.recombineStnData(tempStnData, tempAvlData);
            this.renderStn();
            this.isLoading = false;
          });
      }
    },
    setStnView(pos) {
      this.map.setView([pos.PositionLat, pos.PositionLon], 18);
      window.screenWidth = document.body.clientWidth;
      if (window.screenWidth < 768) {
        this.toggleMapAndList();
      }
    },
    toggleMapAndList() {
      if (this.showMap) {
        this.$refs.searchList.classList.add('d-none');
        this.$refs.map.classList.remove('d-none');
      } else {
        this.$refs.map.classList.add('d-none');
        this.$refs.searchList.classList.remove('d-none');
      }
      this.showMap = !this.showMap;
    },
  },
  mounted() {
    this.isLoading = true;
    this.map = initMap();
    this.markerLayer = initMarkerLayer();
    this.markerLayer.addTo(this.map);
    this.map.whenReady(() => {
      this.$refs.map.classList.add('d-none');
    });
    getCurrentPosition().then((pos) => {
      this.isLoading = false;
      this.myPos.lon = pos.coords.longitude;
      this.myPos.lat = pos.coords.latitude;
      let searchData = {
        city: '',
        keyword: '',
      };
      if (this.indexSearch) {
        searchData = JSON.parse(this.indexSearch);
      }
      return this.searchStn(searchData);
    });
  },
};
</script>
