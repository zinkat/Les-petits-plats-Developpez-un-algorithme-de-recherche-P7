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
  displayRecipeCard(ArrayFiltred);
  ingredientsList(ArrayFiltred);
  appliancesList(ArrayFiltred);
  ustensilsList(ArrayFiltred);
  numberRecipesFound(ArrayFiltred);
}

////filtrer les recettes via la bar de recherche principale
function requestBySearchBar(searchText) {
  if (searchText.length >= 3) {
    filterCardsByInput = allRecipes.filter((recipe) => {
      const regex = new RegExp(normalizeElement(`${searchText}`));
      let ingredientsArray = [];
      let ingredientElts;
      for (let key in recipe.ingredients) {
        ingredientElts = recipe.ingredients[key].ingredient;
        //console.log(ingredientElts);
        if (!ingredientsArray.includes(ingredientElts)) {
          ingredientsArray.push(ingredientElts);
        }
      }
      //console.log(ingredientsArray);
      return (
        normalizeElement(recipe.name).match(regex) ||
        normalizeElement(`${ingredientsArray}`).match(regex) ||
        normalizeElement(recipe.description).match(regex)
      );
    });
    //console.log(filterCardsByInput);
    testMatch(searchText, filterCardsByInput, 3);
    displayAllArraysFiltred(filterCardsByInput);
  } else {
    alertMessage.classList.add("hidden");
    displayAllArraysFiltred(allRecipes);
  }
}

inputSearchPrincipal.addEventListener("input", function () {
  requestBySearchBar(inputSearchPrincipal.value);
});
//****filtre les listes des menus secondaires********************//
const ingredientsSearch = document.querySelector(
  "#recherche-avancée-ingredient"
);
const appliancesSearch = document.querySelector("#recherche-avancée-appareil");
const ustensilsSearch = document.querySelector("#recherche-avancée-ustensile");

function gestionRequeteparTags() {
  if (inputSearchPrincipal.value.length >= 3) {
    requestByTags(filteredItemArray, filterFurtherByTags, filterCardsByInput);
  } else if (inputSearchPrincipal.value.length < 3) {
    requestByTags(filteredItemArray, filterCardsByTags, allRecipes);
  }
}

// Function  recherche dans les inputs secondaire pour trouver un mot clé dans les listes
function requestByTags(tags, arrayFiltred, array) {
  if (filteredItemArray.length >= 1) {
    arrayFiltred = array.filter((recipe) => {
      let ingredientsArray = [];
      for (let key in recipe.ingredients) {
        let ingredientElts = recipe.ingredients[key].ingredient;
        ingredientsArray.push(ingredientElts);
      }
      let appliancesArray = recipe.appliance;
      let ustensilsArray = recipe.ustensils;
      return tags.every(
        (tag) =>
          ingredientsArray.includes(tag) ||
          appliancesArray.includes(tag) ||
          ustensilsArray.includes(tag)
      );
    });
    displayAllArraysFiltred(arrayFiltred);
  } else {
    displayAllArraysFiltred(array);
  }
}

//************recherche via les inputs des dropdown et actualisation des cartes **************************//

// recherche  Input dropdown ingredient
function searchIngredientsList(searchText) {
  if (ingredientsSearch.value.length >= 1) {
    ingredientFiltred = ingredientsListArray.filter((itemTag) => {
      const searchValue = normalizeElement(`${searchText}`);
      return normalizeElement(itemTag).includes(searchValue);
    });
    ingredientsListFiltred(ingredientFiltred);
  } else {
    ingredientsListFiltred(ingredientsListArray);
  }
}

//recherche  Input dropdown Appareil
function searchAppliancesList(searchText) {
  if (appliancesSearch.value.length >= 1) {
    appliancesFiltred = appliancesListArray.filter((itemTag) => {
      const searchValue = normalizeElement(`${searchText}`);
      return normalizeElement(itemTag).includes(searchValue);
    });
    appliancesListFiltred(appliancesFiltred);
  } else {
    appliancesListFiltred(appliancesListArray);
  }
}
//recherche  Input dropdown Ustensils
function searchUstensilsList(searchText) {
  if (ustensilsSearch.value.length >= 1) {
    ustensilsFiltred = ustensilsListArray.filter((itemTag) => {
      const searchValue = normalizeElement(`${searchText}`);
      return normalizeElement(itemTag).includes(searchValue);
    });
    ustensilsListFiltred(ustensilsFiltred);
  } else {
    ustensilsListFiltred(ustensilsListArray);
  }
}

ingredientsSearch.addEventListener("input", function () {
  searchIngredientsList(ingredientsSearch.value);
});

appliancesSearch.addEventListener("input", function () {
  searchAppliancesList(appliancesSearch.value);
});

ustensilsSearch.addEventListener("input", function () {
  searchUstensilsList(ustensilsSearch.value);
});
