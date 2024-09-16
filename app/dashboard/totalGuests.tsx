'use client'

import { useEffect, useState } from "react"
import { getCountConfirmedGuests, getCountGuests } from "./actions";


export default function TotalGuests(){
    const [confirmedGuests, setConfirmedGuests]= useState(0);
    const [totalGuests, setTotalGuests]= useState(0);

    useEffect(()=>{
        async function getData(){
            const totalGuests = await getCountGuests();
            const totalConfirmedGuests = await getCountConfirmedGuests();

            setConfirmedGuests(totalConfirmedGuests?.count ? totalConfirmedGuests.count : 0 )
            setTotalGuests(totalGuests?.count ? totalGuests.count : 0 )
        }

        getData();
    },[])

    return(
        <div className="total-guests-container"> 
            <p className="typography-family-paragraph">Total Guests Confirmed: {confirmedGuests} out of {totalGuests}</p>
        </div>
    )
}