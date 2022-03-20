import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';

export const bikeIcon = new L.Icon({
  iconUrl: require('@/assets/images/bikeIcon.png'),
  iconSize: [48, 48],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
});

export const routeIcon = new L.Icon({
  iconUrl: require('@/assets/images/redBikeIcon.png'),
  iconSize: [48, 48],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
});

export function getCurrentPosition() {
  if (!navigator.geolocation) return null;
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
    );
  });
}

export function initMap() {
  const map = L.map('map').setView([0, 0], 18);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: process.env.VUE_APP_MAPTOKEN,
  }).addTo(map);
  return map;
}

export function initMarkerLayer() {
  const markerLayer = new L.MarkerClusterGroup();
  return markerLayer;
}
