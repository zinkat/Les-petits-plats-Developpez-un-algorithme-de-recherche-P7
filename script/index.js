let allRecipes = [];
allRecipes = [...recipes];
//affichage des recettes dans la page d'accueil
function displayRecipeCard(recipes) {
  let RecipeCard = "";
  recipes.map((recipe) => {
    const ingredients = recipe.ingredients;

    let ingredientList = "";
    ingredients.map((ingredient) => {
      let unitsValue =
        ingredient.unit === "grammes"
          ? ingredient.unit.replace("grammes", "g")
          : ingredient.unit !== undefined
          ? ingredient.unit
          : "";

      let quantityValue =
        ingredient.quantity !== undefined ? ` ${ingredient.quantity} ` : "";
      ingredientList += `
	    <li class="quantitéIngrédient">
                <span class="ingrédientName">${ingredient.ingredient}</span>
                <span class="quantity unit">${quantityValue}${unitsValue}</span>     
        </li>
	 `;
    });

    RecipeCard += `
	<article id= ${recipe.id} class="card" tabindex = 0 aria-label = carte de la recette ${recipe.name}>
		 <a href = "#"> <div class="photoPlat" aria-label="Accéder à la fiche de recette: '${recipe.name}'" tabindex="0">
		 <div class="photoPlat">	
		 <img src="./assets/images/${recipe.image}" alt='${recipe.name}' />
     <p class="badgeTime">${recipe.time}min</p>
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

///création des menus déroulants
const ingrédientElm = document.getElementById("ingrédientlist");
const appareilElm = document.getElementById("appareilsList");
const ustensilElm = document.getElementById("ustensilesList");

let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

// Liste Ingrédients
function ingredientsList(recipes) {
  let allIngredients = [];
  //console.clear();
  recipes.map((recipe) => {
    recipe.ingredients.map((ingredients) => {
      const ingredient = ingredients.ingredient;

      allIngredients.push(ingredient);
    });
  });
  ingredientsListArray = [...new Set(allIngredients)];
  //console.log(ingredientsListArray);
  ingredientsListFiltred(ingredientsListArray);
}

// Liste Ingredients pour le input recherche
function ingredientsListFiltred(ingredientsListArray) {
  const newListIngredient = ingredientsListArray
    .map(
      (item) => `
      <li class = "allIngredients">  
        <a href="#" class= "allItems" arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-value="${item}" onclick= "addNewItem(event)" >
            ${item}
        </a>
      </li>  
        `
    )
    .join("");
  ingrédientElm.innerHTML = newListIngredient;
}

// Liste Appliances
function appliancesList(recipes) {
  let allAppliances = [];

  recipes.map((recipes) => {
    const appliances = recipes.appliance;
    allAppliances.push(appliances);
  });
  appliancesListArray = [...new Set(allAppliances)];

  appliancesListFiltred(appliancesListArray);
}
// Liste  Appliances pour le input recherche
function appliancesListFiltred(appliancesListArray) {
  const newListAppliance = appliancesListArray
    .map(
      (item) => `
      <li class = "allAppliance">
        <a href="#" class= "allItems" 
            arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-value="${item}" onclick= "addNewItem(event)" >
	        ${item}
	      </a>
      </li>
        `
    )
    .join("");
  appareilElm.innerHTML = newListAppliance;
}

// Liste  Ustensils
function ustensilsList(recipes) {
  let allUstensils = [];

  recipes.map((recipes) => {
    const ustensils = recipes.ustensils;

    ustensils.map((ustensils) => {
      allUstensils.push(ustensils);
    });
  });
  ustensilsListArray = [...new Set(allUstensils)];
  ustensilsListFiltred(ustensilsListArray);
}
// Liste Ustensils pour le input recherche
function ustensilsListFiltred(ustensilsListArray) {
  const newListUstensil = ustensilsListArray
    .map(
      (item) => `
      <li class="allUstensiles">
        <a href="#" class= "allItems"  arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'"  data-value="${item}" onclick= "addNewItem(event)">
	        ${item}
        </a>
      </li>
    `
    )

    .join("");
  ustensilElm.innerHTML = newListUstensil;
}
const totalRecipes = document.getElementById("totalRecipes");
const inputSearchGlobal = document.getElementById("search-bar-input");
let totalCard = document.getElementsByClassName("card");

function numberRecipesFound(totalCard) {
  if (totalCard.length == 1) {
    totalRecipes.innerHTML = `0${totalCard.length} recette`;
  } else if (totalCard.length <= 9) {
    totalRecipes.innerHTML = `0${totalCard.length} recettes`;
  } else if (totalCard.length >= 10 || totalCard.length <= 50) {
    totalRecipes.innerHTML = `${totalCard.length} recettes`;
  }
  if (inputSearchGlobal.value.length <= 2) {
    totalRecipes.innerHTML = "1500 recettes";
  }
}

init();
