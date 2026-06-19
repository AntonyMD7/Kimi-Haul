"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Truck, 
  DollarSign, 
  Users, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MapPin,
  ArrowRight,
  Package
} from "lucide-react"

const stats = [
  { title: "Total Moves", value: "47", change: "+12%", trend: "up", icon: Truck },
  { title: "Revenue", value: "$8,420", change: "+23%", trend: "up", icon: DollarSign },
  { title: "Active Drivers", value: "12", change: "+2", trend: "up", icon: Users },
  { title: "Avg Rating", value: "4.8", change: "+0.2", trend: "up", icon: Star },
]

const recentActivity = [
  { id: "BK-047", customer: "Sarah Johnson", truck: "Box Truck Medium", amount: 245, status: "completed", date: "2 hours ago" },
  { id: "BK-046", customer: "Mike Chen", truck: "Compact Van", amount: 89, status: "in_progress", date: "5 hours ago" },
  { id: "BK-045", customer: "Emily Davis", truck: "Large Box Truck", amount: 420, status: "confirmed", date: "1 day ago" },
  { id: "BK-044", customer: "James Wilson", truck: "Cargo Van", amount: 135, status: "completed", date: "2 days ago" },
  { id: "BK-043", customer: "Lisa Brown", truck: "XL Moving Truck", amount: 680, status: "cancelled", date: "3 days ago" },
]

const upcomingBookings = [
  { id: "BK-048", customer: "Alex Thompson", truck: "Box Truck Medium", date: "Today, 2:00 PM", pickup: "Brooklyn, NY", dropoff: "Manhattan, NY" },
  { id: "BK-049", customer: "Maria Garcia", truck: "Compact Van", date: "Tomorrow, 9:00 AM", pickup: "Queens, NY", dropoff: "Bronx, NY" },
  { id: "BK-050", customer: "David Lee", truck: "Large Box Truck", date: "Jun 22, 11:00 AM", pickup: "Staten Island, NY", dropoff: "Jersey City, NJ" },
]

export default function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in_progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "confirmed": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here is what's happening today.</p>
            </div>
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground text-sm">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid gap-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{booking.customer}</h3>
                            <Badge variant="outline">{booking.truck}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {booking.pickup} → {booking.dropoff}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.customer}</p>
                            <p className="text-sm text-muted-foreground">{activity.truck} • {activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${activity.amount}</p>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fleet">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Compact Van", total: 8, available: 5, booked: 3, maintenance: 0 },
                  { name: "Box Truck Medium", total: 6, available: 2, booked: 3, maintenance: 1 },
                  { name: "Large Box Truck", total: 4, available: 1, booked: 2, maintenance: 1 },
                  { name: "XL Moving Truck", total: 3, available: 1, booked: 1, maintenance: 1 },
                  { name: "Cargo Van", total: 10, available: 7, booked: 3, maintenance: 0 },
                  { name: "Flatbed Truck", total: 4, available: 2, booked: 1, maintenance: 1 },
                ].map((fleet) => (
                  <Card key={fleet.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{fleet.name}</CardTitle>
                      <CardDescription>Total: {fleet.total} vehicles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Available</span>
                          <span className="font-medium text-green-600">{fleet.available}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(fleet.available / fleet.total) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Booked</span>
                          <span className="font-medium text-blue-600">{fleet.booked}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(fleet.booked / fleet.total) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Maintenance</span>
                          <span className="font-medium text-yellow-600">{fleet.maintenance}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(fleet.maintenance / fleet.total) * 100}%` }}
                          />
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
