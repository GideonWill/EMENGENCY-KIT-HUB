import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isDemoMode } from '../config/demoMode'
import { CTA_PRIMARY } from '../config/brand'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 py-14">
      <div className="mx-auto max-w-md border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8">
        <h1 className="font-display text-3xl text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">
          {isDemoMode() ? (
            <>
              <strong className="text-amber-900">Demo mode:</strong> use any email and a password of at least 8 characters —
              no server required.
            </>
          ) : (
            <>Register against your running API (MongoDB + JWT).</>
          )}
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            />
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700">
              Password (min 8 characters)
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 text-sm ${CTA_PRIMARY}`}
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700 underline-offset-2 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
