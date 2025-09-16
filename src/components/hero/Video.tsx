import { Play } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Video() {
    return (
        <div className='flex flex-col justify-center items-center mb-32'>
            <div className="xl:w-6xl 2xl:w-full mt-2 overflow-hidden h-1/2 shadow-2xl shadow-accent-dark/30 hover:shadow-accent-dark/40 border border-neutral-700 rounded md:translate-y-10 2xl:translate-10 rotate-3">
                <div className="relative z-10 group hover:cursor-pointer">
                    <Image src='/lp-pix.png' width={2000} height={2000} className='w-full 2xl:h-[52rem] xl:h-[45rem] lg:h-[40rem] md:h-[30rem]' alt='' />
                    <div className="absolute inset-0 rounded-lg bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="p-3 hover:scale-105 hover:cursor-pointer ring-8 ring-accent-dark/40 rounded-full bg-gradient-to-r from-[#296801] to-accent-light transition">
                            <Play className="w-8 h-8 fill-neutral-200 text-transparent" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video