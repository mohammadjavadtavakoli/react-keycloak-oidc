export const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'demo',
  clientId: 'my-front',
}

export const keycloakInitOptions = {
  flow: 'standard',
  pkceMethod: 'S256',
  checkLoginIframe: false,
  redirectUri: new URL(" http://localhost:5173", window.location.href).href,
}
