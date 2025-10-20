import type { Inventory } from "~/models/inventoryModel";

export const APP_MENU = [
    {
        href: "/curation-philosyphy",label : "CURATION PHILOSOPHY"
    },
    {
        href: "/ourservice",label : "OUR SERVICE"
    },
    {
        href: "/inventory",label : "INVENTORY"
    },
    {
        href: "/ourteam",label : "OUR TEAM"
    },
    {
        href: "/contact",label : "CONTACT"
    },
]
export const ADMIN_MENU = [
   
    {
        href: "/admin/contact",label : "CONTACT"
    },
    // {
    //     href: "/admin/inventory",label : "INVENTORY"
    // },
]

export const mockInventory: Inventory = {
  id: "abc123",
  slug: "1967-ford-mustang-fastback",
  title: "1967 Ford Mustang Fastback",
  subtitle: "Original V8 · Fully Restored · Collector Grade",
  year: "1967",
  price: 185000,
  status: "available",
  cover: {
    href: "/images/930 Turbo.jpg",
    type: "image",
  },
  gallery: [
    "/images/930 Turbo.jpg",
    "/images/930 Turbo.jpg",
    "/images/930 Turbo.jpg",
  ],
  specs: {
    Engine: "4.7L V8",
    Transmission: "Manual",
    Horsepower: 271,
    Color: "Highland Green",
  },
  content: `
A meticulously restored 1967 Mustang Fastback in concours-grade condition.
Hand-built with matching numbers engine and period-correct components.
This is one of the finest examples available on the market.
  `.trim(),
  created_at: new Date() as any,
  updated_at: new Date() as any,
  isPublished: true,
};
