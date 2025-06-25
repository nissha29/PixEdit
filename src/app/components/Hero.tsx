import { FlipWords } from '@/components/ui/flip-words';
import React from 'react'

function Hero() {
    const words = ["images", "illustrations", "pictures", "potraits"];
    return (
        <div className=''>
            <div className='flex mt-28 text-8xl dark:text-foreground text-foreground'>
                <div>Every tool you need to work with
                    <div className='bg-accent-dark'>
                        <FlipWords words={words} />
                    </div> in one place</div>
            </div>
            <div className='flex justify-end items-end'>
                <div className='border dark:border-accent-light border-sky-400 blur-xs translate-x-1/2 -translate-y-28 rotate-90 w-3xl'></div>
            </div>
            <div className='transform-3d flex flex-col gap-7 mt-28'>
                <div className='border dark:border-accent-light border-sky-400 blur-xs w-7xl translate-x-32'></div>
                <div className='border border-accent-dark blur-xs w-7xl translate-x-64'></div>
            </div>
        </div>
    )
}

export default Hero