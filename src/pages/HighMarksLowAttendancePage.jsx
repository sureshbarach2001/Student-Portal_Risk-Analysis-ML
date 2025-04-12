import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../context/AuthContext';

// Register Chart.js components
ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend);

function HighMarksLowAttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');
  const [threshold, setThreshold] = useState(80); // Default 80%
  const [studentData, setStudentData] = useState([]);
  const { token } = useAuth();

  // Fetch data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/all-attendance/`, {
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
        } else {
          setError('Failed to fetch attendance data');
        }
      } catch (err) {
        setError('Network error fetching attendance.');
      }
    };

    const fetchMarks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/all-marks/`, {
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
        } else {
          setError('Failed to fetch marks data');
        }
      } catch (err) {
        setError('Network error fetching marks.');
      }
    };

    if (token) {
      fetchAttendance();
      fetchMarks();
    } else {
      setError('Please log in to view at-risk data.');
    }
  }, [token]);

  // Process data
  useEffect(() => {
    // Filter out records without a student field
    const validAttendanceData = attendanceData.filter((r) => r.student && r.student.roll_number);
    const validMarksData = marksData.filter((r) => r.student && r.student.roll_number);

    // Group data by student
    const students = [...new Set([
      ...validAttendanceData.map((r) => r.student.roll_number),
      ...validMarksData.map((r) => r.student.roll_number),
    ])];

    const computedData = students.map((rollNumber) => {
      const studentAttendance = validAttendanceData.filter(
        (r) => r.student.roll_number === rollNumber
      );
      const studentMarks = validMarksData.filter(
        (r) => r.student.roll_number === rollNumber && r.marks >= 0
      );

      const attendancePercentage = studentAttendance.length > 0
        ? Math.round(
            (studentAttendance.filter((r) => r.is_present).length /
              studentAttendance.length) * 100
          )
        : 0;

      const marksPercentage = studentMarks.length > 0
        ? Math.round(
            (studentMarks.reduce((sum, r) => sum + r.marks, 0) /
              studentMarks.reduce((sum, r) => sum + r.max_marks, 0)) * 100
          )
        : 0;

      return {
        name: studentAttendance[0]?.student.name || studentMarks[0]?.student.name || rollNumber,
        attendance: attendancePercentage,
        marks: marksPercentage,
      };
    });

    setStudentData(computedData);
  }, [attendanceData, marksData]);

  // Chart data
  const scatterData = {
    datasets: [
      {
        label: 'Students',
        data: studentData.map((student) => ({
          x: student.attendance,
          y: student.marks,
        })),
        backgroundColor: 'rgba(0, 255, 255, 0.6)', // Cyan
        pointRadius: 5,
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: {
        title: { display: true, text: 'Attendance (%)' },
        min: 0,
        max: 100,
      },
      y: {
        title: { display: true, text: 'Marks (%)' },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: { position: 'top' },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: threshold,
            xMax: threshold,
            borderColor: 'rgba(0, 0, 255, 0.5)',
            borderWidth: 2,
            label: {
              content: 'Threshold',
              enabled: true,
              position: 'top',
            },
          },
        },
      },
    },
  };

  // Students below threshold
  const atRiskStudents = studentData.filter((student) => student.attendance < threshold);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="at-risk" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="mb-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search students, IDs, or keywords..."
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-black shadow-sm"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              High Marks / Low Attendance
            </h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}

            {/* Scatter Plot */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="h-96">
                <Scatter data={scatterData} options={scatterOptions} />
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Attendance Threshold: {threshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* At-Risk Students List */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              {atRiskStudents.length > 0 ? (
                atRiskStudents.map((student, index) => (
                  <div key={index} className="border-b border-gray-200 py-2">
                    <p className="text-gray-700">
                      {student.name} (Attendance: {student.attendance}%, Marks: {student.marks}%)
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No students below threshold.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HighMarksLowAttendancePage;