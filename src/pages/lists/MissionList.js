import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Pagination, PaginationItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { toast } from 'react-toastify';
import { apiDelete, apiGet } from '../../services/apiServices';
import { API_URL } from '../../constant/url';

export default function MissionList() {
    const [query] = useSearchParams();
    const nav = useNavigate();
    const [data, setData] = useState([]);
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
        let url = API_URL + '/missions/missionsList';
        try {
            let data = await apiGet(url);
            console.log(data);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (missionId, _name) => {
        if (window.confirm(`האם להסיר את "${_name}" ממשימות?`)) {
            try {
                const url = API_URL + '/missions/' + missionId;
                const data = await apiDelete(url, 'DELETE');
                if (data.deletedCount) {
                    doApi();
                    toast.success('המשימה הוסרה בהצלחה');
                }
            } catch (err) {
                console.log(err);
                toast.error('ישנה בעיה, נסו שנית');
            }
        }
    };

    return (
        <div className="p-[10px] md:m-[10px] md:w-auto">
            <div className="font-medium text-neutral-300 mb-2 border-2 border-slate-500 p-[10px] flex justify-between login2 rounded-t-lg">
                <span className="pt-2"> משימות</span>
                <div>
                    <style>
                        {`
              .MuiPagination-ul {
                justify-content: flex-end;
              }

              .MuiPaginationItem-root {
                flex-direction: row-reverse;
              }
              .MuiPaginationItem-icon {
              transform: rotate(180deg);
            }
            `}
                    </style>
                    <Pagination
                        className="MuiPagination-ul hidden sm:block"
                        count={totalPages}
                        page={page}
                        shape="rounded"
                        color="primary"
                        size="medium"
                        showFirstButton
                        showLastButton
                        siblingCount={1}
                        boundaryCount={1}
                        renderItem={(item) => (
                            <PaginationItem
                                className="text-white MuiPaginationItem-root"
                                component={Link}
                                to={`/missions?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                </div>
                <div>
                    <HomeIcon className="ml-5 font-bold text-6xl cursor-pointer hover:text-yellow-500 hidden md:block" onClick={() => nav('/')} />
                    <Button size="small" variant="contained" className="items-end">
                        <Link to="/missions/newMission" className="hover:text-white p-1">
                            <PlaylistAddIcon /> הוספת משימה
                        </Link>
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper} className="drop-shadow-xl overflow-scroll md:h-[67vh] h-[80vh]">
                <Table className="border-collapse border-2 border-slate-500">
                    <TableHead>
                        <TableRow className="colors2">
                            <TableCell className="border border-slate-300 text-white text-center">#</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">נושא</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">מידע מפורט</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">שם הדייר</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">סטטוס ביצוע</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">דחיפות לביצוע</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">עריכה</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">מחיקה</TableCell>
                            <TableCell className="border border-slate-300 text-white text-center">תאריך התווספות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, i) => (
                            <TableRow key={row._id}>
                                <TableCell align="center">{startIndex + i + 1}</TableCell>
                                <TableCell align="right" className="border border-slate-300 ">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right" className="border border-slate-300 ">
                                    {row.info}
                                </TableCell>
                                <TableCell align="right" className="border border-slate-300 h-1 overflow-y-scroll">
                                    {' '}
                                    <AccountCircleIcon /> {row.user_name}{' '}
                                </TableCell>
                                <TableCell align="center" className="border border-slate-300">
                                    <span
                                        style={{
                                            backgroundColor: row.execution_status === 'waiting' ? 'rgb(245, 245, 50)' : '#6EFF5D',
                                            boxShadow: `0 0 6px ${row.execution_status === 'waiting' ? 'rgb(245, 245, 50)' : '#6EFF5D'}`,
                                            borderRadius: '4px',
                                            padding: '0px 4px',
                                        }}
                                    >
                                        {row.execution_status === 'done' ? 'בוצע' : 'בהמתנה'}
                                    </span>
                                </TableCell>
                                <TableCell align="center" className="border border-slate-300">
                                    <span
                                        className="text-white"
                                        style={{
                                            backgroundColor: row.importance === 'regular' ? ' #0D7CE6' : ' #E93279',
                                            boxShadow: `0 0 6px ${row.importance === 'regular' ? ' #0D7CE6' : ' #E93279'}`,
                                            borderRadius: '4px',
                                            padding: '0px 4px',
                                        }}>
                                        {row.importance === 'regular' ? 'רגיל' : 'מיידי'}
                                    </span>
                                </TableCell>
                                <TableCell align="center" className="border border-slate-300 ">
                                    <Button className="border rounded-xl" onClick={() => {
                                        nav("/missions/editMission/" + row._id);
                                    }}>
                                        <EditIcon className="text-blue-700 hover:text-amber-600" />
                                    </Button>
                                </TableCell>
                                <TableCell align="center" className="">
                                    <Button className="border border-red-600 rounded-xl" onClick={() => { handleDelete(row._id, row.title) }}>
                                        <DeleteIcon className="text-red-700" />
                                    </Button>
                                </TableCell>
                                <TableCell align="center" className="border border-slate-300 ">{row.date_created.substring(5, 10) + '-' + row.date_created.substring(0, 4)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
