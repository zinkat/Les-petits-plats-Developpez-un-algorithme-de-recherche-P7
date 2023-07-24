//event menu déroulant ingredients, appareils, ustensiles.
const btnFilter = document.querySelectorAll(".open");
const menuList = document.querySelectorAll(".sous");
const btnFold = document.querySelectorAll(".fold"); 
const selectOption =document.querySelectorAll(".deroulant")
const showIngredients = document.getElementById("showIngredients");
const showAppareils = document.getElementById("showAppareils");
const showUstensiles = document.getElementById("showUstensiles");
const main = document.querySelector("main");
const headerSection = document.querySelector(".search")

const allIngredients = document.querySelectorAll(".allIngredients");
const allAppliance = document.querySelectorAll(".allAppliance");
const allUstensiles = document.querySelectorAll(".allUstensiles");

// affichage des listes ingredients, appareils, ustensiles.
function openDropDown() {
  for (let i = 0; i < btnFilter.length; i++) {

    btnFilter[i].addEventListener("click", function () {
      //menuList[i].style.display = "block";
      btnFilter[i].style.display = "none";
      btnFold[i].style.display = "block";
      switch (menuList[i].id) {
        case "showIngredients":
          showIngredients.style.display = "block";
          showAppareils.style.display = "none";
          showUstensiles.style.display = "none";
          btnFold[1].style.display = "none";
          btnFold[2].style.display = "none";
          btnFilter[1].style.display = "block";
          btnFilter[2].style.display = "block";
          break;
        case "showAppareils":
          showAppareils.style.display = "block";
          showIngredients.style.display = "none";
          showUstensiles.style.display = "none";
          btnFold[0].style.display = "none";
          btnFold[2].style.display = "none";
          btnFilter[0].style.display = "block";
          btnFilter[2].style.display = "block";
          break;
        case "showUstensiles":
          showUstensiles.style.display = "block";
          showIngredients.style.display = "none";
          showAppareils.style.display = "none";
          btnFold[0].style.display = "none";
          btnFold[1].style.display = "none";
          btnFilter[0].style.display = "block";
          btnFilter[1].style.display = "block";

          break;
      }
    });
    
    btnFilter[i].addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        menuList[i].style.display = "block";
        btnFilter[i].style.display = "none";
        btnFold[i].style.display = "block";
      }
    });
  }

}
openDropDown();

for (let j = 0; j < btnFold.length; j++) {

  btnFold[j].addEventListener("click", closeDropDown)  ;
  main.addEventListener("click", closeDropDown)  ;
  headerSection.addEventListener("click",closeDropDown)  ;
  ///event choix ingredients, appareils, ustensiles.
  for(let i= 0; i < allIngredients.length; i++){
    allIngredients[i].addEventListener("click", closeDropDown)
   }
   
   for(let i= 0; i < allAppliance.length; i++){
    allAppliance[i].addEventListener("click", closeDropDown)
   }
   for(let i= 0; i < allUstensiles.length; i++){
    allUstensiles[i].addEventListener("click", closeDropDown)
   }

  function closeDropDown() {
    menuList[j].style.display = "none";
    btnFilter[j].style.display = "block";
    btnFold[j].style.display = "none";
  }
///event clavier
  document.addEventListener("keyup", function (e){
    if (e.key === "Escape") {
      menuList[j].style.display = "none";
      btnFilter[j].style.display = "block";
      btnFold[j].style.display = "none";
    }
  });
}

////////////event les inputs de recherche secondaires
const inputDrop = document.querySelectorAll(".rechercheSecondaire")
const btlclose = document.querySelectorAll(".btnClose")
for(let i=0; i< btlclose.length; i++){
  inputDrop.forEach (element => {
    element.addEventListener('input', hideBtnDeletSearchDrop) 
    function hideBtnDeletSearchDrop(){  
       btlclose[i].style.display = "block"
      }
 
    })
    btlclose[i].addEventListener('click', deleteInputValue)
    function deleteInputValue(){
      inputDrop.forEach(element =>{
        element.value=""
      })
    }
  }

////////////event bar de recherche globale

const btnSearchGlobal = document.querySelector(".search__button")
const imgloupSearch = document.querySelector(".loup")
const inputSearchGlobal =document.getElementById("search-bar-input")
const deleteButton = document.querySelector(".deletesearch")

//event bouton loup de la bar de recherche
btnSearchGlobal.addEventListener('click', changeBtnLoup)

 function changeBtnLoup(){
  imgloupSearch.style.display = 'none'
  let  newLoup = `
  <img class="loupsearch" src="./assets/icones/loopCTA-yellow.png" alt="recherche en cours"/>
  `
  btnSearchGlobal.innerHTML= newLoup
 }

 //event bouton supprimer de la bar de recherche// afficher le X 
 inputSearchGlobal.addEventListener('input', showDeleteButton)

 function showDeleteButton(){
  btnShow = `
  <img src="./assets/icones/Group-5.png" alt="nettoyer la bar de recherche">
 `
  deleteButton.innerHTML=btnShow
 }

 //event bar de recherche onclick sur le X nettoyage de la bar de recherche
 deleteButton.addEventListener('click', cleanInput)
 function cleanInput(){
  inputSearchGlobal.value = ""
 }

