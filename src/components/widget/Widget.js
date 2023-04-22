import React from 'react'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import "./widget.scss"
import { Link } from 'react-router-dom';
export default function Widget({ type }) {
  let data;

  //temporary
  const amount = 100;
  const diff = 34;
  switch (type) {
    case 'users':
      data = {
        title: "USERS",
        link: <Link to="...">Users list</Link>,
        icon:
          <PersonOutlineOutlinedIcon className='icon' style={{ color: "crimson", background: "rgba(220, 20, 60, 0.219)" }} />
      };
      break;
    case 'projects':
      data = {
        title: "PROJECTS ",
        link: <Link to="...">View all projects</Link>,
        icon:
          <BusinessOutlinedIcon className='icon' style={{ color: "goldenrod", background: "rgba(218, 165, 32, 0.284)" }} />
      };
      break;
    case 'contractors':
      data = {
        title: "CONTRACTORS",
        link: <Link to='...'>Contractor list</Link>,
        icon:
          <EngineeringOutlinedIcon className='icon' style={{ color: "rgb(2, 66, 2)", background: "rgba(0, 128, 0, 0.223)" }} />
      };
      break;
    default: break;


  }
  return (
    <div className='widget mr-[20px] flex w-[200px] flex-[1] p-[10px] justify-between rounded-lg h-28'>
      <div className='left flex flex-col justify-between'>
        <span className='title font-bold text-sm text-gray-400'>{data.title}</span>
        <span className='counter text-xl font-light'>{amount}</span>
        <span className='link text-xs border-b-[1px] border-b-[gray] w-max'>{data.link}</span>
      </div>
      <div className='right flex flex-col justify-between'>
        <div className='percentage positive flex items-center text-sm'>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        <div className='self-end'>
          {data.icon}
        </div>
      </div>
    </div>
  )
}
