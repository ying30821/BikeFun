<template>
  <Loading :active="isLoading" class="z-index-500"></Loading>
  <div class="container-fluid px-0">
    <div class="row gx-0">
      <div class="d-md-block col-md-6 col-lg-4 bg-white" ref="searchList">
        <div class="border-bottom p-1">
          <SearchCard @emit-search="searchRoute" :city="$filters.allRouteCity">尋找車道</SearchCard>
        </div>
        <div class="scrollbar px-1 py-0.75">
          <template v-if="pagination.current_page_data.length > 0">
            <RouteCard v-for="item in pagination.current_page_data" :key="item.StationUID"
            :cardData="item" @emit-setroute="polyLine">
          </RouteCard>
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
import Wkt from 'wicket';
import {
  routeIcon,
  initMap,
} from '@/methods/map';

import paginationMixin from '@/mixins/paginationMixin';
import Pagination from '@/components/Pagination.vue';
import SearchCard from '@/components/SearchCard.vue';
import RouteCard from '@/components/RouteCard.vue';

export default {
  mixins: [paginationMixin],
  components: {
    SearchCard,
    RouteCard,
    Pagination,
  },
  data() {
    return {
      map: '',
      markerLayer: '',
      geoLayer: '',
      apiData: [],
      isLoading: false,
      showMap: true,
    };
  },
  methods: {
    getRouteData(city = 'Taipei', keyword = '') {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_BASEAPI}/Cycling/Shape/${city}?%24filter=contains(RouteName%2C'${keyword}')&%24format=JSON`;
      this.axios.get(api).then((res) => {
        this.isLoading = false;
        this.apiData = res.data;
        this.renderRouteCard();
      });
    },
    renderRouteCard() {
      this.getPage();
      this.polyLine(this.apiData[0].Geometry);
    },
    searchRoute(searchData) {
      const search = searchData;
      if (!search.city) {
        search.city = 'Taipei';
      }
      this.getRouteData(search.city, search.keyword);
    },
    polyLine(geo) {
      if (this.geoLayer) {
        this.geoLayer.clearLayers();
      }
      if (this.markerLayer) {
        this.markerLayer.clearLayers();
      }
      const wicket = new Wkt.Wkt();
      const geojsonFeature = wicket.read(geo).toJson();
      const myStyle = {
        color: '#C50047',
        weight: 5,
        opacity: 0.65,
      };
      this.geoLayer = L.geoJSON(geojsonFeature, {
        style: myStyle,
      }).addTo(this.map);
      this.geoLayer.addData(geojsonFeature);
      this.map.fitBounds(this.geoLayer.getBounds());

      const posArr = geojsonFeature.coordinates[0];
      const startPos = posArr[0];
      const endPos = posArr[posArr.length - 1];
      L.marker([startPos[1], startPos[0]], { icon: routeIcon }).addTo(this.markerLayer);
      L.marker([endPos[1], endPos[0]], { icon: routeIcon }).addTo(this.markerLayer);
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
    this.map = initMap();
    this.markerLayer = L.layerGroup().addTo(this.map);
    this.map.whenReady(() => {
      this.$refs.map.classList.add('d-none');
    });
    this.getRouteData();
  },
};
</script>
