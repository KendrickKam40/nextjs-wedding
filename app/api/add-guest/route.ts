import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const confirmed = searchParams.get('confirmed');
  const party = searchParams.get('party');
  const manager = searchParams.get('manager');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const rsvpDate = searchParams.get('rsvp');
 
  try {
    if (!name || !confirmed) throw new Error('name & confrimation');
    console.log(`INSERT INTO guests (name, confirmed, party, manager, email, phone , rsvpdate) VALUES (${name}, ${confirmed},${party}, ${manager},${email}, ${phone},${rsvpDate});`)
    await sql`INSERT INTO guests VALUES (${name}, ${confirmed},${party}, ${manager},${email}, ${phone},to_timestamp(${Date.now()}/ 1000.0));`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const guests = await sql`SELECT * FROM guests;`;
  return NextResponse.json({ guests }, { status: 200 });
}