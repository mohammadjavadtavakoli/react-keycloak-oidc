import { useEffect, useState } from 'react'
import Keycloak from 'keycloak-js'
import { keycloakConfig, keycloakInitOptions } from './keycloak.config.js'
import './App.css'

const keycloak = new Keycloak(keycloakConfig)
let initialization

function App() {
  const [ready, setReady] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    // React StrictMode repeats effects, but the adapter can only initialize once.
    initialization ??= keycloak.init(keycloakInitOptions)

    initialization
      .then((authenticated) => {
        if (!active) return
        if (authenticated) setAccessToken(keycloak.token)
        setReady(true)
      })
      .catch(() => {
        if (active) setError('ورود کامل نشد. تنظیمات Keycloak را بررسی و صفحه را دوباره بارگذاری کنید.')
      })

    return () => {
      active = false
    }
  }, [])

  async function login() {
    setError('')
    setRedirecting(true)

    try {
      await keycloak.login()
    } catch {
      setError('انتقال به صفحه ورود انجام نشد. دوباره تلاش کنید.')
      setRedirecting(false)
    }
  }

  return (
    <main className="auth">
      {accessToken ? (
        <div className="token" dir="ltr">
          <label htmlFor="access-token">Access Token</label>
          <textarea id="access-token" value={accessToken} rows={8} readOnly spellCheck={false} />
        </div>
      ) : (
        <button type="button" onClick={login} disabled={!ready || redirecting}>
          {redirecting ? 'در حال انتقال…' : 'ورود با Keycloak'}
        </button>
      )}
      {!ready && !error && <p role="status">در حال آماده‌سازی ورود…</p>}
      {error && <p role="alert">{error}</p>}
    </main>
  )
}

export default App
