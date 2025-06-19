import MemoizedCards from "./featuresCards";
import MemoizedFeaturesActions from "./featuresActions";
import React from "react";
import MemoizedHeader from "./featuresHeader";
import BackgroundColors from "../CTA/backgroundColors";

const FeaturesSection = () => {

    return (
        <section id="features" className="relative py-20 md:py-28 bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-950 overflow-hidden">
            <BackgroundColors />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                
                <MemoizedHeader />

                
                <MemoizedCards />

                
                <MemoizedFeaturesActions />
            </div>
        </section>
    )
}
export default FeaturesSection;