import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../constant/url';
import { apiGet, apiPut } from '../../services/apiServices';
import { toast } from 'react-toastify';


export default function EditProject() {
  const [info, setInfo] = useState({});
  const [cityData, setCityData] = useState([]);
  const [streetData, setSteertData] = useState([]);
  const [citySelectd, setCitySelected] = useState('');
  const params = useParams();
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    doApiInit();
    doApiCity();
  }, []);

  const doApiInit = async () => {
    try {
      const url = API_URL + "/projects/single/" + params["id"];
      const data = await apiGet(url);
      console.log(data);
      setInfo(data)

    } catch (err) {
      console.log(err);
    }
  }

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

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData);
  }


  const doApiEdit = async (_bodyData) => {
    try {
      const url = API_URL + "/projects/" + params["id"];
      console.log(url);
      const data = await apiPut(url, _bodyData);
      console.log(data);
      if (data.modifiedCount) {
        toast.success("!שינויים נשמרו בהצלחה");
        nav("/projects")
      }
    } catch (error) {
      console.log(error);
      toast.error("ישנה בעיה, נסה שנית")
    }
  }


  return (
    <div className='p-[20px] md:m-[20px] md:w-auto w-screen'>
      <div className='font-medium text-neutral-300 mb-0.5 border-2 border-slate-400 rounded-t-lg p-[10px] flex justify-between bg-stone-800'>
        <span className="pt-2">ערוך פרוייקט</span>


        <Button size="small" variant="contained" className='items-end' >
          <Link to='/projects' className='hover:text-white p-1'>חזור  <ArrowBackIcon /></Link>
        </Button>
      </div>
      <div className=" md:h-[400px] mh-[400px] mt-1 flex p-4 bg-stone-800 drop-shadow-xl border-1 border-slate-400 rounded-b-lg">
        <form className="w-full " onSubmit={handleSubmit(onSubForm)}>
          <div className="md:flex block">
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">שם הפרויקט</label>
              <input defaultValue={info.p_name} {...register("p_name", { minLength: 2 })} type="text" className=" text-black w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1">
              <label className="text-white">קבלן מבצע</label>
              <input defaultValue={info.contractor_name} {...register("contractor_name", { minLength: 2 })} type="text" className=" text-black w-full p-2 mt-2 border-solid border-2 rounded-lg" />
            </div>
          </div>
          <div className="block md:flex">
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">בחר עיר</label>
              <input defaultValue={info.city_name} {...register("city_name", { minLength: 0 })} list="city-name" className=" text-black w-full p-2 mt-2 border-solid border-2 rounded-lg" onBlur={(e) => { setCitySelected(e.target.value) }} />
              <datalist id="city-name" >
                {cityData.map((city, i) => (
                  <option value={city.שם_ישוב} key={i}></option>
                ))}
              </datalist>
            </div>
            <div className="md:w-1/2 md:pe-4 md:p-1 mt-3">
              <label className="text-white">בחר רחוב</label>
              <input defaultValue={info.street_name} {...register("street_name", { minLength: 0 })} list="street-name" className=" text-black w-full p-2 mt-2 border-solid border-2 rounded-lg" />
              <datalist id="street-name" >
                {streetData.map((street, i) => (

                  <option value={street.שם_רחוב} key={i}></option>
                ))}
              </datalist>
            </div>
          </div>
          <div className=" w-full md:pe-4 md:p-1 mt-3">
            <label className="text-white">בנין (מספר או כינוי)</label>
            <input defaultValue={info.building_name} {...register("building_name", { minLength: 0 })} type="text" className="w-full p-2 mt-2 border-solid border-2 rounded-lg" required />

          </div>
          <div className="items-center justify-center flex mt-4">
            <button className="border btn btn-primary">עדכן שינויים בפרויקט</button>
          </div>
        </form>
      </div>
    </div>
  )
}
