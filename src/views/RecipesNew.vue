<template>
  <div class="recipes-new">
    <div class="p-3 mb-4 bg-light rounded-3">
      <div class="container-fluid py-4">
        <h1 class="display-2">New Recipe</h1>
      </div>
    </div>
    <form v-on:submit.prevent="createRecipe()">
      <img v-if="status" :src="`https://http.cat/${status}`" alt="" />
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Pumpkin Cheesecake"
          v-model="newRecipeParams.title"
        />
      </div>
      <div class="mb-3">
        <label for="image_url" class="form-label">Image Url</label>
        <input
          type="text"
          class="form-control"
          id="image_url"
          placeholder=".jpg, .jpeg, .png extensions supported"
          v-model="newRecipeParams.image_url"
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">Ingredients</label>
        <textarea
          class="form-control"
          id="ingredients"
          rows="3"
          v-model="newRecipeParams.ingredients"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">Directions</label>
        <textarea
          class="form-control"
          id="directions"
          rows="3"
          v-model="newRecipeParams.directions"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="prep_time" class="form-label">Prep Time (in minutes)</label>
        <input
          type="text"
          class="form-control"
          id="prep_time"
          placeholder="15"
          v-model="newRecipeParams.prep_time"
        />
      </div>
      <button type="submit" class="btn btn-warning">Create</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newRecipeParams: {},
      errors: [],
      status: null
    };
  },
  methods: {
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
        .then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Recipe successfully created!";
          this.$router.push("/recipes");
        })
        .catch((error) => {
          this.status = error.response.status;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
