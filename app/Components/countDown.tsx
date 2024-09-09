import { useEffect, useState } from "react";
import "@/app/styles/countdown.css";

export default function Countdown({...props}){

    const countdownDate = new Date(props.targetDate).getTime();

    const [countDown,setCountDown] = useState(countdownDate - new Date().getTime());

    useEffect(()=>{
        const interval = setInterval(() => {
            setCountDown(countdownDate - new Date().getTime());
        }, 1000);

        return ()=> clearInterval(interval);
    },[countdownDate])


    const getReturnValues = () =>{
        const days = Math.floor(countDown/(1000*60*60*24));

        const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        

        return [days, hours, minutes,seconds];
    }

    const ShowCounter = ({days, hours, minutes,seconds} : any) => {
        return (
            <>
                <div className="counter-container">
                    <div className="counter-unit">
                        <p className="counter-number">{days}</p>
                        <p>Days</p>
                    </div>
                    <div className="counter-unit">
                        <p className="counter-number">{hours}</p>
                        <p>Hours</p>
                    </div>
                    <div className="counter-unit">
                        <p className="counter-number">{minutes}</p>
                        <p>Minutes</p>
                    </div>
                    <div className="counter-unit">
                        <p className="counter-number">{seconds}</p>
                        <p>Seconds</p>
                    </div>
                </div>
            </>
        )
    }
    
    return (
        <>
            <ShowCounter
            days={getReturnValues()[0]}
            hours={getReturnValues()[1]}
            minutes={getReturnValues()[2]}
            seconds={getReturnValues()[3]}
            />
        </>
    )
}