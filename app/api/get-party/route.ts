import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
    const req = await request.json();
    console.log(req);
    const guests = await sql`SELECT * FROM guests WHERE party=${req.party};`;

    return NextResponse.json({ guests }, { status: 200 });
}