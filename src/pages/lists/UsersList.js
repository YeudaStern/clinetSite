import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import { API_URL } from '../../constant/url';
import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet, apiPatch } from '../../services/apiServices';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { FaSave } from "react-icons/fa";
import '../single/scroll.css';

export default function UsersList() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const nav = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [query] = useSearchParams();
  const page = query.get("page") || 1;

  useEffect(() => {
    doApi();
  }, [query]);

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page]);

  const doApi = async () => {
    const url = API_URL + '/users/usersList';
    try {
      const response = await apiGet(url);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editRole = async (id, role) => {
    const url = API_URL + `/users/changeRole/${id}/${role}`;
    try {
      const response = await apiPatch(url);
      if (response.modifiedCount) {
        doApi();
        toast.success("Role changed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was a problem, try again later");
    }
  };

  const deleteUser = async (_idDel, _name) => {
    if (window.confirm(`להסיר את ${_name} מרשימת הלקוחות?`)) {
      try {
        const url = API_URL + "/users/" + _idDel;
        const response = await apiDelete(url, "DELETE");
        if (response.deletedCount) {
          doApi();
          toast.success("! לקוח הוסר בהצלחה מהרשימה");
        }
      } catch (err) {
        console.log(err);
        toast.error("There was a problem");
      }
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      const pageNumber = (
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`text-white ${currentPage === i ? 'text-red-500' : 'text-blue-700'}`}
          style={{ backgroundColor: currentPage === i ? '#98750E' : '#1976D2', margin: '3px', padding: '1px' }}
        >
          {i}
        </Button>
      );
      pageNumbers.push(pageNumber);
    }
    return pageNumbers;
  };





  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);

  return (
    <div className='p-[10px] md:m-[10px] md:w-auto '>
      <div className='font-medium text-neutral-300 mb-2  p-[10px] flex justify-between login2  border-2 border-slate-500 md:rounded-t-lg '>
        <span className="pt-2">טבלת משתמשים</span>
        <div>

          <Button disabled={currentPage === 1} onClick={goToPreviousPage}>
            <KeyboardArrowRightIcon className="text-white " />
          </Button>
          {getPageNumbers()}
          <Button disabled={currentData.length < itemsPerPage} onClick={goToNextPage}>
            <KeyboardArrowLeftIcon className="text-white" />
          </Button>
          </div >
          <div >
            <HomeIcon className=" ml-5 font-bold text-6xl cursor-pointer hover:text-yellow-500" onClick={() => nav('/')} />
            <Button size="small" variant="contained" className='items-end' >
              <Link to='/users/newUser' className='hover:text-white p-1'>הוספת לקוח <PersonAddIcon /> </Link>
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} className="drop-shadow-xl  lg:h-[70vh] h-[74vh] overflow-scroll">
          <Table className="border-collapse  border-2 border-slate-500 rounded-b-lg ">
            <TableHead>
              <TableRow className="colors2">
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
              {currentData.map((row, i) => (
                <TableRow className="" key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='center'>{((currentPage - 1) * itemsPerPage) + i + 1}</TableCell>
                  <TableCell align="right" className="border border-slate-300"><AccountCircleIcon /> {row.name}</TableCell>
                  <TableCell align='center' className="border border-slate-300 hover:cursor-pointer hover:text-blue-700 underline underline-offset-1"><Link onClick={() => window.location.href = `mailto:${row.email}`}>{row.email}</Link></TableCell>
                  <TableCell align='center' className="border border-slate-300">{row.phone}</TableCell>
                  <TableCell align='center' className="border border-slate-300">{row.p_name}</TableCell>
                  <TableCell align="center" className="border border-slate-300">{row.city_name}</TableCell>
                  <TableCell align="center" className="border border-slate-300">{row.street_name}</TableCell>
                  <TableCell align='center' className="border border-slate-300">{row.building_name}</TableCell>
                  <TableCell align="center" className="border border-slate-300">{row.story}</TableCell>
                  <TableCell align='center' className="border border-slate-300">{row.apartment}</TableCell>
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
        <div className="mt-2">
          <button disabled={currentPage === 1} onClick={goToPreviousPage}>
            <KeyboardArrowRightIcon className="text-white " />
          </button>
          {getPageNumbers()}
          <button disabled={currentData.length < itemsPerPage} onClick={goToNextPage}>
            <KeyboardArrowLeftIcon className="text-white" />
          </button>
        </div>
      </div>
      );
}
