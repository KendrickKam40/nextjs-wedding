import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
// Make sure your secret is loaded properly
const secret = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' },{ status: 405 });
  }

  const request = await req.json();
  const email = request.email
  const name = request.name

  console.log(request, email, name)

  if (!email || !name) {
    return NextResponse.json({ message: 'Email and name are required' }, {status : 400});
  }

  try {
    // Ensure the secret is defined
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }

    // Create the payload with user details
    const payload = {
      name,
      email,
    };

    // Sign the JWT token using the secret
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Send the token back to the client
    return NextResponse.json({ token }, {status:200});
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ message: 'Server error' }, {status:500});
  }
}
