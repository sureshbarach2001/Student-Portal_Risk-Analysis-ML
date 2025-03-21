function StudentTable() {
    const students = [
      { id: '#1275', name: 'Dominic Reynode', attendance: '85%', gpa: 2.8, assignments: '80%', risk: 'High' },
      { id: '#45', name: 'Ava Sullivan', attendance: '92%', gpa: 3.8, assignments: '80%', risk: 'Medium' },
      { id: '#55', name: 'Jessica Bennett', attendance: '75%', gpa: 3.6, assignments: '80%', risk: 'Medium' },
      { id: '#75', name: 'Michael Thompson', attendance: '78%', gpa: 2.9, assignments: '80%', risk: 'Medium' },
      { id: '#46', name: 'Jackie Kim', attendance: '90%', gpa: 3.8, assignments: '70%', risk: 'Low' },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-dark-text">At-Risk Students</h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-lg px-2 py-1">
              <option>Filter By: Student ID</option>
            </select>
            <a href="#" className="text-button-blue hover:underline">View All</a>
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
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-2 text-gray-800">{student.id}</td>
                <td className="py-2 text-gray-800">{student.name}</td>
                <td className="py-2 text-gray-800">{student.attendance}</td>
                <td className="py-2 text-gray-800">{student.gpa}</td>
                <td className="py-2 text-gray-800">{student.assignments}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      student.risk === 'High'
                        ? 'bg-risk-high'
                        : student.risk === 'Medium'
                        ? 'bg-risk-medium'
                        : 'bg-risk-low'
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