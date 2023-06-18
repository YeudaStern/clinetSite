import React, { useEffect, useState } from "react";
import Widget from "../../components/widget/Widget";
import { useStateContext } from "../../context";
import { API_URL } from "../../constant/url";
import { apiGet } from "../../services/apiServices";
import HomeUser from "../../user/HomeUser"
import { useNavigate } from "react-router-dom";




export default function Home() {

  const { login } = useStateContext();
  const [data, setData] = useState([])


  const doApi = async () => {
    let url = API_URL + '/users/userInfo';
    try {
      const data = await apiGet(url)
      console.log(data);
      setData(data);

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    doApi();
  }, [])

  return (
    <div>
      {login === 2 && <>
        <div className="widgets block md:flex me-10 pt-4">
          <Widget type='projects' url='/projects/' text='פרוייקטים' />
          <Widget type='users' url='/users/' text='דיירים' />
          <Widget type='messages' url='/comments/' text='הודעות' />
        </div>
      </>}
      {login === 3 &&
        <div className="p-[10px] m-[10px]">
         
         <HomeUser/>
        </div>
      }
    </div>
  )
}
