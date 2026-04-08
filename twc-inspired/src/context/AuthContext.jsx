import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch, getApiBase, getStoredToken, setStoredToken } from '../lib/api'
import { DEMO_SESSION_KEY, isDemoMode } from '../config/demoMode'

const AuthContext = createContext(null)

function readDemoUser() {
  if (!isDemoMode()) return null
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY)
    if (!raw) return null
    const { email } = JSON.parse(raw)
    if (!email || typeof email !== 'string') return null
    return { id: 'demo-user', email, name: 'Demo shopper' }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readDemoUser())
  const [loading, setLoading] = useState(() => {
    if (isDemoMode()) return false
    return !!(getStoredToken() && getApiBase())
  })

  const refreshUser = useCallback(async () => {
    if (isDemoMode()) {
      setUser(readDemoUser())
      setLoading(false)
      return
    }
    const token = getStoredToken()
    if (!token || !getApiBase()) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await apiFetch('/api/users/me')
      setUser(res.data)
    } catch {
      setStoredToken('')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const login = useCallback(async (email, password) => {
    if (isDemoMode()) {
      const e = String(email || '').trim()
      if (!e) throw new Error('Email is required.')
      if (!password || String(password).length < 4) {
        throw new Error('Use at least 4 characters for the demo password.')
      }
      const u = { id: 'demo-user', email: e, name: 'Demo shopper' }
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email: e }))
      setUser(u)
      return { data: { user: u, token: 'demo' } }
    }
    if (!getApiBase()) {
      throw new Error('VITE_API_URL is not set — add it to .env and restart Vite.')
    }
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setStoredToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }, [])

  const register = useCallback(async (email, password) => {
    if (isDemoMode()) {
      const e = String(email || '').trim()
      if (!e) throw new Error('Email is required.')
      if (!password || String(password).length < 8) {
        throw new Error('Password must be at least 8 characters.')
      }
      const u = { id: 'demo-user', email: e, name: 'Demo shopper' }
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email: e }))
      setUser(u)
      return { data: { user: u, token: 'demo' } }
    }
    if (!getApiBase()) {
      throw new Error('VITE_API_URL is not set — add it to .env and restart Vite.')
    }
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setStoredToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }, [])

  const logout = useCallback(() => {
    if (isDemoMode()) {
      localStorage.removeItem(DEMO_SESSION_KEY)
      setUser(null)
      return
    }
    setStoredToken('')
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      refreshUser,
      login,
      register,
      logout,
    }),
    [user, loading, refreshUser, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
