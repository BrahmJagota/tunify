import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface UploadState {
  image: File | null;
  mp3: File | null;
  filename: string;
  amount: number;
  error: string;
}
interface UrlResponse{
  musicUrl: string,
  thumbnailUrl: string
}

const UploadPage: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<UploadState>({
    image: null,
    mp3: null,
    filename: '',
    amount: 0,
    error: '',
  });
const [uploadUrl, setUploadUrl] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileInfo.mp3) {
      setFileInfo({...fileInfo, error: "Please upload an MP3 file"})
      return;
    }
    if (!fileInfo.filename.trim()) {
      setFileInfo({...fileInfo, error: "Please provide a file name"})
      return;
    }
    
    setFileInfo({...fileInfo, error: ""});
    alert("File uploaded successfully!");
    handleFileUpload();
  };

  const handleFileUpload = () => {
    axios
      .post('http://localhost:3000/upload-music', {
        fileInfo, 
      }, {withCredentials: true})
      .then(response => {
        const { musicUrl, thumbnailUrl } = response.data;

        const uploadRequests = [
          axios.put(musicUrl, fileInfo.mp3, {
            headers: {
              'Content-Type': 'audio/mpeg',
            },
          }),
        ];

        if (fileInfo.image) {
          uploadRequests.push(
            axios.put(thumbnailUrl, fileInfo.image, {
              headers: {
                'Content-Type': 'image/mpeg', 
              },
            })
          );
        }
  
        return Promise.all(uploadRequests);
      })
      .then(() => {
        // console.log('Files uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  };

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { name, size, type } = file;
    const fieldName = e.target.name;

    if (fieldName === 'image') {
      if (!['image/jpeg', 'image/png'].includes(type)) {
        setFileInfo({ ...fileInfo, error: 'Only JPG and PNG images are allowed.' });
        return;
      }
      if (size > 2 * 1024 * 1024) {
        setFileInfo({ ...fileInfo, error: 'Image size must not exceed 2MB.' });
        return;
      }
    }

    if (fieldName === 'mp3') {
      if (type !== 'audio/mpeg') {
        setFileInfo({ ...fileInfo, error: 'Only MP3 files are allowed.' });
        return;
      }
      if (size > 15 * 1024 * 1024) {
        setFileInfo({ ...fileInfo, error: 'MP3 size must not exceed 15MB.' });
        return;
      }
    }
    const selectedFile = e.target.files?.[0];

    setFileInfo({ ...fileInfo, [fieldName]: selectedFile , error: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    if(fieldName == "filename"){
      setFileInfo({...fileInfo, filename: e.target.value});
    } 
    if(fieldName == "amount"){
      setFileInfo({...fileInfo, amount: parseInt(e.target.value)});
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Upload Your Files</h1>

      {fileInfo.error && (
        <p className="text-red-500 mb-4">{fileInfo.error}</p>
      )}

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-[#1a1a1a] font-medium mb-2" htmlFor="image">
              Upload Image (JPG, PNG - Max 2MB)
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="w-full border border-[#3f3e3a] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
            />
          </div>

          {/* MP3 Upload */}
          <div>
            <label className="block text-[#1a1a1a] font-medium mb-2" htmlFor="mp3">
              Upload MP3 File (Max 15MB)
            </label>
            <input
              type="file"
              name="mp3"
              id="mp3"
              accept="audio/mpeg"
              onChange={handleFileChange}
              className="w-full border border-[#3f3e3a] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-[#1a1a1a] font-medium mb-2" htmlFor="filename">
              Filename
            </label>
            <input
              type="text"
              name="filename"
              id="filename"
              onChange={handleInputChange}
              className="w-full border border-[#3f3e3a] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
            />
          </div>
          <div>
            <label className="block text-[#1a1a1a] font-medium mb-2" htmlFor="amount">
              Filename
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleInputChange}
              className="w-full border border-[#3f3e3a] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
            />
          </div>
          {/* Uploaded Files Information */}
          <div className="mt-4">
            {fileInfo.image && (
              <p className="text-sm text-[#1a1a1a]">Image: {fileInfo.image.name} ({(fileInfo.image.size / 1024).toFixed(2)} KB)</p>
            )}
            {fileInfo.mp3 && (
              <p className="text-sm text-[#1a1a1a]">MP3: {fileInfo.mp3.name} ({(fileInfo.mp3.size / 1024).toFixed(2)} KB)</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-[#1a1a1a] text-white py-2 rounded hover:bg-[#3f3e3a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
