'use server'

import { sql } from '@vercel/postgres';


export async function getDataByEmail(email : any){
    if(email){
        try{
            const {rows, fields} = await sql`SELECT * FROM guests WHERE email=${email}`;

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