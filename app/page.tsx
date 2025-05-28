"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import Header from "@/components/header/header"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 w-full bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-indigo-900/30 to-purple-900/40"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-purple-600/20 to-violet-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-indigo-600/15 to-violet-600/15 rounded-full blur-2xl transform -translate-x-24 -translate-y-24"></div>

          <div className="relative w-full max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-violet-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full px-3 py-0.5 text-xs font-semibold mr-2">
                NEW
              </span>
              <span className="text-sm text-slate-300">Introducing AI-powered form analytics</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5 text-violet-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white">
              Create intelligent forms <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
                className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              >
                Start for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-violet-600/50 text-slate-300 hover:bg-violet-800/30 hover:text-white hover:border-violet-500 w-full sm:w-auto"
              >
                Watch demo
              </Button>
            </div>

            {/* Image */}
            <div className="mt-16 relative w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-600/30 via-indigo-600/20 to-purple-600/30 rounded-3xl blur-3xl" />
              <div className="absolute inset-0 -z-5 bg-gradient-to-t from-slate-900/50 to-transparent rounded-xl" />
              <Image
                src="/hero.png"
                alt="FormAI Dashboard"
                width={1000}
                height={600}
                className="rounded-xl border border-violet-700/30 shadow-2xl ring-1 ring-violet-500/20"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-r from-violet-800 via-indigo-800 to-purple-800 py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-full blur-2xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-violet-600/20 rounded-full blur-2xl translate-x-40 translate-y-40"></div>

          <div className="relative w-full max-w-7xl mx-auto px-6 text-center text-white">
            <div className="rounded-2xl px-8 py-16 md:px-16 bg-slate-900/20 backdrop-blur-sm border border-violet-700/30">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4 bg-gradient-to-r from-white via-violet-200 to-indigo-200 bg-clip-text text-transparent">
                Ready to transform your forms?
              </h2>
              <p className="mb-8 max-w-md mx-auto text-slate-300">
                Join thousands of businesses using FormAI to create intelligent, high-converting forms.
              </p>
              <Button
                size="lg"
                className="bg-white text-violet-800 hover:bg-slate-100 hover:text-violet-900 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
              >
                Start your free trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-violet-800/30 bg-gradient-to-b from-slate-900 to-violet-900/50 py-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-violet-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                FormAI
              </span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-slate-400 hover:text-violet-300 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-violet-300 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-violet-300 transition-colors">
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
