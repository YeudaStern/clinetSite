import React from "react";
import Widget from "../../components/widget/Widget";
import BarSide from "../../components/barside/BarSide";
import BarNav from "../../components/navbar/BarNav";

export default function Home() {
  return (
    <div className="home md:flex">
      <BarSide />
      <div className="homeContainer flex-[10]">
        <BarNav />
        <div className="widgets block md:flex p-[20px]">
          <Widget type='users' />
          <Widget type='projects' />
          <Widget type='contractors' />
        </div>       
      </div>
    </div>
  )
}
