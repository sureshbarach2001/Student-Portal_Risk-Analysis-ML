import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';
import { useAuth } from '../context/AuthContext';

function GradePage() {
  const [marksData, setMarksData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const { token } = useAuth();

  // Fetch marks data on mount
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-marks/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Marks data:', data);
          setMarksData(data);
          setFilteredData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch marks data');
          console.error('Error:', errorData);
        }
      } catch (err) {
        setError('Network error. Please try again later.');
        console.error('Network error:', err);
      }
    };

    if (token) {
      fetchMarks();
    } else {
      setError('Please log in to view grades.');
    }
  }, [token]);

  // Filter data when year, semester, or subject changes
  useEffect(() => {
    let filtered = marksData;

    if (year) {
      filtered = filtered.filter((record) => new Date(record.date).getFullYear().toString() === year);
    }

    if (semester) {
      filtered = filtered.filter((record) => {
        const month = new Date(record.date).getMonth(); // 0 = Jan, 11 = Dec
        if (semester === '1') return month <= 5; // Jan-Jun
        if (semester === '2') return month >= 6; // Jul-Dec
        return true;
      });
    }

    if (subject) {
      filtered = filtered.filter((record) => record.course.name === subject);
    }

    setFilteredData(filtered);
  }, [year, semester, subject, marksData]);

  // Get unique years for dropdown
  const getYears = () => {
    const years = new Set(marksData.map((record) => new Date(record.date).getFullYear()));
    return ['', ...years].sort();
  };

  // Get unique subjects for dropdown
  const getSubjects = () => {
    const subjects = new Set(marksData.map((record) => record.course.name));
    return ['', ...subjects].sort();
  };

  // Format date (e.g., "2025-01-05" to "Jan 5 2025")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format assessment name (e.g., "assignment", 1 to "Assignment 1")
  const formatAssessment = (type, number) => {
    const typeFormatted = type.charAt(0).toUpperCase() + type.slice(1);
    return `${typeFormatted} ${number}`;
  };

  // Determine status
  const getStatus = (marks, max_marks) => {
    return marks >= 0 ? 'Completed' : 'Not Submitted';
  };

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

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Filters */}
            <div className="flex items-center mb-6 space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm"
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
                  className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm"
                >
                  <option value="">All Semesters</option>
                  <option value="1">Semester 1 (Jan-Jun)</option>
                  <option value="2">Semester 2 (Jul-Dec)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Program</label>
                <select
                  className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm opacity-50"
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
                  className="w-36 p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm"
                >
                  <option value="">All Subjects</option>
                  {getSubjects().map((s) => (
                    s && <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

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
                  {filteredData.length > 0 ? (
                    filteredData.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200">
                        <td className="p-4 font-medium">
                          {formatAssessment(record.assessment_type, record.assessment_number)}
                        </td>
                        <td className="p-4">{formatDate(record.date)}</td>
                        <td className="p-4">{record.max_marks}</td>
                        <td className="p-4">{record.marks >= 0 ? record.marks : '-'}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${
                              getStatus(record.marks, record.max_marks) === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {getStatus(record.marks, record.max_marks)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-gray-600 text-center">
                        No marks records found.
                      </td>
                    </tr>
                  )}
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