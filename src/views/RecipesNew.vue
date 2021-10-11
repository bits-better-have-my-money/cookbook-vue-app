<template>
  <div class="recipes-new">
    <form v-on:submit.prevent="createRecipe()">
      <h1>New Recipe</h1>
      <img v-if="status" :src="`https://http.cat/${status}`" alt="" />
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" v-model="newRecipeParams.title" />
      </div>
      <div>
        <label>Image Url:</label>
        <input type="text" v-model="newRecipeParams.image_url" />
      </div>
      <div>
        <label>Ingredients:</label>
        <input type="text" v-model="newRecipeParams.ingredients" />
      </div>
      <div>
        <label>Directions:</label>
        <input type="text" v-model="newRecipeParams.directions" />
      </div>
      <div>
        <label>Prep Time:</label>
        <input type="text" v-model="newRecipeParams.prep_time" />
      </div>
      <input type="submit" value="Create" />
    </form>

    newRecipeParams: {{ newRecipeParams }}
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
