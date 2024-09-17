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
import { getDataByConfirmed,getAllData } from "./actions"
import { QueryResultRow } from "@vercel/postgres";
import {Box, Typography, useMediaQuery} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import GuestCard from './GuestCard'; // Adjust the import path accordingly


export default function TableConfirmed(){
    const [tableData, setTableData] = useState<QueryResultRow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter,setFilter] = useState<string | null>('confirmed');


    const isMobile = useMediaQuery('(max-width:600px)');
    useEffect(()=>{

        async function getConfirmedData(){
          try {
            const confirmedRows = await getDataByConfirmed(true);
    
            if (confirmedRows.length > 0) {
              setTableData(confirmedRows);
            } else {
              setError("No confirmed data found.");
            }
          } catch (err) {
            console.error("Error fetching confirmed data:", err);
            setError("An error occurred while fetching data.");
          } finally {
            setIsLoading(false);
          }
        }

        getConfirmedData();

    },[])

    useEffect(()=>{
      async function getData(){
        try {
          const returnRows = await getAllData();
  
          if (returnRows.length > 0) {
            setTableData(returnRows);
          } else {
            setError("No confirmed data found.");
          }
        } catch (err) {
          console.error("Error fetching confirmed data:", err);
          setError("An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      }

      async function getConfirmedData(val : boolean){
        try {
          const confirmedRows = await getDataByConfirmed(val);
  
          if (confirmedRows.length > 0) {
            setTableData(confirmedRows);
          } else {
            setError("No confirmed data found.");
          }
        } catch (err) {
          console.error("Error fetching confirmed data:", err);
          setError("An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      }

      if(filter==="all"){
        getData()
      }else if(filter==='confirmed'){
        getConfirmedData(true)
      }else if(filter==='unconfirmed'){
        getConfirmedData(false)
      }
    },[filter])

    const handleFilterChange = (
      event: React.MouseEvent<HTMLElement>,
      newFilter: string | null,
    )=>{
      setFilter(newFilter)
    }

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      );
    }
    
    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      );
    }

    return (

    <Box >
      <div className='table-actions'>
          <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="text alignment"
          >
            <ToggleButton value="confirmed" aria-label="confirmed">
              Confirmed
            </ToggleButton>
            <ToggleButton value="unconfirmed" aria-label="unconfirmed">
              Unconfirmed
            </ToggleButton>
            <ToggleButton value="all" aria-label="all">
              All
            </ToggleButton>
          
          </ToggleButtonGroup>
        </div>
      {isMobile ? (
        // Render cards on mobile devices
        tableData.length > 0 ? (
          tableData.map((guest) => <GuestCard key={guest.id} guest={guest} />)
        ) : (
          <Typography variant="body1">No confirmed guests to display.</Typography>
        )
      ) : (
        <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="confirmed guests table">
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell align="left"><strong>Name</strong></TableCell>
                <TableCell align="left"><strong>Email</strong></TableCell>
                <TableCell align="left"><strong>Confirmed</strong></TableCell>
                <TableCell align="left"><strong>Notes</strong></TableCell>
                <TableCell align="left"><strong>Date Confirmed</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((guest) => (
                <TableRow
                  key={guest.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {guest.id}
                  </TableCell>
                  <TableCell align="left">{guest.name}</TableCell>
                  <TableCell align="left">{guest.email || 'N/A'}</TableCell>
                  <TableCell align="left">
                    {guest.confirmed ? (
                      <Typography color="success.main">Yes</Typography>
                    ) : (
                      <Typography color="error.main">No</Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">{guest.notes || 'N/A'}</TableCell>
                  <TableCell align="left">
                    {guest.rsvpdate instanceof Date
                      ? guest.rsvpdate.toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
    </Box>
  );
}