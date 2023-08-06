const listAllItems = document.querySelectorAll(".allItems");
const containerFilter = document.querySelector(".filter-list");
const filterItem = document.getElementsByClassName("itemFiltrer");

let filteredItemArray = [];
let filteredvalue;

///event pour afficher un element sous forme d'etiquette(tag)
function addNewItem(event) {
  filteredvalue = event.target.dataset.value;

  if (filteredItemArray.includes(filteredvalue)) {
    return;
  } else {
    filteredItemArray.push(filteredvalue);
    displayFiltereditem();
    gestionRequeteparTags();
  }
  if (totalCard.length == 1) {
    totalRecipes.innerHTML = `0${totalCard.length} recette`;
    console.log(totalCard.length);
  } else if (totalCard.length <= 9) {
    totalRecipes.innerHTML = `0${totalCard.length} recettes`;
  } else if (totalCard.length >= 10 || totalCard.length <= 50) {
    totalRecipes.innerHTML = `${totalCard.length} recettes`;
  }
}

function displayFiltereditem() {
  let newItem = "";
  for (let i = 0; i < filteredItemArray.length; i++) {
    newItem += `
    <li class="itemFiltrer" data-item= "#${i}">
    ${filteredItemArray[i]}
    <button class="filtered-btn" type="button" aria-label="Supprimer le tag" onclick="deleteFiltredItem(${i})"></button>
    </li>
    `;
  }
  containerFilter.innerHTML = newItem;
}
// event delete tag

function deleteFiltredItem(index) {
  //console.log(index);
  filteredItemArray.splice(index, 1);
  deleteInputValue();
  // cleanInput();
  displayFiltereditem();
  gestionRequeteparTags();
}
