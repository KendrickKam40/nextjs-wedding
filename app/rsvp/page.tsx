'use client';
import { useContext, useState, useEffect } from "react";
import '@/app/styles/form.css';
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";
import { UserContext } from "@/app/contextProvider";

import LoadingSpinner from "@/app/Components/loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateEmail,getDataByName,checkEmailExists} from "./actions";
import { validateEmail } from "@/app/lib/validation";

import Alert from '@mui/material/Alert';
import { error } from "console";


interface Guest{
    id : number,
    name: string,
    email: string,
    confirmed: boolean,
    manager: boolean,
    rsvpdate: any,
    notes: string
}
  
export default function Page() {
    const [user, setUser] = useContext<any>(UserContext);

    const [email, setEmail] = useState("");

    const router = useRouter();

    const [foundEmail,setFoundEmail] = useState(false);

    const [foundName,setFoundName] = useState(false);


    const [errors,setErrors] = useState<string[]>([]);

    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);



    useEffect(() => {
        user?.issuer && router.push(`/`);
      }, [user]);

    
      const handleLogin = async (e : any) => {
        e.preventDefault();

        setIsLoggingIn(true);

        if(foundEmail && foundName){
            try {
                const emailUpdate = await updateEmail(name , email);

                if(magic){
                    const didToken = await magic.auth.loginWithEmailOTP({
                        email
                    });
                    const res = await fetch("/api/loginTo", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${didToken}`,
                    },
                    });

                    console.log(res)
                    
                    const reponseJson = await res.json()
    
                    if (res.ok) {
                        const userMetadata = await magic?.user.getMetadata();

                        setUser(userMetadata);
                        router.push("/");
                    }else{
                        setErrors(["There has been an error logging you in, please contact support"]);
                        setIsLoggingIn(false);
                    }
              
                }else{
                    setErrors(["There has been an error logging you in, please contact support"]);
                    setIsLoggingIn(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoggingIn(false);
            }

              
          
              
        }else{
            setErrors(["An error has occured, please contact support"])
            setIsLoggingIn(false);
        }
      };

   

    async function handleEmailChange(e :any){
        const emailString = e.target.value as string
        setEmail(emailString);
        
        if(validateEmail(emailString)){

            const emailExists = await checkEmailExists(emailString, name);

            if(!emailExists){
                setFoundEmail(true)
            }else{
                console.error('email exists, please choose another');
                setErrors(["This email exists, please choose another"]);
                setFoundEmail(false)
            }
        }else{
            console.error('Email not valid format');
            setFoundEmail(false);
        }
       
    }

    async function handleName(e :any){
        setIsLoading(true);
        setFoundName(false);
        setEmail('');
        setFoundEmail(false);
        setErrors([]);

        let name = e.target.value as string;
        
        // set name variable
        setName(name);

        // fetch user data associated with name
        if(name !== ""){
            fetchData(name);
        }else{
            setIsLoading(false);
            setErrors(["Please enter a name to continue"])
        }
    
    }


    const fetchData = async (name : string)=>{
        // fetch data by name

        try{
            const req = await getDataByName(name);
            if(req !== null){
                setComponentStates(req as Guest);
            }else{
                console.error('error retrieving data');
                setErrors(['Name not found!'])
                setIsLoading(false);
            }
        }catch(e){
            console.error(e);
            setErrors(['Name not found!'])
            setIsLoading(false);
        }

    }

    function setComponentStates(userData : Guest){
        console.log("Guest data:",userData)
        if(userData.name && userData.name !== ""){
            setFoundName(userData.name as string ? true : false)
            setName(userData.name as string);
        }else{
            setFoundName(false)
        }

        if(userData.email && userData.email !== ""){

            setEmail(userData.email as string);
            
            if(validateEmail(userData.email)){
                setFoundEmail(true)
            }
        }else{
            setFoundEmail(false)
        }

        setIsLoading(false);
    }
    


    return (
        <>  
         
           
            <div className="rsvpContainer">
           
             <div className="cardContainer">
                    <div className="formBody">


                        <form onSubmit={handleLogin}>
                            <div className="form-instructions">
                                <h1 className="typography-card-headline">Enter your first name</h1>
                                <p className="typography-family-subtext">If your name is not found, please contact the system administrator</p>
                            </div>
                            <div className="formText">
                                <input 
                                name="name" 
                                type="text" 
                                className={clsx("inputText",{'inputTextEntered' : name} )}
                                value={name}
                                onChange={handleName}/>
                                <span className="formTextLabel">First Name</span>
                              
                                {
                                    foundName && !isLoading && 
                                    <span className="input-icon">
                                        <CheckCircleIcon  color="success"/>
                                    </span>
                                }
                            </div>
                            {
                                    isLoading && <span className="loading-container"><LoadingSpinner/></span>
                            }
                            {
                                foundName && 
                                <>
                                    <div className="email-text">
                                        <p className="typography-family-paragraph">Please confirm your email below.</p>
                                    </div>

                                    <div className="formText">
                                        <input 
                                        name="email" 
                                        type="email" 
                                        className={clsx("inputText",{'inputTextEntered' : email} )}
                                        value={email}
                                        onChange={handleEmailChange}/>
                                        <span className="formTextLabel">Email</span>
                                        {
                                            foundEmail &&  
                                            <span className="input-icon">
                                                <CheckCircleIcon  color="success"/>
                                            </span>
                                        }
                                    
                                    </div>
                                </>
                            }
                           
                            <div className="form-footer">
                                <div className="form-footer-text">
                                  
                                </div>
                                {
                                    foundEmail && foundName && 
                                    <>
                                    <button type="submit" className="submitButton">
                                            <span className="button-text">Next</span>
                                        </button>
                                    </>
                                }
                            </div>
                          
                        </form>
                        
                    </div>
                
            </div>
            {
                errors.length > 0 && <>
                     <div className="alert-container">
                            <Alert severity="error">
                                {
                                errors.map((err)=>{
                                    return <>
                                        <p>{err}</p>
                                    </>
                                })
                                }
                            </Alert>
                    </div>
                </>
            }
        </div> 
       
        </>
         
       
       
       
    );
  }