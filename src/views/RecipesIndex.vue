<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div>Search: <input type="text" v-model="titleFilter" list="titles" /></div>

    <datalist id="titles">
      <option v-for="recipe in recipes" v-bind:key="recipe.id">
        {{ recipe.title }}
      </option>
    </datalist>

    <button v-on:click="setSortAttribute('title')">
      Sort by title
      <span v-if="sortOrder === 1 && sortAttribute === 'title'">^</span>
      <span v-if="sortOrder === -1 && sortAttribute === 'title'">v</span>
    </button>
    <button v-on:click="setSortAttribute('prep_time')">
      Sort by prep time
      <span v-if="sortOrder === 1 && sortAttribute === 'prep_time'">^</span>
      <span v-if="sortOrder === -1 && sortAttribute === 'prep_time'">v</span>
    </button>
    <div
      is="transition-group"
      appear
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-for="recipe in orderBy(
          filterBy(recipes, titleFilter, 'title'),
          sortAttribute,
          sortOrder
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
      sortAttribute: "title",
      sortOrder: 1
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
    },
    setSortAttribute: function (attribute) {
      // if i click on the SAME button, change sort order to the opposite.
      if (this.sortAttribute === attribute) {
        this.sortOrder = this.sortOrder * -1;
        // if i click on a DIFFERENT button, change sort attribute and change sort order to ascending
      } else {
        this.sortAttribute = attribute;
        this.sortOrder = 1;
      }
    }
  }
};
</script>
