function init() {
  displayRecipeCard(allRecipes);
  ingredientsList(allRecipes);
  appliancesList(allRecipes);
  ustensilsList(allRecipes);
  filteredItemArray = [];
  totalRecipes.innerHTML = "1500 recettes";
}
