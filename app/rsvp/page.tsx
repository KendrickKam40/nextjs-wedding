'use client';
import { FormEvent,useContext, useState, useEffect, Suspense } from "react";
import '@/app/styles/form.css';
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";
import { UserContext } from "@/app/contextProvider";

import LoadingSpinner from "@/app/Components/loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateEmail,getDataByName } from "./actions";

export default function Page() {
    const [user, setUser] = useContext<any>(UserContext);

    const [email, setEmail] = useState("");

    const router = useRouter();

    const [foundEmail,setFoundEmail] = useState(false);

    const [valid, setValid] = useState(false);

    const [foundName,setFoundName] = useState(false);

    const [userId,setUserId] = useState("");

    const [errors,setErrors] = useState<string[]>([]);

    const [name, setName] = useState("");

    const validateEmail = (email : string) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      

    useEffect(() => {
        user?.issuer && router.push(`/`);
      }, [user]);
    
      const handleLogin = async (e : any) => {
        e.preventDefault();

        if(foundEmail && foundName && valid){
            try {
                const emailUpdate = await updateEmail(name , email);

                console.log("Email Update:", emailUpdate)

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
                    
                    const reponseJson = await res.json()
                    console.log(reponseJson)
    
                    if (res.ok) {
                        const userMetadata = await magic?.user.getMetadata();

                        setUser(userMetadata);
                        router.push("/");
                    }
              
                }  
            } catch (error) {
                console.error(error);
            }
              
          
              
        }else if(!foundName){
            console.error("Name not found")
            alert('Your name was not found.')
        }else if(!foundEmail){
            alert('Please enter your email!')
        }
      };

   

    async function handleEmailChange(e :any){
        const emailString = e.target.value as string
        setEmail(emailString);

        if(validateEmail(emailString)){
            setValid(true)
            setFoundEmail(true)
        }else{
            setValid(false)
            setFoundEmail(false);
        }
       
    }

    async function handleName(e :any){
        setName(e.target.value as string);

        const userData = await getDataByName(e.target.value);

        console.log(userData)

        if(userData.id){
            setUserId(userData.id as string)
        }
        
        if(userData.name && userData.name !== ""){
            setFoundName(userData.name as string ? true : false)
            setName(userData.name as string);
        }else{
            setFoundName(false)
        }

        if(userData.email && userData.email !== ""){

            setEmail(userData.email as string);
            
            if(validateEmail(userData.email)){
                setValid(true)
                setFoundEmail(true)
            }
        }else{
            setFoundEmail(false)
        }
    }
    


    return (
        <>
        <Suspense fallback={<LoadingSpinner />}>
  
            <div className="rsvpContainer">
             <div className="cardContainer">
                    <div className="formBody">
                        <form onSubmit={handleLogin}>
                            <div className="form-instructions">
                                <h1 className="typography-card-headline">Enter your name to continue</h1>
                                
                            </div>
                            <div className="formText">
                                <input 
                                name="name" 
                                type="text" 
                                className={clsx("inputText",{'inputTextEntered' : name} )}
                                value={name}
                                onChange={handleName}/>
                                <span className="formTextLabel">Name</span>
                                {
                                    foundName &&  
                                    <span className="input-icon">
                                        <CheckCircleIcon  color="success"/>
                                    </span>
                                }
                               
                            </div>
                            {
                                foundName && 
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
                            }
                           
                            <div className="form-footer">
                                <div className="form-footer-text">
                                    {
                                        errors.length > 0 && 
                                        <>
                                            {
                                                errors.map((error)=>{
                                                    <p>{error}</p>
                                                })
                                            }
                                        </>
                                        
                                    }
                                </div>
                                {
                                    foundEmail && valid && 
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
        </div> 
        </Suspense>
        </>
         
       
       
       
    );
  }