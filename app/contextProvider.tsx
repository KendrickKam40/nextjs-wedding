'use client'

import { createContext } from 'react';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";

export const UserContext = createContext({})
 
export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [user, setUser] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        setUser({ loading: true });
        if(magic){
          magic.user.isLoggedIn().then((isLoggedIn : any) => {
            console.log(isLoggedIn)
            if (isLoggedIn && magic) {
                magic.user.getInfo().then((userData : any) => setUser(userData));
                router.push("/");
            } else {
                router.push("/rsvp");
                setUser({ user: null });
            }
            });
        }
       
    }, []);

  return <UserContext.Provider value={[user, setUser] as any}>
    {children}
    </UserContext.Provider>
}