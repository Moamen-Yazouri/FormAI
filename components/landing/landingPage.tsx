import Header from "@/components/header/header";
import MemoizedHero from "./hero/hero";
import FeaturesSection from "./features/featuresSection";
import CTASection from "./CTA/CTASection";
import MemoizedAboutUs from "./about-us/about-us";
import Footer from "./footer/footerSection";

export default function LandingPage() {

    return (
        <div className="flex min-h-screen flex-col mt-[-85px]">
            <Header/>

            <main className="flex-1">
                <MemoizedHero/>

                <FeaturesSection/>

                <CTASection/>

                <MemoizedAboutUs/>
            </main>

            <Footer/>
        </div>
    )
}
