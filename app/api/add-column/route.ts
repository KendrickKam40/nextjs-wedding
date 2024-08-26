import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result =
      await sql`ALTER TABLE users ADD COLUMN confirmed boolean,
      ADD COLUMN party varchar(255), 
      ADD COLUMN phone  varchar(255),
      ADD COLUMN rsvpdate timestamp`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}