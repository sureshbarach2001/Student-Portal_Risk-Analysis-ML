function ManualForm() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark-text mb-4">Manual Entry Form</h3>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Student ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Marks"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Attendance %"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Assignment Submitted"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Historic Average GPA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button-blue"
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