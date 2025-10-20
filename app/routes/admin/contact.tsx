import { useEffect, useState } from "react";
import { ContactService } from "services/contactService";
import ContactCard from "~/components/ContactCard";
import { type Contact } from "~/models/contactModel";


export default function ContactList() {
  const [contactList, setContactList] = useState<Array<Contact & { id: string }>>([]);


  

  useEffect(() => {
    const unsubscribe = ContactService.listen((data) => {
      setContactList(data);
    });

    return () => unsubscribe();
  }, []);
  return (
    <main>
      <header className="bg-black text-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider">GENERATIONAL</h1>
          <p className="text-sm tracking-widest text-gray-400 mt-1">ADMIN CONTACT</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Top Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CONTACT</h2>
            <p className="text-gray-500 text-sm mt-1">{contactList?.length} contacts in collection</p>
          </div>
        </div>

        {/* contact List */}
        <div className="space-y-4">
          {contactList.map((contact, idx) => (
           <ContactCard contact={contact} key={idx} />
          ))}
        </div>

      </main>
    </main>
  )
}
