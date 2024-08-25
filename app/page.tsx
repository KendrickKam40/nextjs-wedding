'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  function handleRSVP(){
    router.push(`/rsvp`)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='body-container'>
        <h1>HELLO WORLD!</h1>
        <button type="submit" className="submitButton" onClick={handleRSVP} >RSVP</button>
      </div>
    </main>
  );
}
