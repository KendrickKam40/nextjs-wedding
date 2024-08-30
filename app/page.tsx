'use client';
import { useRouter } from "next/navigation";
import { useContext, useEffect ,useState} from 'react';
import { UserContext } from '@/app/contextProvider';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HotelIcon from '@mui/icons-material/Hotel';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

// Custom Components
import Banner from "./Components/banner";
import { DisplayTile } from "./Components/tile";
import MenuBar from "./Components/menu";
import { getDataByEmail } from "./actions";
import LoadingSpinner from "./Components/loader";

const tilesBig = [
  {
    key: 'location',
    icon:<LocationOnIcon/>,
    title: "Where?",
    content: "Villa Vedas, Bali",
    subtext: "Jalan Kebo Iwa Jalan Batu Tampih Kangin No.Banjar, Pangkung Tibah, Kec. Kediri, Kabupaten Tabanan, Bali 82115, Indonesia",
    additional: <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.9881309356074!2d115.07215427481462!3d-8.59713699144796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd237e42039c041%3A0xf49d98cfe326dcdb!2sVilla%20Vedas%20Bali!5e0!3m2!1sen!2sau!4v1724977215080!5m2!1sen!2sau" width="100%" height="200px" loading="lazy"></iframe>,
    link:"https://maps.app.goo.gl/GXDFhYLmsfFwwApB9",
    backgroundImage:"/IMG_0008.JPG",
    overlay: true,
    modal: false,
  }
  ,
  {
    key: 'schedule',
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
    overlay: true,
    link:"",
    modal: false,
  }
]

const tilesInfo = [
  {
    key: 'accomodation',
    icon:<HotelIcon/>,
    title: "Nearby Accomodation",
    content: "",
    subtext: "",
    additional: "",
    link:"",
    backgroundImage:"/villa.jpg",
    overlay: true,
    modal: false,
  }
  ,
  {
    key: 'travel',
    icon:<AirportShuttleIcon/>,
    title: "Group Travel",
    content: "",
    subtext: "",
    additional: "",
    link:"",
    backgroundImage:"/traffic.jpg",
    overlay: true,
    modal: false,
  }
  ,
  {
    key: 'weather',
    icon:<WbSunnyIcon/>,
    title: "Weather",
    content: "",
    subtext: "",
    additional: <>
      <div className="weather-content">
        <div className="temp-container">
          <h1 className="title">29°C</h1>
          <p className="subtext">L: 22°C</p>
        </div>
        <div className="text-container">
          <p className="typography-family-paragraph">Expect high heat & humidity with an average 10 hours of sunshine per day.</p>
          <br/>
          <p className="typography-family-subtext">July is tied with August for the least amount of average rainfall per month, at just 40mm</p>
        </div>
      </div>
    </>,
    link:"",
    backgroundImage:"/weather.jpg",
    overlay: true,
    modal: false,
  }
  ,
]

const tiles = [
  {
    key: 'date',
    icon:<CalendarMonthIcon/>,
    title: "Save the date",
    content:"28th July 2025",
    subtext:"",
    additional: null,
    link:"/CalanderInvite.ics",
    backgroundImage:'/saveTheDate.png',
    overlay: true,
    modal: false,
  },
  
  {
    key: 'dressCode',
    icon:null,
    title: null,
    content: null,
    subtext: null,
    additional: <>
      <div className="flex-col center-flex">
        <h3 className="typography-card-headline backgroundImg">Dress code</h3>
        <p className="typography-family-paragraph backgroundImg">Formal</p>
      </div>
    </>,
    backgroundImage:"/DressCode.jpg",
    link:"",
    overlay: true,
    modal: false,
  }
  ,
  {
    key: 'sharePhotos',
    icon:<FiberManualRecordIcon/>,
    title: "Share your photos with us!",
    content: "The Dots App",
    subtext: "",
    additional: null,
    link:"",
    backgroundImage:'/dots.webp',
    overlay: true,
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
                    backgroundImage="/bannerImage.jpg">
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
                      tiles.map((tile) =>
                          <DisplayTile
                          key={tile.key}
                          Icon={tile.icon}
                          link={tile.link}
                          modal={tile.modal}
                          backgroundImage={tile.backgroundImage}
                          overlay={tile?.overlay}
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
                      )
                    }
                    </div>
                    <div className="card-set col-2">
                      {
                        tilesBig.map( (tile) =>
                              <DisplayTile
                              key={tile.key}
                              Icon={tile.icon}
                              link={tile.link}
                              modal={tile.modal}
                              backgroundImage={tile.backgroundImage}
                              overlay={tile.overlay}
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
                        )
                      }
                    </div>

                    <div className="card-set">
                      {
                        tilesInfo.map( (tile) =>
                              <DisplayTile
                              key={tile.key}
                              Icon={tile.icon}
                              link={tile.link}
                              modal={tile.modal}
                              backgroundImage={tile.backgroundImage}
                              overlay={tile.overlay}
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
                        )
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
