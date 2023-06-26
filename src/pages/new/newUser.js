import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_URL } from "../../constant/url";
import { apiPost } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { apiGet } from "../../services/apiServices";


export default function NewUser() {
  const [projectsList, setProjectsList] = useState([])
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    doApiGetProjectsList();
  }, [])


  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/users";
      const data = await apiPost(url, _bodyData);
      if (data._id) {
        toast.success("New Project added");
        nav("/users")
      }
    } catch (error) {
      console.log(error);
      toast.error('There problem, try again later')
    }
  }


  const doApiGetProjectsList = async () => {
    try {
      const url = API_URL + '/projects/projectsList';
      const data = await apiGet(url);
      console.log(data);

      setProjectsList(data)
    }
    catch (error) {
      console.log(error);
    }
  }


  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    const [projectName, cityName, streetName, buildingNumber] = _bodyData.p_name.split("@");
    doApiPost({
      "name": _bodyData.name,
      "email": _bodyData.email,
      "password": _bodyData.password,
      "phone": _bodyData.phone,
      "p_name": projectName,
      "city_name":cityName,
      "street_name":streetName,
      "building_name": buildingNumber,
      "story": _bodyData.story,
      "apartment": _bodyData.apartment,
    });
  }


  return (

    <div className="p-[20px] m-[20px]">
      <div className='font-medium text-neutral-300 mb-1  p-[10px] flex justify-between login2  border-2 border-slate-500 md:rounded-t-lg'>
        <span className="pt-2"> צור משתמש חדש</span>
        <Button size="small" variant="contained" className='items-end' >
          <Link to='/users' className='hover:text-white p-1'>חזור < ArrowBackIcon /></Link>
        </Button>
      </div>
      <div className=" md:mh-[400px] mh-[400px]  border-2 border-slate-500 rounded-b-lg mt-2 flex p-4 colors2  drop-shadow-xl" style={{ borderRadius: '0 0 8px 8px' }}>
        <form className="w-full " onSubmit={handleSubmit(onSubForm)}>
          <div className="md:flex block">
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">שם מלא</label>
              <input {...register("name", { required: true, minLength: 2 })} type="text" placeholder="הזן שם ושם משפחה" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">אימייל</label>
              <input {...register("email", { required: true, minLength: 2 })} type="email" placeholder="הכנס כתובת אימייל נכונה " className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
          </div>
          <div className="md:flex block">
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">סיסמא</label>
              <input {...register("password", { required: true, minLength: 2 })} type="password" placeholder="אנא הזן סיסמא" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">טלפון</label>
              <input {...register("phone", { required: true, minLength: 2 })} type="phone" placeholder="הזן מספר טלפון" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
          </div>
          <div className="block md:flex">
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">שם הפרוייקט</label>
              <select {...register("p_name", { required: true, minLength: 2 })} className="w-full p-2 mt-2 border-solid border-2 rounded-lg">
                <option hidden>בחר פרויקט מרשימת הפרוייקטים</option>
                {projectsList.map((projectName) => {
                  return (
                    <option key={projectName._id} value={projectName.p_name + "@" + projectName.city_name + "@" + projectName.street_name + "@" + projectName.building_name}> {projectName.p_name} - {projectName.city_name}, {projectName.street_name}, {projectName.building_name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="block md:flex">
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">מספר קומה</label>
              <input placeholder="קומה..."  {...register("story", { required: true, minLength: 1 })} type="number" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">מספר דירה</label>
              <input placeholder="דירה..."  {...register("apartment", { required: true, minLength: 1 })} type="number" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
          </div>


          <div className="items-center justify-center flex mt-4">
            <button className="border btn btn-primary">צור משתמש חדש</button>
          </div>
        </form>
      </div>
    </div>

  )
}