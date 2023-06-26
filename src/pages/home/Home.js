import React from "react";
import Widget from "../../components/widget/Widget";
import { useStateContext } from "../../context";
import HomeUser from "../../user/HomeUser";
import Cheat from "../../components/Cheat";
import Mission from "../../components/Mission";



export default function Home() {
  const { login } = useStateContext();


  return (
    <div>
      {login === 2 && <>
        <div className="widgets block md:flex me-10 pt-4">
          <Widget type='projects' url='/projects/' text='פרוייקטים' />
          <Widget type='users' url='/users/' text='דיירים' />
          <Widget type='messages' url='/comments/' text='הודעות' />
        </div>
        <div className="text-white  block md:flex me-10 pt-2">
          <Mission />
          <Cheat />
        </div>
      </>}
      {login === 3 &&
        <div className="p-[10px] m-[10px]">
          <HomeUser />
        </div>
      }
    </div>
  )
}
