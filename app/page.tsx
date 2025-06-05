"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Header from "@/components/header/header"
import Hero from "@/components/landing/hero/hero"
import FeaturesSection from "@/components/landing/features"
import CTASection from "@/components/landing/CTA"
import AboutSection from "@/components/landing/about-us"


export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col mt-[-85px]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero/>
        <FeaturesSection />
        {/* CTA Section */}
        <CTASection />
        <AboutSection/>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-cyan-800/20 py-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                FormAI
              </span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} FormAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
