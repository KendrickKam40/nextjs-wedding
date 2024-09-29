'use server'

import { QueryResultRow, sql } from '@vercel/postgres';

export async function getAllData(){
    try{
        const {rows , fields} = await sql`SELECT * FROM guests ORDER BY id, party `;

        if(rows.length > 0){
            const returnData: QueryResultRow[] = rows;
            return returnData;
        }

        return [];
    }catch(error){
        console.error(error)
        return [];
    }
}

export async function getDataByConfirmed(confirmed: boolean){
    try{
        const {rows , fields} = await sql`SELECT * FROM guests WHERE confirmed=${confirmed} ORDER BY id,party`;

        if(rows.length > 0){
            const returnData: QueryResultRow[] = rows;
            return returnData;
        }

        return [];
    }catch(error){
        console.error(error)
        return [];
    }
}

export async function getCountGuests(){
    try{
        const {rows} = await sql`SELECT count(*) FROM guests`;

        if(rows.length > 0){
            const returnData: QueryResultRow[] = rows;
            return returnData[0];
        }

        return {};
    }catch(error){
        console.error(error)
        return {};
    }
}


export async function getCountConfirmedGuests(){
    try{
        const {rows} = await sql`SELECT count(*) FROM guests WHERE confirmed=true`;

        if(rows.length > 0){
            const returnData: QueryResultRow[] = rows;
            return returnData[0];
        }

        return {};
    }catch(error){
        console.error(error)
        return {};
    }
}
