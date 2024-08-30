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

const groupTravelOptions = [
  {
      title: "Private Car & Driver",
      content: (
          <>
              <p><b>Cost:</b> The cost varies depending on the duration and distance of your trips. Please inquire for a detailed quote.</p>
              <p><b>Pick-Up/Drop-Off:</b> Pick-up and drop-off services are available for airport transfers, local sightseeing, and trips to and from the wedding venue.</p>
          </>
      ),
      image: null,
      alt: null
  },
  {
      title: "Shared Shuttle Service",
      content: (
          <>
              <p><b>General Info:</b> This is a great way to travel with other wedding guests and make new friends along the way!</p>
          </>
      ),
      image: null,
      alt: null
  },
  {
      title: "Scooter Rentals",
      content: (
          <>
              <p><b>Booking Info:</b> Scooters can be rented directly from your accommodation or through various rental shops around Bali. We recommend arranging rentals in advance.</p>
              <p><b>Cost:</b> Daily rental rates are affordable, typically ranging from $5 to $10 USD per day. Helmets are included.</p>
              <p><b>Pick-Up/Drop-Off:</b> Scooters can be picked up from and returned to your rental location. Some rental companies also offer delivery to your accommodation.</p>
              <p><b>Additional Info:</b> Make sure to have an international driver&apos;s license and wear your helmet at all times. Bali&apos;s roads can be busy, so drive carefully!</p>
          </>
      ),
      image: null,
      alt: null
  }
];

const nearbyAccommodations = [
  {
      title: "Villa Tantangan",
      content: (
          <>
              <p><b>Location:</b> Just a 10-minute drive from Villa Vedas, Villa Tantangan offers a private and luxurious stay with breathtaking ocean views. It&apos;s a secluded retreat ideal for guests who prefer a more intimate setting.</p>
              <p><b>Accommodation Details:</b> The villa features spacious bedrooms with en-suite bathrooms, an infinity pool, and a fully equipped kitchen. The open-plan design allows for a seamless indoor-outdoor living experience.</p>
              <p><b>Booking Information:</b> Guests can book individual rooms or the entire villa. Early booking is recommended due to limited availability.</p>
              <p><b>Amenities:</b> The villa includes daily housekeeping, Wi-Fi, and a private chef upon request. Perfect for those seeking tranquility and luxury.</p>
          </>
      ),
      image: "/villa_tantangan.webp",
      alt: "Villa Tantangan"
  },
  {
      title: "Soori Bali",
      content: (
          <>
              <p><b>Location:</b> Located about 20 minutes from Villa Vedas, Soori Bali is a five-star resort offering beachfront villas with private pools. The resort combines modern luxury with traditional Balinese architecture.</p>
              <p><b>Accommodation Details:</b> Each villa is designed with privacy in mind, featuring a spacious layout, private pool, and direct beach access. The resort offers both ocean and mountain views.</p>
              <p><b>Booking Information:</b> Soori Bali offers a range of villas, from one-bedroom to larger multi-bedroom options, perfect for families or groups.</p>
              <p><b>Amenities:</b> Enjoy a full-service spa, fine dining restaurants, and a range of activities including yoga, cycling, and cultural tours.</p>
          </>
      ),
      image: "/soori_bali.jpg",
      alt: "Soori Bali"
  },
  {
      title: "Tugu Bali",
      content: (
          <>
              <p><b>Location:</b> About 25 minutes away from Villa Vedas, Tugu Bali is a boutique hotel located in Canggu, known for its unique blend of traditional Indonesian art and culture with luxurious amenities.</p>
              <p><b>Accommodation Details:</b> The hotel offers individually designed suites and villas, each adorned with antiques and artworks from Indonesia&apos;s past. Some villas include private plunge pools and garden views.</p>
              <p><b>Booking Information:</b> Tugu Bali is ideal for guests who appreciate culture and history. Rooms can be booked individually or as part of a package.</p>
              <p><b>Amenities:</b> The hotel features a spa, cultural dining experiences, and various activities such as cooking classes and Balinese dance performances.</p>
          </>
      ),
      image: "/tugu_bali.webp",
      alt: "Tugu Bali"
  },
  {
      title: "The Haven Suites Bali Berawa",
      content: (
          <>
              <p><b>Location:</b> Situated in Canggu, about 30 minutes from Villa Vedas, The Haven Suites offers contemporary suites with stunning sea views and direct beach access.</p>
              <p><b>Accommodation Details:</b> The suites are spacious and modern, equipped with large balconies or terraces, luxurious bathrooms, and ocean views. It&apos;s a great option for those looking for comfort and style.</p>
              <p><b>Booking Information:</b> A variety of suites are available, from standard to premium oceanfront options. Booking early is advisable during peak season.</p>
              <p><b>Amenities:</b> The hotel offers a large swimming pool, fitness center, and on-site dining options. It&apos;s also close to some of Canggu&apos;s popular cafes and shops.</p>
          </>
      ),
      image: "/the_haven_suites.jpg",
      alt: "The Haven Suites Bali Berawa"
  },
  {
      title: "Alila Villas Soori",
      content: (
          <>
              <p><b>Location:</b> About 20 minutes from Villa Vedas, Alila Villas Soori is an ultra-luxury resort offering private villas with beachfront or rice field views. The design is sleek and modern, perfect for a high-end stay.</p>
              <p><b>Accommodation Details:</b> Each villa comes with a private pool, sun deck, and a personalized butler service. The interiors are minimalist, focusing on comfort and tranquility.</p>
              <p><b>Booking Information:</b> The villas range in size, accommodating couples or larger groups. Advanced booking is recommended for the best rates and availability.</p>
              <p><b>Amenities:</b> The resort offers fine dining, a spa, and a range of wellness activities including yoga and meditation. It&apos;s also known for its sustainable practices and community engagement.</p>
          </>
      ),
      image: "/alila_villas_soori.jpeg",
      alt: "Alila Villas Soori"
  }
];


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
    modalContent: null,
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
    modalContent: null,
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
    modal: true,
    modalContent: nearbyAccommodations,
  }
  ,
  {
    key: 'travel',
    icon:<AirportShuttleIcon/>,
    title: "Group Travel",
    content: "",
    subtext: "",
    additional: null,
    link:"",
    backgroundImage:"/traffic.jpg",
    overlay: true,
    modal: true,
    modalContent: groupTravelOptions,
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
    modalContent: null,
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
    modalContent: null,
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
    modalContent: null,
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
    modalContent:[{
      title: "Instructions to upload photos",
      content: <>
         <p className='typography-family-paragraph'>1. Download the <a className="typography-text-link" href='https://dotstheapp.com/us/' target='_blank'>Dots App</a></p>
         <p className='typography-family-paragraph'>2. Scan this QR Code OR copy this code <b>1JLb47lc</b></p>
      </>,
      image: '/IMG_5458.JPG',
      alt: 'DotsQRCode',
    }]
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
                  <MenuBar/>

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
                          modalContent={tile.modalContent}
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
                              modalContent={tile.modalContent}
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
                              modalContent={tile.modalContent}
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
