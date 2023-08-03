const inputSearchPrincipal = document.getElementById("search-bar-input");
const alertMessage = document.getElementById("alert-message");

let filterCardsByInput = [];
let filterFurtherByTags = [];
let filterCardsByTags = [];

let ingredientFiltred = [];
let appliancesFiltred = [];
let ustensilsFiltred = [];

//**************************************************************//
// cas d'affichage de message empty state
function testMatch(value, matches, number) {
  if (value.length < number) {
    alertMessage.classList.add("hidden");
    alertMessage.ariaHidden = "true";
    return;
  } else {
    if (matches.length === 0) {
      document.getElementById("recepes__cards").innerHTML = "";
      alertMessage.classList.remove("hidden");
      alertMessage.ariaHidden = "false";
    } else if (matches.length >= 1) {
      alertMessage.classList.add("hidden");
      alertMessage.ariaHidden = "true";
    }
  }
}

//**************************************************************//

///normalisation des elements
function normalizeElement(element) {
  return element
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

///appel des fonctions d'affichage filtrées
function displayAllArraysFiltred(ArrayFiltred) {
 displayRecipeCard(ArrayFiltred),
  ingredientsList(ArrayFiltred),
  appliancesList(ArrayFiltred),
  ustensilsList(ArrayFiltred),
  numberRecipesFound(ArrayFiltred)

}


////filtrer les recettes via la bar de recherche principale

function requestBySearchBar(searchText) {

  filterCardsByInput.splice(0,filterCardsByInput.length);

  if (searchText.length >= 3) {

    const regex = new RegExp(normalizeElement(`${searchText}`));

    for(let i = 0; i < allRecipes.length; i++){
    
        
      const newRecipes = allRecipes[i]
      let ingredientsArray = [];
      let ingredientElts;

      for (let key in newRecipes.ingredients) {
        ingredientElts = newRecipes.ingredients[key].ingredient;
        if (!ingredientsArray.includes(ingredientElts)) {
          ingredientsArray.push(ingredientElts);
        }
      }
    
      const normalisName = normalizeElement(newRecipes.name).match(regex)
      const normalisDescription = normalizeElement(newRecipes.description).match(regex)
      const normalisIngredient = normalizeElement(`${ingredientsArray}`).match(regex)

      if (normalisName || normalisDescription || normalisIngredient){

          filterCardsByInput.push(newRecipes)
          //console.log(newRecipes);


      }
    };

    testMatch(searchText, filterCardsByInput, 3);
    displayAllArraysFiltred(filterCardsByInput);
    console.log(filterCardsByInput);
   } 
  else {
    alertMessage.classList.add("hidden");
    displayAllArraysFiltred(allRecipes);
  }

}

inputSearchPrincipal.addEventListener("input", function () {
  requestBySearchBar(inputSearchPrincipal.value);
});



