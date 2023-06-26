import './cheat.css'
import { API_URL } from '../constant/url';
import { apiGet } from '../services/apiServices';
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export default function Cheat() {

    const [data, setData] = useState([])

    useEffect(() => {
        doApi();
    }, [])


    const doApi = async () => {
        let url = API_URL + '/users/usersList'
        try {
            let data = await apiGet(url);
            console.log(data);
            setData(data);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='mr-[20px] justify-between h-[66vh] w-full  md:w-1/3 mb-4 pb-4 bg-stone-800 text-white cheat overflow-y-auto overflow-x-hidden rounded-lg'>
            <div className='w-full sticky-top overflow-hidden'>
                <h1 className='w-full  text-2xl bg-stone-800 p-[10px]  border-b border-b-slate-400'>צ'אטים</h1>
                <input placeholder='חפש איש קשר..' className='w-full bg-stone-800 p-[10px] pe-2 pt-3 ' />
            </div>
            <div className=' w-full h-full block '>
                {data.map((user) => (
                    <>
                        <button key={user._id} className=' w-full h-[56px] text-right pr-3  border-t-slate-50  hover:bg-zinc-700'><AccountCircleIcon className='ms-1 item' /> {user.name} - {user.p_name}</button><hr />
                    </>
                ))}
            </div>
        </div>
    )
}
