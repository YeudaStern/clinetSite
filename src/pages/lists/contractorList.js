import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Pagination, PaginationItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useStateContext } from "../../context";
import '../single/scroll.css';

export default function ContractorsList() {
  const [constructorsData, setConstructorsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [query] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const page = parseInt(query.get("page")) || 1;
  const { login } = useStateContext();

  useEffect(() => {
    doApiContractors();
  }, [query]);

  const doApiContractors = async () => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=4eb61bd6-18cf-4e7c-9f9c-e166dfa0a2d8&limit=25000&q=${searchQuery}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let contractor = data.result.records;
        setConstructorsData(contractor);
        const totalPages = Math.ceil(contractor.length / 15);
        setTotalPages(totalPages);
      });
  };



  return (
    <div className='p-[10px] md:m-[10px]  md:w-auto '>
      {login === 2 && (
        <>
          <div className='font-medium text-neutral-300 mb-1 border-2 border-slate-500 md:rounded-t-lg p-[10px] login2'>
            <div className="flex flex-wrap sm:flex-nowrap justify-between mx-auto">
              <span className="pt-2">טבלת קבלנים</span>
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
                      to={`/contractors?page=${item.page}`}
                      {...item}
                    />
                  )}
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש קבלן..."
                className="bg-stone-700 text-white px-2 rounded-lg "
              />
            </div>
          </div>
          <TableContainer component={Paper} className="drop-shadow-xl md:h-[66vh] h-[80vh] overflow-scroll">
            <Table className="border-collapse border-2 border-slate-500 rounded-b-lg">
              <TableHead>
                <TableRow className="colors2">
                  <TableCell className="border border-slate-300 text-white text-center">#</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">שם</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">אימייל</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">טלפון</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">גישה</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">עיר</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">רחוב</TableCell>
                  <TableCell className="border w-40 border-slate-300 text-white text-center">תיאור ענף</TableCell>
                  <TableCell className="border border-slate-300 text-white text-center">עובדים</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {constructorsData
                  .filter((row) => row.SHEM_YESHUT.includes(searchQuery))
                  .slice((page - 1) * 15, page * 15)
                  .map((row, i) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align='center'>{((page - 1) * 15) + i + 1}</TableCell>
                      <TableCell align='center' className="border border-slate-300"><AccountCircleIcon /> {row.SHEM_YESHUT}</TableCell>
                      <TableCell align='center' className="border border-slate-300"> <Link onClick={() => window.location.href = `mailto:${row.EMAIL}`}>{row.EMAIL}</Link></TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.MISPAR_TEL}</TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.KABLAN_MUKAR}</TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.SHEM_YISHUV}</TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.SHEM_REHOV}</TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.TEUR_ANAF}</TableCell>
                      <TableCell align='center' className="border border-slate-300">{row.OVDIM}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
