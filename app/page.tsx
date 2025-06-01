"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import Header from "@/components/header/header"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col from-slate-950 via-blue-900 to-indigo-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 w-full overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-700/15 to-cyan-700/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-cyan-600/15 to-blue-600/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-cyan-700/10 to-blue-600/10 rounded-full blur-2xl transform -translate-x-24 -translate-y-24"></div>

          <div className="relative w-full max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-3 py-0.5 text-xs font-semibold mr-2">
                NEW
              </span>
              <span className="text-sm text-slate-300">Introducing AI-powered form analytics</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5 text-blue-400" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white">
              Create intelligent forms <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                powered by AI
              </span>
            </h1>

            <p className="max-w-[42rem] text-slate-300 sm:text-xl mb-8 mx-auto">
              Build, deploy, and analyze forms with the help of artificial intelligence.
            </p>

            {/* Centered buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              >
                Start for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-600/50 text-slate-300 hover:bg-cyan-800/20 hover:text-white hover:border-cyan-500 w-full sm:w-auto"
              >
                Watch demo
              </Button>
            </div>

            {/* Image */}
            <div className="mt-16 relative w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl" />
              <div className="absolute inset-0 -z-5 bg-gradient-to-t from-slate-950/50 to-transparent rounded-xl" />
              <Image
                src="/hero.png"
                alt="FormAI Dashboard"
                width={1000}
                height={600}
                className="rounded-xl border border-blue-700/30 shadow-2xl ring-1 ring-blue-500/20"
              />
            </div>
          </div>
        </section>

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
