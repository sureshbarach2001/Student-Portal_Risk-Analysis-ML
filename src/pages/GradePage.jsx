import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';

function GradePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="grade" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grade</h2>

            {/* Filters */}
            <div className="flex items-center mb-6 space-x-4">
              <input type="text" placeholder="Year" className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm" />
              <select className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm">
                <option>Semester</option>
              </select>
              <select className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm">
                <option>MIT</option>
              </select>
            </div>
            <input type="text" value="C Programming" disabled className="w-96 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm mb-6" />

            {/* Grades Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-4 text-left">Assessments</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Total Marks</th>
                    <th className="p-4 text-left">Obtained Marks</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    { name: "Assignment 1", date: "Jan 5, 2025", total: 100, obtained: 80, status: "Completed" },
                    { name: "Quiz 1", date: "Jan 5, 2025", total: 100, obtained: 80, status: "Completed" },
                    { name: "Assignment 2", date: "Jan 5, 2025", total: 100, obtained: "-", status: "Not Submitted" },
                    { name: "Midterm Exam", date: "Jan 5, 2025", total: 100, obtained: 80, status: "Completed" },
                    { name: "Final Project", date: "Jan 5, 2025", total: 100, obtained: 80, status: "Completed" },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">{item.date}</td>
                      <td className="p-4">{item.total}</td>
                      <td className="p-4">{item.obtained}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GradePage;