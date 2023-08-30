
let recipeForm = document.getElementById('recipeForm');
let recipeName = document.getElementById('recipeName');
let ingredients = document.getElementById('ingredients');
let method = document.getElementById('method');
let recipeImage = document.getElementById('recipeImage');
let recipesList = document.getElementById('recipesList');

let recipes = [];

// Load recipes from local storage
if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes();
}

recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value.split(',').map(item => item.trim());
    let enteredSteps = method.value.split('\n').map(item => item.trim());
    let enteredImage = recipeImage.value;

    // Create a new recipe
    let newRecipe = {
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredImage

    };
    
    recipes.push(newRecipe);
    displayRecipes();

    recipeName.value = '';
    ingredients.value = '';
    method.value = '';
    recipeImage.value = '';
});

function displayRecipes() {
    // Clear the previous content
    recipesList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        let recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe');

        // Add recipe name
        let recipeNameHeading = document.createElement('h3');
        recipeNameHeading.innerHTML = `<h2>${recipe.name.toUpperCase()}</h2>`;
        recipeItem.appendChild(recipeNameHeading);

        // Add image if available
        if (recipe.image) {
            let recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = `${recipe.name} Image`;
            recipeItem.appendChild(recipeImage);
        }

        // Add ingredients list
        let ingredientsList = document.createElement('p');
        ingredientsList.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
        recipeItem.appendChild(ingredientsList);

        // Add steps
        let stepsList = document.createElement('ol');
        stepsList.innerHTML = `<small>Steps</small>`;
        recipe.steps.forEach(step => {
            let stepItem = document.createElement('li');
            stepItem.textContent = step;
            stepsList.appendChild(stepItem);
        });
        recipeItem.appendChild(stepsList)

         // Create a delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `Delete`;
        deleteButton.onclick = function() {
            deleteRecipe(index);
        };
        recipeItem.appendChild(deleteButton)

        recipesList.appendChild(recipeItem);
        });

        // Save the recipes array to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    

function deleteRecipe(index) {
    // Remove the recipe from the array recipes
    recipes.splice(index, 1);
    displayRecipes();

    // Update local storage after deleting a recipe
    localStorage.setItem('recipes', JSON.stringifi(recipes));
}