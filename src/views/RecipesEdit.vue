<template>
  <div class="recipes-edit">
    <form v-on:submit.prevent="updateRecipe()">
      <h1>Edit Recipe</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" v-model="editRecipeParams.title" />
      </div>
      <div>
        <label>Image Url:</label>
        <input type="text" v-model="editRecipeParams.image_url" />
      </div>
      <div>
        <label>Ingredients:</label>
        <input type="text" v-model="editRecipeParams.ingredients" />
      </div>
      <div>
        <label>Directions:</label>
        <input type="text" v-model="editRecipeParams.directions" />
      </div>
      <div>
        <label>Prep Time:</label>
        <input type="text" v-model="editRecipeParams.prep_time" />
      </div>
      <input type="submit" value="Update" />
    </form>

    editRecipeParams: {{ editRecipeParams }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editRecipeParams: {},
      errors: []
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.editRecipeParams = response.data;
    });
  },
  methods: {
    updateRecipe: function () {
      axios
        .patch(`/recipes/${this.editRecipeParams.id}`, this.editRecipeParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/recipes/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
