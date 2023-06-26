import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import '../../style/colorKit.css'



export default function Files({ setFileResp }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'dnwud1i7t');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dnwud1i7t/auto/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);

          },
        }
      );
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        response.data.secure_url,
      ]);

      setUploadedFileUrl(response.data.secure_url);
      setFileResp(response.data.secure_url)
      setInputKey(Date.now());
      handleClear()
      toast.success("קובץ הועלה בהצלחה")

    } catch (error) {
      console.error('Error uploading file: ', error);
      toast.warning("ישנה בעיה נסו שנית")
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadedFileUrl('');
    setInputKey('')
  };

  const getFileExtension = (fileUrl) => {
    const lastDotIndex = fileUrl.lastIndexOf('.');
    return fileUrl.substring(lastDotIndex).toLowerCase();
  };

  const isImageExtension = (extension) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    return imageExtensions.includes(extension);
  };


  return (
    <div className=' colors2 overflow-y-scroll p-2 md:p-0'>
      <div className='font-medium custom-shadow  text-neutral-300 md:m-2  p-3   flex justify-between colors2 rounded-lg'>
        <span className="font-bold text-lg">העלאת מסמכים </span>
      </div>
      <div className=' md:flex  md:justify-between'>
        <div className='text-center m-2 md:w-[48%] mx-auto border-dashed border-1 p-3 rounded-lg  custom-shadow'>
          <p className='text-blue-200 font-bold pb-2'>גרור קובץ לכאן </p>
          <input key={inputKey} type="file" className='text-blue-200 bg-slate-500 w-full  h-32 rounded-lg cursor-pointer' onChange={handleFileChange} />
          <button className='text-blue-200 mt-3 border-2 p-1 px-3 rounded-lg border-blue-200 ' onClick={handleUpload} onChange={handleClear}>שלח/י</button>
        </div>
        <div className='text-center m-2 md:w-[48%] mx-auto p-3  rounded-lg custom-shadow'>
          {selectedFile && (
            <div>
              <p className='text-blue-200 font-bold pb-2'>קובץ שנבחר:</p>

              {selectedFile.type.startsWith('image/') ? (
                <div>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="File Preview"
                    className='mx-auto h-32 rounded-md'

                  />
                  <button onClick={handleClear}><AiOutlineDelete className='text-3xl text-red-500 mt-3' /> </button>
                </div>
              ) : (
                <div>{selectedFile.name} <button onClick={handleClear}><AiOutlineDelete className='text-2xl text-red-700 ' /> </button></div>
              )}
              {uploadProgress > 0 && <p className='text-blue-200 '>העלאה בתהליך: <div class="container">
                <div class="progress2 progress-moved">
                  <div class="progress-bar2" >
                  </div>
                </div>
              </div>
              </p>}
              <p className='text-blue-200'>{uploadProgress}%</p>

            </div>
          )}
        </div>

      </div>
      <div className='flex flex-wrap p-2 md:m-2 rounded-lg border-blue-200 custom-shadow overflow-y-scroll  justify-around'>
        <p className='w-full text-blue-200 text-center m-2 text-lg underline'> - קבצים שהועלו -</p>
        {uploadedFiles.map((fileUrl, index) => {
          const extension = getFileExtension(fileUrl);
          return (

            <div key={index} className="m-2 p-2  border-blue-200 custom-shadow rounded-lg text-white">

              {isImageExtension(extension) ? (
                <img
                  src={fileUrl}
                  alt="Uploaded File"
                  className='w-full max-w-full max-h-48 rounded-lg '
                />
              ) : (
                <p>{fileUrl}</p>
              )}
            </div>
          );
        })}
      </div>


    </div>
  );
};


