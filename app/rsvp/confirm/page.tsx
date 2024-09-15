'use client'
import '@/app/styles/form.css';
import Confirmation from '@/app/rsvp/confirm/confirmation';
import { getData, getDataByParty, saveData } from '@/app/rsvp/confirm/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { getDataByEmail } from '@/app/actions';

export default function Page() {

    const[guests , setGuests] = useState<any[]>([]);
    const [userId,setUserId] = useState();
    const {user} = useAuth();


    const router = useRouter();


    useEffect(()=>{
        async function getData(){

        console.log('user',user)
        try{
            if(user?.email){
            const uData = await getDataByEmail(user.email);
            
            if(uData){
                setUserId(uData.id);        
            }
            }
        }catch(err){
            console.error('error loading user')
        }finally{
        }
        
        }
        getData();
    },[user]);

    
    useEffect(()=>{
        const setupData = async ()=>{
             // get user data
            const refUser = await getData(userId);
            const partyName = refUser.party;

            //get party members
            const partyGuests= await getDataByParty(partyName);
            setGuests(partyGuests);
         
        }

        setupData();

    },[userId])
   
    function handleCheckedGuest(userId : any, confirmed: boolean){
        setGuests((prevGuests:any) => 
            prevGuests.map((guest: any) =>
                guest.id === userId ? { ...guest, confirmed : confirmed} : guest
            )
        );
    }

    function handleChangeEmail(userId : any,notes : any){
        setGuests((prevGuests:any) => 
            prevGuests.map((guest: any) =>
                guest.id === userId ? { ...guest, notes : notes} : guest
            )
        );
     }

    async function handleRSVP() {
        try {
            for (const guest of guests) {
                await saveData(guest);
            }
            alert('RSVPs saved successfully!');
            router.push('/')
        } catch (error) {
            console.error('Error saving RSVPs:', error);
            alert('There was an error saving the RSVPs. Please try again.');
        }
    }

    function handleBack(){
        router.push('/');
    }

    return (
        <div className="rsvpContainer">
             <div className="cardContainer">
                <div className="formBody">
                    <div className="attending-guests">
                    {
                        guests.map((guest : any)=>(
                                    <Confirmation 
                                    key={guest.id}
                                    guestData={guest}
                                    onToggleConfirmed={handleCheckedGuest}
                                    onEmailChange={handleChangeEmail}
                                    />
                        ))
                    }
                    </div>
                    <div className='form-footer'>
                        <button className="backButton" onClick={handleBack}>Back</button>
                        <button className="submitButton" onClick={handleRSVP}>Save</button>
                    </div>
                    
                </div>
        
            </div>
        </div>
    )
}