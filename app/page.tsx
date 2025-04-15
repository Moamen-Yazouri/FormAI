import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Cpu, FileText, Zap } from "lucide-react";
import WrapperContainer from "@/components/wrapperContainer/wrapperContainer"
export default function LandingPage() {
  return (
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        
          <header className="sticky top-0 z-40 w-full border-b bg-white">
          <WrapperContainer>
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold">FormAI</span>
              </div>
              <nav className="hidden md:flex gap-6">
                <Link href="#features" className="text-sm font-medium hover:text-purple-500 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-500 transition-colors">
                  How It Works
                </Link>
                <Link href="#pricing" className="text-sm font-medium hover:text-purple-500 transition-colors">
                  Pricing
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium hover:text-purple-500 transition-colors">
                  Log in
                </Link>
                <Button className="bg-purple-500 hover:bg-purple-600">Get Started</Button>
              </div>
            </div>
        </WrapperContainer>
          </header>

        {/* Main */}
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 bg-white">
            <div className="container text-center">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
                <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-0.5 text-xs font-semibold mr-2">
                  NEW
                </span>
                <span>Introducing AI-powered form analytics</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Create intelligent forms <br className="hidden sm:inline" />
                <span className="text-purple-500">powered by AI</span>
              </h1>
              <p className="max-w-[42rem] text-muted-foreground sm:text-xl mb-8 mx-auto">
                Build, deploy, and analyze forms with the help of artificial intelligence. Get insights, improve
                conversion rates, and make data-driven decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 w-full sm:w-auto">
                  Start for free
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch demo
                </Button>
              </div>
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

          {/* Features Section */}
          <section id="features" className="py-20 bg-purple-50">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">Powerful features to supercharge your forms</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered platform helps you create, manage, and analyze forms with ease.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-sm border">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">How FormAI works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get started in minutes with our intuitive platform.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-6">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-purple-50">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">Simple, transparent pricing</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose the plan that's right for you and start creating intelligent forms today.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border p-8 ${plan.popular ? "border-purple-500 shadow-lg bg-white" : "bg-white"}`}
                  >
                    {plan.popular && (
                      <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-purple-500 hover:bg-purple-600 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    >
                      Get started
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container">
              <div className="rounded-2xl bg-purple-500 px-8 py-16 text-center text-white md:px-16">
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
        <footer className="border-t py-12 bg-white">
                <WrapperContainer>
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
            </WrapperContainer>
        </footer>
      </div>
  );
}

// Feature Icons
const features = [
  {
    title: "AI Form Builder",
    description:
      "Create forms with AI assistance that suggests fields, validation, and optimizations based on your goals.",
    icon: Cpu,
  },
  {
    title: "Smart Analytics",
    description:
      "Get AI-powered insights on form performance, user behavior, and conversion optimization opportunities.",
    icon: FileText,
  },
  {
    title: "Instant Deployment",
    description: "Deploy your forms instantly with a single click and share them anywhere with a custom URL.",
    icon: Zap,
  },
];

const steps = [
  {
    title: "Create your form",
    description: "Use our intuitive drag-and-drop builder or let AI generate a form based on your description.",
  },
  {
    title: "Customize & deploy",
    description: "Customize the design to match your brand and deploy with a single click.",
  },
  {
    title: "Collect & analyze",
    description: "Collect submissions and get AI-powered insights to optimize your form's performance.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for individuals and small projects.",
    features: ["Up to 3 forms", "100 submissions/month", "Basic analytics", "Email notifications"],
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "Ideal for professionals and growing businesses.",
    features: [
      "Unlimited forms",
      "5,000 submissions/month",
      "Advanced analytics",
      "AI form suggestions",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited forms",
      "Unlimited submissions",
      "AI-powered insights",
      "Team collaboration",
      "Priority support",
      "Custom integrations",
    ],
    popular: false,
  },
];
