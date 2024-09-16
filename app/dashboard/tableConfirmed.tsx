'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react"
import { getDataByConfirmed } from "./actions"
import { QueryResultRow } from "@vercel/postgres";


export default function TableConfirmed(){
    const [tableData, setTableData] = useState<QueryResultRow[]>([]);

    useEffect(()=>{

        async function getConfirmedData(){
            const confirmedRows = await getDataByConfirmed(true);

            if(confirmedRows.length > 0){
                setTableData(confirmedRows)
                console.log(confirmedRows)
            }
        }

        getConfirmedData();

    },[])

    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Confirmed</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Date Confirmed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.confirmed.toString()}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                <TableCell align="right">{row.rsvpdate.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}