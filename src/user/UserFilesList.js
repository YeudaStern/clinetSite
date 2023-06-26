import React, { useEffect, useState } from 'react'
import { FileIcon } from 'react-file-icon';
import { API_URL } from '../constant/url';
import { apiDelete, apiGet } from '../services/apiServices';
import { useStateContext } from '../context';
import { Alert, AlertTitle } from '@mui/material';

export default function UserFilesList() {
    const [data, setData] = useState([]);
    const { userFile } = useStateContext();
    const ID = userFile._id;
    
    const dataFiles = userFile.files;
    console.log(dataFiles);

    useEffect(() => {
        setData(userFile);
    }, [userFile]);



    const getFileType = (url) => {
        const fileExtension = url.split('.').pop().toLowerCase();
        if (fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
            return 'image';
        } else if (fileExtension === 'docx' || fileExtension === 'doc') {
            return 'docx';
        } else if (fileExtension === 'pdf') {
            return 'pdf';
        } else if (fileExtension === 'xlsx' || fileExtension === 'excel') {
            return 'excel';
        } else if (fileExtension === 'pptx' || fileExtension === 'ppt') {
            return 'powerpoint';
        } else if (fileExtension === 'txt') {
            return 'text';
        } else if (fileExtension === 'mp3' || fileExtension === 'MP3') {
            return 'mp3';
        } else if (fileExtension === 'mp4' || fileExtension === 'MP4') {
            return 'mp4';
        } else if (fileExtension === 'exe') {
            return 'exe';
        } else {
            return 'unknown';
        }
    };

    const handleDownload = async (url) => {
        try {
            const response = await fetch(url, { responseType: 'blob' });
            const blob = await response.blob();
            const filename = getFilenameFromURL(url);

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            window.URL.revokeObjectURL(link.href);
            link.remove();
        } catch (error) {
            console.log(error);
        }
    };

    const getFilenameFromURL = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };


    const handleDelete = async (url) => {
        try {
            const deleteUrl = API_URL + '/users/removeFile/' + ID + '/' + encodeURIComponent(url);
            const response = await apiDelete(deleteUrl);

            if (response.status === 200) {
                setData((prevData) => prevData.filter((file) => file !== url));
            } else {
                console.log('Failed to delete file:', response.status);
            }
        } catch (error) {
            console.log('Error deleting file:', error);
        }
    };




    const getDisplayURL = (url) => {
        const fileType = getFileType(url);

        return (

            <div className=" flex flex-wrap md:flex-nowrap items-center w-full justify-between ">

                <div className='w-24'>
                    <p className='text-white px-2'>סוג המסמך:</p>
                    <p className='text-white px-2'>{fileType}</p>
                </div>

                {fileType === 'image' ? (
                    <img src={url} alt="Image" className="w-16 h-16 ml-2 rounded-lg " />
                ) : (
                    <div className="w-16 h-16 flex items-center justify-center ml-2" >
                        {fileType === 'docx' ? (
                            <FileIcon
                                color="#34364E"
                                gradientOpacity={0}
                                labelColor="#34364E"
                                labelTextColor="#31C5F0"
                                labelUppercase
                                foldColor="#31C5F0"
                                radius={2}
                                extension="docx"
                            />
                        ) : fileType === 'pdf' ? (
                            <FileIcon
                                color="#4B2B36"
                                gradientOpacity={0}
                                labelColor="#4B2B36"
                                labelTextColor="#FF408C"
                                labelUppercase
                                foldColor="#FF408C"
                                radius={2}
                                extension="pdf"
                            />
                        ) : fileType === 'excel' ? (
                            <FileIcon
                                color="#1A754C"
                                labelColor="#1A754C"
                                labelUppercase
                                type="spreadsheet"
                                glyphColor="rgba(255,255,255,0.4)"
                                extension="excel"
                            />
                        ) : fileType === 'powerpoint' ? (
                            <FileIcon

                                color="#D14423"
                                labelColor="#D14423"
                                labelUppercase
                                type="presentation"
                                glyphColor="rgba(255,255,255,0.4)"
                                extension="ppt"
                            />
                        ) : fileType === 'exe' ? (
                            <FileIcon
                                color="#423325"
                                gradientOpacity={0}
                                labelColor="#423325"
                                labelTextColor="#FF7F18"
                                labelUppercase
                                foldColor="#FF7F18"
                                radius={2}
                                extension="exe"
                            />
                        ) : fileType === 'mp3' ? (
                            <FileIcon
                                type={Audio}
                                extension="mp3"
                                color="#34364d"
                                gradientOpacity={0}
                                labelColor="#34364"
                                labelTextColor="#31C5F0"
                                labelUppercase
                                foldColor="#31C5F1"
                                radius={2}

                            />
                        ) : fileType === 'mp4' ? (
                            <FileIcon
                                type={Audio}
                                extension="mp3"
                                color="#34364d"
                                gradientOpacity={0}
                                labelColor="#34364"
                                labelTextColor="#31C5F0"
                                labelUppercase
                                foldColor="#31C5F1"
                                radius={2}
                            />
                        ) : (
                            <FileIcon

                                color="#1254F8"
                                gradientColor="#00D2FF"
                                gradientOpacity={1}
                                fold={false}
                                radius={6}
                                type="presentation"
                                glyphColor="rgba(255,255,255,0.6)"
                            />
                        )}
                    </div>
                )}
                <div>
                    <button
                        className='text-blue-200 border-2 p-1 px-3 rounded-lg border-blue-200 '
                        onClick={() => handleDownload(url)}
                    >
                        הורדה
                    </button>

                </div>
            </div>
        );
    };

    return (
        <div >
            <div className='font-medium text-neutral-300 mb-0.5 border-2 p-3 m-0.5 flex justify-between colors2 rounded-lg'>
                <span className="font-bold text-lg"><span className="font-extralight">מסמכים של:</span> {userFile.name}</span>
            </div>
            {dataFiles.length === 0 ? <span className="font-bold mt-1 "><Alert severity='info'><AlertTitle>אין לך מסמכים  בתיקייה !</AlertTitle></Alert></span> :
                <div className='overflow-y-scroll max-h-[70vh] flex flex-wrap m-1 p-3 rounded-lg custom-shadow border-blue-200 custom-shadow justify-between colors2'>
                    {dataFiles.map((file, index) => (
                        <div className="flex flex-wrap w-full sm:w-auto custom-shadow rounded-lg p-4 shadow-md mb-4" key={index}>
                            {getDisplayURL(file)}
                            <button
                                className="text-red-200 border-2 border-red-200 px-2 py-1 ml-2 rounded-lg"
                                onClick={() => handleDelete(file)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>

    );
}
