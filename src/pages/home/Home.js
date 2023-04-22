import React from "react";
import "./home.scss"
import BarSide from "../../components/barside/BarSide";
import NavBar from "../../components/navbar/NavBar";
import Widget from "../../components/widget/Widget";



export default function Home() {





  return (

    <div className="home flex">
      <BarSide />
      <div className="homeContainer flex-[10]">
        <NavBar/>
       <div className="widgets flex p-[20px]">
        <Widget type='users'/>
        <Widget type='projects'/>
        <Widget type='contractors'/>
        {/* <Widget type='users'/> */}
       </div>
      </div>
    </div>
  )
}
