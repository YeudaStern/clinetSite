import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet } from '../../services/apiServices'
import { Link, useSearchParams } from 'react-router-dom';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import {  API_URL } from '../../constant/url';
import BarSide from '../../components/barside/BarSide';
import BarNav from '../../components/navbar/BarNav';


export default function ProjectsList() {

  const [data, setData] = useState([]);
  const [query] = useSearchParams();


  useEffect(() => {
    doApi();
  }, [query])

  const doApi = async () => {
    const url = API_URL + '/projects/projectsList';
    try {
      const data = await apiGet(url);
      // console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);

    }
  }

  const deleteProject = async (_idDel) => {
    if (window.confirm("Delete project?")) {
      try {
        const url = API_URL + "/projects/" + _idDel;
        const data = await apiDelete(url, "DELETE");
        if (data.deletedCount) {
          doApi();
          toast.info("sdgfbfsgb")
        }
      }
      catch (err) {
        console.log(err);
        toast.error("There problem")
      }
    }
  }
  const arr = [data]
  console.log('first data');
  
  console.log(arr);


  const page = query.get("page") || 1;
  return (
    <div className='flex'>
      <BarSide />
      <div className='flex-[10]'>
        <BarNav />
        <div className='p-[20px] m-[20px]'>
          <div className='font-medium text-neutral-400 mb-3.5 border-2 p-[8px] shadow flex justify-between'>
            <div > Projects Table</div>
            <div>
           <Button size="small" variant="contained" className='items-end'><Link to='/projects/newProject'>Add new project</Link></Button>
            </div>
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: "300px" }} className='drop-shadow-xl bg-slate-100'>
            <Table className=''>
              <TableHead>
                <TableRow align="center">
                  <TableCell>Id</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Building name(or Number)</TableCell>
                  <TableCell>Contractor Name</TableCell>
                  <TableCell>Dtae created</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {data.map((row, i) => (
                  <TableRow align="center" key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell>{((page - 1) * 15) + i + 1}</TableCell>
                    <TableCell>{row.p_name}</TableCell>
                    <TableCell>{row.city_name}</TableCell>
                    <TableCell>{row.street_name}</TableCell>
                    <TableCell>{row.building_name}</TableCell>
                    <TableCell>{row.contractor_name}</TableCell>
                    <TableCell>{row.date_created.substring(0, 10)}</TableCell>
                    <TableCell ><Button onClick={() => {
                      deleteProject(row._id);
                    }} className='text-center me-10' size='small' color='error' variant="outlined" startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                    <TableCell><Button size='small' variant="outlined" startIcon={<EditIcon />}>Edit</Button></TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}