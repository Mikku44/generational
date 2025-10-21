import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/lib/firebase/config";
import type { Inventory } from "~/models/inventoryModel";

const inventoryRef = collection(db, "inventory");

export const InventoryService = {
  // ✅ Create (created_at auto)
  async create(data: Omit<Inventory, "id" | "created_at">) {
    return await addDoc(inventoryRef, {
      ...data,
      created_at: serverTimestamp(),
    });
  },

  // ✅ Real-time listener
  listen(callback: (data: (Inventory & { id: string })[]) => void) {
    return onSnapshot(inventoryRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Inventory & { id: string })[];
      callback(list);
    });
  },

  // ✅ Normal fetch
  async getAll() {
    const snapshot = await getDocs(inventoryRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Inventory & { id: string })[];
  },

  // ✅ Get one by ID
  async getById(id: string) {
    const snapshot = await getDoc(doc(db, "inventory", id));
    return snapshot.exists() ? ({ id, ...snapshot.data() } as Inventory & { id: string }) : null;
  },

  async getBySlug(slug: string) {
  const q = query(inventoryRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Inventory & { id: string };
  }

  return null; // not found
},

  // ✅ Update
  async update(id: string, data: Partial<Omit<Inventory, "id" | "created_at">>) {
    return await updateDoc(doc(db, "inventory", id), data);
  },

  // ✅ Delete
  async delete(id: string) {
    return await deleteDoc(doc(db, "inventory", id));
  },
};
