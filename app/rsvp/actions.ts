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


export async function getDataByName(name : any){
    
    if(name){
        const lowerCasedName = name.toLowerCase();
        try{
            const {rows, fields} = await sql`SELECT * FROM guests WHERE LOWER(name)=${lowerCasedName}`;

            if(rows.length > 0){
                return  rows[0];
            }

            return {}
        }catch(error){
            console.error(error)
            return {}
        }
    }

    return {}
}


export async function updateEmail(name : string, email: string){
    if(name){
        try{
            const {rows, fields} = await sql`UPDATE guests SET email = ${email} WHERE name=${name}`;

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

export async function checkEmailExists(email : string, name: string){
    if(email !== "" && email && name && name !== ""){
        const lowerCasedName = name.toLowerCase();
        try{
            const {rows, fields} = await sql`SELECT name, email from guests WHERE email=${email} AND LOWER(name)<>${lowerCasedName};`

            if (rows.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.error(error);
            return false;
        }
    }
}