'use client'

import { createContext } from 'react';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/app/lib/magic";
import MenuBar from '@/app/Components/menu';

export const UserContext = createContext(null)
 
export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [user, setUser] = useState<any>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setUser({ loading: true });
        if(magic){
          magic.user.isLoggedIn().then((isLoggedIn : boolean) => {
            if (isLoggedIn && magic) {
                magic.user.getInfo().then((userData : any) => setUser(userData));
                setIsLoggedIn(true)
                router.push("/");
            } else {
                router.push("/rsvp");
                setUser({ user: null });
                setIsLoggedIn(false)
            }
            });
        }
       
    }, []);

  return <UserContext.Provider value={[user, setUser] as any}>
    {children}
    </UserContext.Provider>
}