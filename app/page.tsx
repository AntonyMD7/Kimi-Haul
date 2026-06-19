import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Truck, 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  ChevronRight,
  Users,
  TrendingUp
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Star className="h-4 w-4" />
                Trusted by 10,000+ movers
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Moving Made{" "}
                <span className="text-primary">Simple</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Book a truck in minutes. Track your move in real-time. 
                Kimi Haul connects you with reliable drivers and the right vehicle for any job.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/trucks">
                  <Button size="lg" className="gap-2">
                    Book a Truck <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    Become a Driver
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Insured Moves
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  24/7 Support
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Nationwide
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Truck className="h-48 w-48 text-primary/40" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">2,500+</p>
                    <p className="text-xs text-muted-foreground">Moves this month</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">4.9/5</p>
                    <p className="text-xs text-muted-foreground">Average rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Kimi Haul Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get your move done
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Truck",
                description: "Browse our fleet of vehicles from small vans to large trucks. Filter by size, price, and availability.",
                icon: Truck,
              },
              {
                step: "02",
                title: "Book & Schedule",
                description: "Select your pickup and drop-off locations, choose a date and time, and confirm your booking instantly.",
                icon: MapPin,
              },
              {
                step: "03",
                title: "Track & Move",
                description: "Track your driver in real-time, communicate directly, and enjoy a stress-free moving experience.",
                icon: Clock,
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-card rounded-2xl p-8 border h-full">
                  <div className="text-5xl font-bold text-primary/10 mb-4">{item.step}</div>
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Truck Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Fleet</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From studio apartments to full houses, we have the right vehicle
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Small Van", capacity: "1-2 rooms", price: "$29/hr", icon: "🚐" },
              { name: "Medium Truck", capacity: "2-3 rooms", price: "$49/hr", icon: "🚚" },
              { name: "Large Truck", capacity: "3-5 rooms", price: "$79/hr", icon: "🚛" },
              { name: "XL Truck", capacity: "5+ rooms", price: "$119/hr", icon: "🚜" },
            ].map((truck) => (
              <div key={truck.name} className="bg-card rounded-xl p-6 border hover:border-primary/50 transition-colors">
                <div className="text-4xl mb-4">{truck.icon}</div>
                <h3 className="font-semibold mb-1">{truck.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{truck.capacity}</p>
                <p className="text-lg font-bold text-primary">{truck.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/trucks">
              <Button variant="outline" size="lg">View All Trucks</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50,000+", label: "Completed Moves" },
              { value: "1,200+", label: "Active Drivers" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9/5", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Move?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who trust Kimi Haul for their moving needs. 
            Book in minutes, move with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/trucks">
              <Button size="lg" variant="outline">Explore Trucks</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
