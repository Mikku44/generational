
import { signOutFromAdmin } from '~/lib/firebase/auth'
import type { Route } from './+types/dashboard';
import { ADMIN_MENU } from '~/constants/app';
import { Link } from 'react-router';
import Logo from '~/components/logo';
import { useEffect, useState } from 'react';
import type { Contact } from '~/models/contactModel';
import { ContactService } from 'services/contactService';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "DASHBOARD - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}


export default function dashboard() {

   const [contactList, setContactList] = useState<Array<Contact & { id: string }>>([]);
  
  
    
  
    useEffect(() => {
      const unsubscribe = ContactService.listenUnread("unread",(data) => {
        setContactList(data);
      });
  
      return () => unsubscribe();
    }, []);
  return (
    <main className=''>
      <div className="w-full border bg-white border-zinc-300 h-[300px]
      flex justify-center items-center flex-col gap-4 invert-100  font-bold">
        <div className="text-xl">Welcome back, Admin!</div>
        <div className="px-4"><Logo /></div>
      </div>
      <div className="grid md:grid-cols-4 px-5 grid-cols-2 gap-5 py-5">
        {ADMIN_MENU.map((menu) => {
         
          return (
            <Link
              key={menu.label}
              to={menu.href}
              className={`flex items-center justify-between px-4 border border-zinc-300 rounded
                 py-3 transition  hover:bg-gray-100 h-[150px]
                `}
            >
              {/* If you want icons:
                     {menu.icon && <menu.icon className="w-5 h-5 mr-3" />}
                    */}
              <div className="">{menu.label} </div>
              <div className="aspect-square size-[30px]
              text-white flex items-center justify-center
              bg-black rounded-full p-2">{contactList?.length}</div>
            </Link>
          );
        })}
      </div>
    </main>
  )
}
