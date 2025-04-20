import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

function SearchPage() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [performanceSummary, setPerformanceSummary] = useState(null);
  const [subjectScores, setSubjectScores] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('Ava Sullivan'); // Default search query
  const { token } = useAuth();

  // Fetch student data
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/student-details/`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Student data:', data);

//           // Assuming the API returns data in the following structure:
//           // { studentInfo: {...}, performanceSummary: {...}, subjectScores: [...] }
//           setStudentInfo(data.studentInfo);
//           setPerformanceSummary(data.performanceSummary);
//           setSubjectScores(data.subjectScores);
//         } else {
//           setError('Failed to fetch student data');
//         }
//       } catch (err) {
//         setError('Network error fetching student data.');
//       }
//     };

//     if (token) {
//       fetchStudentData();
//     } else {
//       setError('Please log in to view student data.');
//     }
//   }, [token]);

  // Mock data in case API isn't available (for development purposes)
  useEffect(() => {
    if (!studentInfo && !performanceSummary && !subjectScores.length) {
      // Mock data if API fetch fails or for development
      setStudentInfo({
        fullName: 'Ava Sullivan',
        studentId: 'ID1152',
        gradeClass: 'Section 1',
        contact: 'ava.sullivan@example.com',
      });
      setPerformanceSummary({
        predictedGrade: 'A',
        marks: '80%',
        attendance: '85%',
        averageGPA: '3.2',
      });
      setSubjectScores([
        { name: 'Mathematics', score: '88%', riskLevel: 'Low' },
        { name: 'Science', score: '74%', riskLevel: 'Medium' },
        { name: 'English', score: '80%', riskLevel: 'Low' },
        { name: 'History', score: '70%', riskLevel: 'Medium' },
        { name: 'Geography', score: '90%', riskLevel: 'Low' },
      ]);
    }
  }, [studentInfo, performanceSummary, subjectScores]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="performance-prediction" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="mb-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search students, IDs, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-1">1 RESULT FOUND...</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}

            {/* Detailed Student Information */}
            {studentInfo && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Detailed Student Information
                </h2>
                <p className="text-gray-700">
                  <strong>Full Name:</strong> {studentInfo.fullName}
                </p>
                <p className="text-gray-700">
                  <strong>Student ID:</strong> {studentInfo.studentId}
                </p>
                <p className="text-gray-700">
                  <strong>Grade/Class:</strong> {studentInfo.gradeClass}
                </p>
                <p className="text-gray-700">
                  <strong>Contact:</strong> {studentInfo.contact}
                </p>
              </div>
            )}

            {/* Performance Summary */}
            {performanceSummary && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Performance Summary
                </h2>
                <p className="text-gray-700">
                  <strong>Predicted Grade:</strong> {performanceSummary.predictedGrade}
                </p>
                <p className="text-gray-700">
                  <strong>Marks:</strong> {performanceSummary.marks}
                </p>
                <p className="text-gray-700">
                  <strong>Attendance:</strong> {performanceSummary.attendance}
                </p>
                <p className="text-gray-700">
                  <strong>Average GPA:</strong> {performanceSummary.averageGPA}
                </p>
              </div>
            )}

            {/* Detailed Subject-wise Predicted Scores */}
            {subjectScores.length > 0 && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Detailed Subject-wise Predicted Scores
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-gray-600">Subject</th>
                        <th className="p-2 text-gray-600">Predicted Score</th>
                        <th className="p-2 text-gray-600">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectScores.map((subject, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="p-2 text-gray-700">{subject.name}</td>
                          <td className="p-2 text-gray-700">{subject.score}</td>
                          <td className="p-2">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm ${
                                subject.riskLevel === 'Low'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-yellow-200 text-yellow-800'
                              }`}
                            >
                              {subject.riskLevel}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SearchPage;