
export interface Inventory {
  id: string; 
  name: string;
  status: "Available" | "Sold" | "Reserved";
  description: string;
  images: string[]; 
  
}