
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { Contact } from "~/models/contactModel";


const contactRef = collection(db, "contacts");

export const ContactService = {
  // ✅ Create
  async create(contact: Omit<Contact, "created_at">) {
    return await addDoc(contactRef, {
      ...contact,
      created_at: new Date() as unknown as Timestamp, // Firestore auto converts
    });
  },

  // ✅ Read (all)
  async getAll() {
    const snapshot = await getDocs(contactRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as (Contact & { id: string })[];
  },

  // ✅ Read (single)
  async getById(id: string) {
    const snapshot = await getDoc(doc(db, "contacts", id));
    return snapshot.exists() ? ({ id, ...snapshot.data() } as Contact & { id: string }) : null;
  },

  // ✅ Update
  async update(id: string, data: Partial<Omit<Contact, "created_at">>) {
    return await updateDoc(doc(db, "contacts", id), data);
  },

  // ✅ Delete
  async delete(id: string) {
    return await deleteDoc(doc(db, "contacts", id));
  },
};
