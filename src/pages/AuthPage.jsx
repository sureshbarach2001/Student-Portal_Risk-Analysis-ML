import Header from '../components/Header';

function AuthPage() {
  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header at the top */}
      <Header />

      {/* Centered content for the auth form */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-dark-text mb-6 text-center">
            Login / Sign Up
          </h1>

          {/* Form for login/signup */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-button-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full px-6 py-3 border border-button-blue text-button-blue rounded-xl font-medium hover:bg-button-blue hover:text-white transition-colors"
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