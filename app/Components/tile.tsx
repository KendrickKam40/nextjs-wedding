'use client'
import {ReactNode,useEffect,useState} from 'react'
import clsx from "clsx";
import '@/app/styles/card.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// modal
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export function DisplayTile({
    children,
    ...props
}:any){

    console.log(props)
    const [link,setLink] = useState('');
    const [modal,setModal] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(()=>{
        if(props.link!==''){
            setLink(props.link);
        }

        if(props.modal){
            setModal(true);
        }
    
    },[])
   
    return (
        <div className="display-tile card-container">
            <div className="card" tabIndex={-1}>
                <div className="card-padding card-modifier">
                    <div className="card-viewport-content">
                        <div className="card-content">
                            <div className="icon-container">
                                {props.Icon}
                            </div>
                            <div className="copy-container">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                link !== '' && link && !modal && (
                    <a href={link} target='_blank' className='icon icon-cta card-cta-modal-button'>
                    <div className='card-cta-modal-button-icon'>
                        <ChevronRightIcon/>
                    </div>
                </a>
                )
            }
            {
                modal && (
                    <div>
                    <a onClick={handleOpen} className='icon icon-cta card-cta-modal-button'>
                    <div className='card-cta-modal-button-icon'>
                        <ChevronRightIcon/>
                    </div>
                    </a>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='modal-content'>
                                <h1 className='typography-card-headline'>Instructions to upload photos</h1>
                                <p className='typography-family-paragraph'>1. Download the <a className="typography-text-link" href='https://dotstheapp.com/us/' target='_blank'>Dots App</a></p>
                                <p className='typography-family-paragraph'>2. Scan this QR Code OR copy this code <b>1JLb47lc</b></p>
                            </div>
                            <img src='IMG_5458.JPG'/>
                        </Box>
                    </Modal>
                    </div>
                )
            }
           
        </div>
    )
}