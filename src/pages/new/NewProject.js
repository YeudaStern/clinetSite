import React from "react"
import BarSide from "../../components/barside/BarSide"
import BarNav from "../../components/navbar/BarNav"
import { Form } from "react-router-dom"
import { Label } from "@mui/icons-material"


export default function NewProject() {
  return (
    <div className="flex">
      <BarSide />
      <div className="flex-[10]">
        <BarNav />
        <div className="'p-[20px] m-[20px]">
          <div className='font-medium text-neutral-400 p-[8px] shadow'>
            <div> Add new project</div>

          </div>
        </div>
      </div>
    </div>
  )
}
