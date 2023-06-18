import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { API_URL } from '../../constant/url';
import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet } from '../../services/apiServices';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStateContext } from "../../context";
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import '../single/scroll.css'

export default function ProjectsList() {

  const [data, setData] = useState([]);
  const [query] = useSearchParams();
  const { setSProject } = useStateContext();
  const nav = useNavigate();
  const page = query.get("page") || 1;

  useEffect(() => {
    doApi();
  }, [query])

  const doApi = async () => {
    const url = API_URL + '/projects/projectsList';
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);

    }
  }

  const deleteProject = async (_idDel, _name) => {
    if (window.confirm(`להסיר את ${_name} מרשימת הפרוייקטים?`)) {
      try {
        const url = API_URL + "/projects/" + _idDel;
        const data = await apiDelete(url, "DELETE");
        if (data.deletedCount) {
          doApi();
          toast.success("הפרוייקט הוסר בהצלחה")
        }
      }
      catch (err) {
        console.log(err);
        toast.error("ישנה בעיה, נסו שנית")
      }
    }
  }

  const onSubShowOne = (p_name, building_name, project_id) => {
    setSProject([p_name, building_name, project_id]);

    nav('/projects/singleProject')
  }


  return (

    <div className='p-[10px] md:m-[10px] md:w-auto'>
      <div className='font-medium text-neutral-300 mb-0.5 border-2 p-[10px] flex justify-between login2'>
        <span className="pt-2">טבלת פרוייקטים</span>
        <div>
          <Button><KeyboardArrowRightIcon className="text-white " /></Button>
          <span>1</span>
          <Button><KeyboardArrowLeftIcon className="text-white" /></Button>
        </div>

        <Button size="small" variant="contained" className='items-end' >
          <Link to='/projects/newProject' className='hover:text-white p-1'>הוספת פרוייקט <DomainAddIcon /></Link>
        </Button>
      </div>
      <TableContainer component={Paper} className="drop-shadow-xl md:h-[68vh] mh-[400px] overflow-y-scroll ">
        <Table className="border-collapse border border-slate-400">
          <TableHead>
            <TableRow className=" colors2 ">
              <TableCell className="border border-slate-300 text-white text-center">#</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">עיר</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">רחוב</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">שם הפרויקט</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">בנין (מספר או כינוי)</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">קבלן מבצע</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">עריכה</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">מחיקה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={row._id} className=" bg-slate-400">
                <TableCell align='center' >{((page - 1) * 15) + i + 1}</TableCell>
                <TableCell align="center" className="border border-slate-300 ">{row.city_name}</TableCell>
                <TableCell align="center" className="border border-slate-300 ">{row.street_name}</TableCell>
                <TableCell align='center' className="border border-slate-300 "><button onClick={() => onSubShowOne(row.p_name, row.building_name, row._id)} className="border p-2 px-4 rounded-md hover:bg-blue-600  hover:"><BusinessIcon /> {row.p_name} </button></TableCell>
                <TableCell align='center' className="border border-slate-300 ">{row.building_name}</TableCell>
                <TableCell align='center' className="border border-slate-300 ">{row.contractor_name}</TableCell>
                <TableCell align='center' className="border border-slate-300 "><Button className="border rounded-xl" onClick={() => {
                  nav("/projects/editProject/" + row._id)
                }}><EditIcon className=" text-blue-700 hover:text-amber-600" /></Button></TableCell>
                <TableCell align='center' className=""><Button className="border border-red-600 rounded-xl" onClick={() => { deleteProject(row._id, row.p_name) }}><DeleteIcon className="text-red-700" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
