import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken, setRole: setGlobalRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const loginData = {
      username,
      password,
    };

    console.log('Form submitted. Username:', username);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        const { token, user } = data;
        console.log('Login successful. Token:', token, 'User:', user);

        // Store token and role in AuthContext
        setToken(token);
        const role = user.role === 'teacher' ? 'Admin' : 'Student';
        setGlobalRole(role);

        // Store token in localStorage for persistence
        localStorage.setItem('authToken', token);

        // Navigate based on role
        if (role === 'Admin') {
          console.log('Navigating to /teacher-dashboard');
          navigate('/teacher-dashboard', { replace: true });
        } else {
          console.log('Navigating to /student-dashboard');
          navigate('/student-dashboard', { replace: true });
        }
      } else {
        // Handle API errors
        setError(data.error || 'Login failed. Please try again.');
        console.log('Login error:', data.error);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Network error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login
          </h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
