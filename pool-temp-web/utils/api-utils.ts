export function getEndpointUrl(endpoint: string) {
  return `http://${window.location.hostname}:3001${endpoint}`; // find a better way using environment variables
}
