import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"
import Header from "@/components/header/header"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {/* <Header /> */}

      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-purple-100 p-6 mb-6">
            <FileText className="h-10 w-10 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Page not found</h1>
          <p className="max-w-[28rem] text-muted-foreground sm:text-xl mb-8 mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600 w-full sm:w-auto">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
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
