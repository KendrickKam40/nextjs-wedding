'use client'
import {ReactNode,useEffect,useState} from 'react'
import clsx from "clsx";
import '@/app/styles/card.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// modal
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ModalContent {
    title?: string;
    content?: any;
    image?: string;
    alt?: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    maxHeight: '80vh',
    height: '100%',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflow: 'scroll',
    boxShadow: 24,
    p: 4,
  };
  

export function DisplayTile({
    children,
    ...props
}:any){
    const [link,setLink] = useState('');
    const [modal,setModal] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent[]>([]);

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

        if(props.backgroundImage){
            setBackgroundImage(props.backgroundImage as string);
        }

        if(props.overlay){
            setOverlay(true);
        }
        console.log('modalC',props.modalContent)
        if(props.modalContent){
            setModalContent(props.modalContent as ModalContent[]);
        }
    
    },[])
    function checkBGImage(){
        return  backgroundImage !== '' && backgroundImage
    }

    function checkOverlay(){
        return !overlay
    }
    return (
        <div className="display-tile card-container">
            <div className="card" tabIndex={-1}>
                <div className={clsx("card-padding","card-modifier",{'image' :checkBGImage()},{'overlay': checkOverlay()})}>
                    <div className="card-viewport-content">
                        <div className="card-content">
                            <div className="icon-container">
                                {props.Icon}
                            </div>
                            <div className="copy-container">
                                {children}
                            </div>
                        </div>
                        {
                            checkBGImage() &&
                            <div className={clsx('card-image',{'overlay' : overlay})}>
                                <picture>
                                    <img src={backgroundImage}/>
                                </picture>
                            </div>  
                        }
                        
                    </div>
                </div>
            </div>
            {
                link !== '' && link && !modal && (
                    <a href={link} target='_blank' className={clsx('icon icon-cta card-cta-modal-button')}>
                    <div className={clsx('card-cta-modal-button-icon',{'overlay' : overlay})}>
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
                            {modalContent && modalContent.map((content, index) => (
                                    <div key={index}>
                                        <h2 className="typography-card-headline">{content.title}</h2>
                                        {content.content}
                                        {content.image && <img src={content.image} alt={content.alt} style={{ maxWidth: '100%', marginTop: '10px' }} />}
                                        <hr style={{ margin: '20px 0' }} />
                                    </div>
                                ))}                  
                            </div>

                        </Box>
                    </Modal>
                    </div>
                )
            }
           
        </div>
    )
}