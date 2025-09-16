'use client'

import React from 'react'
import { signIn } from "next-auth/react";
import { AnimatedTooltip } from '../ui/animated-tooltip';
import { FlipWords } from '../ui/flip-words';
import Background from './Background';
import Navbar from './Navbar';
import Video from './Video'
import Button from '../forms/Button';
import ImageFlow from './ImageFlow';
import { ArrowRight } from 'lucide-react';
import HowItWorks from './HowItWorks';
import { CTA } from './Cta';
import { AnimateScroll } from './AnimateScroll';

function Hero() {
    const words = ["images", "illustrations", "pictures", "potraits"];
    const people = [
        {
            id: 1,
            name: "John Doe",
            designation: "Software Engineer",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "Product Manager",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Data Scientist",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "UX Designer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 5,
            name: "Tyler Durden",
            designation: "Soap Developer",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
            id: 6,
            name: "Dora",
            designation: "The Explorer",
            image:
                "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        },
    ];

    return (
        <>
            <div>
                <Background />
                <Navbar />
                <AnimateScroll delay={100}>
                    <div className='text-foreground'>
                        <div className='hidden sm:flex justify-center items-center mt-14'>
                            <div className='flex w-52'>
                                <AnimatedTooltip items={people} />
                            </div>
                            <div>Trusted by 100+ users</div>
                        </div>
                        <div className='flex flex-col justify-center items-center sm:px-24'>
                            <div className='flex mt-8 sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold'>
                                <div className='hidden sm:flex flex-col'>
                                    Every tool you need to work with
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <span className='mt-6 mb-6 sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>
                                            <FlipWords words={words} />
                                        </span>
                                        in one place
                                    </div>
                                </div>
                                <div className='flex flex-col sm:hidden text-3xl text-center mt-12'>
                                    Every tool you need to work with <span className='text-accent-dark'>images</span> in one place
                                </div>
                            </div>

                            <div className='flex mt-10 gap-24 w-full items-center justify-center px-6'>
                                <div>
                                    <Button onClick={() => signIn('google', { callbackUrl: '/upload' })} className='flex gap-2 justify-center items-center bg-accent-dark text-white hover:bg-accent-light sm:text-xl xl:text-2xl 2xl:text-3xl p-2 sm:p-3 lg:px-5 lg:py-4 shadow-xl shadow-accent-dark/30'>Start Editing Now <ArrowRight /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateScroll>
                <AnimateScroll delay={100}>
                    <Video />
                </AnimateScroll>
                <AnimateScroll delay={100}>
                    <ImageFlow />
                </AnimateScroll>
                <AnimateScroll delay={100}>
                    <HowItWorks />
                </AnimateScroll>
                <CTA />
            </div>
        </>
    )
}

export default Hero