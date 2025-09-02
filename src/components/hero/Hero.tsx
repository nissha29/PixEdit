'use client'

import React from 'react'
import { signIn } from "next-auth/react";
import { AnimatedTooltip } from '../ui/animated-tooltip';
import { FlipWords } from '../ui/flip-words';
import Background from './Background';
import Navbar from './Navbar';
import Video from './Video'
import Button from '../forms/Button';

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
            <Background />
            <Navbar />
            <div className='text-foreground'>
                <div className='flex justify-center items-center gap-6 mt-24'>
                    <div className='flex w-52'>
                        <AnimatedTooltip items={people} />
                    </div>
                    <div>Trusted by 100+ users</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex mt-10 text-7xl font-semibold'>
                        <div className=''>
                            Every tool you need to work with
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='mt-6 mb-6 text-8xl'>
                                    <FlipWords words={words} />
                                </div>
                                in one place
                            </div>

                        </div>
                    </div>

                    <div className='flex mt-16 gap-24 w-full items-center justify-center px-6'>
                        <div>
                            <Button onClick={() => signIn('google', { callbackUrl: '/upload' })} className='bg-accent-dark text-white hover:bg-accent-light text-3xl px-5 py-4'>Start Editing Now</Button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end items-end'>
                    <div className='border border-accent-light/30 translate-x-1/2 -translate-y-60 rotate-90 w-3xl blur-xs shadow-2xl shadow-accent-dark'></div>
                </div>
                <div className='transform-3d mt-20'>
                    <div className='border border-accent-light/30 w-7xl translate-x-11 blur-xs shadow-2xl shadow-accent-dark'></div>
                </div>
                <div className='flex justify-end items-end'>
                    <div className='border border-accent-light/30 translate-x-[25rem] -translate-y-72 rotate-90 w-3xl blur-xs shadow-2xl shadow-accent-dark'></div>
                </div>
                <div className='transform-3d mt-4'>
                    <div className='border border-accent-light/30 w-7xl translate-x-28 blur-xs shadow-2xl shadow-accent-dark'></div>
                </div>
            </div>
            <Video />
        </>
    )
}

export default Hero