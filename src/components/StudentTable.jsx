import { useState, useEffect } from 'react';

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [filterId, setFilterId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('authToken');
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

        const processedStudents = await Promise.all(
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
                attendance: `${riskData.attendance_percentage.toFixed(0)}%`,
                gpa: riskData.gpa.toFixed(1),
                assignments: `${riskData.assignment_submission_rate.toFixed(0)}%`,
                risk: riskData.risk_prediction.risk_level,
              };
            } catch (err) {
              console.warn(`Risk analysis fetch failed for ${student.name}: ${err.message}`);
              return {
                id: student.roll_number,
                name: student.name,
                attendance: '80%',
                gpa: 3.0,
                assignments: '80%',
                risk: 'Medium',
              };
            }
          })
        );

        setStudents(processedStudents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = filterId
    ? students.filter((student) => student.id === filterId)
    : students;

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark-text mb-4">At-Risk Students</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark-text mb-4">At-Risk Students</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-dark-text">At-Risk Students</h3>
        <div className="flex items-center space-x-2">
          <select
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="">Filter By: Student ID</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.id}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFilterId('')}
            className="text-button-blue hover:underline"
          >
            View All
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600">
            <th className="py-2">Student ID</th>
            <th>Student Name</th>
            <th>Attendance</th>
            <th>Historic Average GPA</th>
            <th>Assignment Submitted</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="py-2 text-gray-800">{student.id}</td>
              <td className="py-2 text-gray-800">{student.name}</td>
              <td className="py-2 text-gray-800">{student.attendance}</td>
              <td className="py-2 text-gray-800">{student.gpa}</td>
              <td className="py-2 text-gray-800">{student.assignments}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    student.risk === 'High Risk' ? 'bg-red-500' 
                    : student.risk === 'Medium Risk' ? 'bg-yellow-400' 
                    : 'bg-green-500' // Replaced bg-risk-low with bg-green-500 for consistency
                  }`}
                >
                  {student.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;