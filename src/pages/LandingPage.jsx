import { useState } from 'react';
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setRollNumber('');
    setDownloadOption('all');
  };

  const handleDownload = async () => {
    try {
      const baseUrl = 'http://localhost:8000/api/teacher/students/export-csv'; // Replace with your API base URL
      const url = downloadOption === 'specific' && rollNumber 
        ? `${baseUrl}/${rollNumber}/`
        : `${baseUrl}/`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`, // Assuming token-based auth
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : downloadOption === 'specific' ? `${rollNumber}_data.csv` : 'all_students_data.csv';

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
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          {/* Download Button */}
          <div className="mb-6">
            <button
              onClick={handleOpenDialog}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download Student Data
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-dark-text mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="High Risk" value="14" change="+40%" trend="up" />
              <StatCard title="Medium Risk" value="26" change="-10%" trend="down" />
              <StatCard title="Low Risk" value="43" change="+20%" trend="up" />
            </div>
          </div>

          {/* At-Risk Students Table */}
          <div className="mb-6">
            <StudentTable />
          </div>

          {/* Data Upload and Manual Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload />
            <ManualForm />
          </div>
        </main>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-black font-semibold mb-4">Download Student Data</h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-black">
                Select Download Option
              </label>
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
                <label className='text-black' htmlFor="all">All Students</label>
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
                <label className='text-black' htmlFor="specific">Specific Student</label>
              </div>
            </div>
            {downloadOption === 'specific' && (
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block mb-2 font-medium">
                  Roll Number
                </label>
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