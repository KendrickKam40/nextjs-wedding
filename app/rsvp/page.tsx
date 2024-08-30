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

import Snackbar,  { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
    open: boolean;
}

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

    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleOpen = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(()=>{
        if(errors.length > 0){
            setState({ ...state, open: true });
        }
    },[errors])

    useEffect(() => {
        user?.issuer && router.push(`/`);
      }, [user]);

    
      const handleLogin = async (e : any) => {
        e.preventDefault();

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
                    
                    const reponseJson = await res.json()
    
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
            setErrors(["An error has occured, please contact support"])
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
        setName(e.target.value as string);
        setFoundName(false);

        const userData = await getDataByName(e.target.value);
//        setIsLoading(false);
        if(Object.keys(userData).length > 0){
            await setComponentStates(userData as Guest);
        }else{
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
                                <h1 className="typography-card-headline">Enter your name to continue</h1>
                                <p className="typography-family-subtext">If your name is not found, please contact the system administrator</p>
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
        </div> 
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={errors.length > 0 ? errors[0] as string : ''}
            key={vertical + horizontal}
        />
        </>
         
       
       
       
    );
  }