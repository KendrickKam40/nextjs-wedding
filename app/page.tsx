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
import MenuBar from "./Components/menu";
import { getDataByEmail } from "./actions";
import LoadingSpinner from "./Components/loader";

const tilesBig =[
  {
    icon:<LocationOnIcon/>,
    title: "Where?",
    content: "Villa Vedas, Bali",
    subtext: "Jalan Kebo Iwa Jalan Batu Tampih Kangin No.Banjar, Pangkung Tibah, Kec. Kediri, Kabupaten Tabanan, Bali 82115, Indonesia",
    additional: <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.9881309356074!2d115.07215427481462!3d-8.59713699144796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd237e42039c041%3A0xf49d98cfe326dcdb!2sVilla%20Vedas%20Bali!5e0!3m2!1sen!2sau!4v1724977215080!5m2!1sen!2sau" width="100%" height="200px" loading="lazy"></iframe>,
    link:"https://maps.app.goo.gl/GXDFhYLmsfFwwApB9",
    modal: false,
  }
  ,
]

const tiles = [
  {
    icon:<CalendarMonthIcon/>,
    title: "Save the date",
    content:"28th July 2025",
    subtext:"",
    additional: null,
    link:"/CalanderInvite.ics",
    modal: false,
  },
  
  {
    icon:null,
    title: null,
    content: null,
    subtext: null,
    additional: <>
      <div className="flex-col center-flex">
        <h3 className="typography-card-headline backgroundImg">Schedule</h3>
        <p className="typography-family-paragraph backgroundImg">Coming Soon</p>
      </div>
    </>,
    backgroundImage:"/locationTile.avif",
    link:"",
    modal: false,
  }
  ,
  {
    icon:<FiberManualRecordIcon/>,
    title: "Share your photos with us!",
    content: "",
    subtext: "The Dots App",
    additional: null,
    link:"",
    modal: true,
  }
]


export default function Home() {
  const [user, setUser] = useContext<any>(UserContext);
  const [userId,setUserId] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=>{
    async function getData(){
      if(user?.email){
        const uData = await getDataByEmail(user.email);
        
        if(uData){
          console.log(uData);
          setUserId(uData.id);        
        }
        setIsLoading(false);
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
            {
              isLoading && <>
                <div className="loading-container">
                  <LoadingSpinner/>
                </div>
              </>
            }
          {userId && (
                  <>
                  <MenuBar 
                  setLoading={setIsLoading}
                  />
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
                    {
                      tiles.map((tile)=>{
                        return <>
                          <DisplayTile
                          Icon={tile.icon}
                          link={tile.link}
                          modal={tile.modal}
                          backgroundImage={tile.backgroundImage}
                          >
                            <h3 className="typography-card-headline">{tile.title}</h3>
                            <p className="typography-family-paragraph">
                              {tile.content}
                            </p>
                            <p className="typography-family-subtext">
                              {tile.subtext}
                            </p>
                            <div className="additional-content">
                            {
                              tile?.additional ? <><div className="additional-content">{tile.additional}</div></> : null
                            }
                           </div>
                          </DisplayTile>
                        </>
                      })
                    }
                    </div>
                    <div className="card-set">
                      {
                        tilesBig.map((tile)=>{
                          return <>
                              <DisplayTile
                              Icon={tile.icon}
                              link={tile.link}
                              modal={tile.modal}
                              >
                                <h3 className="typography-card-headline">{tile.title}</h3>
                                <p className="typography-family-paragraph">
                                  {tile.content}
                                </p>
                                <p className="typography-family-subtext">
                                  {tile.subtext}
                                </p>
                                {
                                  tile?.additional ? <><div className="additional-content">{tile.additional}</div></> : null
                                }
                              </DisplayTile>
                            </>
                        })
                      }
                    </div>
                      
                    </div>
                  </section>
                  </>
            )}
            </div>
              </main>
          );
}
