<template>
  <div class="home">
    <h1>New Recipe</h1>
    <button v-on:click="createRecipe()">Create</button>
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
    },
    createRecipe: function () {
      var params = {
        title: "Example title",
        ingredients: "Example Ingredients",
        directions: "Example Directions",
        image_url: "Example Image",
        prep_time: 25
      };
      axios
        .post("http://localhost:3000/recipes", params)
        // happy status code/path
        .then((response) => {
          console.log(response.data);
          this.recipes.push(response.data);
        })
        // sad status code/path
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>
