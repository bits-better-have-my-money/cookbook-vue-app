<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div>Search: <input type="text" v-model="titleFilter" /></div>
    <button v-on:click="sortAttribute = 'title'">Sort by title</button>
    <button v-on:click="sortAttribute = 'prep_time'">Sort by prep time</button>
    <div
      v-for="recipe in orderBy(
        filterBy(recipes, titleFilter, 'title'),
        sortAttribute
      )"
      v-bind:key="recipe.id"
    >
      <h4>{{ recipe.title }}</h4>
      <img :src="recipe.image_url" alt="" />
      <p>Prep time: {{ recipe.prep_time }}</p>
      <p>Created {{ relativeDate(recipe.created_at) }}</p>
      <p v-if="$parent.getUserId() == recipe.user.id">Your recipe</p>
      <router-link :to="`/recipes/${recipe.id}`">See Details</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      recipes: [],
      titleFilter: "",
      sortAttribute: "title"
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log(response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    relativeDate: function (created_at) {
      return dayjs(created_at).fromNow();
    }
  }
};
</script>
