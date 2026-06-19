export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  role: "customer" | "driver" | "admin"
  created_at: string
}

export interface Truck {
  id: string
  name: string
  type: "small" | "medium" | "large" | "xl"
  capacity: string
  price_per_mile: number
  price_per_hour: number
  image_url: string
  available: boolean
  location: string
  features: string[]
  rating: number
  reviews_count: number
}

export interface Booking {
  id: string
  user_id: string
  truck_id: string
  pickup_address: string
  dropoff_address: string
  pickup_date: string
  dropoff_date: string
  distance: number
  estimated_hours: number
  total_price: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  created_at: string
  truck?: Truck
  user?: User
}

export interface Review {
  id: string
  booking_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  user?: User
}
