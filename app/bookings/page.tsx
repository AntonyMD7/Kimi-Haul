"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, DollarSign, Truck, CheckCircle, AlertCircle } from "lucide-react"

const mockBookings = [
  {
    id: "BK-001",
    truckName: "Box Truck Medium",
    pickup: "123 Main St, Brooklyn, NY",
    dropoff: "456 Oak Ave, Manhattan, NY",
    date: "2026-06-25",
    time: "10:00 AM",
    status: "confirmed",
    total: 245,
  },
  {
    id: "BK-002",
    truckName: "Compact Van",
    pickup: "789 Pine Rd, Queens, NY",
    dropoff: "321 Elm St, Bronx, NY",
    date: "2026-06-28",
    time: "2:00 PM",
    status: "pending",
    total: 89,
  },
  {
    id: "BK-003",
    truckName: "Large Box Truck",
    pickup: "555 Cedar Ln, Staten Island, NY",
    dropoff: "888 Maple Dr, Jersey City, NJ",
    date: "2026-06-20",
    time: "9:00 AM",
    status: "completed",
    total: 420,
  },
]

const truckOptions = [
  { id: "1", name: "Compact Van", pricePerHour: 29 },
  { id: "2", name: "Box Truck Medium", pricePerHour: 49 },
  { id: "3", name: "Large Box Truck", pricePerHour: 79 },
  { id: "4", name: "XL Moving Truck", pricePerHour: 119 },
  { id: "5", name: "Cargo Van", pricePerHour: 35 },
  { id: "6", name: "Flatbed Truck", pricePerHour: 55 },
]

export default function BookingsPage() {
  const searchParams = useSearchParams()
  const preselectedTruck = searchParams.get("truck")

  const [activeTab, setActiveTab] = useState("new")
  const [bookingForm, setBookingForm] = useState({
    truckId: preselectedTruck || "",
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: "",
    pickupTime: "",
    estimatedHours: "4",
    estimatedDistance: "20",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedTruck = truckOptions.find(t => t.id === bookingForm.truckId)
  const estimatedTotal = selectedTruck 
    ? (selectedTruck.pricePerHour * parseInt(bookingForm.estimatedHours || "0")) + 
      (1.5 * parseInt(bookingForm.estimatedDistance || "0"))
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement Supabase booking creation
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bookings</h1>
            <p className="text-muted-foreground">Manage your moves and book new trucks</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="new">New Booking</TabsTrigger>
              <TabsTrigger value="history">My Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              {submitted ? (
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your booking has been received. You will receive a confirmation email shortly.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => {setSubmitted(false); setActiveTab("history")}}>
                        View My Bookings
                      </Button>
                      <Button variant="outline" onClick={() => setSubmitted(false)}>
                        Book Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>New Booking</CardTitle>
                        <CardDescription>Fill in the details for your move</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="truck">Select Truck</Label>
                            <select
                              id="truck"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={bookingForm.truckId}
                              onChange={(e) => setBookingForm({...bookingForm, truckId: e.target.value})}
                              required
                            >
                              <option value="">Choose a truck...</option>
                              {truckOptions.map((truck) => (
                                <option key={truck.id} value={truck.id}>
                                  {truck.name} - ${truck.pricePerHour}/hr
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="pickupAddress">Pickup Address</Label>
                              <Input
                                id="pickupAddress"
                                placeholder="Enter pickup location"
                                value={bookingForm.pickupAddress}
                                onChange={(e) => setBookingForm({...bookingForm, pickupAddress: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="dropoffAddress">Dropoff Address</Label>
                              <Input
                                id="dropoffAddress"
                                placeholder="Enter destination"
                                value={bookingForm.dropoffAddress}
                                onChange={(e) => setBookingForm({...bookingForm, dropoffAddress: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="pickupDate">Pickup Date</Label>
                              <Input
                                id="pickupDate"
                                type="date"
                                value={bookingForm.pickupDate}
                                onChange={(e) => setBookingForm({...bookingForm, pickupDate: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pickupTime">Pickup Time</Label>
                              <Input
                                id="pickupTime"
                                type="time"
                                value={bookingForm.pickupTime}
                                onChange={(e) => setBookingForm({...bookingForm, pickupTime: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="estimatedHours">Estimated Hours</Label>
                              <Input
                                id="estimatedHours"
                                type="number"
                                min="1"
                                value={bookingForm.estimatedHours}
                                onChange={(e) => setBookingForm({...bookingForm, estimatedHours: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="estimatedDistance">Estimated Distance (miles)</Label>
                              <Input
                                id="estimatedDistance"
                                type="number"
                                min="1"
                                value={bookingForm.estimatedDistance}
                                onChange={(e) => setBookingForm({...bookingForm, estimatedDistance: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Processing..." : "Confirm Booking"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle>Price Estimate</CardTitle>
                        <CardDescription>Based on your selections</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedTruck ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Truck</span>
                              <span className="font-medium">{selectedTruck.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Hourly Rate</span>
                              <span className="font-medium">${selectedTruck.pricePerHour}/hr</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Est. Hours</span>
                              <span className="font-medium">{bookingForm.estimatedHours} hrs</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Est. Distance</span>
                              <span className="font-medium">{bookingForm.estimatedDistance} mi</span>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Total Estimate</span>
                                <span className="text-primary">${estimatedTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Select a truck to see pricing</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{booking.truckName}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {booking.pickup} → {booking.dropoff}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${booking.total}</div>
                          <div className="text-sm text-muted-foreground">Total</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
