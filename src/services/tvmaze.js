const PLACEHOLDER_IMAGE = "https://placeholder.co/210x295";

export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Serie no encontrada");
  const data = await res.json();

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE,
  };
};

export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Episodios no encontrados");
  const episodes = await res.json();

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average,
  }));

  return Object.groupBy(episodeList, (episode) => episode.season);
};