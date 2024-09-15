'use client'
import React, { MouseEvent } from 'react';
import Switch from '@mui/material/Switch';
import clsx from 'clsx';
export default function Confirmation({
    guestData ,
    onToggleConfirmed,
    onEmailChange
} : {
    guestData : any
    onToggleConfirmed: (userId: any, confirmed: boolean) => void,
    onEmailChange: (userId: any, email: string) => void,
}){
 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onToggleConfirmed(guestData.id, event.target.checked);
    };

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onEmailChange(guestData.id, event.target.value);
    };
    return(
            <div className='row-container'>
                  <div className="attending-row">
                    <div className='user-details'>
                        {guestData.name}
                    </div>
                    <Switch 
                    checked={guestData.confirmed || false}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                   
                </div>
                {
                        guestData.confirmed && (
                            <div className="formText">
                                    <input 
                                    data-id="notes" 
                                    name="notes" 
                                    type="text" 
                                    className={clsx("inputText",'inputTextEntered' )}
                                    value={guestData.notes||''}
                                    onChange={emailChange}
                                    placeholder='Example: Dietary Requirements'
                                    />
                                    <span className="formTextLabel">Notes</span>
                            </div>
                        )
                    }
            </div>
          
            

    )

}