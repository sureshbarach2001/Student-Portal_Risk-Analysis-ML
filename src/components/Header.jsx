function Header() {
    return (
      <header className="fixed top-0 left-0 w-full bg-primary-blue py-4 z-10">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search students, IDs, or keywords..."
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
  
          {/* Profile Section */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-700 text-sm">A</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;