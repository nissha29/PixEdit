'use client'

import { IconArrow, IconArrowDown } from '@/icons/icons';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const features = [
    { mainText: "Add Text", description: "Easily add and style text on your images with a variety of fonts, sizes, colors, and placement options — customize every detail to create visually stunning designs that perfectly match your message, all in just a few clicks.", image1: "/text1.png", image2: "/text2.png" },
    { mainText: "Crop and Rotate photos", description: "Quickly crop and rotate your photos to focus on what matters most — adjust the composition, straighten angles, and enhance your images effortlessly for a polished, professional look.", image1: "/crop1.png", image2: "/crop2.png" },
    { mainText: "Apply Filters", description: "Give your photos a fresh look with easy-to-use filters — tweak colors, lighting, and effects to bring out the best in every image.", image1: "/filter1.png", image2: "/filter2.png" },
    { mainText: "Remove or Change Background", description: "Remove backgrounds with precision or switch them to colors, gradients, or entirely new images — personalize your photos and make them stand out effortlessly.", image1: "/background1.png", image2: "/background2.png" },
    { mainText: "Draw", description: "Add creativity on the go — explore brush, pencil, dotted, and chalk styles to draw freely and enhance your images with unique artistic effects.", image1: "/draw1.png", image2: "/draw2.png" },
    { mainText: "Add Blur", description: "Add blur effects like pixelate and smudge to your photos — create focus, hide details, or add artistic touches to enhance your images with ease.", image1: "/blur1.png", image2: "/blur2.png" },
    { mainText: "AI Generate and Edit", description: "Write a prompt describing the image you want to generate. Our AI will create the image, and you can then refine or edit it further in the Pixedit editor.", image1: "/ai1.png", image2: "/ai2.png" },
];

export function ImageFlow() {
    return (
        <div id='features' className="features flex flex-col justify-center items-center mb-24 mt-16 w-full relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header Section */}
            <div className="text-center mb-20 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="inline-flex items-center gap-3 mb-8">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent-dark to-accent-dark"></div>
                    <span className="text-xs sm:text-sm font-semibold text-accent-dark uppercase tracking-[0.2em]">Features</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent via-accent-dark to-accent-dark"></div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-accent-dark via-accent-light to-accent-dark bg-clip-text text-transparent animate-gradient">MINIMAL</span> yet mighty
                </h2>
                <p className='text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto'>
                    All the editing tools you need, thoughtfully designed to keep things simple — so you can focus on making your photos look amazing without any distractions.
                </p>
            </div>

            {/* Features Container */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div
                    className="w-full flex flex-col gap-20 sm:gap-24 lg:gap-32 features"
                >
                    {features.map((feature, index) => (
                        <Feature 
                            key={index}
                            index={index}
                            mainText={feature.mainText} 
                            description={feature.description} 
                            image1={feature.image1} 
                            image2={feature.image2} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Feature({ 
    index, 
    mainText, 
    description, 
    image1, 
    image2 
}: { 
    index: number;
    mainText: string; 
    description: string; 
    image1: string; 
    image2: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoadImages, setShouldLoadImages] = useState(index === 0); // Load first feature immediately
    const featureRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;
    const isFirstFeature = index === 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Start loading images when feature is about to be visible
                    if (!shouldLoadImages) {
                        setShouldLoadImages(true);
                    }
                }
            },
            { threshold: 0.1, rootMargin: '200px' } // Start loading 200px before visible
        );

        if (featureRef.current) {
            observer.observe(featureRef.current);
        }

        return () => {
            if (featureRef.current) {
                observer.unobserve(featureRef.current);
            }
        };
    }, [shouldLoadImages]);

    return (
        <div 
            ref={featureRef}
            className={`w-full transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
        >
            <div className={`
                relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16
                ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
            `}>
                {/* Feature Number Badge */}
                <div className={`absolute ${isEven ? '-left-6 lg:-left-12' : '-right-6 lg:-right-12'} top-0 lg:top-1/2 lg:-translate-y-1/2 z-10 hidden lg:flex`}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent-dark/30 blur-2xl rounded-full animate-pulse"></div>
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent-dark via-accent-dark to-accent-light flex items-center justify-center border-2 border-accent-dark/40 shadow-2xl shadow-accent-dark/30 backdrop-blur-sm">
                            <span className="text-3xl font-bold text-white drop-shadow-lg">{index + 1}</span>
                        </div>
                    </div>
                </div>

                {/* Images Section */}
                <div className="flex-1 w-full lg:flex-[2]">
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-6">
                        {/* Before Image */}
                        <div className="relative group flex-1 w-full">
                            <div className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
                            <div className="relative rounded-3xl overflow-hidden border border-neutral-800/60 transition-all duration-500 bg-neutral-900/40">
                                <div className="absolute bottom-4 right-4 z-20 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-xl border border-neutral-700/60 shadow-lg">
                                    <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wide">Before</span>
                                </div>
                                <div className="relative overflow-hidden aspect-[3/3.5] bg-neutral-800/40">
                                    {shouldLoadImages ? (
                                        <Image 
                                            src={image1} 
                                            width={1200} 
                                            height={1400} 
                                            alt="" 
                                            priority={isFirstFeature}
                                            loading={isFirstFeature ? undefined : "lazy"}
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0">
                            <IconArrowDown className="flex lg:hidden text-accent-dark w-7 h-7 animate-bounce drop-shadow-lg" />
                            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-md hover:scale-110 transition-transform duration-300">
                                <IconArrow className="text-accent-dark w-7 h-7 drop-shadow-lg" />
                            </div>
                        </div>

                        {/* After Image */}
                        <div className="relative group flex-1 w-full">
                            <div className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
                            <div className="relative rounded-3xl overflow-hidden border border-neutral-800/60 transition-all duration-500 backdrop-blur-sm bg-neutral-900/40">
                                <div className="absolute bottom-4 right-4 z-20 px-4 py-1.5 bg-gradient-to-r from-accent-dark to-accent-light backdrop-blur-md rounded-xl border border-accent-dark/60 shadow-lg">
                                    <span className="text-xs font-semibold text-white uppercase tracking-wide">After</span>
                                </div>
                                <div className="relative overflow-hidden aspect-[3/3.5] bg-neutral-800/40">
                                    {shouldLoadImages ? (
                                        <Image 
                                            src={image2} 
                                            width={1200} 
                                            height={1400} 
                                            alt="" 
                                            priority={isFirstFeature}
                                            loading={isFirstFeature ? undefined : "lazy"}
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 animate-pulse" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`flex-1 w-full lg:max-w-lg space-y-6 ${isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="space-y-6">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                            {mainText}
                        </h3>
                        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageFlow;