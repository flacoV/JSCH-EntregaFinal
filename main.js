const productContent = document.getElementById('cardsCont');
const searchBar = document.getElementById('searchBar');
const filterButton = document.getElementById('filterButton');
const speciesButtonsContainer = document.getElementById('categoryButtons');
let data = null;
const resetButton = document.getElementById('resetButton');

// Función para cargar los datos y renderizar las tarjetas
function fetchDataAndRender() {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then((responseData) => {
      data = responseData; // Almacenar los datos globalmente
      renderCards(data.results); // Renderizar las tarjetas al cargar los datos
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

// Función para renderizar las tarjetas
function renderCards(characters) {
  productContent.innerHTML = ''; // Limpiar el contenido antes de renderizar
  setTimeout(() => {
    characters.forEach((character) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card__content">
          <div class="imgChar">
            <img src="${character.image} " alt="">
          </div>
          <h2>${character.name}</h2>
          <p><i class='bx bx-stats colorLet'></i>Status : ${character.status}</p>
          <p><i class='bx bxs-spa colorLet'></i>Especie : ${character.species} </p>
          <p><i class='bx bx-male-female colorLet'></i>Género : ${character.gender} </p>
        </div>`;
      productContent.appendChild(card);
    });
  }, 300);
}

// Función para filtrar y renderizar las tarjetas según el término de búsqueda
function searchB() {
  const search = searchBar.value.trim().toLowerCase();

  if (search === '') {
    renderCards(data.results); // Si la búsqueda está vacía, renderizar todas las tarjetas
    return;
  }

  const filteredChar = data.results.filter(character => character.name.toLowerCase().includes(search));

  if (filteredChar.length > 0) {
    renderCards(filteredChar); // Renderizar las tarjetas filtradas
  } else {
    const message = document.createElement('p');
    message.textContent = 'No se encontraron resultados';
    productContent.appendChild(message);
  }
}

// Event listener para el evento "keyup" en la barra de búsqueda
searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchB(); // Llamar a la función de búsqueda al presionar Enter
  }
});

// Cargar los datos y renderizar las tarjetas al cargar la página
fetchDataAndRender();

const resetCards = () => {
  renderCards(data.results);
}

resetButton.addEventListener("click", resetCards);

filterButton.addEventListener('click', () => {
  showFilterButtons();
});

const showFilterButtons = () => {
  speciesButtonsContainer.innerHTML = "";

  const species = [...new Set(data.results.map(character => character.species))];

  species.forEach(specie => {
    const button = document.createElement("button");
    button.textContent = specie;
    button.addEventListener('click', () => {
      const filteredChar = data.results.filter(character => character.species === specie);
      renderCards(filteredChar); // Aquí es donde deberíamos llamar a renderCards() con los datos filtrados
    });
    speciesButtonsContainer.appendChild(button);
  });
  speciesButtonsContainer.style.display = "block";
}
// const productContent = document.getElementById('cardsCont');
// const searchBar = document.getElementById('searchBar');
// const filterButton = document.getElementById('filterButton');
// const categoryButtonsContainer = document.getElementById('categoryButtons');

// fetch('https://rickandmortyapi.com/api/character')
//   .then(response => response.json())
//   .then((data) => {
//     setTimeout(() => { 
//       data.results.forEach((character) => {
//           const card = document.createElement('div');
//           card.className = 'card';
//           card.innerHTML = `
//           <div class="card__content">
//           <div class="imgChar">
//               <img src="${character.image} " alt="">
//           </div>
//           <h2>${character.name}</h2>
//           <p><i class='bx bx-stats colorLet'></i>Status : ${character.status}</p>
//           <p><i class='bx bxs-spa colorLet'></i>Especie : ${character.species} </p>
//           <p><i class='bx bx-male-female colorLet'></i>Género : ${character.gender} </p>
//       </div>`;
//           productContent.appendChild(card);
//       })
//     }, 300);
//   })
//   .catch(error => console.error('Error al obtener los datos:', error));

// const searchB = () => {

//   productContent.innerHTML = '';

//   const search = searchBar.ariaValueMax.trim().toLowerCase();
//   const filteredChar = data.results.filter(character => character.name.toLowerCase().includes(search));

//   if (filteredChar.length > 0) {

//     filteredChar.forEach(character => {
//       const card = document.createElement('div');
//       card.className = 'card';
//           card.innerHTML = `
//           <div class="card__content">
//           <div class="imgChar">
//               <img src="${character.image} " alt="">
//           </div>
//           <h2>${character.name}</h2>
//           <p><i class='bx bx-stats colorLet'></i>Status : ${character.status}</p>
//           <p><i class='bx bxs-spa colorLet'></i>Especie : ${character.species} </p>
//           <p><i class='bx bx-male-female colorLet'></i>Género : ${character.gender} </p>
//       </div>`;
//       productContent.appendChild(card);
//     });
//   } else {
//     const message = document.createElement('p');
//     message.textContent = 'No se encontraron resultados';
//     productContent.appendChild(message);
//   }
// };

// searchBar.addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     searchB();
//   }
// });
  
