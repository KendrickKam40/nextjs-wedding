'use client';
import { FormEvent,useEffect,useState } from "react";
import '@/app/styles/form.css';
import clsx from 'clsx';
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();

    const [name,setname] = useState();
    const [userData,setUserData] = useState<any>({});
    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
         
        console.log(name);
        const response = await fetch('/api/check-user', {
          method: 'POST',
          body: JSON.stringify({'name': name}),
        })

        // // Handle response if necessary
        const data = await response.json()

        console.log(data);
        if(data?.guests?.rows.length > 0){
            // get first name found
            setUserData(data?.guests?.rows[0])
            router.push(`/rsvp/${data?.guests?.rows[0].id}`)
        }
        // // ...
    }
    

    const handleChange = (event : any) => {
       setname(event.target.value);
    }


    return (
        <div className="rsvpContainer">
             <div className="cardContainer">
                    <div className="formBody">
                        <form onSubmit={onSubmit}>
                        <div className="formText">
                            <input 
                            data-id="name" 
                            name="name" 
                            type="text" 
                            className={clsx("inputText",{'inputTextEntered' : name} )}
                            maxLength={255} 
                            autoComplete="given-name" 
                            value={name || ''} 
                            onChange={handleChange}/>
                            <span className="formTextLabel">Name</span>
                        </div>
                        <button type="submit" className="submitButton" >Submit</button>
                        </form>
                    </div>
                
            </div>
        </div>  
       
       
       
    );
  }