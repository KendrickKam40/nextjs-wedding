import { Magic } from "@magic-sdk/admin";

let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {

  try {

    console.log(request.headers.get("authorization"))

    const didToken = await mAdmin.utils.parseAuthorizationHeader(
      request.headers.get("authorization") as string
    );
    
    mAdmin.token.validate(didToken);

    
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}