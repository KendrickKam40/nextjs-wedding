'use client'

import '@/app/styles/menu.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/lib/UserContext';
import { getDataByEmail } from '../actions';
import { magic } from '@/app/lib/magic';
import { useRouter } from "next/navigation";

//MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MenuBar(){
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
        magic?.user.logout().then(() => {
            setUser({ user: null });
            router.push('/rsvp');
        });
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


    return (
       <>
        <section className='menu-section'>
            <div className='menu-content'>
                <p className='typography-family-paragraph'>Welcome, {userData.name}</p>
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
           
        
        </section>
       </>
    )
}