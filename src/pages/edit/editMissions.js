import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../constant/url';
import { apiGet, apiPut } from '../../services/apiServices';
import { toast } from 'react-toastify';

export default function EditMission() {
  const [mission, setMission] = useState({});
  const params = useParams();
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    doApiInit();
  }, []);

  const doApiInit = async () => {
    try {
      const url = API_URL + '/missions/singleMission/' + params["id"];
      const data = await apiGet(url);
      console.log(data);
      setMission(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const url = API_URL + '/missions/' + params.id;
      const data = await apiPut(url, formData);
      console.log(data);
      if (data.modifiedCount) {
        toast.success('המשימה עודכנה בהצלחה');
        nav('/missions');
      }
    } catch (error) {
      console.log(error);
      toast.error('ישנה בעיה, נסו שנית מאוחר יותר');
    }
  };

  return (
    <div className='p-[20px] md:m-[20px] md:w-auto w-screen'>
      <div className='font-medium text-neutral-300 mb-0.5 border-2 border-slate-400 rounded-t-lg p-[10px] flex justify-between bg-stone-800'>
        <span className='pt-2'>עריכת משימה</span>
        <Button size='small' variant='contained' className='items-end'>
          <Link to='/missions' className='hover:text-white p-1'>
            חזרה <ArrowBackIcon />
          </Link>
        </Button>
      </div>

      <div className='h-full xl:h-[60vh] 2xl:h-[80vh] mt-1 flex p-4 bg-stone-800 drop-shadow-xl border-1 border-slate-400 rounded-b-lg'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex block'>
          
            <div className='md:w-1/2 md:pe-4 md:p-1'>
              <label className='text-white'>כותרת</label>
              <input defaultValue={mission.title} {...register('title', { required: true })}  type='text' className='w-full p-2 mt-2 border-solid border-2 rounded-lg text-black' />
            </div>
            <div className='md:w-1/2 md:pe-4 md:p-1'>
              <label className='text-white'>פרטים</label>
              <input defaultValue={mission.info} {...register('info', { required: true })} type='text' className='w-full p-2 mt-2 border-solid border-2 rounded-lg text-black' />
            </div>
          </div>
         
          <div className='items-center justify-center flex mt-4'>
            <button  className="border btn btn-primary">
             עדכון משימה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
