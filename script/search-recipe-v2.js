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
    numberRecipesFound(ArrayFiltred);
}

////filtrer les recettes via la bar de recherche principale

function requestBySearchBar(searchText) {
  filterCardsByInput.splice(0, filterCardsByInput.length);

  if (searchText.length >= 3) {
    const regex = new RegExp(normalizeElement(`${searchText}`));

    for (let i = 0; i < allRecipes.length; i++) {
      const newRecipes = allRecipes[i];
      let ingredientsArray = [];
      let ingredientElts;

      for (let key in newRecipes.ingredients) {
        ingredientElts = newRecipes.ingredients[key].ingredient;
        if (!ingredientsArray.includes(ingredientElts)) {
          ingredientsArray.push(ingredientElts);
        }
      }
      const normalisName = normalizeElement(newRecipes.name).match(regex);
      const normalisDescription = normalizeElement(
        newRecipes.description
      ).match(regex);
      const normalisIngredient = normalizeElement(`${ingredientsArray}`).match(
        regex
      );

      if (normalisName || normalisDescription || normalisIngredient) {
        filterCardsByInput.push(newRecipes);
        //console.log(newRecipes);
      }
    }

    testMatch(searchText, filterCardsByInput, 3);
    displayAllArraysFiltred(filterCardsByInput);
    //console.log(filterCardsByInput);
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
  arrayFiltred.splice(0, arrayFiltred.length);
  if (filteredItemArray.length >= 1) {
    for (let i = 0; i < array.length; i++) {
      let recipe = array[i];

      let ingredientsArray = [];
      for (let key in recipe.ingredients) {
        let ingredientElts = recipe.ingredients[key].ingredient;
        ingredientsArray.push(ingredientElts);
      }
      let appliancesArray = recipe.appliance;
      let ustensilsArray = recipe.ustensils;

      if (
        tags.every(
          (tag) =>
            ingredientsArray.includes(tag) ||
            appliancesArray.includes(tag) ||
            ustensilsArray.includes(tag)
        )
      ) {
        arrayFiltred.push(recipe);
      }
    }
    displayAllArraysFiltred(arrayFiltred);
  } else {
    displayAllArraysFiltred(array);
  }
}

//************recherche via les inputs des dropdown et actualisation des cartes **************************//

// recherche  Input dropdown ingredient
function searchIngredientsList(searchText) {
  ingredientFiltred.splice(0, ingredientFiltred.length);
  if (ingredientsSearch.value.length >= 1) {
    for (i = 0; i < ingredientsListArray.length; i++) {
      const searchValue = normalizeElement(`${searchText}`);

      if (normalizeElement(ingredientsListArray[i]).includes(searchValue)) {
        ingredientFiltred.push(ingredientsListArray[i]);
        //console.log(ingredientFiltred);
      }
    }

    ingredientsListFiltred(ingredientFiltred);
  } else {
    ingredientsListFiltred(ingredientsListArray);
  }
}

//recherche  Input dropdown Appareil
function searchAppliancesList(searchText) {
  appliancesFiltred.splice(0, appliancesFiltred.length);
  if (appliancesSearch.value.length >= 1) {
    for (i = 0; i < appliancesListArray.length; i++) {
      const searchValue = normalizeElement(`${searchText}`);

      if (normalizeElement(appliancesListArray[i]).includes(searchValue)) {
        appliancesFiltred.push(appliancesListArray[i]);
        //console.log(appliancesFiltred);
      }
    }
    appliancesListFiltred(appliancesFiltred);
  } else {
    appliancesListFiltred(appliancesListArray);
  }
}
//recherche  Input dropdown Ustensils
function searchUstensilsList(searchText) {
  ustensilsFiltred.splice(0, ustensilsFiltred.length);

  if (ustensilsSearch.value.length >= 1) {
    for (i = 0; i < ustensilsListArray.length; i++) {
      const searchValue = normalizeElement(`${searchText}`);
      if (normalizeElement(ustensilsListArray[i]).includes(searchValue)) {
        ustensilsFiltred.push(ustensilsListArray[i]);
        //console.log(appliancesFiltred);
      }
    }
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
