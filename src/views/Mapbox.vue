<template>
  <div class="map">
    <h2>This is my map</h2>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  height: 500px;
}
</style>

<script>
/* global mapboxgl */
export default {
  data: function () {
    return {};
  },
  mounted: function () {
    mapboxgl.accessToken = "YOUR ACCESS TOKEN GOES HERE";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-122.43, 37.77], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });
    console.log(map);
  },
  methods: {}
};
</script>
