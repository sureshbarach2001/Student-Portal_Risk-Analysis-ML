import Sidebar from '../components/Sidebar';
import Header from '../components/Header_Student';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

function OverviewPage() {
  // Data for the Marks graph
  const marksData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Marks',
        data: [60, 70, 80, 82, 84],
        borderColor: '#10B981', // Green
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const marksOptions = {
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  // Data for the Attendance graph
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Attendance',
        data: [80, 75, 70, 72, 70],
        borderColor: '#EF4444', // Red
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
    ],
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

  // Data for the Average GPA graph
  const gpaData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Average GPA',
        data: [2.2, 2.4, 2.5, 2.7, 2.8],
        borderColor: '#10B981', // Green
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

            {/* Top Row: Cards */}
            <div className="flex space-x-4 mb-6">
              {/* Marks Card */}
              <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Marks</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">84%</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <span className="mr-1">↑ 40% vs last Semester</span>
                </p>
                <div className="mt-4 h-24">
                  <Line data={marksData} options={marksOptions} />
                </div>
              </div>

              {/* Attendance Card */}
              <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Attendance</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">70%</p>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  <span className="mr-1">↓ 10% vs last Semester</span>
                </p>
                <div className="mt-4 h-24">
                  <Line data={attendanceData} options={attendanceOptions} />
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