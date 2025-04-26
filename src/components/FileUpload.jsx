import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Handle file drop or selection
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setUploadStatus({
        type: 'error',
        message: 'Invalid file type. Only .csv files are supported.',
      });
      setSelectedFile(null);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setUploadStatus({ type: 'success', message: `${file.name} selected.` });
    }
  }, []);

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  // Handle file upload to backend
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file to upload.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUploadStatus({ type: 'error', message: 'Authentication token not found. Please log in.' });
        return;
      }

      const response = await fetch('http://localhost:8000/api/students/upload-csv/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      // Handle both 201 (success) and 207 (partial success with errors)
      if (response.status === 201 || response.status === 207) {
        let message = `File uploaded successfully! Created ${data.created_users.length} users, updated ${data.updated_students.length} students, ${data.created_attendance.length} attendance records, ${data.created_marks.length} marks records.`;
        if (data.errors && data.errors.length > 0) {
          message += ` Errors: ${data.errors.join('; ')}`;
        }
        setUploadStatus({
          type: response.status === 207 ? 'warning' : 'success',
          message: message,
        });
        setSelectedFile(null);
      } else {
        setUploadStatus({
          type: 'error',
          message: data.error || 'Failed to upload file. Please check the CSV format and try again.',
        });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'An error occurred during upload. Please try again.' });
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-dark-text mb-4">Data Upload / Input</h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive ? 'border-button-blue bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop the file here...'
            : selectedFile
            ? selectedFile.name
            : 'Drag and drop or '}
          {!selectedFile && (
            <span className="text-button-blue cursor-pointer">CHOOSE FILE</span>
          )}
          {!selectedFile && ' to upload supported file type: .csv'}
        </p>
      </div>

      {/* Upload Status Message */}
      {uploadStatus && (
        <p
          className={`mt-4 text-center ${
            uploadStatus.type === 'success' ? 'text-risk-low' : uploadStatus.type === 'warning' ? 'text-yellow-600' : 'text-risk-high'
          }`}
        >
          {uploadStatus.message}
        </p>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full px-6 py-3 bg-button-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
        >
          Upload File
        </button>
      )}
    </div>
  );
}

export default FileUpload;