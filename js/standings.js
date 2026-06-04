/*
 * standings.js
 * Lógica para renderizar la tabla de posiciones con orden automático,
 * búsqueda, filtro por grupo y resaltado de los primeros puestos.
 */

// URLs de mascotas del Mundial 2026 (3 mascotas para rotar entre grupos)
const MASCOT_URLS = [
  'https://static.nmas.com.mx/Nmas/cms/1775272689246-zayu-una-de-las-3-mascotas-de-la-copa-mundial-de-la-fifa-26-foto-fifa-1920x1080.jpg',
  'https://ots.nbcwpshield.com/wp-content/uploads/2025/09/DGM_048_Mascot-PNG-Crops-and-Website-Pop-Up-Graphics-v2-with-Logo-2_Clutch-16x9-1.png',
  'https://www.roc21.com/wp-content/uploads/2025/09/Maple-mascotas-mundial-2026-Canada.webp'
];

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initStandings();
});

/**
 * Inicializa controles y carga datos
 */
async function initStandings() {
  try {
    const data = await api.getStandings(); // provisto por js/api.js

    // Referencias a elementos de la UI
    const container = document.getElementById('standings-container');
    const searchInput = document.getElementById('search-team');
    const filterSelect = document.getElementById('filter-group');
    const parentContainer = container ? container.parentElement : document.body;

    // Poblar select de grupos
    populateGroupFilter(data, filterSelect);

    // Render inicial
    renderAllGroups(data, container);

    // Las mascotas ahora se añaden automáticamente en cada card de grupo
    // (ver función renderAllGroups)

    // Eventos: búsqueda y filtrado
    searchInput.addEventListener('input', () => {
      renderAllGroups(data, container, searchInput.value.trim(), filterSelect.value);
    });

    filterSelect.addEventListener('change', () => {
      renderAllGroups(data, container, searchInput.value.trim(), filterSelect.value);
    });
  } catch (error) {
    console.error('Error al inicializar posiciones:', error);
    const container = document.getElementById('standings-container');
    if (container) container.innerHTML = '<p class="error">Error al cargar posiciones</p>';
  }
}

// Función para crear decoraciones flotantes genéricas (OPCIONAL, no utilizada actualmente)
// Las mascotas se añaden ahora automáticamente en cada card de grupo
/*
function createFloatingDecor(parentEl, mascotLinks = [], ballLinks = []) {
  // Evitar duplicados si ya existen
  if (!parentEl || parentEl.querySelector('.floating-decor')) return;

  const decor = document.createElement('div');
  decor.className = 'floating-decor';
  decor.style.width = '100%';
  decor.style.height = '0';
  decor.style.position = 'relative';

  // Posiciones predefinidas para facilitar diseño
  const mascotPositions = [ {left:'4%', top:'40px'}, {left:'85%', top:'60px'}, {left:'10%', top:'260px'} ];
  const ballPositions = [ {left:'20%', top:'120px'}, {left:'60%', top:'180px'}, {left:'75%', top:'300px'}, {left:'40%', top:'340px'} ];

  // Crear mascotas
  for (let i = 0; i < Math.max(1, mascotLinks.length); i++) {
    const pos = mascotPositions[i % mascotPositions.length];
    const el = document.createElement('div');
    el.className = `mascot float-anim-${(i%3)+1}`;
    el.style.left = pos.left;
    el.style.top = pos.top;

    if (mascotLinks[i]) {
      el.style.backgroundImage = `url('${mascotLinks[i]}')`;
      el.setAttribute('aria-hidden', 'true');
    } else {
      // placeholder emoji inside element
      el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(246,255,236,0.9))';
      el.style.fontSize = '40px';
      el.style.color = 'var(--brazil-blue)';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.textContent = '🐾';
    }

    decor.appendChild(el);
  }

  // Crear balones
  for (let j = 0; j < Math.max(2, ballLinks.length); j++) {
    const pos = ballPositions[j % ballPositions.length];
    const el = document.createElement('div');
    el.className = `ball float-anim-${(j%3)+1}`;
    el.style.left = pos.left;
    el.style.top = pos.top;

    if (ballLinks[j]) {
      el.style.backgroundImage = `url('${ballLinks[j]}')`;
    } else {
      el.style.background = 'radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0)';
      el.textContent = '⚽';
      el.style.fontSize = '20px';
      el.style.color = 'var(--brazil-blue)';
    }

    decor.appendChild(el);
  }

  parentEl.appendChild(decor);
}
*/

/**
 * Llena el selector de grupos con las opciones extraídas de los datos
 */
function populateGroupFilter(data, selectEl) {
  const groups = data.map(g => g.group).sort();
  groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = `Grupo ${g}`;
    selectEl.appendChild(opt);
  });
}

/**
 * Renderiza todas las secciones de grupos en el contenedor
 * @param {Array} data - array de grupos con standings
 * @param {HTMLElement} container - contenedor principal
 * @param {string} search - término de búsqueda (opcional)
 * @param {string} filterGroup - letra del grupo a filtrar (opcional)
 */
