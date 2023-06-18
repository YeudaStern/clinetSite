import React, { useEffect, useState } from 'react'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import "./widget.scss"
import { Link } from 'react-router-dom';
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';

export default function Widget({ type, url, text }) {
  let data;

  //temporary
  const [amount, setAmount] = useState(0);
  const diff = 34;
  switch (type) {
    case 'users':
      data = {
        title: type.toUpperCase(),
        link: <Link className='hover:text-yellow-500' to='users'>{text}</Link>,
        icon:
          <PersonOutlineOutlinedIcon className='icon' style={{ color: "crimson", background: "rgba(220, 20, 60, 0.219)" }} />
      };
      break;
    case 'projects':
      data = {
        title: type.toUpperCase(),
        link: <Link className='hover:text-yellow-500' to="projects">{text}</Link>,
        icon:
          <BusinessOutlinedIcon className='icon' style={{ color: "goldenrod", background: "rgba(218, 165, 32, 0.284)" }} />
      };
      break;
    case 'messages':
      data = {
        title: type.toUpperCase(),
        link: <Link className='hover:text-yellow-500' to='/comments'>{text}</Link>,
        icon:
          <EngineeringOutlinedIcon className='icon' style={{ color: "rgb(2, 66, 2)", background: "rgba(0, 128, 0, 0.223)" }} />
      };
      break;
    default: break;
  }

  const doApi = async () => {
    const data = await apiGet(API_URL + url + 'count');
    setAmount(data.count)
  }

  useEffect(() => {
    doApi();
  }, [])


  return (
    <>
      <div className='widget mr-[20px] flex flex-[1] p-[10px] justify-between rounded-lg h-28 w-full md:1/3 mb-4 bg-stone-800 text-white'>
        <div className='left flex flex-col justify-between'>
          <span className='title font-bold text-sm text-gray-400'>{data.title}</span>
          <span className='counter text-xl font-light'>{amount}</span>
          <span className='link text-xs border-b-[1px] border-b-[gray] w-max'>{data.link}</span>
        </div>
        <div className='right flex flex-col justify-between'>
          <div className='percentage positive flex items-center text-sm'>
            {diff}%
            <KeyboardArrowUpIcon />
          </div>
          <div className='self-end'>
            {data.icon}
          </div>
        </div>
      </div>
    </>

  )
}
