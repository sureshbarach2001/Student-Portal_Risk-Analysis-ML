function Header() {
  return (
    <header className="fixed top-0 w-full h-16 bg-blue-900 text-white flex items-center justify-between px-6">
      {/* Title with Logo */}
      <div className="flex items-center">
        <img
          src="/assets/Group9741.png" // Replace with the actual path
          alt="Logo"
          className="w-6 h-6 rounded-full mr-2"
        />
        <h1 className="text-xl font-semibold">Student Dashboard</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search students, IDs, or keywords..."
          className="w-full p-2 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center">
        <span className="mr-2">Student</span>
        <img
          src="/assets/profile.png" // Replace with the actual path
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;