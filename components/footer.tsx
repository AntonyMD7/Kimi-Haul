import Link from "next/link"
import { Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Kimi Haul</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Making moving simple, affordable, and stress-free. Book a truck in minutes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/trucks" className="hover:text-primary">Truck Rental</Link></li>
              <li><Link href="/trucks" className="hover:text-primary">Moving Services</Link></li>
              <li><Link href="/trucks" className="hover:text-primary">Delivery</Link></li>
              <li><Link href="/trucks" className="hover:text-primary">Storage</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="/" className="hover:text-primary">Safety</Link></li>
              <li><Link href="/" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 Kimi Haul. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
