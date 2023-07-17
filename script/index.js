function displayRecipeCard(recipes) {
  let RecipeCard = "";
  recipes.map((recipe) => {
    const ingredients = recipe.ingredients;

    let ingredientList = "";
    ingredients.map((ingredient) => {
      let unitsGramme = ingredient.unit !== undefined ? ingredient.unit : "";

      let quantityNum =
        ingredient.quantity !== undefined ? ` ${ingredient.quantity} ` : "";
      ingredientList += `
	    <li class="quantitéIngrédient">
                <span class="ingrédientName">${ingredient.ingredient}</span>
                <span class="quantity unit">${quantityNum}${unitsGramme}</span>     
        </li>
	 `;
    });

    RecipeCard += `
	<article id= ${recipe.id} class="card">
		 <a href = "#"> <div class="photoPlat" aria-label="Accéder à la fiche de recette: '${recipe.name}'" tabindex="0">
		 <div class="photoPlat">	
		 <img src="./assets/images/${recipe.image}" alt='${recipe.name}' />
		 </div>
		<div class="detailPlat">
			<h3 class="recipeName">${recipe.name}</h3>
			<h4 class="recette">Recette</h4>
			<p class="description">${recipe.description}</p>
			<h4 class="ingredients">Ingrédients</h4>
			<ul class="detailIngrédient">
	    	   ${ingredientList}	
			</ul>
		</div>
		</a>
	</article>
	 `;
  });
  document.getElementById("recepes__cards").innerHTML = RecipeCard;
}

displayRecipeCard(recipes);
