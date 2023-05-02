import React from "react";

import Widget from "../../components/widget/Widget";
import  List from "../list/List" ;
import BarSide from "../../components/barside/BarSide";
import BarNav from "../../components/navbar/BarNav";

export default function Home() {

  return (

    <div className="home flex">
      <BarSide/>
      <div className="homeContainer flex-[10]">
        <BarNav/>
        <div className="widgets block md:flex p-[20px]">
          <Widget type='users' />
          <Widget type='projects' />
          <Widget type='contractors' />
          <Widget type='contractors' />
        </div>
        <div className="listContainer p-[20px] m-[20px]">
          <div className="listTitle font-medium text-neutral-400 mb-3.5">Projects table</div>
          <List type='projects' className='prolist'/>
        </div>
      </div>
    </div> 
  )
}
