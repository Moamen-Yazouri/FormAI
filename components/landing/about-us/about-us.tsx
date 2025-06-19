"use client";
import BackgroundColors from "./backgroundColors";
import MemoizedAboutHeader from "./aboutHeader";
import MemoizedOurStory from "./ourStory";
import MemoizedAboutImagePanel from "./aboutImage";
import MemoizedValuesHeader from "./aboutValuesHeader";
import MemoizedValuesCards from "./aboutValues";
import MemoizedFeaturesActions from "../features/featuresActions";
import React from "react";

const  MemoizedAboutUs = () => {


    return (
        <section id="about" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-800 via-blue-950 to-cyan-950 overflow-hidden">
            <BackgroundColors />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <MemoizedAboutHeader />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <MemoizedOurStory />

                    <MemoizedAboutImagePanel />
                </div>

                <MemoizedValuesHeader />

                <MemoizedValuesCards />

                <MemoizedFeaturesActions />
            </div>
        </section>
    )   
}   

export default React.memo(MemoizedAboutUs);