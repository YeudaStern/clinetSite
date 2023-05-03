
import React, { useMemo, useState } from "react";

import Widget from "../../components/widget/Widget";
import List from "../list/List";

import BarSide from "../../components/barside/BarSide";
import BarNav from "../../components/navbar/BarNav";
import { IconButton, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Home() {


  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)

  const darkThme = useMemo(() => createTheme({
    palette: {
      mode: dark ? 'dark' : 'light'
    }
  }), [dark])

  return (

    
    <div className="home">
      <BarSide />
      <div className="homeContainer flex-[10]">
        <BarNav />
        <div className="widgets block md:flex p-[20px]">
          <Widget type='users' />
          <Widget type='projects' />
          <Widget type='contractors' />

    
      {/* <ThemeProvider theme={darkThme}></ThemeProvider>
   <IconButton onClick={() => setDark(!dark)}> 
          {dark ? <Brightness7 /> : <Brightness4 />} */}
      <div className="home flex">


        <BarSide />
        <div className="homeContainer flex-[10]">
          <BarNav />
          <div className="widgets block md:flex p-[20px]">
            <Widget type='users' />
            <Widget type='projects' />
            <Widget type='contractors' />

          </div>
          <div className="listContainer p-[20px] m-[20px]">
            <div className="listTitle font-medium text-neutral-400 mb-3.5">Projects table</div>
            <List type='projects' className='prolist' />
          </div>

        </div>
      </div>
      {/* </IconButton>     */}

  )
}
