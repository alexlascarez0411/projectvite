(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://placeholder.co/210x295`,t=async t=>{let n=`https://api.tvmaze.com/shows/${t}`,r=await fetch(n);if(!r.ok)throw Error(`Serie no encontrada`);let i=await r.json();return{name:i.name,rating:i.rating,image:i.image?.medium??e}},n=async e=>{let t=`https://api.tvmaze.com/shows/${e}/episodes`,n=await fetch(t);if(!n.ok)throw Error(`Episodios no encontrados`);let r=(await n.json()).map(e=>({number:e.number,season:e.season,rating:e.rating.average}));return Object.groupBy(r,e=>e.season)},r=document.querySelector(`header`),i=document.querySelector(`.episodes`),a=e=>{let t=e.rating?Math.floor(e.rating):0,n=e.rating?e.rating:`Sin calificar`;return`<div class="episode episode-${e.number} rating-${t}" title="Episodio ${e.number} - Puntuación: ${n}">${e.number}</div>`},o=()=>`
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
  `,s=(e,t)=>`
    <article class="season">
      <header class="season-header">T${t}</header>
      <div class="season-episodes">
        ${e.map(a).join(``)}
      </div>
    </article>
  `;async function c(e){try{r&&(r.innerHTML=`<div class="loading">Cargando serie...</div>`),i&&(i.innerHTML=``);let a=await t(e),l=await n(e);r&&(r.innerHTML=`
        <div class="show-info">
          <div class="show-details">
            <img class="poster" src="${a.image}" alt="${a.name}">
            <div class="show-text">
              <h1>${a.name}</h1>
            </div>
          </div>
          <form id="search-form" class="search-form">
            <input type="number" id="show-id" placeholder="ID de serie..." value="${e}" required />
            <button type="submit">Buscar ID</button>
          </form>
        </div>
        ${o()}
      `,document.querySelector(`#search-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#show-id`).value.trim();t&&c(t)})),i&&(i.innerHTML=Object.values(l).map((e,t)=>s(e,t+1)).join(``))}catch{r&&(r.innerHTML=`
        <div class="error-box">
          <p>⚠️ No se encontró la serie con el ID: <strong>${e}</strong></p>
          <form id="search-form" class="search-form">
            <input type="number" id="show-id" placeholder="Ingresa otro ID..." required />
            <button type="submit">Buscar ID</button>
          </form>
        </div>
      `,document.querySelector(`#search-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#show-id`).value.trim();t&&c(t)})),i&&(i.innerHTML=``)}}c(`2993`);