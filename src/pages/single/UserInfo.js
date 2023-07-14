import React, { useEffect, useState } from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useStateContext } from '../../context';
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';
import './missionUser.css'

export default function UserInfo() {
    const { login } = useStateContext();
    const [data, setData] = useState([])

    useEffect(() => {
        doApi()
    }, [])

    const doApi = async () => {
        const url = API_URL + '/users/userInfo';
        try {
            const data = await apiGet(url);
            console.log(data);
            if (data.role === 'User') {
                data.role = 'דייר'
                setData(data)
            }
            else if (data.role === 'Admin') {
                data.role = 'מנהל'
                setData(data)
            }
            else if (data.role === 'Constructor') {
                data.role = 'קבלן'
                setData(data)
            }
            else {
                setData(data)
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="p-[10px] m-[10px] ">
            <div className='border-2 rounded-lg colors2 shadow-2xl p-4  m-3 text-lg text-white mission h-[400px] '>
                <h1 className='w-full mb-1 mt-1 p-1'><strong><BadgeOutlinedIcon /> פרטי משתמש : {data.name}</strong></h1>
                <div className='border-2 block md:flex'>
                    <div className='flex flex-wrap md:w-1/2 rounded-xl p-6 ps-8 pe-8'>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'><ApartmentIcon />הפרויקט שלי : {data.p_name}</div>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'>מספר בנין : {data.building_name}</div>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'>קומה : {data.story}</div>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'>דירה : {data.apartment}</div>
                    </div>
                    <div className='flex flex-wrap md:w-1/2 rounded-xl p-6 ps-8 pe-8'>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'>אימייל : {data.email}</div>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'>טלפון : {data.phone}</div>
                        <div className='w-full p-2 ps-2  mb-4 shadow-xl'> <AdminPanelSettingsOutlinedIcon />הרשאת גישה : {data.role}</div>
                        <div className='w-full p-2 ps-2 mb-4 shadow-xl'>התווסף בתאריך: {new Date(data.date_created).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
