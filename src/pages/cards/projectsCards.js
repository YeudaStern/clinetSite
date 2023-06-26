import React, { useEffect, useState } from "react"
import { useStateContext } from "../../context";
import { API_URL } from "../../constant/url";
import { apiGet } from "../../services/apiServices";
import Card from 'react-bootstrap/Card';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BusinessIcon from '@mui/icons-material/Business';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, AlertTitle, Button } from "@mui/material";



export default function ProjectCard() {
  const nav = useNavigate();
  const { sProject } = useStateContext();
  const { setClient } = useStateContext();
  const [data, setData] = useState([]);
  const [dataProject, setDataProject] = useState([]);

  useEffect(() => {
    sProject.length < 1 ? nav('/projects') : doApi();

    const projectId = sProject[2];
    localStorage.setItem('projectId', projectId);
    if (projectId) {
      doApiProject(projectId)
    }
  }, [])


  const doApi = async () => {
    const url = API_URL + `/users/singleProject/${sProject[0]}/${sProject[1]}`;
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const doApiProject = async (projectId) => {
    const url2 = API_URL + `/projects/single/${projectId}`;
    try {
      const dataProject = await apiGet(url2);
      console.log(dataProject);
      setDataProject(dataProject);
      // const projectId = dataProject._id;
      // localStorage.setItem('projectId', projectId);
    } catch (error) {
      console.log(error);
    }
  }



  const onSubShowUser = (user) => {
    setClient(user)
    nav('/projects/singleClient')
  }


  return (

    <div className="p-[10px] m-[10px]">
      <div className='font-medium text-neutral-300 mb-0.5 border-2 p-[10px] flex justify-between login2 rounded-lg'>
        <span className="pt-2">רשימת דיירים בבנין </span>
        <Button size="small" variant="contained" className='items-end' >
          <Link to='/projects' className='hover:text-white p-1'>חזור < ArrowBackIcon /></Link>
        </Button>
      </div>
      {data.length === 0 ? <div className="mt-3"><Alert severity="info">
        <AlertTitle>מידע </AlertTitle>
        לידיעתך - <strong>אין שיוך דיירים לבנין זה !</strong>
      </Alert> </div> :
        <div className=" mh-[400px] flex flex-wrap pt-3 justify-between items-center">
          {data.map((item) => (
            <Card key={item._id} className=" xs:w-[48%] sm:w-[47%] md:w-[32%] lg:w-[22%] colors2 text-white shadow-2xl sm:mb-0 mb-5 flex m-0.5 rounded-xl">
              <Card.Body>
                <Card.Title className="text-end p-1 mb-1"><Person2OutlinedIcon className="text-green-600" /> {item.name}</Card.Title>
                <Card.Text className="text-end p-1 mb-1"><AccountTreeIcon className="text-[goldenrod] bg-[#]" /> {item.p_name}</Card.Text>
                <Card.Text className="text-end p-1 mb-1"><BusinessIcon /> {item.city_name}</Card.Text>
                <Card.Text className="text-end p-1 mb-1"><CottageOutlinedIcon /> {item.street_name} - {item.building_name}</Card.Text>
                <button className="border text-white p-1 rounded" onClick={() => onSubShowUser(item)}>ראה לקוח</button>
              </Card.Body>
            </Card>
          ))}
        </div>
      }
    </div>
  );
}
