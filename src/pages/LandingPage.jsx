import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import StudentTable from '../components/StudentTable';
import FileUpload from '../components/FileUpload';
import ManualForm from '../components/ManualForm';

function LandingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rollNumber, setRollNumber] = useState('');
  const [downloadOption, setDownloadOption] = useState('all');
  const [riskCounts, setRiskCounts] = useState({
    high: 0,
    medium: 0,
    low: 0,
  });
  const [trends, setTrends] = useState({
    high: { change: '0%', trend: 'up' },
    medium: { change: '0%', trend: 'up' },
    low: { change: '0%', trend: 'up' },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const studentsResponse = await fetch('http://localhost:8000/api/students/all-details/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!studentsResponse.ok) {
          throw new Error(`Failed to fetch student data: ${studentsResponse.statusText}`);
        }

        const studentsData = await studentsResponse.json();

        if (!Array.isArray(studentsData) || studentsData.length === 0) {
          setLoading(false);
          return;
        }

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
              const riskLevel = riskData?.risk_prediction?.risk_level;

              const normalizedRisk = riskLevel
                ? riskLevel.replace(' Risk', '')
                : 'Medium';

              return {
                id: student.roll_number,
                name: student.name,
                attendance: riskData.attendance_percentage
                  ? `${riskData.attendance_percentage.toFixed(0)}%`
                  : '80%',
                gpa: riskData.gpa ? riskData.gpa.toFixed(1) : 3.0,
                assignments: riskData.assignment_submission_rate
                  ? `${riskData.assignment_submission_rate.toFixed(0)}%`
                  : '80%',
                risk: normalizedRisk,
              };
            } catch {
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

        const counts = processedStudents.reduce(
          (acc, student) => {
            const riskLevel = student.risk?.toLowerCase() || 'medium';
            if (riskLevel === 'high') acc.high += 1;
            else if (riskLevel === 'medium') acc.medium += 1;
            else if (riskLevel === 'low') acc.low += 1;
            return acc;
          },
          { high: 0, medium: 0, low: 0 }
        );

        const total = counts.high + counts.medium + counts.low;
        const baseline = total > 0 ? total / 3 : 0;

        const computedTrends = {
          high: {
            change: total ? Math.round(((counts.high - baseline) / baseline) * 100) + '%' : '0%',
            trend: counts.high >= baseline ? 'up' : 'down',
          },
          medium: {
            change: total ? Math.round(((counts.medium - baseline) / baseline) * 100) + '%' : '0%',
            trend: counts.medium >= baseline ? 'up' : 'down',
          },
          low: {
            change: total ? Math.round(((counts.low - baseline) / baseline) * 100) + '%' : '0%',
            trend: counts.low >= baseline ? 'up' : 'down',
          },
        };

        setRiskCounts(counts);
        setTrends(computedTrends);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setRollNumber('');
    setDownloadOption('all');
  };

  const handleDownload = async () => {
    try {
      const baseUrl = 'http://localhost:8000/api/teacher/students/export-csv';
      const url =
        downloadOption === 'specific' && rollNumber
          ? `${baseUrl}/${rollNumber}/`
          : `${baseUrl}/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to download CSV');

      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : downloadOption === 'specific'
        ? `${rollNumber}_data.csv`
        : 'all_students_data.csv';

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      handleCloseDialog();
    } catch (error) {
      alert(`Failed to download CSV: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="mb-6">
            <button
              onClick={handleOpenDialog}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download Student Data
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-dark-text mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="High Risk" value={riskCounts.high} change={trends.high.change} trend={trends.high.trend} />
              <StatCard title="Medium Risk" value={riskCounts.medium} change={trends.medium.change} trend={trends.medium.trend} />
              <StatCard title="Low Risk" value={riskCounts.low} change={trends.low.change} trend={trends.low.trend} />
            </div>
          </div>

          <div className="mb-6">
            <StudentTable />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload />
            <ManualForm />
          </div>
        </main>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-black font-semibold mb-4">Download Student Data</h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-black">Select Download Option</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="all"
                  name="downloadOption"
                  value="all"
                  checked={downloadOption === 'all'}
                  onChange={() => setDownloadOption('all')}
                  className="mr-2"
                />
                <label className="text-black" htmlFor="all">All Students</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="specific"
                  name="downloadOption"
                  value="specific"
                  checked={downloadOption === 'specific'}
                  onChange={() => setDownloadOption('specific')}
                  className="mr-2"
                />
                <label className="text-black" htmlFor="specific">Specific Student</label>
              </div>
            </div>
            {downloadOption === 'specific' && (
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block mb-2 font-medium">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter roll number (e.g., S001)"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                disabled={downloadOption === 'specific' && !rollNumber}
                className={`px-4 py-2 text-white rounded-md ${
                  downloadOption === 'specific' && !rollNumber
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
