import React, { useEffect, useState } from 'react'
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';
import { useStateContext } from '../../context';
import './missionUser.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function MissionUser() {
  const { client } = useStateContext()
  const [missionUser, setMissionUser] = useState([])

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + '/missions/userMissions/' + client._id;
    try {
      let data = await apiGet(url)
      console.log(data);

      setMissionUser(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='m-[30px] p-[20px] mission rounded-lg'>
        <div className='font-medium text-neutral-300 border-2 p-[10px] flex justify-between login2 rounded-lg mb-2.5'>
          <span className="pt-2 text-lg">
            <strong>שם הדייר :</strong>
            <span style={{ color: 'orange' }}> {client.name}</span>
          </span>
          <Button size="small" variant="contained" className='items-end' >
            <Link to='/projects/singleClient' className='hover:text-white p-1'> חזור < ArrowBackIcon /></Link>
          </Button>
        </div>

        {missionUser.map((mission) => (
          <div className='text-white mb-2 p-2.5 rounded-lg mh-[50px] bg-stone-700 w-1/2 text-lg flex '>
            <div className='w-full '>{mission.title} </div>
            <div className='w-full '>{mission.info} </div>
            <div className='w-full text-cyan-400'>{mission.importance} </div>
            <div className='w-full  text-orange-400'>{mission.execution_status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
