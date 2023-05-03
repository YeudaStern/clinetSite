import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet } from '../../services/apiServices'
import { Link, useSearchParams } from 'react-router-dom';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, Button, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { API_URL } from '../../constant/url';
import BarSide from '../../components/barside/BarSide';
import BarNav from '../../components/navbar/BarNav';
import { DataGrid } from '@mui/x-data-grid';


export default function UsersList() {

  const [data, setData] = useState([]);
  const [query] = useSearchParams();

 
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

  // const deleteProject = async (_idDel) => {
  //   if (window.confirm("Delete user?")) {
  //     try {
  //       const url = API_URL + "/users/" + _idDel;
  //       const data = await apiDelete(url, "DELETE");
  //       if (data.deletedCount) {
  //         doApi();
  //         toast.info("sdgfbfsgb")
  //       }
  //     }
  //     catch (err) {
  //       console.log(err);
  //       toast.error("There problem")
  //     }
  //   }
  // }

  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Full name',
      width: 160,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 140,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 130,
      editable: true,
    },
    {
      field: 'p_name',
      headerName: 'Project name',
      width: 130,
      editable: true,
    },
    {
      field: 'building_name',
      headerName: 'Building',
      width: 100,
      editable: true,
    },
    {
      field: 'story',
      headerName: 'Store',
      width: 50,
      type: "number",
      editable: true,
    },
    {
      field: 'apartment',
      headerName: 'Apartment',
      width: 100,
      type: 'number',
      editable: true,
    },
  ];


  return (
    <div className='flex'>
      <BarSide />
      <div className='flex-[10]'>
        <BarNav />
        <div className='p-[20px] m-[20px] w-screen'>
          <div className='font-medium text-neutral-400 mb-0.5 border-2 p-[8px]  flex justify-between'>
            Users Table
            <Button size="small" variant="contained" className='items-end' >
              <Link to='/users/newUser' className='hover:text-white'>Add new user</Link>
            </Button>
          </div>
          <Box sx={{ height: 400, width: '98%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  )
}