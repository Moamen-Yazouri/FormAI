"use client" 
import Header from "@/components/header/header";
import FeaturesSection from "@/components/landing/features/features";
import CTASection from "@/components/landing/CTA";
import Footer from "@/components/landing/footer";
import Hero from "./hero/hero";
import AboutSection from "./about-us/about-us";

export default function LandingPage() {

    return (
        <div className="flex min-h-screen flex-col mt-[-85px]">
            <Header/>

            <main className="flex-1">
                <Hero/>

                <FeaturesSection/>

                <CTASection/>

                <AboutSection/>
            </main>

            <Footer/>
        </div>
    )
}
