import React from "react"
import BarSide from "../../components/barside/BarSide"
import BarNav from "../../components/navbar/BarNav"


export default function NewProject() {

 //TODO:create doApiPost
 //TODO:create onSubForm









  return (
    <div className="flex">
      <BarSide />
      <div className="flex-[10]">
        <BarNav />
        <div className="'p-[20px] m-[20px]">
          <div className='font-medium text-neutral-400 p-[8px] shadow'>
            <div> Add new project</div>
            {/* create form control mui */}
          </div>
        </div>
      </div>
    </div>
  )
}
