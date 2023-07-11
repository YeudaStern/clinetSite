import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';
import { useStateContext } from '../../context';
import { TableCell } from '@mui/material';
import { Button } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function MissionUser() {
  const [query] = useSearchParams();
  const { client } = useStateContext();
  const [missionUser, setMissionUser] = useState([]);
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const page = parseInt(query.get('page')) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/missions/userMissions/' + client._id;
    try {
      let response = await apiGet(url);
      console.log(response);
      setMissionUser(response);
      setData(response); // Set the data received from the API
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-[10px] md:m-[10px] md:w-auto">
      <div className="font-medium text-neutral-300  border-1 p-[10px] flex justify-between login2 rounded-t-lg">
        <span className="pt-2">משימות</span>
        <div>
          {page > 1 && (
            <Button component={Link} to={`/missions?page=${page - 1}`}>
              <KeyboardArrowRightIcon className="text-white " />
            </Button>
          )}
          <span>{page}</span>
          {page < totalPages && (
            <Button component={Link} to={`/missions?page=${page + 1}`}>
              <KeyboardArrowLeftIcon className="text-white" />
            </Button>
          )}
        </div>
        <div>
          <HomeIcon className=" ml-5 font-bold text-6xl cursor-pointer hover:text-yellow-500" onClick={() => nav('/')} />
        </div>
      </div>
      <div className=" md:mh-[300px] mh-[400px] drop-shadow-xl  text-lg rounded-b-lg colors2 p-4 border-1 mt-2 text-white">
        <div className="border-1 mh-[35%] w-1/3 md:flex rounded-lg">
          <div className="md:w-2/5 w-full h-1/2 md:h-full flex flex-wrap p-6 ps-8 pe-8">
            {missionUser.map((mission) => (
              <div className="bg-white text-black rounded-lg p-4 mb-4">
                <div className="font-bold mb-2">שם המשימה - {mission.title}</div>
                <div className="mb-2">מידע - {mission.info}</div>
                <TableCell align="center" className="">
                  <span
                    className="text-blackF"
                    style={{
                      backgroundColor: mission.execution_status === 'waiting' ? 'rgb(245, 245, 50)' : '#6EFF5D',
                      boxShadow: `0 0 6px ${mission.execution_status === 'waiting' ? 'rgb(245, 245, 50)' : '#6EFF5D'}`,
                      borderRadius: '4px',
                      padding: '0px 4px',
                    }}
                  >
                    {mission.execution_status === 'done' ? 'בוצע' : 'בהמתנה'}
                  </span>
                </TableCell>
                <br />
                <TableCell align="center" className="">
                  <span
                    className="text-white"
                    style={{
                      backgroundColor: mission.importance === 'regular' ? ' #0D7CE6' : ' #E93279',
                      boxShadow: `0 0 6px ${mission.importance === 'regular' ? ' #0D7CE6' : ' #E93279'}`,
                      borderRadius: '4px',
                      padding: '0px 4px',
                    }}
                  >
                    {mission.importance === 'regular' ? 'רגיל' : 'מיידי'}
                  </span>
                </TableCell>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
