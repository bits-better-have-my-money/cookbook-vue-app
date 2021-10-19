<template>
  <div class="recipes-index">
    <div class="p-3 mb-4 bg-light rounded-3">
      <div class="container-fluid py-4">
        <h1 class="display-2">Recipes</h1>
        <p class="col-md-8 fs-4">Search or sort by your favorite recipes</p>
        <div class="row">
          <div class="col-md-12 col-lg-8 mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              v-model="titleFilter"
              list="titles"
            />
          </div>
          <div class="col-md-12 col-lg-4">
            <button
              class="btn btn-secondary"
              type="button"
              v-on:click="setSortAttribute('title')"
            >
              Sort Title
              <span v-if="sortOrder === 1 && sortAttribute === 'title'">^</span>
              <span v-if="sortOrder === -1 && sortAttribute === 'title'"
                >v</span
              >
            </button>
            <button
              class="btn btn-secondary ms-1"
              type="button"
              v-on:click="setSortAttribute('prep_time')"
            >
              Sort Prep Time
              <span v-if="sortOrder === 1 && sortAttribute === 'prep_time'"
                >^</span
              >
              <span v-if="sortOrder === -1 && sortAttribute === 'prep_time'"
                >v</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <datalist id="titles">
      <option v-for="recipe in recipes" v-bind:key="recipe.id">
        {{ recipe.title }}
      </option>
    </datalist>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        class="col"
        v-for="recipe in orderBy(
          filterBy(recipes, titleFilter, 'title'),
          sortAttribute,
          sortOrder
        )"
        v-bind:key="recipe.id"
      >
        <div class="card">
          <router-link :to="`/recipes/${recipe.id}`">
            <img :src="recipe.image_url" class="card-img-top" alt="..."
          /></router-link>
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">
              {{ recipe.prep_time }} to prepare, created
              {{ relativeDate(recipe.created_at) }} <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card img {
  object-fit: cover;
  height: 300px;
}
</style>

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
