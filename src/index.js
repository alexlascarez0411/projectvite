const PLACEHOLDER_IMAGE = "https://placeholder.co/210x295";

// 1. Buscar ID de una serie por su nombre en TVMaze
const getShowIdByName = async (name) => {
  const URL = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(name)}`;
  const data = await fetch(URL).then((res) => res.json());
  return data.id;
};

// 2. Obtener datos básicos de la serie por su ID
const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then((res) => res.json());

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE,
  };
};

// 3. Obtener episodios y agruparlos por temporada
const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then((res) => res.json());

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average,
  }));

  const episodesBySeason = Object.groupBy(
    episodeList,
    (episode) => episode.season
  );

  return episodesBySeason;
};

// 4. Renderizado en el DOM
const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

const createEpisodeHTML = (episode) => {
  const ratingFloor = episode.rating ? Math.floor(episode.rating) : 0;
  return `<div class="episode episode-${episode.number} rating-${ratingFloor}">${episode.number}</div>`;
};

const createSeasonHTML = (data, number) => {
  const episodesHTML = data.map(createEpisodeHTML).join("");
  return `
    <article class="season">
      <header class="season-header">T${number}</header>
      ${episodesHTML}
    </article>
  `;
};

async function init() {
  // Puedes usar una búsqueda por nombre o pasar el ID directamente
  // Ejemplo por ID directo:
  const showId = "2993"; // Stranger Things

  // Ejemplo por nombre:
  // const showId = await getShowIdByName("Stranger Things");

  const show = await getShowData(showId);
  const seasons = await getEpisodeList(showId);

  if ($header) {$header.innerHTML = `
      <img class="poster" src="${show.image}" alt="${show.name}">
      <h1>${show.name}</h1>
    `;
  }

  if ($episodes) {
    const list = Object.values(seasons).map((season, index) =>
      createSeasonHTML(season, index + 1)
    );
    $episodes.innerHTML = list.join("");
  }
}

init();