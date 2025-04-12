import { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust path as needed
import { useAuth } from '../context/AuthContext';

function Header() {
  const { role } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-800 text-white flex items-center justify-between px-6 z-10">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
          <span className="text-blue-800 font-bold">L</span>
        </div>
        <span className="text-lg font-semibold">LOGO</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{role || 'Admin'}</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-700">A</span>
        </div>
      </div>
    </header>
  );
}

function TeacherProfilePage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { name, email, oldPassword, newPassword });
    // In a real app, this would send data to a backend
    alert('Profile updated successfully! (Dummy action)');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage="profile" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />

        {/* Profile Content */}
        <main className="pt-20 px-8 pb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            {/* Profile Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Assign Role
                  </label>
                  <select
                    id="role"
                    value="Admin"
                    disabled
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  >
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="old-password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Enter old password"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Save Profile
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default TeacherProfilePage;