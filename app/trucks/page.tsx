"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Truck, MapPin, Star, Users, ArrowRight } from "lucide-react"

const trucks = [
  {
    id: "1",
    name: "Compact Van",
    type: "small",
    capacity: "1-2 rooms",
    pricePerHour: 29,
    pricePerMile: 1.50,
    location: "New York, NY",
    available: true,
    rating: 4.8,
    reviews: 124,
    features: ["A/C", "Bluetooth", "Backup Camera"],
    image: "🚐",
  },
  {
    id: "2",
    name: "Box Truck Medium",
    type: "medium",
    capacity: "2-3 rooms",
    pricePerHour: 49,
    pricePerMile: 2.00,
    location: "Brooklyn, NY",
    available: true,
    rating: 4.9,
    reviews: 89,
    features: ["A/C", "Lift Gate", "GPS"],
    image: "🚚",
  },
  {
    id: "3",
    name: "Large Box Truck",
    type: "large",
    capacity: "3-5 rooms",
    pricePerHour: 79,
    pricePerMile: 2.50,
    location: "Queens, NY",
    available: true,
    rating: 4.7,
    reviews: 56,
    features: ["A/C", "Lift Gate", "GPS", "Dolly Included"],
    image: "🚛",
  },
  {
    id: "4",
    name: "XL Moving Truck",
    type: "xl",
    capacity: "5+ rooms",
    pricePerHour: 119,
    pricePerMile: 3.00,
    location: "Manhattan, NY",
    available: false,
    rating: 4.9,
    reviews: 34,
    features: ["A/C", "Lift Gate", "GPS", "Dolly", "Ramps"],
    image: "🚜",
  },
  {
    id: "5",
    name: "Cargo Van",
    type: "small",
    capacity: "Studio apt",
    pricePerHour: 35,
    pricePerMile: 1.75,
    location: "Jersey City, NJ",
    available: true,
    rating: 4.6,
    reviews: 201,
    features: ["A/C", "Bluetooth"],
    image: "🚐",
  },
  {
    id: "6",
    name: "Flatbed Truck",
    type: "medium",
    capacity: "Heavy items",
    pricePerHour: 55,
    pricePerMile: 2.25,
    location: "Staten Island, NY",
    available: true,
    rating: 4.8,
    reviews: 45,
    features: ["A/C", "Winch", "Tie-downs"],
    image: "🚚",
  },
]

export default function TrucksPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredTrucks = trucks.filter((truck) => {
    const matchesFilter = filter === "all" || truck.type === filter
    const matchesSearch = truck.name.toLowerCase().includes(search.toLowerCase()) || 
                         truck.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Our Fleet</h1>
            <p className="text-muted-foreground">Find the perfect truck for your move</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Small (Van)</SelectItem>
                <SelectItem value="medium">Medium (Box Truck)</SelectItem>
                <SelectItem value="large">Large (Moving Truck)</SelectItem>
                <SelectItem value="xl">XL (Extra Large)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrucks.map((truck) => (
              <Card key={truck.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-5xl">{truck.image}</div>
                    <Badge variant={truck.available ? "default" : "secondary"}>
                      {truck.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{truck.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {truck.location}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <span className="font-medium">{truck.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rate</span>
                      <span className="font-medium">${truck.pricePerHour}/hr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Mileage</span>
                      <span className="font-medium">${truck.pricePerMile}/mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{truck.rating}</span>
                      <span className="text-sm text-muted-foreground">({truck.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {truck.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/bookings?truck=${truck.id}`} className="w-full">
                    <Button className="w-full" disabled={!truck.available}>
                      {truck.available ? "Book Now" : "Unavailable"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTrucks.length === 0 && (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No trucks found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
