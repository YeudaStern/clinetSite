import React from "react"
import BarSide from "../../components/barside/BarSide"
import BarNav from "../../components/navbar/BarNav"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function NewProject() {

 //TODO:create doApiPost
 //TODO:create onSubForm









  return (
    <div className="flex">
      <BarSide />
      <div className="flex-[10]">
        <BarNav />
        <div className="'p-[20px] m-[20px]">
        <div className='font-medium text-neutral-400 mb-0.5 border-2 p-[8px]  flex justify-between'>
            Add new Project
            <Button size="small" variant="contained" className='items-end' >
              <Link to='/projects' className='hover:text-white'>BACK <ArrowForwardIcon  /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
