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
    return {
      places: [
        {
          lat: 37.79207188214143,
          lng: -122.42103996911959,
          description: "Bob's Donuts in SF - home of delicious giant donuts"
        },
        {
          lat: 37.779049476903005,
          lng: -122.42327655933346,
          description: "Johnny's Donuts - best fancy donuts in the bay"
        },
        { lat: -25.363, lng: 131.044, description: "A place in Australia" }
      ]
    };
  },
  mounted: function () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-122.43, 37.77], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });

    this.places.forEach((place) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        place.description
      );
      const marker = new mapboxgl.Marker()
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map);
      console.log(marker);
    });
  },
  methods: {}
};
</script>
