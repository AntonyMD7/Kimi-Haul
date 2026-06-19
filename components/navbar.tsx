"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Truck } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Kimi Haul</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/trucks" className="text-sm font-medium hover:text-primary transition-colors">
              Trucks
            </Link>
            <Link href="/bookings" className="text-sm font-medium hover:text-primary transition-colors">
              My Bookings
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">
              Home
            </Link>
            <Link href="/trucks" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">
              Trucks
            </Link>
            <Link href="/bookings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">
              My Bookings
            </Link>
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">
              Dashboard
            </Link>
            <div className="pt-2 space-y-2">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
