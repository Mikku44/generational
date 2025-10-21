import type { Timestamp } from "firebase/firestore"

export interface Inventory {
    id?: string
    slug: string 
    title: string
    subtitle?: string
    year: string
    price: number
    status: "available" | "sold" // ✅ added
    cover: { 
        href: string
        type: "video" | "image"
    }
    gallery: string[] // renamed from imageURLs
    specs?: Record<string, string | number>
    content: string // full description / markdown
    created_at: Timestamp
    updated_at?: Timestamp
    isPublished?: boolean
}
