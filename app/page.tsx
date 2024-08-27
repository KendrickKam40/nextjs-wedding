'use client';
import { useRouter } from "next/navigation";
import { useContext, useEffect ,useState} from 'react';
import { UserContext } from '@/app/contextProvider';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Custom Components
import Banner from "./Components/banner";
import { DisplayTile } from "./Components/tile";
import LinearProgress from '@mui/material/LinearProgress';
import MenuBar from "./Components/menu";
import { getDataByEmail } from "./actions";
import LoadingSpinner from '@/app/Components/loader';



export default function Home() {
  const [user, setUser] = useContext<any>(UserContext);
  const [userId,setUserId] = useState<any>();



  useEffect(()=>{
    async function getData(){
      if(user?.email){
        const uData = await getDataByEmail(user.email);
        
        if(uData){
          console.log(uData);
          setUserId(uData.id);        
        }

        
      }
    }

    getData();
    
  },[user]);



  const router = useRouter()
  function handleRSVP(){
    router.push(`/rsvp/${userId}`);
  }

  return (
          <main className="flex min-h-screen flex-col items-center justify-between main-container">
          <div className='body-container'>
          { !userId && 
            <div className="loading-container">
              <LoadingSpinner />
            </div>
          }
          {userId && (
                  <>
                  <MenuBar/>
                  <section className="banner-section">
                    <Banner
                    backgroundImage="/IMG_0005.JPG">
                      <div className="banner-content-text"> 
                        <h2 className="typography-section-eyebrow style-script-regular">You are invited!</h2>
                        <h1 className="typography-section-headline style-script-regular">Annissa & Kendrick</h1>
                      </div>
                      {
                        userId && 
                        <button type="submit" className="submitButton alt" onClick={handleRSVP} >RSVP</button>
                      }
                    </Banner>
                  </section>
                  
                  <section>
                    <div className="scroll-container">
                      <div className="card-set">
                      <DisplayTile
                      Icon={<CalendarMonthIcon/>}
                      >
                        <h3 className="typography-card-headline">Save the date!</h3>
                        <p className="typography-family-paragraph">
                          28th July 2025
                        </p>
                        <p className="typography-family-paragraph">
                          [Time TBD]
                        </p>
                      </DisplayTile>
                      <DisplayTile
                      Icon={<LocationOnIcon/>}
                      link='https://villavedasbali.com/'
                      >
                        <h3 className="typography-card-headline">Where?</h3>
                        <p className="typography-family-paragraph">
                          Villa Vedas
                        </p>
                        <p className="typography-family-subtext">
                        Jalan Kebo Iwa Jalan Batu Tampih Kangin No.Banjar, Pangkung Tibah, Kec. Kediri, Kabupaten Tabanan, Bali 82115, Indonesia
                        </p>
                      </DisplayTile>
                      <DisplayTile
                      Icon={<ScheduleIcon/>}
                      >
                        <h3 className="typography-card-headline">Schedule</h3>
                        <p className="typography-family-paragraph">
                          Schedule TBD
                        </p>
                      </DisplayTile>
                      <DisplayTile
                      Icon={<FiberManualRecordIcon/>}
                      modal
                      >
                        <h3 className="typography-card-headline">Share your photos with us!</h3>
                        <p className="typography-family-paragraph">
                        </p>
                        <p className="typography-family-subtext">
                        The Dots App
                        </p>
                      </DisplayTile>
                      
                    </div>
                    </div>
                  </section>
                  </>
            )}
            </div>
              </main>
          );
}
