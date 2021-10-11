<template>
  <div class="recipes-show">
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image_url" alt="" />
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
    <p>Created at: {{ recipe.friendly_created_at }}</p>
    <p>{{ typeof $parent.getUserId() }}</p>
    <p>{{ typeof recipe.user.id }}</p>
    <p>Created by: {{ recipe.user.name }}</p>
    <div v-if="$parent.getUserId() == recipe.user.id">
      <router-link :to="`/recipes/${recipe.id}/edit`">Edit</router-link> <br />
      <button v-on:click="destroyRecipe()">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {}
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    destroyRecipe: function () {
      if (confirm("Are you sure you want to delete this recipe?")) {
        axios.delete(`/recipes/${this.recipe.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/recipes");
        });
      }
    }
  }
};
</script>
