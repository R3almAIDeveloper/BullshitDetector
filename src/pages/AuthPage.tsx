// src/pages/AuthPage.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'voter' | 'professional'>('voter');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      let error;
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { user_mode: mode }, // Save mode to user metadata
          },
        });
        error = signUpError;

        if (data.user) {
          // Save mode to database for persistence
          await supabase.from('user_profiles').insert({
            user_id: data.user.id,
            email,
            mode,
          });
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = signInError;
      }

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>
        {error && <p className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        {isSignUp && (
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'voter' | 'professional')}
            className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="voter">Voter Mode (Quick)</option>
            <option value="professional">Professional Mode (Detailed)</option>
          </select>
        )}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p className="text-center mt-4 text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}