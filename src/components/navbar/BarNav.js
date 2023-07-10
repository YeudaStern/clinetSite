import React, { useEffect, useState } from 'react'
import '../../style/colorKit.css'
import BurgerModal from "../burgers/burgerModal"
import { useWindowSize } from '../../services/hooks/screenSizeHook';
import { useStateContext } from '../../context';
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';
import { HiOutlineMail } from "react-icons/hi";

export default function BarNav() {
  const { width } = useWindowSize();
  const { login } = useStateContext()
  const [data, setData] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    const url = API_URL + '/users/userInfo';
    try {
      let data = await apiGet(url);
      console.log(data);
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(login);
  let showBurgerElement = width <= 768;





  return (
    <>
      {showBurgerElement && <BurgerModal />}
      {login === 2 &&
        <div>
          <div className='navbar border-e-slate-950 text-stone-300 hidden md:flex h-[70px] login2 pr-6 sticky-top border-b border-b-slate-600'>ברוך הבא - {data.name} 
          
          <div className='ml-4 cursor-pointer bg-cyan-600 p-1 rounded-full hover:bg-red-600'>
            <HiOutlineMail className='text-xl text-white '/>
          </div>
           </div>
         
        </div>

      }
      {login === 3 &&
        <div className='navbar border-e-slate-950 text-stone-300 hidden md:flex h-[70px] login3 pr-6'>ברוך הבא - {data.name}</div>
      }

    </>
  )
}
