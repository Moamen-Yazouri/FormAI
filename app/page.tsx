"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Cpu, FileText, Zap } from "lucide-react"
import Header from "@/components/header/header"


export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header/>

      {/* Main */}
      <main className="flex-1">

        {/* Hero Section */}
{/* Hero Section */}
<section className="relative py-20 md:py-28 w-full bg-white">
  <div className="w-full max-w-7xl mx-auto px-6 text-center">
    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
      <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-0.5 text-xs font-semibold mr-2">
        NEW
      </span>
      <span className="text-sm">Introducing AI-powered form analytics</span>
      <ArrowRight className="ml-1 h-3.5 w-3.5" />
    </div>
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
      Create intelligent forms <br className="hidden sm:inline" />
      <span className="text-purple-500">powered by AI</span>
    </h1>
    <p className="max-w-[42rem] text-muted-foreground sm:text-xl mb-8 mx-auto">
      Build, deploy, and analyze forms with the help of artificial intelligence.
    </p>

    {/* ✅ Centered buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
      <Button size="lg" className="bg-purple-500 hover:bg-purple-600 w-full sm:w-auto">
        Start for free
      </Button>
      <Button size="lg" variant="outline" className="w-full sm:w-auto">
        Watch demo
      </Button>
    </div>

    {/* Image */}
    <div className="mt-16 relative w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-100/70 rounded-3xl blur-3xl" />
      <Image
        src="/hero.png"
        alt="FormAI Dashboard"
        width={1000}
        height={600}
        className="rounded-xl border shadow-xl"
      />
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="w-full bg-purple-500 py-20">
          <div className="w-full max-w-7xl mx-auto px-6 text-center text-white">
            <div className="rounded-2xl px-8 py-16 md:px-16">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to transform your forms?</h2>
              <p className="mb-8 max-w-md mx-auto">
                Join thousands of businesses using FormAI to create intelligent, high-converting forms.
              </p>
              <Button size="lg" className="bg-white text-purple-500 hover:bg-gray-100">
                Start your free trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">FormAI</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FormAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
