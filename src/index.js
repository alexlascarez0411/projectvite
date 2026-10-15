import "./index.css";
import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

const createEpisodeHTML = (episode) => {
  const ratingFloor = episode.rating ? Math.floor(episode.rating) : 0;
  const ratingText = episode.rating ? episode.rating : "Sin calificar";
  return `<div class="episode episode-${episode.number} rating-${ratingFloor}" title="Episodio ${episode.number} - Puntuación: ${ratingText}">${episode.number}</div>`;
};

const createLegendHTML = () => {
  return `
    <div class="rating-legend">
      <span class="legend-title">Escala de Calificación:</span>
      <div class="legend-items">
        <span class="legend-item rating-2">1-3 Malo</span>
        <span class="legend-item rating-5">4-5 Regular</span>
        <span class="legend-item rating-6">6 Aceptable</span>
        <span class="legend-item rating-7">7 Bueno</span>
        <span class="legend-item rating-8">8-9 Muy bueno</span>
        <span class="legend-item rating-10">10 Excelente</span>
      </div>
    </div>
  `;
};

const createSeasonHTML = (data, number) => {
  const episodesHTML = data.map(createEpisodeHTML).join("");
  return `
    <article class="season">
      <header class="season-header">T${number}</header>
      <div class="season-episodes">
        ${episodesHTML}
      </div>
    </article>
  `;
};

async function renderShow(id) {
  try {
    if ($header) {$header.innerHTML = `<div class="loading">Cargando serie...</div>`;
    }
    if ($episodes) {$episodes.innerHTML = "";
    }

    const show = await getShowData(id);
    const seasons = await getEpisodeList(id);

    if ($header) {$header.innerHTML = `
        <div class="show-info">
          <div class="show-details">
            <img class="poster" src="${show.image}" alt="${show.name}">
            <div class="show-text">
              <h1>${show.name}</h1>
            </div>
          </div>
          <form id="search-form" class="search-form">
            <input type="number" id="show-id" placeholder="ID de serie..." value="${id}" required />
            <button type="submit">Buscar ID</button>
          </form>
        </div>
        ${createLegendHTML()}
      `;

      document.querySelector("#search-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const newId = document.querySelector("#show-id").value.trim();
        if (newId) renderShow(newId);
      });
    }

    if ($episodes) {
      const list = Object.values(seasons).map((season, index) =>
        createSeasonHTML(season, index + 1)
      );
      $episodes.innerHTML = list.join("");
    }
  } catch (error) {
    if ($header) {$header.innerHTML = `
        <div class="error-box">
          <p>⚠️ No se encontró la serie con el ID: <strong>${id}</strong></p>
          <form id="search-form" class="search-form">
            <input type="number" id="show-id" placeholder="Ingresa otro ID..." required />
            <button type="submit">Buscar ID</button>
          </form>
        </div>
      `;
      document.querySelector("#search-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const newId = document.querySelector("#show-id").value.trim();
        if (newId) renderShow(newId);
      });
    }
    if ($episodes)$episodes.innerHTML = "";
  }
}

renderShow("2993");