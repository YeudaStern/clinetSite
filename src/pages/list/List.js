
import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet } from '../../services/apiServices'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { API_URL, MAIN_ROUTE } from '../../constant/url';
import Box from '@mui/material/Box';


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
// } from '@material-ui/core';
// import { DataGrid } from '@mui/x-data-grid';

// const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650,
//   },
//   loading: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: 'calc(100vh - 150px)',
//   },
// }));

// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'title', headerName: 'Title', width: 300 },
//   { field: 'body', headerName: 'Body', width: 500 },
// ];

// const ResponsiveTable = () => {
//   const classes = useStyles();
//   const [loading, setLoading] = useState(true);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:3002/projects')
//       .then((response) => {
//         setRows(response.data);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div className={classes.loading}>
//           <CircularProgress />
//         </div>
//       ) : (
//         <div style={{ height: 400, width: '100%' }}>
//           <DataGrid rows={rows} columns={columns} pageSize={5} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResponsiveTable;


export default function List() {


  const [data, setData] = useState([]);
  const [query] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {


    doApi();
  }, [query])


  const doApi = async () => {


    const url = API_URL + 'projects/projectsList';

    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);

    }
  }

  const deleteProject = async (_idDel) => {
    if (window.confirm("Delete project?")) {
      try {



        const url = API_URL + "projects/" + _idDel;

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




  const page = query.get("page") || 1;
  return (
  
      <TableContainer component={Paper} className='drop-shadow-xl bg-slate-100'>

        <Table className='table-fixed'>
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

    


      )
    }