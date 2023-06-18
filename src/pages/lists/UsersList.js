import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import { API_URL } from '../../constant/url';
import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet, apiPatch } from '../../services/apiServices';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FaSave } from "react-icons/fa";


export default function UsersList() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);

  const [query] = useSearchParams();
  const page = query.get("page") || 1;

  useEffect(() => {
    doApi();
  }, [query])



  const doApi = async () => {
    const url = API_URL + '/users/usersList';
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);

    }
  }


  const editRole = async (id, role) => {
    // user , editor , admin 
    const url = API_URL + `/users/changeRole/${id}/${role}`;
    try {
      const data = await apiPatch(url);
      if (data.modifiedCount) {
        doApi();
        toast.success("Role change successfuly")
      }
    }
    catch (error) {
      console.log(error);
      toast.error("There problem, try again later")
    }
  }



  const deleteUser = async (_idDel, _name) => {
    if (window.confirm(`להסיר את ${_name} מרשימת הלקוחות?`)) {
      try {
        const url = API_URL + "/users/" + _idDel;
        const data = await apiDelete(url, "DELETE");
        if (data.deletedCount) {
          doApi();
          toast.success("! לקוח הוסר בהצלחה מהרשימה")
        }
      }
      catch (err) {
        console.log(err);
        toast.error("There problem")
      }
    }
  }




  return (
    <div className='p-[10px] md:m-[10px] md:w-auto '>
      <div className='font-medium text-neutral-300 mb-0.5 border-2 p-[10px] flex justify-between login2'>
        <span className="pt-2">טבלת משתמשים</span>
        <div>
          <Button><KeyboardArrowRightIcon className="text-white " /></Button>
          <span>1</span>
          <Button><KeyboardArrowLeftIcon className="text-white" /></Button>
        </div>
        <Button size="small" variant="contained" className='items-end' >
          <Link to='/users/newUser' className='hover:text-white p-1'>הוספת משתמש <PersonAddIcon /> </Link>
        </Button>
      </div>
      <TableContainer component={Paper} className="drop-shadow-xl  md:h-[68vh] mh-[400px]">
        <Table className="border-collapse border border-slate-400">
          <TableHead>
            <TableRow className=" colors2 ">
              <TableCell className="border border-slate-300 text-white text-center">#</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">שם</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">אימייל</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">טלפון</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">שיוך לפרוייקט</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">עיר</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">רחוב</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">מס' בנין</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">קומה</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">דירה</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">גישה</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">עריכה</TableCell>
              <TableCell className="border border-slate-300 text-white text-center">מחיקה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow className="bg-slate-400" key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center'>{((page - 1) * 15) + i + 1}</TableCell>
                <TableCell align="right" className="border border-slate-300"><AccountCircleIcon /> {row.name}</TableCell>
                <TableCell align='center' className="border border-slate-300 hover:cursor-pointer hover:text-blue-700 underline underline-offset-1"><Link onClick={() => window.location.href = `mailto:${row.email}`}>{row.email}</Link></TableCell>
                <TableCell align='center' className="border border-slate-300">{row.phone}</TableCell>
                <TableCell align='center' className="border border-slate-300">{row.p_name}</TableCell>
                <TableCell align="center" className="border border-slate-300">{row.city_name}</TableCell>
                <TableCell align="center" className="border border-slate-300">{row.street_name}</TableCell>
                <TableCell align='center' className="border border-slate-300">{row.building_name}</TableCell>
                <TableCell align="center" className="border border-slate-300">{row.story}</TableCell>
                <TableCell align='center' className="border border-slate-300">{row.apartment}</TableCell>

                {/* print row._id send to function */}
                <TableCell className="border border-slate-300">{!edit ? row.role :
                  <select defaultValue={row.role} onBlur={(e) => { row.role = e.target.value }}>
                    <option value={""} className="d-none"></option>
                    <option value={"User"}>דייר</option>
                    <option value={"Admin"}>מנהל</option>
                    <option value={"Constructor"}>קבלן</option>
                  </select>}
                </TableCell>

                <TableCell align='center' className="border border-slate-300">{!edit ? <Button onClick={() => {
                  setEdit(!edit)
                }} className="border border-blue-500 rounded-xl"> <EditIcon className=" hover:text-blue-700" /></Button> :
                  <Button onClick={() => {
                    setEdit(!edit)
                    editRole(row._id, row.role)
                  }} className="border border-blue-500 rounded-xl"> <FaSave className="text-2xl p-0.5 hover:text-blue-700" /></Button>}
                </TableCell>
                <TableCell align='center' className=""><Button className="border border-red-600 rounded-xl" onClick={() => { deleteUser(row._id, row.name) }}><DeleteIcon className="text-red-600" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
