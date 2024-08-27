import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
   

    try {
        const req = await request.json();
        console.log(req);
        const guests = await sql`SELECT * FROM guests WHERE email=${req.email};`;
    
        return NextResponse.json({ guests }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}