<template>
  <div class="recipes-new">
    <div class="p-3 mb-4 bg-light rounded-3">
      <div class="container-fluid py-4">
        <h1 class="display-2">New Recipe</h1>
      </div>
    </div>
    <form v-on:submit.prevent="createRecipe()" enctype="multipart/form-data">
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
        <label for="image_file" class="form-label">Image</label>
        <input
          type="file"
          class="form-control"
          id="image_file"
          v-on:change="setFile($event)"
          ref="fileInput"
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
      newRecipeParams: {{ newRecipeParams }}
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
      status: null,
      image_file: {}
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image_file = event.target.files[0];
      }
    },
    createRecipe: function () {
      var formData = new FormData();
      formData.append("image_file", this.image_file);
      formData.append("title", this.newRecipeParams.title);
      formData.append("ingredients", this.newRecipeParams.ingredients);
      formData.append("directions", this.newRecipeParams.directions);
      formData.append("prep_time", this.newRecipeParams.prep_time);
      axios
        .post("/recipes", formData)
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
