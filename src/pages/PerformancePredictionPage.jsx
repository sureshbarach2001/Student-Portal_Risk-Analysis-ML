import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function PerformancePredictionPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    totalAttendance: '',
    marksPreviousExams: '',
    assignmentSubmissionRate: '',
    engagementMetrics: '',
    historicalGPA: '',
    riskLevel: '',
    predictedGrade: '',
  });

  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [chartData, setChartData] = useState([
    { name: 'Jan', performance: 85 },
    { name: 'Feb', performance: 90 },
    { name: 'Mar', performance: 80 },
    { name: 'Apr', performance: 75 },
    { name: 'May', performance: 85 },
  ]);

  const [predictionSummary, setPredictionSummary] = useState({
    excelPercentage: 85,
    predictedScore: 78,
    riskLevel: 'Not Available',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchRollNumber(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const studentResponse = await fetch(`http://localhost:8000/api/students/search/${searchRollNumber}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
      });

      if (!studentResponse.ok) {
        const errorData = await studentResponse.json();
        throw new Error(`Error ${studentResponse.status}: ${errorData.error || studentResponse.statusText}`);
      }

      const studentData = await studentResponse.json();
      if (!studentData.student) {
        throw new Error('Student data not found in response');
      }

      const username = studentData.student.name;
      const riskResponse = await fetch(`http://localhost:8000/api/teacher/risk-analysis/${username}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
      });

      if (!riskResponse.ok) {
        const errorData = await riskResponse.json();
        throw new Error(`Error ${riskResponse.status}: ${errorData.error || riskResponse.statusText}`);
      }

      const riskData = await riskResponse.json();
      if (!riskData.name) {
        throw new Error('Risk analysis data not found in response');
      }

      processStudentData(studentData, riskData);
    } catch (error) {
      console.error('Search Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const processStudentData = (studentData, riskData) => {
    const { student, attendance, marks } = studentData;
    const { student_id, name, attendance_percentage, average_marks, assignment_submission_rate, engagement_metrics, gpa, risk_prediction } = riskData;

    const totalAttendanceRecords = Array.isArray(attendance) ? attendance.length : 0;
    const presentRecords = Array.isArray(attendance) ? attendance.filter(record => record.is_present).length : 0;
    const attendancePercentage = totalAttendanceRecords > 0 ? (presentRecords / totalAttendanceRecords) * 100 : 0;

    const totalMarks = Array.isArray(marks) ? marks.reduce((sum, record) => sum + record.marks, 0) : 0;
    const averageMarks = Array.isArray(marks) && marks.length > 0 ? totalMarks / marks.length : 0;

    const assignmentSubmissionRate = Array.isArray(marks) && marks.length > 0 ? 100 : 0;
    const engagementMetrics = 'Moderate';
    const historicalGPA = averageMarks > 0 ? (averageMarks / 100) * 4.0 : 0;

    const updatedFormData = {
      studentId: student_id ? student_id.toString() : student.id.toString(),
      studentName: name || student.name || '',
      totalAttendance: attendance_percentage ? attendance_percentage.toFixed(2) : attendancePercentage.toFixed(2),
      marksPreviousExams: average_marks ? average_marks.toFixed(2) : averageMarks.toFixed(2),
      assignmentSubmissionRate: assignment_submission_rate ? assignment_submission_rate.toFixed(2) : assignmentSubmissionRate.toFixed(2),
      engagementMetrics: engagement_metrics ? engagement_metrics.toFixed(2) : engagementMetrics,
      historicalGPA: gpa ? gpa.toFixed(2) : historicalGPA.toFixed(2),
      riskLevel: risk_prediction?.risk_level || 'Unknown',
      predictedGrade: risk_prediction?.predicted_grade ? (risk_prediction.predicted_grade * 100).toFixed(2) : '',
    };
    setFormData(updatedFormData);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const newChartData = Array.isArray(marks) && marks.length > 0
      ? marks.slice(0, 5).map((mark, index) => ({
          name: months[index] || `Month ${index + 1}`,
          performance: mark.marks || 0,
        }))
      : months.map((month, index) => ({
          name: month,
          performance: average_marks ? (index === 0 ? average_marks : 0) : 0,
        }));
    setChartData(newChartData);

    // Update prediction summary
    setPredictionSummary({
      excelPercentage: risk_prediction?.predicted_grade && risk_prediction.predicted_grade >= 0.8 ? 85 : 70,
      predictedScore: riskData.risk_prediction.predicted_grade ,
      riskLevel: risk_prediction?.risk_level || 'Not Available',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const payload = {
        username: formData.studentName,
        attendance: parseFloat(formData.totalAttendance) || 0,
        marks: parseFloat(formData.marksPreviousExams) || 0,
        assignment: parseFloat(formData.assignmentSubmissionRate) || 0,
        engagement: parseFloat(formData.engagementMetrics) || 0,
        gpa: parseFloat(formData.historicalGPA) || 0,
      };

      if (!payload.username || Object.values(payload).some(val => isNaN(val) && typeof val !== 'string')) {
        throw new Error('All fields are required and must be valid numbers except username');
      }

      const response = await fetch('http://localhost:8000/api/custom/risk-analysis/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
      }

      const riskData = await response.json();

      setFormData({
        ...formData,
        studentId: riskData.student_id.toString(),
        studentName: riskData.name,
        totalAttendance: riskData.input_data.attendance.toFixed(2),
        marksPreviousExams: riskData.input_data.average_marks.toFixed(2),
        assignmentSubmissionRate: riskData.input_data.assignment_submission_rate.toFixed(2),
        engagementMetrics: riskData.input_data.engagement_metrics.toFixed(2),
        historicalGPA: riskData.input_data.gpa.toFixed(2),
        riskLevel: riskData.risk_prediction.risk_level || 'Unknown',
        predictedGrade: riskData.risk_prediction.predicted_grade ? (riskData.risk_prediction.predicted_grade * 100).toFixed(2) : '',
      });

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newChartData = months.map((month, index) => ({
        name: month,
        performance: index === 0 ? riskData.input_data.average_marks : chartData[index]?.performance || 0,
      }));
      setChartData(newChartData);

      // Update prediction summary
      setPredictionSummary({
        excelPercentage: riskData.risk_prediction.predicted_grade && riskData.risk_prediction.predicted_grade >= 0.8 ? 85 : 70,
        predictedScore: riskData.risk_prediction.predicted_grade ,
        riskLevel: riskData.risk_prediction.risk_level || 'Not Available',
      });

      alert('Prediction completed successfully!');
    } catch (error) {
      console.error('Prediction Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleBulkPrediction = () => {
    alert('Running Bulk Prediction...');
  };

  const handleAIPrediction = () => {
    alert('Running AI Prediction...');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-16 bg-gray-800 text-white flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <div className="p-4 sm:p-6 lg:p-16 w-[75%] mx-auto">
          <div className="mb-6">
            <div className="flex items-center bg-white rounded-lg shadow-lg p-4">
              <input
                type="text"
                value={searchRollNumber}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                placeholder="Search students by roll number (e.g., S001)..."
              />
              <button
                onClick={handleSearchSubmit}
                className="ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Performance Prediction</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 overflow-x-auto">
              <div className="w-full min-w-[600px]">
                <LineChart
                  width={Math.min(window.innerWidth - 120, 800)}
                  height={400}
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#4b5563" />
                  <YAxis domain={[0, 100]} stroke="#4b5563" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#8b5cf6"
                    name="Performance Metric"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleBulkPrediction}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Run Bulk Prediction
              </button>
              <button
                onClick={handleAIPrediction}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Run AI Prediction
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Performance and Risk Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Student ID"
                />
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Student Name"
                />
                <input
                  type="number"
                  name="totalAttendance"
                  value={formData.totalAttendance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Total Attendance (%)"
                />
                <input
                  type="number"
                  name="marksPreviousExams"
                  value={formData.marksPreviousExams}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Marks in Previous Exams"
                />
                <input
                  type="number"
                  name="assignmentSubmissionRate"
                  value={formData.assignmentSubmissionRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Assignment Submission Rate (%)"
                />
                <input
                  type="number"
                  name="engagementMetrics"
                  value={formData.engagementMetrics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Engagement Metrics (%)"
                />
                <input
                  type="number"
                  name="historicalGPA"
                  value={formData.historicalGPA}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Historical GPA"
                />
                <input
                  type="text"
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-colors duration-200"
                  placeholder="Risk Level"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Run Prediction
              </button>
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Prediction Summary</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Percentage of Students Predicted to Excel: {predictionSummary.excelPercentage}%</li>
                  <li>Predicted Score: {predictionSummary.predictedScore}%</li>
                  <li>Risk Level: {predictionSummary.riskLevel}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformancePredictionPage;