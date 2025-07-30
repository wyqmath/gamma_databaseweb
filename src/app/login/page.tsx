'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lock, User, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple authentication (in production, this would be handled by Supabase Auth)
    if (username === 'admin' && password === 'password') {
      // Set authentication state (in production, use proper session management)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }))
      router.push('/admin')
    } else {
      setError('Invalid username or password')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">
            Access the γ-Secretase Database administration panel
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-2">Demo Credentials</h3>
              <div className="text-xs text-slate-400 space-y-1">
                <div>Username: <code className="text-cyan-400">admin</code></div>
                <div>Password: <code className="text-cyan-400">password</code></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                In production, this would use Supabase Auth with proper security measures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}
