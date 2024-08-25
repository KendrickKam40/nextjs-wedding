import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE guests ( Name varchar(255), Confirmed boolean, Party varchar(255), Manager boolean, Email varchar(255), Phone varchar(255), RsvpDate Date);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}