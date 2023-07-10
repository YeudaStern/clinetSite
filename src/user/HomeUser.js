import React, { useEffect, useState } from 'react';
import { API_URL } from '../constant/url';
import { apiGet, apiPut } from '../services/apiServices';
import { Modal } from "antd";
import Files from '../pages/single/files';
import { IoIosCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import UserFilesList from './UserFilesList';
import { useStateContext } from '../context';
import Comments from '../pages/single/Comments';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { BiTask } from "react-icons/bi";

export default function HomeUser() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fileResp, setFileResp] = useState('');
    const [openFilesModal, setOpenFilesModal] = useState(false);
    const [openModalComment, setOpenModalComment] = useState("")
    const [myId, setMyId] = useState('');
    const nav = useNavigate();
    const { setUserFile } = useStateContext()
    const [missions, setMissions] = useState([]);

    const updateClient = async () => {
        try {
            const newClient = { ...data };
            newClient.files.push(fileResp);
            delete newClient._id;
            delete newClient.role;
            delete newClient.date_created;
            delete newClient.__v;
            delete newClient.comments;
            console.log(newClient);
            await uploadFile(newClient, myId);
            setOpenModal(false)
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    useEffect(() => {
        doApi();
        doApiMissions();
    }, []);

    useEffect(() => {
        if (!data.name) {
            nav('/');
        }
        setMyId(data._id);
        if (fileResp.length > 0) {
            updateClient();
        }
        setUserFile(data);
    }, [data, fileResp]);

    const doApiMissions = async () => {
        let url = API_URL + '/missions/missionsList';
        try {
            let dataMission = await apiGet(url);
            console.log(dataMission);
            setMissions(dataMission);
        } catch (error) {
            console.log(error);
        }
    }

    const doApi = async () => {
        let url = API_URL + '/users/userInfo';
        try {
            const response = await apiGet(url);
            console.log(response);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadFile = async (newClient, id) => {
        try {
            console.log(API_URL + '/users/' + id);
            const response = await apiPut(API_URL + '/users/' + id, newClient);
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <div className='font-medium mb-0.5 border-2 md:flex justify-between colors3 rounded-lg colors3 shadow-2xl p-4 md:m-2 text-lg text-black'>
                <div className="w-full h-[400px] md:w-1/4 ">
                    <button className="w-full h-1/6 shadow mb-3 mt-4 rounded-lg bg-pink-300 hover:bg-pink-400 hover:transition-colors" onClick={() => setOpenModal(true)}>העלאת מסמכים</button>
                    <button className="w-full h-1/6 shadow mb-3 rounded-lg bg-purple-300 hover:bg-purple-400" onClick={() => setOpenFilesModal(true)}>מסמכים</button>
                    <button className="w-full h-1/6 shadow mb-3 rounded-lg bg-green-300 hover:bg-green-400" onClick={() => setOpenModalComment(true)}>צ'אט</button>
                    <button className="w-full h-1/6 shadow mb-3 rounded-lg bg-yellow-300 hover:bg-yellow-400">סטטוס פרויקט</button>
                </div>
                <div className='h-[320px] w-full mt-4 md:w-1/3 mb-3 bg-[#18181B] text-white cheat z-50 rounded-lg'>
                    <div className='w-full sticky-top'>
                        <h1 className='w-full  text-2xl bg-[#18181B] p-[10px]  border-b border-b-slate-400'>משימות </h1>
                    </div>
                    <div className='w-full h-[266px] overflow-scroll'>
                        {missions.map((mission) => (
                            <div className='w-full p-2 shadow-xl border-b border-b-purple-400' key={mission.id}>
                                <p>{mission.title} - {new Date(mission.date_created).toLocaleDateString()}</p>
                                <p className='text-green-500 text-sm'>{mission.execution_status}</p>
                                <p className='text-red-500 text-sm'>{mission.importance}</p>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='h-[80%] w-full mt-4 md:w-1/3 mb-3 bg-[#18181B] text-white cheat overflow-y-auto overflow-x-hidden rounded-lg'>
                    <div className='w-full'>
                    
                        <h1 className='w-full  text-2xl bg-[#18181B] p-[10px]  border-b border-b-slate-400'>הפרויקט שלי    <ApartmentIcon /></h1>
                    </div>
                    <div className=' '>
                        <div className='w-full p-2 ps-2 mt-2  mb-2 shadow-xl border-b-purple-400 border-b'>שם: {data.p_name}</div>
                        <div className='w-full p-2 ps-2  mb-2 shadow-xl border-b-purple-400 border-b'>מספר בנין : {data.building_name}</div>
                        <div className='w-full p-2 ps-2  mb-2 shadow-xl border-b-purple-400 border-b'>דירה : {data.apartment}</div>
                        <div className='w-full p-2 ps-2  mb-2 shadow-xl border-b-purple-400 border-b'>קומה : {data.story}</div>
                        <div className='w-full p-2 ps-2  mb-2 shadow-xl border-b-purple-400 border-b'>אחוזי התקדמות: </div>
                    </div>
                </div>
            </div>
            {/* Upload file */}
            <Modal
                style={{ paddingLeft: '0px' }}
                centered
                open={openModal}
                closeIcon={<IoIosCloseCircle className='text-white text-2xl  absolute ml-24 mt-6' />}
                onCancel={() => setOpenModal(false)}
                width={900}
                footer={null}
            >
                <Files setFileResp={setFileResp} />
            </Modal>

            {/* Show files list */}
            <Modal
                style={{ paddingLeft: '0px' }}
                closable={true}
                closeIcon={<IoIosCloseCircle className='text-white text-3xl mt-2.5 absolute ml-20' />}
                centered
                open={openFilesModal}
                onCancel={() => setOpenFilesModal(false)}
                width={1200}
                footer={null}
            >
                <UserFilesList />
            </Modal>
            <Modal
                closable={true}
                closeIcon={<IoIosCloseCircle className='text-white text-2xl mt-0.5 absolute ml-12' />}
                centered
                open={openModalComment}
                onCancel={() => setOpenModalComment(false)}
                width={600}
                footer={null}
            >
                <Comments />
            </Modal>
        </>
    );
}
