import './cheat.css';
import { API_URL } from '../constant/url';
import { apiGet } from '../services/apiServices';
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { AiOutlineSearch } from "react-icons/ai";

export default function Cheat() {
  const [data, setData] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/users/usersList';
    try {
      let data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchUser = (event) => {
    setSearchUser(event.target.value);
  };

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className='mr-[20px] justify-between h-[54vh] 2xl:h-[66vh] w-full md:w-1/3  mb-4 bg-stone-800 text-white cheat overflow-y-auto overflow-x-hidden rounded-lg'>
      <div className='w-full sticky top-0 overflow-hidden'>
        <h1 className='w-full  text-2xl bg-stone-800 p-[10px]  border-b border-b-slate-400 text-cyan-400'>
          <ForumOutlinedIcon /> צ'אט
        </h1>

        <div className='relative'>
          <input
            placeholder='חפש איש קשר..'
            className='w-full bg-stone-800 p-[10px] ps-10 pt-2 border-b'
            value={searchUser}
            onChange={handleSearchUser}
          />
          <AiOutlineSearch className='absolute top-1/2 right-3 transform -translate-y-1/2' />
        </div>

      </div>
      <div className='w-full h-full block'>
        {filteredData.length > 0 ? (
          filteredData.map((user, index) => (
            <React.Fragment key={user._id || index}>
              <button
                className='w-full h-[56px] text-right pr-3 hover:bg-zinc-700'>
                <AccountCircleIcon className='ms-1 item' /> {user.name} - {user.p_name}
              </button>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <div className='m-2 border text-xl bg-sky-600 p-2.5'>
            <ErrorOutlineRoundedIcon /> לא נמצא איש קשר מתאים
          </div>
        )}
      </div>
    </div>
  );
}
