import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../context/AuthContext';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

function OverviewPage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Chart data states
  const [marksChartData, setMarksChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Marks',
        data: [0, 0, 0, 0, 0],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  });
  const [attendanceChartData, setAttendanceChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Attendance',
        data: [0, 0, 0, 'Apr', 'May'],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
    ],
  });
  const [marksPercentage, setMarksPercentage] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  // Chart options
  const marksOptions = {
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  const attendanceOptions = {
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  // Static GPA data (no API provided)
  const gpaData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Average GPA',
        data: [2.2, 2.4, 2.5, 2.7, 2.8],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const gpaOptions = {
    scales: {
      y: { beginAtZero: true, max: 4 },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  // Fetch attendance and marks data
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
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch attendance data');
        }
      } catch (err) {
        setError('Network error fetching attendance.');
      }
    };

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
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch marks data');
        }
      } catch (err) {
        setError('Network error fetching marks.');
      }
    };

    if (token) {
      fetchAttendance();
      fetchMarks();
    } else {
      setError('Please log in to view overview.');
    }
  }, [token]);

  // Process data for charts
  useEffect(() => {
    // Months to display (match dummy data)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const monthIndices = [0, 1, 2, 3, 4]; // Jan=0, ..., May=4

    // Attendance: Calculate % of present days per month
    const attendanceByMonth = Array(5).fill().map(() => ({ present: 0, total: 0 }));
    attendanceData.forEach((record) => {
      const date = new Date(record.date);
      const monthIndex = date.getMonth();
      if (monthIndex <= 4) { // Limit to Jan-May
        attendanceByMonth[monthIndex].total += 1;
        if (record.is_present) {
          attendanceByMonth[monthIndex].present += 1;
        }
      }
    });

    const attendancePercentages = attendanceByMonth.map((m) =>
      m.total > 0 ? Math.round((m.present / m.total) * 100) : 0
    );
    const overallAttendance = attendanceData.length > 0
      ? Math.round(
          (attendanceData.filter((r) => r.is_present).length / attendanceData.length) * 100
        )
      : 0;

    // Marks: Calculate average % per month
    const marksByMonth = Array(5).fill().map(() => ({ totalMarks: 0, maxMarks: 0 }));
    marksData.forEach((record) => {
      if (record.marks >= 0) { // Exclude not submitted
        const date = new Date(record.date);
        const monthIndex = date.getMonth();
        if (monthIndex <= 4) {
          marksByMonth[monthIndex].totalMarks += record.marks;
          marksByMonth[monthIndex].maxMarks += record.max_marks;
        }
      }
    });

    const marksPercentages = marksByMonth.map((m) =>
      m.maxMarks > 0 ? Math.round((m.totalMarks / m.maxMarks) * 100) : 0
    );
    const validMarks = marksData.filter((r) => r.marks >= 0);
    const overallMarks = validMarks.length > 0
      ? Math.round(
          (validMarks.reduce((sum, r) => sum + r.marks, 0) /
            validMarks.reduce((sum, r) => sum + r.max_marks, 0)) * 100
        )
      : 0;

    // Update chart data
    setAttendanceChartData({
      labels: months,
      datasets: [
        {
          label: 'Attendance',
          data: attendancePercentages,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
        },
      ],
    });

    setMarksChartData({
      labels: months,
      datasets: [
        {
          label: 'Marks',
          data: marksPercentages,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
        },
      ],
    });

    setAttendancePercentage(overallAttendance);
    setMarksPercentage(overallMarks);
  }, [attendanceData, marksData]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage="overview" />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Overview</h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Top Row: Cards */}
            <div className="flex space-x-4 mb-6">
              {/* Marks Card */}
              <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Marks</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{marksPercentage}%</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <span className="mr-1">↑ Trend</span>
                </p>
                <div className="mt-4 h-24">
                  <Line data={marksChartData} options={marksOptions} />
                </div>
              </div>

              {/* Attendance Card */}
              <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Attendance</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{attendancePercentage}%</p>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  <span className="mr-1">↓ Trend</span>
                </p>
                <div className="mt-4 h-24">
                  <Line data={attendanceChartData} options={attendanceOptions} />
                </div>
              </div>

              {/* Average GPA Card */}
              <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Average GPA</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">2.8</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <span className="mr-1">↑ 20% vs last Semester</span>
                </p>
                <div className="mt-4 h-24">
                  <Line data={gpaData} options={gpaOptions} />
                </div>
              </div>
            </div>

            {/* Subject Overview */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Subject Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Subject</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Predicted Score</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 text-gray-600 border-b border-gray-200">Mathematics</td>
                      <td className="p-4 text-gray-600 border-b border-gray-200">86%</td>
                      <td className="p-4 border-b border-gray-200">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-600 border-b border-gray-200">Science</td>
                      <td className="p-4 text-gray-600 border-b border-gray-200">74%</td>
                      <td className="p-4 border-b border-gray-200">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-600 border-b border-gray-200">English</td>
                      <td className="p-4 text-gray-600 border-b border-gray-200">80%</td>
                      <td className="p-4 border-b border-gray-200">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-600 border-b border-gray-200">History</td>
                      <td className="p-4 text-gray-600 border-b border-gray-200">70%</td>
                      <td className="p-4 border-b border-gray-200">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-600 border-b border-gray-200">Geography</td>
                      <td className="p-4 text-gray-600 border-b border-gray-200">90%</td>
                      <td className="p-4 border-b border-gray-200">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          Low
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OverviewPage;