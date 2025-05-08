import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function GradePredictionPage() {
  const [studentData, setStudentData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [filterId, setFilterId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map numerical grade to letter grade
  const getLetterGrade = (predictedGrade) => {
    const grade = parseFloat(predictedGrade);
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B+';
    if (grade >= 70) return 'B';
    if (grade >= 60) return 'C';
    if (grade >= 50) return 'D';
    return 'F';
  };

  // Function to derive suggestion based on risk level
  const getSuggestion = (riskLevel) => {
    switch (riskLevel) {
      case 'High Risk':
        return 'Seek academic support and improve attendance.';
      case 'Medium Risk':
        return 'Maintain consistency and focus on weak areas.';
      case 'Low Risk':
        return 'Keep up the good work!';
      default:
        return 'No suggestion available.';
    }
  };

  // Fetch data from APIs
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Adjust based on how you store the token
        const studentsResponse = await fetch('http://localhost:8000/api/students/all-details/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!studentsResponse.ok) {
          throw new Error('Failed to fetch student data');
        }

        const studentsData = await studentsResponse.json();

        const processedStudentData = await Promise.all(
          studentsData.map(async (item) => {
            const { student } = item;
            try {
              const riskResponse = await fetch(
                `http://localhost:8000/api/teacher/risk-analysis/${student.name}/`,
                {
                  headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (!riskResponse.ok) {
                throw new Error(`Failed to fetch risk analysis for ${student.name}`);
              }

              const riskData = await riskResponse.json();

              return {
                id: student.roll_number,
                name: student.name,
                predictedGrade: riskData.risk_prediction.predicted_grade.toFixed(2),
                marks: `${riskData.average_marks.toFixed(0)}%`,
                attendance: `${riskData.attendance_percentage.toFixed(0)}%`,
                avgGPA: riskData.gpa.toFixed(2),
                suggestion: getSuggestion(riskData.risk_prediction.risk_level),
              };
            } catch (err) {
              console.warn(`Risk analysis fetch failed for ${student.name}: ${err.message}`);
              return {
                id: student.roll_number,
                name: student.name,
                predictedGrade: '75.00',
                marks: '75%',
                attendance: '80%',
                avgGPA: 3.0,
                suggestion: 'Keep up the good work!',
              };
            }
          })
        );

        const gradeCounts = processedStudentData.reduce((acc, student) => {
          const letterGrade = getLetterGrade(student.predictedGrade);
          acc[letterGrade] = (acc[letterGrade] || 0) + 1;
          return acc;
        }, {});

        const processedGradeData = Object.keys(gradeCounts)
          .map((grade) => ({
            grade,
            count: gradeCounts[grade],
            fill: {
              A: '#5EEAD4',
              'B+': '#60A5FA',
              B: '#93C5FD',
              C: '#FACC15',
              D: '#F472B6',
              F: '#C084FC',
            }[grade] || '#000000',
          }))
          .sort((a, b) => {
            const gradeOrder = ['A', 'B+', 'B', 'C', 'D', 'F'];
            return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
          });

        setStudentData(processedStudentData);
        setGradeData(processedGradeData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const filteredData = filterId
    ? studentData.filter((student) => student.id === filterId)
    : studentData;

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="w-16 bg-gray-800 text-white flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 ml-64 mt-16">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="w-16 bg-gray-800 text-white flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 ml-64 mt-16">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-16 bg-gray-800 text-white flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 ml-64 mt-16">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Dashboard Overview</h2>

          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <BarChart width={600} height={300} data={gradeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="grade" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Grade Distribution" fill="#000000" />
            </BarChart>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-button-blue text-black">
                  <th className="p-3">Student Id</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Predicted Grade</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Average GPA</th>
                  <th className="p-3">Grade Improvement Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((student, index) => (
                  <tr
                    key={student.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="p-3 text-black">{student.id}</td>
                    <td className="p-3 text-black">{student.name}</td>
                    <td className="p-3 text-black">{getLetterGrade(student.predictedGrade)}</td>
                    <td className="p-3 text-black">{student.marks}</td>
                    <td className="p-3 text-black">{student.attendance}</td>
                    <td className="p-3 text-black">{student.avgGPA}</td>
                    <td className="p-3 text-black">{student.suggestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-text-gray">Filter By:</span>
              <select
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
              >
                <option value="">Student Id</option>
                {studentData.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.id}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setFilterId('')}
              className="px-4 py-2 text-button-blue border border-button-blue rounded-lg hover:bg-button-blue hover:text-white"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradePredictionPage;
