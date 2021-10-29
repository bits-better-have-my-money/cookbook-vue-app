<template>
  <div class="home">
    <h1>New Recipe</h1>
    <ul v-for="error in errors" v-bind:key="error">
      <li>{{ error }}</li>
    </ul>
    <div>Title: <input type="text" v-model="newRecipeParams.title" /></div>
    <div>
      Ingredients: <input type="text" v-model="newRecipeParams.ingredients" />
    </div>
    <div>
      Directions: <input type="text" v-model="newRecipeParams.directions" />
    </div>
    <div>
      Prep Time: <input type="text" v-model="newRecipeParams.prep_time" />
    </div>
    <div>
      Image Url: <input type="text" v-model="newRecipeParams.image_url" />
    </div>
    <p>newRecipeParams: {{ newRecipeParams }}</p>
    <button v-on:click="createRecipe()">Create</button>

    <div id="fh5co-work-section" class="fh5co-light-grey-section">
      <div class="container">
        <div class="row">
          <div
            class="col-md-4"
            v-for="recipe in recipes"
            v-bind:key="recipe.id"
          >
            <a href="#" class="item-grid text-center">
              <div
                class="image"
                :style="`background-image: url(${recipe.image_url})`"
              ></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="category">
                    <button
                      class="btn btn-primary btn-outline with-arrow"
                      v-on:click="showRecipe(recipe)"
                    >
                      See Details
                      <i class="icon-arrow-right"></i>
                    </button>
                  </h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Details</h1>
        currentRecipe: {{ currentRecipe }}
        <p>Title: <input type="text" v-model="currentRecipe.title" /></p>
        <p>
          Image Url: <input type="text" v-model="currentRecipe.image_url" />
        </p>
        <p>
          Ingredients: <input type="text" v-model="currentRecipe.ingredients" />
        </p>
        <p>
          Directions: <input type="text" v-model="currentRecipe.directions" />
        </p>
        <p>
          Prep Time: <input type="text" v-model="currentRecipe.prep_time" />
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button v-on:click="destroyRecipe(currentRecipe)">Destroy</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {},
      currentRecipe: {},
      errors: []
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
        // happy status code/path
        .then((response) => {
          console.log(response.data);
          this.recipes.push(response.data);
        })
        // sad status code/path
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showRecipe: function (recipe) {
      console.log(recipe);
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    },
    updateRecipe: function (recipe) {
      var editRecipeParams = recipe;
      axios
        .patch(`/recipes/${recipe.id}`, editRecipeParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyRecipe: function (recipe) {
      axios.delete(`/recipes/${recipe.id}`).then((response) => {
        console.log("Success,", response.data);
        // remove the corrrect deleted recipe from the recipes array
        var index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
      });
    }
  }
};
</script>
