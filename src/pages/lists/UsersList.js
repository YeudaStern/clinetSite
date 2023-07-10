import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Pagination, PaginationItem } from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { FaSave } from 'react-icons/fa';
import '../single/scroll.css';
import { API_URL } from '../../constant/url';
import { apiDelete, apiGet, apiPatch } from '../../services/apiServices';

export default function UsersList() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const nav = useNavigate();
  const [query] = useSearchParams();

  const page = parseInt(query.get('page')) || 1;
  const itemsPerPage = 7;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  useEffect(() => {
    doApi();
  }, [query]);

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
        toast.success('Role changed successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('There was a problem, try again later');
    }
  };

  const deleteUser = async (_idDel, _name) => {
    if (window.confirm(`להסיר את ${_name} מרשימת הלקוחות?`)) {
      try {
        const url = API_URL + '/users/' + _idDel;
        const response = await apiDelete(url, 'DELETE');
        if (response.deletedCount) {
          doApi();
          toast.success('! לקוח הוסר בהצלחה מהרשימה');
        }
      } catch (err) {
        console.log(err);
        toast.error('There was a problem');
      }
    }
  };

  const goToPreviousPage = () => {
    const previousPage = Math.max(page - 1, 1);
    nav(`?page=${previousPage}`);
  };

  const goToNextPage = () => {
    const nextPage = Math.min(page + 1, totalPages);
    nav(`?page=${nextPage}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => nav(`?page=${i}`)} className={`mx-1 ${page === i ? 'text-blue-500' : 'text-white'}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='p-[10px] md:m-[10px] md:w-auto'>
      <div className='font-medium text-neutral-300 mb-2 p-[10px] flex justify-between login2 border-2 border-slate-500 md:rounded-t-lg'>
        <span className='pt-2'>טבלת משתמשים</span>
        <div>
          <style>{`
            .MuiPagination-ul {
              justify-content: flex-end;
            }

            .MuiPaginationItem-root {
              flex-direction: row-reverse;
            }
            .MuiPaginationItem-icon {
              transform: rotate(180deg);
            }
          `}</style>
          <Pagination
            className='MuiPagination-ul hidden sm:block'
            count={totalPages}
            page={page}
            shape='rounded'
            color='primary'
            size='medium'
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            renderItem={(item) => (
              <PaginationItem
                className='text-white MuiPaginationItem-root'
                component={Link}
                to={`/users?page=${item.page}`}
                {...item}
              />
            )}
          />
        </div>
        <div>
          <HomeIcon className='ml-5 font-bold text-6xl cursor-pointer hover:text-yellow-500' onClick={() => nav('/')} />
          <Button variant='contained' className='items-end text-xs'>
            <Link to='/users/newUser' className='hover:text-white p-1'>
              הוספת לקוח <PersonAddIcon />
            </Link>
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} className='drop-shadow-xl xl:h-[66vh] 2xl:h-[80vh] overflow-scroll'>
        <Table className='border-collapse border-2 border-slate-500 rounded-b-lg'>
          <TableHead>
            <TableRow className='colors2'>
              <TableCell className='border border-slate-300 text-white text-center'>#</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>שם</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>אימייל</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>טלפון</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>שיוך לפרוייקט</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>עיר</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>רחוב</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>מס' בנין</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>קומה</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>דירה</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>גישה</TableCell>
              <TableCell className='border border-slate-300 text-white text-center'>עריכה</TableCell>
              <TableCell className='border border-slate-300 text-center'>מחיקה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow className='' key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center'>{((page - 1) * itemsPerPage) + i + 1}</TableCell>
                <TableCell align='right' className='border border-slate-300'><AccountCircleIcon /> {row.name}</TableCell>
                <TableCell align='center' className='border border-slate-300 hover:cursor-pointer hover:text-blue-700 underline underline-offset-1'>
                  <Link onClick={() => window.location.href = `mailto:${row.email}`}>{row.email}</Link>
                </TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.phone}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.p_name}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.city_name}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.street_name}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.building_name}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.story}</TableCell>
                <TableCell align='center' className='border border-slate-300'>{row.apartment}</TableCell>
                <TableCell className='border border-slate-300'>
                  {!edit ? (
                    row.role
                  ) : (
                    <select defaultValue={row.role} onBlur={(e) => { row.role = e.target.value }}>
                      <option value={''} className='d-none'></option>
                      <option value={'User'}>דייר</option>
                      <option value={'Admin'}>מנהל</option>
                      <option value={'Constructor'}>קבלן</option>
                    </select>
                  )}
                </TableCell>
                <TableCell align='center' className='border border-slate-300'>
                  {!edit ? (
                    <Button onClick={() => setEdit(!edit)} className='border border-blue-500 rounded-xl'>
                      <EditIcon className='hover:text-blue-700' />
                    </Button>
                  ) : (
                    <Button onClick={() => { setEdit(!edit); editRole(row._id, row.role); }} className='border border-blue-500 rounded-xl'>
                      <FaSave className='text-2xl p-0.5 hover:text-blue-700' />
                    </Button>
                  )}
                </TableCell>
                <TableCell align='center' className=''>
                  <Button className='border border-red-600 rounded-xl' onClick={() => deleteUser(row._id, row.name)}>
                    <DeleteIcon className='text-red-600' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='mt-2 hidden 2xl:hidden'>
        <button disabled={page === 1} onClick={goToPreviousPage}>
          <KeyboardArrowRightIcon className='text-white' />
        </button>
        {getPageNumbers()}
        <button disabled={endIndex >= totalItems} onClick={goToNextPage}>
          <KeyboardArrowLeftIcon className='text-white' />
        </button>
      </div>
    </div>
  );
}
