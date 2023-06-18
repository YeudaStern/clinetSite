import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_URL } from "../../constant/url";
import { apiPost } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


export default function NewProject() {

  const [cityData, setCityData] = useState([]);
  const [streetData, setSteertData] = useState([]);
  const [citySelectd, setCitySelected] = useState('');
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  }
  useEffect(() => {
    doApiCity();
  }, []);

  useEffect(() => {
    citySelectd !== '' && doApiStreet(citySelectd);
  }, [citySelectd]);

  const doApiCity = async () => {
    let url = "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1350";
    fetch(url)
      .then((resp) => resp.json())
      .then((cityData) => {
        let cities = cityData.result.records;
        console.log(cities);
        setCityData(cities)
      });
  }

  const doApiStreet = async (city) => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=${city}&limit=70000`
    fetch(url)
      .then((resp) => resp.json())
      .then((streetData) => {
        let cities = streetData.result.records;
        console.log(cities);
        setSteertData(cities)
      });
  }

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/projects";
      const data = await apiPost(url, _bodyData);
      if (data._id) {
        toast.success("New Project added");
        nav("/projects")
      }
    } catch (error) {
      console.log(error);
      toast.error('There problem, try again later')
    }
  }



  return (

    <div className="p-[20px] m-[20px]">
      <div className='font-medium text-neutral-300 mb-0.5 border-2 p-[10px] flex justify-between bg-slate-700'>
        <span className="pt-2"> צור פרויקט חדש</span>
        <Button size="small" variant="contained" className='items-end' >
          <Link to='/projects' className='hover:text-white p-1'>חזור < ArrowBackIcon /></Link>
        </Button>
      </div>
      <div className=" md:h-[400px] mh-[400px] border flex p-4 bg-slate-600  drop-shadow-xl">
        <form className="w-full " onSubmit={handleSubmit(onSubForm)}>
          <div className="md:flex block">
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">שם הפרויקט</label>
              <input {...register("p_name", { required: true, minLength: 2 })} type="text" placeholder="הזן את שם הפרויקט" className="w-full p-2 mt-2 border-solid border-2 rounded-lg"  />
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">קבלן מבצע</label>
              <input {...register("contractor_name", { required: true, minLength: 2 })} type="text" placeholder="הזן את שם הקבלן" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
          </div>
          <div className="block md:flex">
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">בחר עיר</label>
              <input placeholder="לחץ לבחירת עיר" {...register("city_name", { required: true, minLength: 2 })} list="city-name" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" onBlur={(e) => { setCitySelected(e.target.value) }} />
              <datalist id="city-name" >
                {cityData.map((city, i) => (
                  <option value={city.שם_ישוב} key={i}></option>
                ))}
              </datalist>
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">בחר רחוב</label>
              <input placeholder="לחץ לבחירת עיר"  {...register("street_name", { required: true, minLength: 2 })} list="street-name" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" />
              <datalist id="street-name" >
                {streetData.map((street, i) => (

                  <option value={street.שם_רחוב} key={i}></option>
                ))}
              </datalist>
            </div>
          </div>
          <div className=" w-full md:pe-4 md:p-1 mt-3">
            <label className="text-white">בנין (מספר או כינוי)</label>
            <input {...register("building_name", { required: true, minLength: 1 })} type="text" placeholder="הזן את שם הבנין " className="w-full p-2 mt-2 border-solid border-2 rounded-lg" required />

          </div>
          <div className="items-center justify-center flex mt-4">
            <button className="border btn btn-primary">צור פרויקט חדש</button>
          </div>
        </form>
      </div>
    </div>

  )
}
