<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h4>{{ recipe.title }}</h4>
      <img :src="recipe.image_url" alt="" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
      <p>Created at: {{ recipe.friendly_created_at }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: []
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log(response.data);
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>
