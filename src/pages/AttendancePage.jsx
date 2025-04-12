import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';

function AttendancePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="attendance" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance</h2>

            {/* Filters */}
            <div className="flex items-center mb-4 space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                <select
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option>Select Year</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Semester</label>
                <select
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option>Select Semester</option>
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                  <option>3rd Semester</option>
                  <option>4th Semester</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Program</label>
                <select
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option>MIT</option>
                  <option>CS</option>
                  <option>Engineering</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
                <select
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option>Capstone I</option>
                  <option>C Programming</option>
                  <option>Data Structures</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Date</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Check-in Time:</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 text-gray-600 border-b border-gray-200">Jan 1 2025</td>
                    <td className="p-4 text-gray-600 border-b border-gray-200">9:00 AM</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-600 border-b border-gray-200">Jan 2 2025</td>
                    <td className="p-4 text-gray-600 border-b border-gray-200">9:00 AM</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                        Absent
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-600 border-b border-gray-200">Jan 3 2025</td>
                    <td className="p-4 text-gray-600 border-b border-gray-200">9:00 AM</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-600 border-b border-gray-200">Jan 4 2025</td>
                    <td className="p-4 text-gray-600 border-b border-gray-200">9:00 AM</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-600 border-b border-gray-200">Jan 5 2025</td>
                    <td className="p-4 text-gray-600 border-b border-gray-200">9:00 AM</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Present
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* View All Button */}
            <div className="flex justify-end mt-4">
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AttendancePage;