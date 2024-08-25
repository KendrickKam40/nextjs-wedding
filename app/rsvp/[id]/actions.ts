'use server'

import { sql } from '@vercel/postgres';

export async function saveData(userData : any){
    const currentDateTime = new Date().toISOString();
    console.log(currentDateTime)
    if(userData.id && userData.confirmed!==null){
        try{
            let response = await sql`
            UPDATE guests 
            SET confirmed=${userData.confirmed}, 
            rsvpdate=TO_TIMESTAMP(${currentDateTime}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') 
            WHERE id=${userData.id};`;    
        }catch(error){
            console.error(error);
        }
       
    }

    if(userData.id && userData.notes!==null){
        try{
            let response = await sql`UPDATE guests SET notes=${userData.notes} WHERE id=${userData.id};`;    
        }catch(error){
            console.error(error);
        }
       
    }

}


export async function getData(id : any){
    if(id){
        try{
            const {rows, fields} = await sql`SELECT * FROM guests WHERE id=${id}`;

            if(rows.length > 0){
                return rows[0];
            }

            return {}
        }catch(error){
            console.error(error)
            return {}
        }
    }

    return {}
}



export async function getDataByParty(party : any){
    if(party){
        try{
            const {rows, fields} = await sql`SELECT * FROM guests WHERE party=${party}`;

            if(rows.length > 0){
                return rows;
            }

            return []
        }catch(error){
            console.error(error)
            return []
        }
    }

    return []
}
