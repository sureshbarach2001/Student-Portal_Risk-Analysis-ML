import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';
import { useAuth } from '../context/AuthContext';

function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const { token } = useAuth();

  // Fetch attendance data on mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-attendance/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Attendance data:', data);
          setAttendanceData(data);
          setFilteredData(data); // Initialize filtered data
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch attendance data');
          console.error('Error:', errorData);
        }
      } catch (err) {
        setError('Network error. Please try again later.');
        console.error('Network error:', err);
      }
    };

    if (token) {
      fetchAttendance();
    } else {
      setError('Please log in to view attendance.');
    }
  }, [token]);

  // Filter data when year, semester, or subject changes
  useEffect(() => {
    let filtered = attendanceData;

    if (year) {
      filtered = filtered.filter((record) => new Date(record.date).getFullYear().toString() === year);
    }

    if (semester) {
      filtered = filtered.filter((record) => {
        const month = new Date(record.date).getMonth(); // 0 = Jan, 11 = Dec
        if (semester === '1') return month <= 5; // Jan-Jun = Semester 1
        if (semester === '2') return month >= 6; // Jul-Dec = Semester 2
        return true;
      });
    }

    if (subject) {
      filtered = filtered.filter((record) => record.subject.name === subject);
    }

    setFilteredData(filtered);
  }, [year, semester, subject, attendanceData]);

  // Get unique years for dropdown
  const getYears = () => {
    const years = new Set(attendanceData.map((record) => new Date(record.date).getFullYear()));
    return ['', ...years].sort(); // Include empty option for "All"
  };

  // Get unique subjects for dropdown
  const getSubjects = () => {
    const subjects = new Set(attendanceData.map((record) => record.subject.name));
    return ['', ...subjects].sort(); // Include empty option for "All"
  };

  // Format date (e.g., "2024-03-15" to "Mar 15 2024")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time (e.g., "21:34:31.268600" to "9:34 PM")
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

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

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Filters */}
            <div className="flex items-center mb-4 space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">All Years</option>
                  {getYears().map((y) => (
                    y && <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">All Semesters</option>
                  <option value="1">Semester 1 (Jan-Jun)</option>
                  <option value="2">Semester 2 (Jul-Dec)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Program</label>
                <select
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black opacity-50"
                  disabled
                >
                  <option>MIT</option>
                  <option>CS</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  <option value="">All Subjects</option>
                  {getSubjects().map((s) => (
                    s && <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Date</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Subject</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Check-in Time</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((record) => (
                      <tr key={record.id}>
                        <td className="p-4 text-gray-600 border-b border-gray-200">
                          {formatDate(record.date)}
                        </td>
                        <td className="p-4 text-gray-600 border-b border-gray-200">
                          {record.subject.name}
                        </td>
                        <td className="p-4 text-gray-600 border-b border-gray-200">
                          {formatTime(record.checkin_time)}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          <span
                            className={`inline-block px-3 py-1 text-sm rounded-full ${
                              record.is_present
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {record.is_present ? 'Present' : 'Absent'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-gray-600 text-center">
                        No attendance records found.
                      </td>
                    </tr>
                  )}
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