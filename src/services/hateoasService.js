// src/services/hateoasService.js

/**
 * Generate links for high access users (admins and farmers).
 *
 * @param {string} beehiveId - The beehive ID.
 * @returns {object} The beehive links.
 */
export const generateHighAccessBeehiveLinks = (beehiveId) => {
  const baseURL = process.env.BASE_URL
  return {
    status: { href: `${baseURL}/beehives/${beehiveId}/status`, rel: 'status', method: 'GET' },
    create: { href: `${baseURL}/beehives`, rel: 'create', method: 'POST' },
    update: { href: `${baseURL}/beehives/${beehiveId}`, rel: 'update', method: 'PUT' },
    delete: { href: `${baseURL}/beehives/${beehiveId}`, rel: 'delete', method: 'DELETE' },
    humidity: { href: `${baseURL}/beehives/${beehiveId}/humidity/{startDate}/{endDate}`, rel: 'humidity', method: 'GET', templated: true },
    weight: { href: `${baseURL}/beehives/${beehiveId}/weight/{startDate}/{endDate}`, rel: 'weight', method: 'GET', templated: true },
    temperature: { href: `${baseURL}/beehives/${beehiveId}/temperature/{startDate}/{endDate}`, rel: 'temperature', method: 'GET', templated: true },
    flow: { href: `${baseURL}/beehives/${beehiveId}/flow/{startDate}/{endDate}`, rel: 'flow', method: 'GET', templated: true },
    requestTransportation: { href: `${baseURL}/beehives/request-transportation`, rel: 'requestTransportation', method: 'POST' },
    reportHarvest: { href: `${baseURL}/beehives/report-harvest`, rel: 'reportHarvest', method: 'POST' },
    listAll: { href: `${baseURL}/api/beehives`, rel: 'listAll', method: 'GET' }
  }
}

/**
 * Generate links for general users.
 *
 * @param {string} beehiveId - The beehive ID.
 * @returns {object} The beehive links.
 */
export const generateGeneralAccessBeehiveLinks = (beehiveId) => {
  const baseURL = process.env.BASE_URL
  return {
    status: { href: `${baseURL}/beehives/${beehiveId}/status`, rel: 'status', method: 'GET' },
    humidity: { href: `${baseURL}/beehives/${beehiveId}/humidity/{startDate}/{endDate}`, rel: 'humidity', method: 'GET', templated: true },
    weight: { href: `${baseURL}/beehives/${beehiveId}/weight/{startDate}/{endDate}`, rel: 'weight', method: 'GET', templated: true },
    temperature: { href: `${baseURL}/beehives/${beehiveId}/temperature/{startDate}/{endDate}`, rel: 'temperature', method: 'GET', templated: true },
    flow: { href: `${baseURL}/beehives/${beehiveId}/flow/{startDate}/{endDate}`, rel: 'flow', method: 'GET', templated: true },
    listAll: { href: `${baseURL}/api/beehives`, rel: 'listAll', method: 'GET' }
  }
}

/**
 * Generate links after user has registered.
 *
 * @returns {object} The links.
 */
export const generateLinkAfterRegister = () => {
  const baseURL = process.env.BASE_URL
  return {
    login: { href: `${baseURL}/api/authentication/login`, rel: 'login', method: 'POST' }
  }
}

/**
 * Generate links after user has logged in based on their role.
 *
 * @param {string} role - The user role.
 * @returns {object} The links.
 */
export const generateLinksAfterLogin = (role) => {
  const baseURL = process.env.BASE_URL

  if (role === 'admin' || role === 'farmer') {
    return {
      listAllBeehives: { href: `${baseURL}/api/beehives`, rel: 'listAllBeehives', method: 'GET' },
      getBeehiveStatus: { href: `${baseURL}/beehives/{beehiveId}/status`, rel: 'getBeehiveStatus', method: 'GET', templated: true },
      createBeehive: { href: `${baseURL}/beehives`, rel: 'createBeehive', method: 'POST' },
      updateBeehive: { href: `${baseURL}/beehives/{beehiveId}`, rel: 'updateBeehive', method: 'PUT', templated: true },
      deleteBeehive: { href: `${baseURL}/beehives/{beehiveId}`, rel: 'deleteBeehive', method: 'DELETE', templated: true },
      humidity: { href: `${baseURL}/beehives/{beehiveId}/humidity/{startDate}/{endDate}`, rel: 'humidity', method: 'GET', templated: true },
      weight: { href: `${baseURL}/beehives/{beehiveId}/weight/{startDate}/{endDate}`, rel: 'weight', method: 'GET', templated: true },
      temperature: { href: `${baseURL}/beehives/{beehiveId}/temperature/{startDate}/{endDate}`, rel: 'temperature', method: 'GET', templated: true },
      flow: { href: `${baseURL}/beehives/{beehiveId}/flow/{startDate}/{endDate}`, rel: 'flow', method: 'GET', templated: true },
      requestTransportation: { href: `${baseURL}/beehives/request-transportation`, rel: 'requestTransportation', method: 'POST' },
      reportHarvest: { href: `${baseURL}/beehives/report-harvest`, rel: 'reportHarvest', method: 'POST' }
    }
  } else {
    return {
      listAllBeehives: { href: `${baseURL}/api/beehives`, rel: 'listAllBeehives', method: 'GET' },
      getBeehiveStatus: { href: `${baseURL}/beehives/{beehiveId}/status`, rel: 'getBeehiveStatus', method: 'GET', templated: true },
      humidity: { href: `${baseURL}/beehives/{beehiveId}/humidity/{startDate}/{endDate}`, rel: 'humidity', method: 'GET', templated: true },
      weight: { href: `${baseURL}/beehives/{beehiveId}/weight/{startDate}/{endDate}`, rel: 'weight', method: 'GET', templated: true },
      temperature: { href: `${baseURL}/beehives/{beehiveId}/temperature/{startDate}/{endDate}`, rel: 'temperature', method: 'GET', templated: true },
      flow: { href: `${baseURL}/beehives/{beehiveId}/flow/{startDate}/{endDate}`, rel: 'flow', method: 'GET', templated: true }
    }
  }
}
