import React, { useEffect, useState } from 'react'
import { API_URL } from '../../constant/url';
import { apiGet, apiPost } from '../../services/apiServices';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { toast } from 'react-toastify';

export default function NewMission() {
    const nav = useNavigate()
    // const [data, setData] = useState([])
    const [list, setList] = useState([])
    const { register, handleSubmit } = useForm();

    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiPost(_bodyData);
    }

    const doApiPost = async (_bodyData) => {
        try {
            const url = API_URL + '/missions';
            const data = await apiPost(url, _bodyData);
            // setData(data);
            // console.log(data);
            if (data._id) {
                toast.success('משימה חדשה נוספה בהצלחה !')
                nav('/missions')
            }

        } catch (error) {
            console.log(error);
            toast.error('ישנה בעיה, נסה שנית')
        }
    }

    const doApiGetUsersList = async () => {
        let url = API_URL + '/users/usersList';
        try {
            const list = await apiGet(url);
            setList(list);
            console.log(list);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        doApiGetUsersList();
    }, [])



    return (
        <div className="p-[20px] m-[20px]">
            <div className='font-medium text-neutral-300 mb-1 border p-[10px] flex justify-between login2 rounded-t-lg'>
                <span className="pt-2">הוסף משימה חדשה</span>
                <div >
                    <HomeIcon className=" ml-5 font-bold text-6xl cursor-pointer hover:text-yellow-500" onClick={() => nav('/')} />
                    {/* <Button size="small" variant="contained" className='items-end' >
                        <Link to='/' className='hover:text-white p-1'>חזור <  HomeIcon/></Link>
                    </Button> */}
                </div>
            </div>
            <div className="  border flex p-4 colors2  drop-shadow-xl rounded-b-lg">
                <form className="w-full md:h-[60vh] h-[80vh]" onSubmit={handleSubmit(onSubForm)}>
                    <div className="md:flex block">
                        <div className="md:w-1/2 md:pe-4 md:p-1">
                            <label className="text-white">נושא</label>
                            <input {...register("title", { required: true, minLength: 2 })} type="text" placeholder="הזן את נושא המשימה" className="w-full p-2 mt-2 text-black border-solid border-2 rounded-lg" />
                        </div>
                        <div className="md:w-1/2 md:pe-4 md:p-1">
                            <label className="text-white">שיוך דייר</label>
                            <select {...register("user_name", { required: true, minLength: 2 })} className="w-full p-2 mt-2 border-solid border-2 rounded-lg text-black">
                                <option hidden disabled selected value="">בחר דייר מהרשימה</option>
                                {list.map((userName) => {
                                    return (
                                        <option key={userName._id} >{userName.name} - פרויקט: {userName.p_name}, עיר: {userName.city_name}, בניין: {userName.building_name}, קומה: {userName.story}, דירה: {userName.apartment}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="block md:flex">
                        <div className="md:w-1/3 md:pe-2 md:p-1 mt-3">
                            <label className="text-white">פרטי משימה</label>
                            <input {...register("info", { required: true, minLength: 2 })} type="text" placeholder="פרטים נוספים" className="w-full p-2 mt-2 text-black border-solid border-2 rounded-lg" />
                        </div>
                        <div className="md:w-1/3 md:pe-3 md:p-1 mt-3">
                            <label className="text-white">סטטוס ביצוע</label>
                            <select {...register("execution_status", { required: true, minLength: 2 })} className="w-full p-2 mt-2 border-solid border-2 rounded-lg text-black">
                                <option hidden>בחר</option>
                                {['waiting', 'done'].map((status) => (
                                    <option key={status} value={status}>{status === 'waiting' ? 'ממתין לטיפול' : 'בוצע'}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:w-1/3 md:pe-3 md:p-1 mt-3">
                            <label className="text-white">דחיפות לביצוע</label>
                            <select {...register("importance", { required: true, minLength: 2 })} className="w-full p-2 mt-2 border-solid border-2 rounded-lg text-black">
                                <option hidden>בחר</option>
                                {["regular", "important"].map((status) => (
                                    <option key={status} value={status}>
                                        {status === 'regular' ? 'רגיל' : 'חשוב'}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div className="items-center justify-center flex mt-4">
                        <button className="border btn btn-primary">צור משימה חדשה</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
