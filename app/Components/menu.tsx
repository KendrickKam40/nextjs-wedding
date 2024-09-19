'use client'

import '@/app/styles/menu.css'
import {useEffect, useState } from 'react'
import { getDataByEmail } from '../actions';
import { useRouter,usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";

//MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Countdown from './countDown';
import Skeleton from '@mui/material/Skeleton';


export default function MenuBar({...props}){
    const { user, logout } = useAuth();  // Now we use login from AuthContext
    const [isLoading, setIsLoading] = useState(true);
    const [isMain, setIsMain] = useState(false);
    const [userData, setUserData] = useState<any>({});
    const router = useRouter();

    const isHome = usePathname()==="/"
    const isDashboard = usePathname()==="/dashboard"


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
            }finally{
                // setIsLoading(false)
            }
        }
    
        getData();
      },[user]);
    
    useEffect(()=>{
        if(userData.name){
            setIsLoading(false);
        }

        if(userData.party==="Main"){
            setIsMain(true);
        }
    },[userData])

    const logoutMenuButton = () => {
        // Call Magic's logout method, reset the user state, and route to the login page
        logout();
        location.reload();
    };

    // menu methods & vars
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateDashboard = () =>{
        router.push('/dashboard');
    }

    function attachSticky(){
        var navbar = document.querySelector('.menu-section');
        if(navbar instanceof HTMLElement){
            var sticky = navbar.offsetTop;
            if(window.scrollY >= sticky){
                navbar.classList.add("sticky")
            }else{
                navbar.classList.remove("sticky")
            }
        }
    }

    useEffect(()=>{
        window.onscroll = function(){attachSticky()};
    },[])

    return (
       <>
        <section className='menu-section'>
            <div className='menu-card'>
                {
                    !userData.name ? <div className='menu-content'>
                        <p className='typography-family-paragraph'>Welcome!</p></div>
                        : <>
                            {
                                isLoading  ? <Skeleton width={100}/> :
                                <div className='menu-content'>
                                    <p className='typography-family-paragraph'>Welcome, {userData.name}</p>
                                    <div className='status'>
                                        {
                                            userData?.confirmed &&
                                            <Chip label="CONFIRMED" icon={<CelebrationIcon />} color="success"/>
                                        }
                                        {
                                            !userData?.confirmed &&
                                            <Chip label="UNCONFIRMED" icon={<SentimentVeryDissatisfiedIcon />} color="warning"/>
                                        }
                                    </div>
                                </div>
                            }
                        </>
                }
                
            <div className='menu-actions'>
                <div className='countdown-timer'>
                    <Countdown targetDate="2025-07-28"/>
                </div>
            
            {userData.name &&
                <>
                    <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    >
                        <MoreVertIcon htmlColor='rgb(var( --secondary-rgb))'/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    
                        {
                            isMain && !isDashboard &&<MenuItem onClick={navigateDashboard}>Dashboard</MenuItem>
                        }
                        {
                            !isHome &&
                            <MenuItem onClick={()=>{router.push("/")}}>Home</MenuItem>
                        }
                        <MenuItem onClick={logoutMenuButton}>Logout</MenuItem>
                    </Menu>
                </>
            }
            

            </div>
            </div>
            
           
        
        </section>
       </>
    )
}