<template>
  <div class="home">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep time: {{ recipe.prep_time }}</p>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: []
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("http://localhost:3000/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    }
  }
};
</script>
