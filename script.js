document
  .querySelector("#random-recipe-btr")
  .addEventListener("click", function () {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=b155f3ebc6ac4f8088d89d4961a28bb9"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        const recipe = data.recipes[0];

        if (recipe) {
          let tableIngredients = [];
          for (
            let index = 0;
            index < recipe.extendedIngredients.length;
            index++
          ) {
            tableIngredients.push(recipe.extendedIngredients[index].name);
          }
          document.querySelector("#recipeTitle").textContent = recipe.title;
          document.querySelector("#recipeImage").src = recipe.image;
          // Utilisation de innerHTML pour inclure le HTML des instructions (par ex. les listes <ol>)
          document.querySelector("#recipeInstructions").innerHTML =
            recipe.instructions || "Instructions non disponibles";
          document.querySelector("#recipeContainer").style.display = "block";
          document.querySelector("#ingredients").innerHTML =
            tableIngredients.join(",") || "ingredients non disponible";
        } else {
          document.querySelector("#recipeTitle").textContent =
            "Pas de recette trouvée";
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        document.querySelector("#recipeTitle").textContent =
          "Une erreur s'est produite lors de la récupération de la recette.";
      });
  });
