'use client'
import '@/app/styles/announcement.css'

export default function Announcement({children, ...props} : any){
    return (
      <div className="announcement-container">
            <div className="announcment-content">
                {children}
            </div>
      </div>
    )
}