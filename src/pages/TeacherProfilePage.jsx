import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path as needed
import Header from "../components/Header"; // Adjust path as needed

function TeacherProfilePage() {
  const [role, setRole] = useState("Admin"); // Role is fixed as in the image
  const [attendanceThreshold, setAttendanceThreshold] = useState(50); // Default from image
  const [gradeCutOff, setGradeCutOff] = useState(85); // Default from image
  const [exportFormat, setExportFormat] = useState("CSV"); // Default from image

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings updated:", {
      role,
      attendanceThreshold,
      gradeCutOff,
      exportFormat,
    });
    alert("Settings updated successfully! (Dummy action)");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage="settings" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />

        {/* Settings Content */}
        <main className="pt-20 px-8 pb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            {/* Assign Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Assign Role :
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                enabled={true} // Role is fixed as in the image
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            {/* Parameter Configuration */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Parameter Configuration
              </h2>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="attendance-threshold"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Attendance Threshold for High-Risk Students (%)
                  </label>
                  <input
                    type="number"
                    id="attendance-threshold"
                    value={attendanceThreshold}
                    onChange={(e) => setAttendanceThreshold(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    placeholder="Enter percentage"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="grade-cutoff"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Grade Prediction Cut-Off (%)
                  </label>
                  <input
                    type="number"
                    id="grade-cutoff"
                    value={gradeCutOff}
                    onChange={(e) => setGradeCutOff(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                    placeholder="Enter percentage"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Data Export
              </h2>
              <label
                htmlFor="export-format"
                className="block text-sm font-medium text-gray-700"
              >
                Select Export Format
              </label>
              <select
                id="export-format"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              >
                <option value="CSV">CSV</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default TeacherProfilePage;
