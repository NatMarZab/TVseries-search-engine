'use strict';
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const section = document.querySelector(".js-section");
const buttonLog = document.querySelector(".buttonLog");
let arrayTriple = [];
let favourites = [];

function getList() {
  const inputValue = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].show.image) {
          arrayTriple.push({
            image: `${data[i].show.image.medium}`,
            name: `${data[i].show.name}`,
            id: `${data[i].show.id}`,
            status: `${data[i].show.status}`,
          });
        } else {
          arrayTriple.push({
            image: `https://via.placeholder.com/100x150/ffffff/666666/?text=TV`,
            name: `${data[i].show.name}`,
            id: `${data[i].show.id}`,
            status: `${data[i].show.status}`,
          });
        }
        console.log(arrayTriple);
        paintList(); 
      }
    });
}
function paintList() {
    // const divResults = document.querySelector(".result");
    // divResults.innerHTML = `<h3>Resultados:</h3>`;
  let seriesList = "";
  for (let i = 0; i < arrayTriple.length; i++) {
    const image = arrayTriple[i].image;
    const titleSeries = arrayTriple[i].name;
    const identifying = arrayTriple[i].id;
    const status = arrayTriple[i].status;
    const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
    if (image === null) {
      seriesList += `<li class="js-card card" data-id="${identifying}"><div class="childCard"><img class="image" src="${placeHolderRef}" alt="sin cartel">${titleSeries} ${status}</div></li>`;
    } else {
      seriesList += `<li class="js-card card" data-id="${identifying}"><div class="childCard"><img class="image" src="${image}" alt="cartel">${titleSeries} ${status}</div></li>`;
    }
    list.innerHTML = seriesList; 
  }
  addListenersToCards();
}
function handleSearch(event) {
  event.preventDefault();
  getList();
}
getFromLocalStorage();
button.addEventListener("click", handleSearch);
buttonLog.addEventListener("click", handleClickLog);
function addListenersToCards() {
  const allCards = document.querySelectorAll(".js-card");
  for (const card of allCards) {
    card.addEventListener("click", handleClickCard);
  }
}
function handleClickCard(event) {
  //const whereTheUserClicked = event.target; //no hace falta
  //PASO 1: identifica la li pulsada:
  const whereIAddedTheEvent = event.currentTarget;
  //PASO 2: obtener la info de esa card (<li>):
  const cardId = whereIAddedTheEvent.dataset.id;
  //console.log(cardId) 
  const isInside = favourites.find((idFavourite) => idFavourite.id === cardId); 
  whereIAddedTheEvent.classList.toggle("card2");
  if(isInside === undefined) {
    //"si no coincide con ningun elemento que esté en favoritos..."
    const isInsideArrTrip = arrayTriple.find((idFavourite) => idFavourite.id === cardId);
   // console.log(isInsideArrTrip)
   favourites.push(isInsideArrTrip);
  }
  else { 
    favourites = favourites.filter((idFavourite) => idFavourite.id !== cardId);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
  console.log(favourites);
  paintFavourites();
  
}
function paintFavourites() {
    // const divFavourites = document.querySelector(".js-divFavourites");
    // divFavourites.innerHTML = `<h3>Favoritas:</h3>`;
    let seriesList = "";
    const favouritesList = document.querySelector(".js-favourites");
    favouritesList.innerHTML = "";
    for (let i = 0; i < favourites.length; i++) {
      const image = favourites[i].image;
      const titleSeries = favourites[i].name;
      const identifying = favourites[i].id;
      const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
      if (image === null) {
        seriesList += `<li class="js-card card" data-id="${identifying}"><div class="childCard"><img class="image" src="${placeHolderRef}" alt="sin cartel">${titleSeries} ${status}</div></li>`;
      } else {
        seriesList += `<li class="js-card card data-id="${identifying}"><div class="childCard"><img class="image" src="${image}" alt="cartel">${titleSeries} ${status}</div></li>`;
      }
    }
    favouritesList.innerHTML = seriesList; // lo hago aqui una vez ya he conseguido todos mis lis.
  }
  function handleClickLog() {
    for(const favourite of favourites) {
      console.log(favourite.name);
    }
    
  }
  function getFromLocalStorage() {
    const arrayFavourites = JSON.parse(localStorage.getItem("favourites"));
    if(arrayFavourites !== null) {
      favourites = arrayFavourites;
        paintFavourites();
    }
    // si es distinto de null en el localStorage
    //si es distinto, añadirlo al array de favourites
    //pintarlo llamando a la función pintar las favoritas
 }
 
