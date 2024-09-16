'use client'

import MenuBar from "@/app/Components/menu"
import TableConfirmed from "./tableConfirmed"
import TotalGuests from "./totalGuests"
import { useAuth } from "@/app/AuthContext";
import '@/app/styles/dashboard.css';
import { useState, useEffect } from "react";
import { getDataByEmail } from "@/app/rsvp/actions";
import { useRouter } from "next/navigation";


export default function Dashboard(){
   
    const { user, logout } = useAuth();  // Now we use login from AuthContext
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>({});
    const router = useRouter();


    useEffect(()=>{
        async function getData(){
            try{
                if(user?.email){
                    const uData = await getDataByEmail(user.email);
                    
                    if(uData){
                      
                      setUserData(uData);        
                    }
                  }
            }catch(err){
                console.error("An error has occured retrieiving user data");
            }
        }
    
        getData();
      },[user]);
    
    useEffect(()=>{
        if(userData.name){
            setIsLoading(false);
            console.log(userData)
            if(userData.party!=='Main'){
                router.push('/');
            }
        }
    },[userData])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between main-container">
          <div className='body-container'>
        <MenuBar />
        <section>
            
            <div className="dashboard-container">
                <div className="confirmed-guests-heading">
                    <h1 className="typography-section-headline">Confirmed Guests</h1>
                    <TotalGuests/>
                </div>
                <TableConfirmed/>    
            </div>
        </section>
        
        </div>
        </main>
    )
}