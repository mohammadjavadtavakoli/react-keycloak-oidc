# React Keycloak OIDC

A simple React application demonstrating authentication with Keycloak using OpenID Connect (OIDC).

## Features

- Keycloak integration
- OpenID Connect authentication
- Authorization Code Flow with PKCE
- Access Token handling

## Configuration

Update Keycloak settings in [`src/keycloak.config.js`](src/keycloak.config.js).

- Server URL
- Realm
- Client ID

## Run

```bash
npm install
npm run dev
```

## Requirements

- Node.js
- Docker (for running Keycloak)

