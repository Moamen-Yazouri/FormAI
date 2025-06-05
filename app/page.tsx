"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Header from "@/components/header/header"
import Hero from "@/components/landing/hero/hero"
import FeaturesSection from "@/components/landing/features"


export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col mt-[-85px]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero/>
        <FeaturesSection />
        {/* CTA Section */}
        <section className="w-full py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl translate-x-40 translate-y-40"></div>

          <div className="relative w-full max-w-7xl mx-auto px-6 text-center text-white">
            <div className="rounded-2xl px-8 py-16 md:px-16 bg-slate-900/30 backdrop-blur-sm border border-cyan-700/20">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Ready to transform your forms?
              </h2>
              <p className="mb-8 max-w-md mx-auto text-slate-300">
                Join thousands of businesses using FormAI to create intelligent, high-converting forms.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-800 hover:bg-slate-100 hover:text-blue-900 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
              >
                Start your free trial
              </Button>
            </div>
          </div>
        </section>
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
