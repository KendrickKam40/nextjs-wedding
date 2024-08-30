'use client'

import '@/app/styles/menu.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/contextProvider';
import { getDataByEmail } from '../actions';
import { magic } from '@/app/lib/magic';
import { useRouter } from "next/navigation";

//MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function MenuBar({...props}){
    const [user, setUser] = useContext<any>(UserContext);
    const [userData, setUserData] = useState<any>({});
    const router = useRouter();


    useEffect(()=>{
        async function getData(){
          if(user?.email){
            const uData = await getDataByEmail(user.email);
            
            if(uData){
              
              setUserData(uData);        
            }
          }
         
        }
    
        getData();
      },[user]);

    const logout = () => {
        // Call Magic's logout method, reset the user state, and route to the login page
        props.setLoading(true);
        if(magic){
            magic.user.logout().then(() => {
                setUser({ user: null });
                props.setLoading(false);
                router.push('/rsvp');
            });
        }
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

    window.onscroll = function(){attachSticky()};

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

    return (
       <>
        <section className='menu-section'>
            <div className='menu-card'>
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
            <div className='menu-actions'>
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
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>

            </div>
            </div>
            
           
        
        </section>
       </>
    )
}