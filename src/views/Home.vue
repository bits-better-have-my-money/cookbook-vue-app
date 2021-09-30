<template>
  <div class="home">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <p>Prep time: {{ recipe.prep_time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      recipes: [
        { id: 1, title: "Raw Eggs", prep_time: 20 },
        { id: 2, title: "Empty Sandwich", prep_time: 5 },
        { id: 3, title: "Ice Cubes", prep_time: 120 }
      ]
    };
  },
  created: function () {},
  methods: {}
};
</script>
