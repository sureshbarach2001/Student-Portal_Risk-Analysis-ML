import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Handle file drop or selection
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    // Check if there are any rejected files
    if (fileRejections.length > 0) {
      setUploadStatus({
        type: 'error',
        message: 'Invalid file type. Only .csv and .excel files are supported.',
      });
      setSelectedFile(null);
      return;
    }

    // If a valid file is selected
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
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1, // Limit to one file at a time
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
      // Replace this with your actual backend API endpoint
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
        setSelectedFile(null); // Reset the selected file
      } else {
        setUploadStatus({ type: 'error', message: 'Failed to upload file. Please try again.' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'An error occurred during upload.' });
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
          {!selectedFile && ' to upload supported file types: .csv, .excel'}
        </p>
      </div>

      {/* Upload Status Message */}
      {uploadStatus && (
        <p
          className={`mt-4 text-center ${
            uploadStatus.type === 'success' ? 'text-risk-low' : 'text-risk-high'
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