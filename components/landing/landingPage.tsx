"use client"

import Header from "@/components/header/header";
import Hero from "@/components/landing/hero/hero";
import FeaturesSection from "@/components/landing/features";
import CTASection from "@/components/landing/CTA";
import AboutSection from "@/components/landing/about-us";
import Footer from "@/components/landing/footer";

export default function LandingPage() {

    return (
        <div className="flex min-h-screen flex-col mt-[-85px]">
        <Header />

            <main className="flex-1">
                <Hero/>

                <FeaturesSection />

                <CTASection />

                <AboutSection/>
            </main>

        <Footer/>
        </div>
    )
}
