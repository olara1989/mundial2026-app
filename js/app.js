/**
 * APP MODULE - World Cup 2026 Hub
 * Aplicación principal y funcionalidad global
 */

/**
 * Clase principal de la aplicación
 */
class WorldCupApp {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.teamsGrid = document.getElementById('teams-grid');
    this.matchesGrid = document.getElementById('matches-grid');
    this.standingsContainer = document.getElementById('standings-container');
    this.newsGrid = document.getElementById('news-grid');
    this.statsContainer = document.getElementById('stats-container');
    this.tournamentInfoContainer = document.getElementById('tournament-info-container');
    this.venuesContainer = document.getElementById('venues-container');
    this.mascotsContainer = document.getElementById('mascots-container');
    this.factsContainer = document.getElementById('facts-container');
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    console.log('🚀 Inicializando World Cup 2026 Hub...');
    this.setupNavigation();
    this.highlightActiveLink();
    await this.loadHomePageData();
    this.setupAnimations();
  }

  /**
   * Configura la navegación
   */
  setupNavigation() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // No evitamos el comportamiento por defecto para permitir la navegación
        this.highlightActiveLink(e.target);
      });
    });

    // Detectar cambios de página
    window.addEventListener('popstate', () => {
      this.highlightActiveLink();
    });
  }

  /**
   * Resalta el enlace activo en la navegación
   */
  highlightActiveLink(element = null) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === currentPage || (currentPage === '' && href === 'index.html');

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Carga los datos de la página de inicio
   */
  async loadHomePageData() {
    try {
      // Cargar información general del torneo
      if (this.tournamentInfoContainer) {
        await this.loadTournamentInfo();
      }

      // Cargar sedes y ciudades
      if (this.venuesContainer) {
        await this.loadVenues();
      }

      // Cargar mascotas
      if (this.mascotsContainer) {
        await this.loadMascots();
      }

      // Cargar hechos destacados
      if (this.factsContainer) {
        await this.loadFacts();
      }

      // Cargar equipos destacados
      if (this.teamsGrid) {
        await this.loadFeaturedTeams();
      }

      // Cargar próximos partidos
      if (this.matchesGrid) {
        await this.loadUpcomingMatches();
      }

      // Cargar noticias
      if (this.newsGrid) {
        this.loadNews();
      }

      // Cargar estadísticas
      if (this.statsContainer) {
        await this.loadStats();
      }
    } catch (error) {
      console.error('❌ Error al cargar datos de inicio:', error);
    }
  }

  /**
   * Carga equipos destacados
   */
  async loadFeaturedTeams() {
    try {
      const teams = await api.getTeams();
      const featured = teams.slice(0, 6); // Primeros 6 equipos

      this.teamsGrid.innerHTML = '';
      this.teamsGrid.classList.add('stagger-container');

      featured.forEach((team, index) => {
        const card = document.createElement('div');
        card.className = 'card team-card';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;

        card.innerHTML = `
          <div class="team-flag">${team.flag}</div>
          <h3 class="team-name">${team.name}</h3>
          <div class="team-info">
            <p><strong>Grupo ${team.group}</strong></p>
            <p>${team.confederation}</p>
          </div>
          <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(229, 23, 59, 0.2);">
            <span class="badge badge-primary">Puntos: ${team.points}</span>
          </div>
        `;

        this.teamsGrid.appendChild(card);
      });

      console.log('✅ Equipos destacados cargados');
    } catch (error) {
      console.error('❌ Error al cargar equipos:', error);
      this.teamsGrid.innerHTML = '<p class="error">Error al cargar equipos</p>';
    }
  }

  /**
   * Carga próximos partidos
   */
  async loadUpcomingMatches() {
    try {
      const matches = await api.getUpcomingMatches(6);

      this.matchesGrid.innerHTML = '';
      this.matchesGrid.classList.add('stagger-container');

      if (matches.length === 0) {
        this.matchesGrid.innerHTML = '<p class="text-center">No hay partidos próximos</p>';
        return;
      }

      matches.forEach((match, index) => {
        const card = document.createElement('div');
        card.className = 'card match-card';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;

        const dateObj = new Date(match.date);
        const formattedDate = dateObj.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });

        card.innerHTML = `
          <div class="match-team">
            <div class="match-team-flag">${match.flag_a}</div>
            <div class="match-team-info">
              <h4>${match.team_a}</h4>
            </div>
          </div>
          <div class="match-center">
            <div class="match-time">${formattedDate}</div>
            <div class="match-status">${match.time}</div>
          </div>
          <div class="match-team" style="justify-content: flex-end;">
            <div class="match-team-info">
              <h4>${match.team_b}</h4>
            </div>
            <div class="match-team-flag">${match.flag_b}</div>
          </div>
        `;

        this.matchesGrid.appendChild(card);
      });

      console.log('✅ Próximos partidos cargados');
    } catch (error) {
      console.error('❌ Error al cargar partidos:', error);
      this.matchesGrid.innerHTML = '<p class="error">Error al cargar partidos</p>';
    }
  }

  /**
   * Carga noticias (simuladas)
   */
  loadNews() {
    const news = [
      {
        id: 1,
        title: 'Argentina es favorita para ganar el torneo',
        date: '2026-05-20',
        emoji: '🎉',
        excerpt: 'Con su equipo en excelente forma, Argentina lidera las apuestas para coronarse campeona mundial.'
      },
      {
        id: 2,
        title: 'Young talents que brillarán en el 2026',
        date: '2026-05-18',
        emoji: '⭐',
        excerpt: 'Descubre los jóvenes promesas que prometen revolucionar el fútbol mundial en esta edición.'
      },
      {
        id: 3,
        title: 'Estadios de lujo listos para la fiesta',
        date: '2026-05-15',
        emoji: '🏟️',
        excerpt: 'Los estadios modernos de América del Norte prometen ofrecer la mejor experiencia.'
      },
      {
        id: 4,
        title: 'Clasificados los 8 favoritos',
        date: '2026-05-12',
        emoji: '🏆',
        excerpt: 'Se definen los favoritos que buscarán conquistar el título mundial.'
      },
      {
        id: 5,
        title: 'Cámaras 360° transmitirán en realidad virtual',
        date: '2026-05-10',
        emoji: '📹',
        excerpt: 'Tecnología revolucionaria llevará la experiencia del Mundial a nuevos niveles.'
      },
      {
        id: 6,
        title: 'Récord de entradas vendidas',
        date: '2026-05-08',
        emoji: '🎫',
        excerpt: 'El entusiasmo de los aficionados rompe todos los récords de venta de entradas.'
      }
    ];

    this.newsGrid.innerHTML = '';
    this.newsGrid.classList.add('stagger-container');

    news.forEach((article, index) => {
      const card = document.createElement('div');
      card.className = 'card news-card';
      card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;

      const date = new Date(article.date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      card.innerHTML = `
        <div class="news-image">${article.emoji}</div>
        <div class="news-content">
          <div class="news-date">${date}</div>
          <h3>${article.title}</h3>
          <p class="news-excerpt">${article.excerpt}</p>
          <a href="#" class="read-more">Leer más →</a>
        </div>
      `;

      card.querySelector('.read-more').addEventListener('click', (e) => {
        e.preventDefault();
        this.showNewsModal(article);
      });

      this.newsGrid.appendChild(card);
    });

    console.log('✅ Noticias cargadas');
  }

  /**
   * Muestra un modal con la noticia completa
   * @param {Object} article - Datos del artículo
   */
  showNewsModal(article) {
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

    const content = document.createElement('div');
    content.className = 'card';
    content.style.cssText = `
      max-width: 600px;
      width: 90%;
      padding: 2rem;
      position: relative;
      animation: scaleIn 0.3s ease-out;
    `;

    content.innerHTML = `
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

      <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
        ${article.emoji}
      </div>

      <h2 style="text-align: center; margin-bottom: 1rem;">${article.title}</h2>

      <p style="text-align: center; color: var(--text-tertiary); margin-bottom: 1.5rem;">
        ${new Date(article.date).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      <p style="margin-bottom: 1rem; line-height: 1.8;">
        ${article.excerpt}
      </p>

      <div style="background: rgba(0, 240, 255, 0.1); padding: 1.5rem; border-radius: 1rem; border-left: 4px solid var(--neon-cyan);">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    `;

    content.querySelector('button').addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  /**
   * Carga estadísticas del torneo
   */
  async loadStats() {
    try {
      const stats = await api.getTournamentStats();

      this.statsContainer.innerHTML = `
        <div class="grid-4">
          <div class="card" style="text-align: center; animation: slideUp 0.6s ease-out;">
            <div style="font-size: 2.5rem; font-weight: 700; color: var(--neon-cyan); margin-bottom: 0.5rem;">
              ${stats.total_matches}
            </div>
            <p style="color: var(--text-secondary);">Partidos Totales</p>
          </div>

          <div class="card" style="text-align: center; animation: slideUp 0.6s ease-out 0.1s both;">
            <div style="font-size: 2.5rem; font-weight: 700; color: var(--neon-green); margin-bottom: 0.5rem;">
              ${stats.finished_matches}
            </div>
            <p style="color: var(--text-secondary);">Partidos Jugados</p>
          </div>

          <div class="card" style="text-align: center; animation: slideUp 0.6s ease-out 0.2s both;">
            <div style="font-size: 2.5rem; font-weight: 700; color: var(--neon-pink); margin-bottom: 0.5rem;">
              ${stats.total_goals}
            </div>
            <p style="color: var(--text-secondary);">Goles Anotados</p>
          </div>

          <div class="card" style="text-align: center; animation: slideUp 0.6s ease-out 0.3s both;">
            <div style="font-size: 2.5rem; font-weight: 700; color: var(--neon-purple); margin-bottom: 0.5rem;">
              ${stats.average_goals_per_match}
            </div>
            <p style="color: var(--text-secondary);">Promedio de Goles</p>
          </div>
        </div>
      `;

      console.log('✅ Estadísticas cargadas');
    } catch (error) {
      console.error('❌ Error al cargar estadísticas:', error);
    }
  }

  /**
   * Carga información general del torneo
   */
  async loadTournamentInfo() {
    try {
      const response = await fetch('data/tournament-info.json');
      const data = await response.json();
      const info = data.general;
      const hosts = data.hosts;

      this.tournamentInfoContainer.innerHTML = '';
      this.tournamentInfoContainer.classList.add('stagger-container');

      // Tarjeta de información general
      const infoCard = document.createElement('div');
      infoCard.className = 'card';
      infoCard.style.animation = `slideUp 0.6s ease-out`;
      infoCard.innerHTML = `
        <h3 style="color: var(--neon-cyan); margin-bottom: 1rem;">📅 TORNEO</h3>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Nombre</p>
            <p style="color: var(--text-primary); font-weight: 600;">${info.name}</p>
          </div>
          <div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Fechas</p>
            <p style="color: var(--text-primary); font-weight: 600;">${new Date(info.startDate).toLocaleDateString('es-ES')} - ${new Date(info.endDate).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Equipos</p>
            <p style="color: var(--text-primary); font-weight: 600;">${info.totalTeams} equipos • ${info.totalMatches} partidos</p>
          </div>
        </div>
      `;
      this.tournamentInfoContainer.appendChild(infoCard);

      // Tarjeta de países anfitriones
      const hostsCard = document.createElement('div');
      hostsCard.className = 'card';
      hostsCard.style.animation = `slideUp 0.6s ease-out 0.1s both`;
      hostsCard.innerHTML = `
        <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">🌎 PAÍSES ANFITRIONES</h3>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          ${hosts.countries.map(country => `
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span style="font-size: 2rem;">${country.flag}</span>
              <div>
                <p style="color: var(--text-primary); font-weight: 600;">${country.name}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${country.role}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      this.tournamentInfoContainer.appendChild(hostsCard);

      console.log('✅ Información general cargada');
    } catch (error) {
      console.error('❌ Error al cargar información general:', error);
    }
  }

  /**
   * Carga sedes y ciudades
   */
  async loadVenues() {
    try {
      const response = await fetch('data/tournament-info.json');
      const data = await response.json();
      const venues = data.venues;

      this.venuesContainer.innerHTML = '';
      this.venuesContainer.classList.add('stagger-container');

      venues.forEach((venue, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.05}s both`;

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h4 style="color: var(--primary-red); margin: 0;">${venue.name}</h4>
            <span style="font-size: 1.5rem; color: var(--primary-blue);">🏟️</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <p style="margin: 0; color: var(--text-secondary);"><strong>Ciudad:</strong> ${venue.city}</p>
            <p style="margin: 0; color: var(--text-secondary);"><strong>País:</strong> ${venue.country}</p>
            <p style="margin: 0; color: var(--text-secondary);"><strong>Región:</strong> ${venue.region}</p>
            <p style="margin: 0; color: var(--primary-red); font-weight: 600;"><strong>Capacidad:</strong> ${venue.capacity.toLocaleString()} espectadores</p>
          </div>
        `;

        this.venuesContainer.appendChild(card);
      });

      console.log('✅ Sedes y ciudades cargadas');
    } catch (error) {
      console.error('❌ Error al cargar sedes:', error);
    }
  }

  /**
   * Carga mascotas oficiales
   */
  async loadMascots() {
    try {
      const response = await fetch('data/tournament-info.json');
      const data = await response.json();
      const mascots = data.mascots;

      this.mascotsContainer.innerHTML = '';
      this.mascotsContainer.classList.add('stagger-container');

      mascots.forEach((mascot, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;

        card.innerHTML = `
          <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${mascot.emoji}</div>
            <h3 style="color: var(--primary-red); margin-bottom: 0.5rem;">${mascot.name}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${mascot.description}</p>
            <span class="badge badge-secondary" style="margin-top: 0.5rem;">Color: ${mascot.color}</span>
          </div>
        `;

        this.mascotsContainer.appendChild(card);
      });

      console.log('✅ Mascotas cargadas');
    } catch (error) {
      console.error('❌ Error al cargar mascotas:', error);
    }
  }

  /**
   * Carga hechos destacados
   */
  async loadFacts() {
    try {
      const response = await fetch('data/tournament-info.json');
      const data = await response.json();
      const facts = data.facts;

      this.factsContainer.innerHTML = '';
      this.factsContainer.classList.add('stagger-container');

      facts.forEach((fact, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;

        card.innerHTML = `
          <div style="display: flex; gap: 1rem; align-items: start;">
            <div style="font-size: 2.5rem; flex-shrink: 0;">${fact.icon}</div>
            <div>
              <h4 style="color: var(--primary-red); margin-top: 0; margin-bottom: 0.5rem;">${fact.title}</h4>
              <p style="color: var(--text-secondary); margin: 0;">${fact.description}</p>
            </div>
          </div>
        `;

        this.factsContainer.appendChild(card);
      });

      console.log('✅ Hechos destacados cargados');
    } catch (error) {
      console.error('❌ Error al cargar hechos:', error);
    }
  }

  /**
   * Configura animaciones globales
   */
  setupAnimations() {
    // Animar elementos al hacer scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    console.log('✅ Animaciones configuradas');
  }
}

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new WorldCupApp();
    app.init();
  });
} else {
  const app = new WorldCupApp();
  app.init();
}

/**
 * Función global para cerrar modales al presionar ESC
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.remove();
    }
  }
});
