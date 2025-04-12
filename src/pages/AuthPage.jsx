import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const [role, setRole] = useState('Student');
  const [username, setUsername] = useState('');
  const { setRole: setGlobalRole, role: globalRole } = useAuth();
  const navigate = useNavigate();

  // Debug: Log global role changes
  useEffect(() => {
    console.log('Global role updated:', globalRole);
    // Navigate after role is set
    if (globalRole === 'Admin') {
      console.log('Navigating to /teacher-dashboard');
      navigate('/teacher-dashboard', { replace: true });
    } else if (globalRole === 'Student') {
      console.log('Navigating to /student-dashboard');
      navigate('/student-dashboard', { replace: true });
    }
  }, [globalRole, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const usernameValue = e.target.username.value;

    console.log('Form submitted. Role:', role, 'Username:', usernameValue, 'Password:', password);

    // Set the role in the global context
    setGlobalRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login / Sign Up
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Your Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-black"
                required
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
              <button
                type="button"
                className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;