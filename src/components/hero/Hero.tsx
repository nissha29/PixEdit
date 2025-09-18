'use client'

import React from 'react'
import { signIn, useSession } from "next-auth/react";
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
import { people, words } from '@/lib/constants';
import { useRouter } from 'next/navigation';

function Hero() {
    const router = useRouter();
    const { status } = useSession();

    const handleClick = () => {
        if (status === 'unauthenticated') {
            signIn('google', { callbackUrl: '/upload' });
        } else if (status === 'authenticated') {
            router.push('/upload');
        }
    }

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
                                    <Button onClick={handleClick} className='flex gap-2 justify-center items-center bg-accent-dark text-white hover:bg-accent-light sm:text-xl xl:text-2xl 2xl:text-3xl p-2 sm:p-3 lg:px-5 lg:py-4 shadow-xl shadow-accent-dark/30'>Start Editing Now <ArrowRight /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateScroll>
                <AnimateScroll delay={100}>
                    <Video />
                </AnimateScroll>
                <ImageFlow />
                <AnimateScroll delay={100}>
                    <HowItWorks />
                </AnimateScroll>
                <CTA />
            </div>
        </>
    )
}

export default Hero