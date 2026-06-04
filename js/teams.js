/**
 * TEAMS MODULE - World Cup 2026 Hub
 * Maneja la visualización y funcionalidad de equipos
 */

/**
 * Clase para manejar la página de equipos
 */
class TeamsManager {
  constructor() {
    this.teams = [];
    this.filteredTeams = [];
    this.selectedGroup = 'ALL';
    this.teamsContainer = document.getElementById('teams-grid');
    this.teamsTotal = document.getElementById('teams-total');
  }

  /**
   * Inicializa la página de equipos
   */
  async init() {
    try {
      console.log('⚽ Inicializando página de equipos...');
      await this.loadTeams();
      this.renderTeams();
      this.setupEventListeners();
    } catch (error) {
      console.error('❌ Error al inicializar teams:', error);
      this.showError('Error al cargar los equipos');
    }
  }

  /**
   * Carga los datos de equipos desde la API
   */
  async loadTeams() {
    try {
      this.teams = await api.getTeams();
      this.filteredTeams = this.teams;
      console.log(`✅ ${this.teams.length} equipos cargados`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Renderiza las tarjetas de equipos
   */
  renderTeams() {
    if (!this.teamsContainer) return;

    this.teamsContainer.innerHTML = '';

    if (this.teamsTotal) {
      const summaryText = this.selectedGroup === 'ALL'
        ? `${this.filteredTeams.length} selecciones clasificadas`
        : `${this.filteredTeams.length} equipos en Grupo ${this.selectedGroup}`;

      this.teamsTotal.textContent = summaryText;
    }

    // Efecto de carga
    this.teamsContainer.classList.add('stagger-container');

    this.filteredTeams.forEach((team, index) => {
      const teamCard = this.createTeamCard(team);
      this.teamsContainer.appendChild(teamCard);

      // Agregar animación con delay
      setTimeout(() => {
        teamCard.classList.add('animate-scale-in');
      }, index * 50);
    });

    if (this.filteredTeams.length === 0) {
      this.teamsContainer.innerHTML = '<p class="text-center error">No hay equipos disponibles</p>';
    }
  }

  /**
   * Crea una clave segura a partir del nombre del equipo
   * @param {string} name - Nombre del equipo
   * @returns {string}
   */
  slugifyTeamName(name) {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  /**
   * Devuelve la ruta de la imagen de la bandera según el nombre del equipo
   * @param {Object} team
   * @returns {string}
   */
  getFlagImagePath(team) {
    const fileName = `${this.slugifyTeamName(team.name)}.svg`;
    const basePath = window.location.pathname.includes('/pages/') ? '../images/flags/' : 'images/flags/';
    return `${basePath}${fileName}`;
  }

  /**
   * Crea una tarjeta de equipo
   * @param {Object} team - Datos del equipo
   * @returns {HTMLElement} Elemento de la tarjeta
   */
  createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'card team-card team-card-full';
    card.style.cursor = 'pointer';

    const goalDiff = team.goal_difference;
    const diffBadge = goalDiff >= 0
      ? `<span class="badge badge-success">+${goalDiff}</span>`
      : `<span class="badge badge-secondary">${goalDiff}</span>`;

    const flagImagePath = this.getFlagImagePath(team);

    card.innerHTML = `
      <div class="team-card-flag">
        <img src="${flagImagePath}" alt="Bandera de ${team.name}" />
      </div>

      <div class="team-card-top">
        <div class="team-card-badges">
          <span class="badge badge-primary">Clasificado</span>
          <span class="badge badge-secondary">${team.confederation}</span>
        </div>
      </div>

      <h3 class="team-name">${team.name}</h3>

      <div class="team-info">
        <p><strong>Grupo:</strong> ${team.group}</p>
        <p><strong>Entrenador:</strong> ${team.coach}</p>
        <p><strong>Ranking:</strong> #${team.ranking}</p>
      </div>

      <div class="team-card-stats-grid">
        <div class="team-stat-item">
          <span class="team-stat-label">Puntos</span>
          <span class="team-stat-value">${team.points}</span>
        </div>
        <div class="team-stat-item">
          <span class="team-stat-label">PJ</span>
          <span class="team-stat-value">${team.matches_played}</span>
        </div>
        <div class="team-stat-item">
          <span class="team-stat-label">GF</span>
          <span class="team-stat-value">${team.goals_for}</span>
        </div>
        <div class="team-stat-item">
          <span class="team-stat-label">GC</span>
          <span class="team-stat-value">${team.goals_against}</span>
        </div>
      </div>

      <div class="team-card-footer">
        ${diffBadge}
        <span class="team-record">${team.wins}V • ${team.draws}E • ${team.losses}D</span>
      </div>
    `;

    // Evento al hacer clic
    card.addEventListener('click', () => this.showTeamDetails(team));

    // Eventos hover
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });

    return card;
  }

  /**
   * Muestra detalles del equipo en un modal
   * @param {Object} team - Datos del equipo
   */
  async showTeamDetails(team) {
    // Obtener partidos del equipo
    const matches = await api.getTeamMatches(team.name);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'card';
    modalContent.style.cssText = `
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      animation: scaleIn 0.3s ease-out;
    `;

    let matchesHTML = '';
    if (matches.length > 0) {
      matchesHTML = `
        <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">Partidos</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${matches.map(match => `
            <div style="background: rgba(157, 78, 221, 0.1); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid var(--neon-cyan);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span>${match.date}</span>
                <span class="badge ${match.status === 'finished' ? 'badge-success' : 'badge-secondary'}">${match.status === 'finished' ? 'Finalizado' : 'Por jugar'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${match.flag_a} ${match.team_a}</span>
                <span style="font-weight: 700; color: var(--neon-cyan); font-size: 1.1rem;">
                  ${match.goals_a !== null ? match.goals_a + ' - ' + match.goals_b : 'vs'}
                </span>
                <span>${match.team_b} ${match.flag_b}</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-tertiary); margin-top: 0.5rem;">
                📍 ${match.stadium}, ${match.city}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    modalContent.innerHTML = `
      <button style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        color: var(--neon-cyan);
        font-size: 1.5rem;
        cursor: pointer;
      ">✕</button>

      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">${team.flag}</div>
        <h2 style="color: var(--text-primary); margin-bottom: 0.5rem;">${team.name}</h2>
        <p style="color: var(--text-secondary);">Grupo ${team.group}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(0, 240, 255, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--neon-cyan);">${team.points}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Puntos</div>
        </div>
        <div style="background: rgba(181, 55, 242, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--neon-purple);">${team.matches_played}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Partidos</div>
        </div>
        <div style="background: rgba(0, 255, 136, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--neon-green);">${team.goals_for}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Goles a favor</div>
        </div>
        <div style="background: rgba(255, 0, 110, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--neon-pink);">${team.goals_against}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Goles en contra</div>
        </div>
      </div>

      <div style="background: rgba(157, 78, 221, 0.1); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <p><strong>Entrenador:</strong> ${team.coach}</p>
        <p><strong>Confederación:</strong> ${team.confederation}</p>
        <p><strong>Diferencia de goles:</strong> ${team.goal_difference > 0 ? '+' : ''}${team.goal_difference}</p>
      </div>

      ${matchesHTML}
    `;

    // Botón cerrar
    modalContent.querySelector('button').addEventListener('click', () => {
      modal.remove();
    });

    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Botones de filtro por grupo
    const groupButtons = document.querySelectorAll('[data-group]');
    groupButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        groupButtons.forEach(b => b.style.opacity = '0.6');
        e.target.style.opacity = '1';
        this.filterByGroup(e.target.dataset.group);
      });
    });
  }

  /**
   * Filtra equipos por grupo
   * @param {string} group - Letra del grupo
   */
  filterByGroup(group) {
    this.selectedGroup = group;

    if (group === 'ALL') {
      this.filteredTeams = this.teams;
    } else {
      this.filteredTeams = this.teams.filter(team => team.group === group);
    }

    this.renderTeams();
  }

  /**
   * Muestra un mensaje de error
   * @param {string} message - Mensaje de error
   */
  showError(message) {
    if (this.teamsContainer) {
      this.teamsContainer.innerHTML = `<div class="error">${message}</div>`;
    }
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const teamsManager = new TeamsManager();
    teamsManager.init();
  });
} else {
  const teamsManager = new TeamsManager();
  teamsManager.init();
}
