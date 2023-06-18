import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiPut } from '../../services/apiServices';
import { API_URL } from '../../constant/url';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Modal } from 'antd';
import Files from './files';
import Comments from './Comments'; import FilesList from '../lists/FileList';
import { IoIosCloseCircle } from 'react-icons/io';



export default function SingleClient() {
  const [openModal, setOpenModal] = useState("")
  const [openModalComment, setOpenModalComment] = useState("")
  const [fileResp, setFileResp] = useState("")
  const [openFilesModal, setOpenFilesModal] = useState("")

  const [commentResp, setCommentResp] = useState("")
  const [openFiles, setOpenFiles] = useState("")
  const [myId, setMyId] = useState("")
  const { client } = useStateContext();
  const nav = useNavigate()

  const updateClient = () => {
    client.files.push(fileResp)
    const newClient = client
    delete newClient._id
    delete newClient.role
    delete newClient.date_created
    delete newClient.__v
    delete newClient.comments
    uploadFile(newClient, myId)
  }

  const uploadFile = async (newClient, id) => {
    console.log(API_URL + '/users/' + id);
    const data = await apiPut(API_URL + '/users/' + id, newClient)
    console.log(data);
  }






  useEffect(() => {

    !client.name && nav("/projects")
    setMyId(client._id)
    console.log(client);
    fileResp.length > 0 && updateClient()
  }, [fileResp])

  return (
    <div className="p-[10px] m-[10px]">
      <div className='font-medium text-neutral-300 mb-0.5 border-2 p-[10px] flex justify-between login2 rounded-lg'>
        <span className="pt-2 text-lg"><strong>שם הדייר :</strong> {client.name}</span>
        <Button size="small" variant="contained" className='items-end' >
          <Link to='/projects/singleProject' className='hover:text-white p-1'>חזור לרשימת הדיירים < ArrowBackIcon /></Link>
        </Button>
      </div>
      <div className=" md:mh-[300px] mh-[400px] drop-shadow-xl  text-lg rounded-lg colors2 p-4 m-0.5 text-white">
        <div className='border-2 mh-[35%] block md:flex rounded-lg'>
          <div className='md:w-2/5 w-full h-1/2 md:h-full flex flex-wrap p-6 ps-8 pe-8'>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>שם הפרויקט :</strong> {client.p_name}</div>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>עיר :</strong> {client.city_name}</div>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>מספר בניין :</strong> {client.building_name}</div>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>קומה :</strong> {client.story}</div>
          </div>
          <div className='md:w-2/5 w-full h-1/2 md:h-full flex flex-wrap md:p-6 ps-8 pe-8'>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>דירה :</strong> {client.apartment}</div>
            <div className='w-full p-2 ps-2 text-xs lg:text-lg mb-4 shadow-xl hover:cursor-pointer  underline underline-offset-1' onClick={() => window.location.href = `mailto:${client.email}`}><strong>אימייל :</strong> {client.email}</div>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong>טלפון :</strong> {client.phone}</div>
            <div className='w-full p-2 ps-2  mb-4 shadow-xl'><strong><AdminPanelSettingsOutlinedIcon /> :</strong> {client.role === 'Constructor' ? client.role : 'User'}</div>
          </div>
          <div className='md:w-1/5 w-full md:block flex  border-r-2 p-4 justify-between'>
            <button onClick={() => { setOpenModal(true) }} className='bg-orange-400 max-sm:text-lg text-xs lg:text-lg md:w-full w-[46%] border-1 p-2 rounded-lg text-center md:mt-3 mb-3 shadow-2xl hover:text-black hover:border-black'>
              <div >העלה <br /> מסמכים</div>
            </button>
            <button onClick={() => { setOpenModalComment(true) }} className='bg-green-600 max-sm:text-lg text-xs lg:text-lg md:w-full w-[46%] border-1 p-2 rounded-lg text-center md:mt-3 mb-3 shadow-2xl hover:text-black hover:border-black'>
              <div >צ'אט</div>
            </button>
            <button onClick={() => { setOpenFilesModal(true) }} className='bg-green-600 max-sm:text-lg text-xs lg:text-lg md:w-full w-[46%] border-1 p-2 rounded-lg text-center md:mt-3 mb-3 shadow-2xl hover:text-black hover:border-black'>
              <div >מסמכים</div>
            </button>
            {/* comments modal */}
            <Modal
              closable={true}
              closeIcon={<IoIosCloseCircle className='text-white text-2xl mt-0.5 absolute ml-12' />}
              centered
              open={openModalComment}
              onCancel={() => setOpenModalComment(false)}
              width={600}
              footer={null}
            ><Comments />
            </Modal>
            {/* files modal */}
            <Modal style={{ paddingLeft: '0px' }}
              closable={true}
              closeIcon={<IoIosCloseCircle className='text-white text-2xl  absolute ml-24 mt-6' />}
              centered
              open={openModal}
              onCancel={() => setOpenModal(false)}
              width={1200}
              footer={null}
              CSSProperties={{ padding: '0px', margin: '0px' }}
            ><Files setFileResp={setFileResp} />
            </Modal>
            {/* filesList modal */}
            <Modal style={{ paddingLeft: '0px' }}
              closable={true}
              closeIcon={<IoIosCloseCircle className='text-white text-3xl mt-2.5 absolute ml-20' />}
              centered
              open={openFilesModal}
              onCancel={() => setOpenFilesModal(false)}
              width={1200}
              footer={null}
            ><FilesList />
            </Modal>

          </div>
        </div>
      </div>
    </div>
  )
}



