'use client'

import {UserContext} from '@/app/lib/UserContext';

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";

 
export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [user, setUser] = useContext<any>(UserContext);
    const router = useRouter();

    useEffect(() => {
        setUser({ loading: true });
        if(magic){
          magic?.user.isLoggedIn().then((isLoggedIn : any) => {
            if (isLoggedIn && magic) {
                magic.user.getMetadata().then((userData : any) => setUser(userData));
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