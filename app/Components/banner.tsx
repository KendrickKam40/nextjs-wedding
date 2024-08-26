'use client'
import '@/app/styles/banner.css'
import { useEffect, useState } from 'react'
export default function Banner({children, ...props} : any){
    const [backgroundImage,setBackgroundImage] = useState();

    useEffect(()=>{
        if(props.backgroundImage){
            setBackgroundImage(props.backgroundImage);
        }
    },[])

    return (
       <div className='banner-card'>
            <div className='banner-card-row row'>
                <div className='banner banner-card-copy-column'>{children}</div>
                <div className='column banner-card-image-column'>
                    <picture className='overview-banner-guided-tour banner-card-image loaded'>
                        <img src={backgroundImage} />
                    </picture>
                </div>
            </div>
       </div>
    )
}