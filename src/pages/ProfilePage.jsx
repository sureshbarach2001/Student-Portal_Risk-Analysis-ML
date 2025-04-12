import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';

function ProfilePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="settings" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Your Profile</h3>
            <div className="flex items-start">
              {/* Profile Picture */}
              <div className="mr-6">
                <img
                  src="/assets/profile.png" // Replace with the actual path
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              {/* Profile Form */}
              <div className="flex-1">
                <form>
                  {/* Full Name */}
                  <div className="mb-4 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Full Name:</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Email:</label>
                    <input
                      type="email"
                      placeholder="jane.smith@studentportal.com"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Phone Number:</label>
                    <input
                      type="tel"
                      placeholder="+44 789 654 3210"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Year */}
                  <div className="mb-4 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Year:</label>
                    <input
                      type="text"
                      placeholder="2024"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Semester */}
                  <div className="mb-4 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Semester:</label>
                    <input
                      type="text"
                      placeholder="4th Semester"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Change Password Section */}
                  <div className="mb-6 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600 mb-1">Change Password</label>
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6 flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-600">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="********"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md bg-white text-black"
                    />
                  </div>

                  {/* Save Changes Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;