function renderAllGroups(data, container, search = '', filterGroup = 'all') {
  container.innerHTML = '';

  data.forEach((group, groupIndex) => {
    if (filterGroup !== 'all' && group.group !== filterGroup) return;

    const groupSection = document.createElement('div');
    groupSection.style.marginBottom = '2rem';
    groupSection.style.animation = `slideUp 0.6s ease-out ${groupIndex * 0.06}s both`;

    const title = document.createElement('h3');
    title.textContent = `📍 GRUPO ${group.group}`;
    title.style.marginBottom = '1rem';
    title.style.color = 'var(--text-primary)';

    // Crear contenedor responsive para la tabla
    const card = document.createElement('div');
    card.className = 'card table-responsive';
    card.style.position = 'relative';
    card.style.overflow = 'visible';

    const table = document.createElement('table');
    table.className = 'standings-table';

    // Cabecera de la tabla
    table.innerHTML = `
      <thead>
        <tr>
          <th>Pos</th>
          <th>Equipo</th>
          <th>PJ</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GF</th>
          <th>GC</th>
          <th>DG</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Ordenar equipos por puntos, diferencia de goles, goles a favor
    const sorted = sortStandings(group.standings.slice());

    // Si hay búsqueda, filtrar equipos por nombre
    const filtered = sorted.filter(team => {
      if (!search) return true;
      return team.team.toLowerCase().includes(search.toLowerCase());
    });

    // Recalcular posición basado en orden actual (1..n)
    filtered.forEach((team, index) => {
      const row = document.createElement('tr');

      // Asignar clase de destaque para los primeros 3
      if (index === 0) row.classList.add('top-1');
      else if (index === 1) row.classList.add('top-2');
      else if (index === 2) row.classList.add('top-3');

      // Posición dinámica (según orden)
      const positionCell = document.createElement('td');
      positionCell.className = 'team-position';
      positionCell.textContent = index + 1;

      const teamCell = document.createElement('td');
      teamCell.innerHTML = `<strong>${team.flag} ${team.team}</strong>`;

      const matchesCell = document.createElement('td');
      matchesCell.textContent = team.matches;

      const winsCell = document.createElement('td');
      winsCell.textContent = team.wins;
      winsCell.style.color = 'var(--neon-green)';

      const drawsCell = document.createElement('td');
      drawsCell.textContent = team.draws;

      const lossesCell = document.createElement('td');
      lossesCell.textContent = team.losses;
      lossesCell.style.color = 'var(--neon-pink)';

      const gfCell = document.createElement('td');
      gfCell.textContent = team.goals_for;

      const gaCell = document.createElement('td');
      gaCell.textContent = team.goals_against;

      const gdCell = document.createElement('td');
      gdCell.textContent = (team.goal_difference > 0 ? '+' : '') + team.goal_difference;
      gdCell.style.color = 'var(--neon-cyan)';

      const ptsCell = document.createElement('td');
      ptsCell.textContent = team.points;
      ptsCell.style.fontWeight = '700';
      ptsCell.style.color = 'var(--neon-purple)';

      // Añadir celdas a la fila
      row.appendChild(positionCell);
      row.appendChild(teamCell);
      row.appendChild(matchesCell);
      row.appendChild(winsCell);
      row.appendChild(drawsCell);
      row.appendChild(lossesCell);
      row.appendChild(gfCell);
      row.appendChild(gaCell);
      row.appendChild(gdCell);
      row.appendChild(ptsCell);

      tbody.appendChild(row);
    });

    card.appendChild(table);
    groupSection.appendChild(title);

    // Añadir mascota en la esquina superior derecha del card
    const mascotIndex = groupIndex % MASCOT_URLS.length;
    const mascotImg = document.createElement('img');
    mascotImg.src = MASCOT_URLS[mascotIndex];
    mascotImg.alt = `Mascota Grupo ${group.group}`;
    mascotImg.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 4px solid rgba(255, 204, 0, 0.8);
      box-shadow: 0 8px 24px rgba(2,56,102,0.15);
      background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(246,255,236,0.9));
      object-fit: cover;
      z-index: 10;
    `;
    card.appendChild(mascotImg);

    groupSection.appendChild(card);
    container.appendChild(groupSection);
  });

  // Si no se muestra nada (p. ej. búsqueda sin resultados)
  if (container.children.length === 0) {
    container.innerHTML = '<p class="error">No se encontraron equipos para la búsqueda o filtro seleccionado.</p>';
  }
}

/**
 * Ordena un array de objetos de equipo por puntos, diferencia de goles y goles a favor
 * @param {Array} arr
 * @returns {Array}
 */
function sortStandings(arr) {
  return arr.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
    return b.goals_for - a.goals_for;
  });
}

/* Exportado solo para pruebas manuales en consola si se desea */
window._standingsUtils = { sortStandings, renderAllGroups };
