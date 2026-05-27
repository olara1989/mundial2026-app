/**
 * API MODULE - World Cup 2026 Hub
 * Maneja todas las llamadas a datos locales
 */

// Configuración de rutas de datos
const API_ENDPOINTS = {
  TEAMS: '../data/teams.json',
  MATCHES: '../data/matches.json',
  STANDINGS: '../data/standings.json'
};

/**
 * Clase para manejar las peticiones de datos
 * Patrón Fetch para datos locales JSON
 */
class ApiService {
  constructor() {
    this.cache = {};
    this.loading = false;
  }

  /**
   * Obtiene datos de un archivo JSON
   * @param {string} endpoint - Ruta del archivo
   * @param {boolean} useCache - Si debe usar caché
   * @returns {Promise} Datos parseados
   */
  async fetchData(endpoint, useCache = true) {
    try {
      // Verificar caché
      if (useCache && this.cache[endpoint]) {
        console.log(`📦 Datos en caché para: ${endpoint}`);
        return this.cache[endpoint];
      }

      this.loading = true;
      console.log(`📡 Obteniendo datos de: ${endpoint}`);

      const response = await fetch(endpoint);

      // Validar respuesta
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }

      const data = await response.json();

      // Guardar en caché
      if (useCache) {
        this.cache[endpoint] = data;
      }

      this.loading = false;
      console.log(`✅ Datos cargados exitosamente de: ${endpoint}`);
      return data;
    } catch (error) {
      this.loading = false;
      console.error(`❌ Error al obtener datos de ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene lista de todos los equipos
   * @returns {Promise<Array>} Array de equipos
   */
  async getTeams() {
    return await this.fetchData(API_ENDPOINTS.TEAMS);
  }

  /**
   * Obtiene un equipo por nombre
   * @param {string} teamName - Nombre del equipo
   * @returns {Promise<Object>} Objeto del equipo
   */
  async getTeamByName(teamName) {
    const teams = await this.getTeams();
    return teams.find(team => team.name.toLowerCase() === teamName.toLowerCase());
  }

  /**
   * Obtiene equipos por grupo
   * @param {string} group - Letra del grupo (A, B, C, etc.)
   * @returns {Promise<Array>} Array de equipos del grupo
   */
  async getTeamsByGroup(group) {
    const teams = await this.getTeams();
    return teams.filter(team => team.group === group);
  }

  /**
   * Obtiene lista de todos los partidos
   * @returns {Promise<Array>} Array de partidos
   */
  async getMatches() {
    return await this.fetchData(API_ENDPOINTS.MATCHES);
  }

  /**
   * Obtiene partidos por estado
   * @param {string} status - Estado del partido (finished, upcoming, live)
   * @returns {Promise<Array>} Array de partidos filtrados
   */
  async getMatchesByStatus(status) {
    const matches = await this.getMatches();
    return matches.filter(match => match.status === status);
  }

  /**
   * Obtiene partidos de una jornada específica
   * @param {number} matchday - Número de jornada
   * @returns {Promise<Array>} Array de partidos de esa jornada
   */
  async getMatchesByMatchday(matchday) {
    const matches = await this.getMatches();
    return matches.filter(match => match.matchday === matchday);
  }

  /**
   * Obtiene próximos partidos
   * @param {number} limit - Cantidad de partidos a retornar
   * @returns {Promise<Array>} Array de próximos partidos
   */
  async getUpcomingMatches(limit = 5) {
    const matches = await this.getMatches();
    return matches
      .filter(match => match.status === 'upcoming')
      .slice(0, limit);
  }

  /**
   * Obtiene tabla de posiciones
   * @returns {Promise<Array>} Array de grupos con sus standings
   */
  async getStandings() {
    return await this.fetchData(API_ENDPOINTS.STANDINGS);
  }

  /**
   * Obtiene standings de un grupo específico
   * @param {string} groupLetter - Letra del grupo
   * @returns {Promise<Object>} Objeto con standings del grupo
   */
  async getStandingsByGroup(groupLetter) {
    const standings = await this.getStandings();
    return standings.find(group => group.group === groupLetter);
  }

  /**
   * Obtiene partidos de un equipo específico
   * @param {string} teamName - Nombre del equipo
   * @returns {Promise<Array>} Array de partidos del equipo
   */
  async getTeamMatches(teamName) {
    const matches = await this.getMatches();
    return matches.filter(match =>
      match.team_a.toLowerCase() === teamName.toLowerCase() ||
      match.team_b.toLowerCase() === teamName.toLowerCase()
    );
  }

  /**
   * Busca partidos entre dos equipos
   * @param {string} team1 - Nombre del equipo 1
   * @param {string} team2 - Nombre del equipo 2
   * @returns {Promise<Object|null>} Partido encontrado o null
   */
  async getMatchBetweenTeams(team1, team2) {
    const matches = await this.getMatches();
    return matches.find(match =>
      (match.team_a.toLowerCase() === team1.toLowerCase() &&
       match.team_b.toLowerCase() === team2.toLowerCase()) ||
      (match.team_a.toLowerCase() === team2.toLowerCase() &&
       match.team_b.toLowerCase() === team1.toLowerCase())
    );
  }

  /**
   * Obtiene estadísticas generales del torneo
   * @returns {Promise<Object>} Objeto con estadísticas
   */
  async getTournamentStats() {
    const matches = await this.getMatches();
    const teams = await this.getTeams();

    const totalMatches = matches.length;
    const finishedMatches = matches.filter(m => m.status === 'finished').length;
    const upcomingMatches = matches.filter(m => m.status === 'upcoming').length;

    let totalGoals = 0;
    matches.forEach(match => {
      if (match.goals_a !== null && match.goals_b !== null) {
        totalGoals += match.goals_a + match.goals_b;
      }
    });

    return {
      total_matches: totalMatches,
      finished_matches: finishedMatches,
      upcoming_matches: upcomingMatches,
      total_goals: totalGoals,
      total_teams: teams.length,
      average_goals_per_match: (totalGoals / finishedMatches).toFixed(2)
    };
  }

  /**
   * Limpia el caché
   */
  clearCache() {
    this.cache = {};
    console.log('🧹 Caché limpiado');
  }
}

// Instancia global del servicio API
const api = new ApiService();
