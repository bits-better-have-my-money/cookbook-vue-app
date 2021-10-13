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
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-122.43, 37.77], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });

    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "This is the heart of San Francisco"
    );

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([-122.43, 37.77])
      .setPopup(popup)
      .addTo(map);
    console.log(marker1);
  },
  methods: {}
};
</script>
