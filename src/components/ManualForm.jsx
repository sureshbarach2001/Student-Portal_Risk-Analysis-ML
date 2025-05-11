import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth for token

function ManualForm() {
  // State for form fields
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState('');
  const [gpa, setGpa] = useState(''); // Not sent to API, but kept for form
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { token } = useAuth(); // Get token from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate numeric fields
    if (isNaN(marks) || marks < 0 || marks > 100) {
      setError('Marks must be a number between 0 and 100');
      return;
    }
    if (isNaN(attendance) || attendance < 0 || attendance > 100) {
      setError('Attendance % must be a number between 0 and 100');
      return;
    }
    if (isNaN(assignmentSubmitted) || assignmentSubmitted < 0 || assignmentSubmitted > 100) {
      setError('Assignment Submitted % must be a number between 0 and 100');
      return;
    }

    // Prepare data for API (excluding GPA)
    const data = {
      roll_number: studentId,
      name,
      marks: parseFloat(marks),
      attendance_percentage: parseFloat(attendance),
      assignment_submission: parseFloat(assignmentSubmitted),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher/manual-student-data/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Include token in headers
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || 'Student data saved successfully!');
        // Clear form fields
        setStudentId('');
        setName('');
        setMarks('');
        setAttendance('');
        setAssignmentSubmitted('');
        setGpa('');
      } else {
        setError(result.error || 'Failed to save student data. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Network error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-dark-text mb-4">Manual Entry Form</h3>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Attendance %"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Assignment Submitted"
            value={assignmentSubmitted}
            onChange={(e) => setAssignmentSubmitted(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Historic Average GPA"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-button-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ManualForm;