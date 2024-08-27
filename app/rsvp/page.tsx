'use client';
import { FormEvent,useContext, useState, useEffect, Suspense } from "react";
import '@/app/styles/form.css';
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";
import { UserContext } from "@/app/contextProvider";

import LoadingSpinner from "@/app/Components/loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getDataByEmail } from "./actions";

export default function Page() {
    const [user, setUser] = useContext<any>(UserContext);

    const [email, setEmail] = useState("");

    const router = useRouter();

    const [foundEmail,setFoundEmail] = useState(false);

    const [userId,setUserId] = useState("");

    const [name, setName] = useState<string>();

    useEffect(() => {
        user?.issuer && router.push(`/`);
      }, [user]);
    
      const handleLogin = async (e : any) => {
        e.preventDefault();

        if(foundEmail){
            try {
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
              
          
              
        }else{
            console.error("email not found")
        }
      };

   

    async function handleEmailChange(e :any){
        setEmail(e.target.value as string);

        const userData = await getDataByEmail(e.target.value);

        console.log(userData)
        if(userData){
            setUserId(userData.id as string)
            setFoundEmail(userData.email as string ? true : false)
            setName(userData.name as string);
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
                                <h1 className="typography-card-headline">Enter your email to continue</h1>
                                <p className="typography-family-paragraph">
                                    If your email is found, the RSVP button will appear.
                                </p>
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
                            <div className="form-footer">
                                <div className="form-footer-text">
                                    {
                                        name && 
                                        <>
                                            
                                                <p className="typography-family-subtext">Hi, {name}</p>
                                            
                                        </>
                                    }
                                </div>
                                {
                                    foundEmail && 
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