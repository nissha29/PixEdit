"use client";

import { signIn, useSession } from "next-auth/react";
import Link from 'next/link'
import React, { useState } from 'react'
import Button from "../forms/Button";
import { Menu, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const navBarLinkStyles = `hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200 hover:cursor-pointer hover:scale-105`;

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    const handleClick = () => {
        if (status === 'unauthenticated') {
            signIn('google', { callbackUrl: '/upload' });
        } else if (status === 'authenticated') {
            router.push('/upload');
        }
    }

    return (
        <div className='relative'>
            <div className='lg:px-5 xl:px-24 flex justify-between items-center dark:text-foreground text-foreground sticky z-50'>
                <div className='flex gap-24'>
                    <div className='flex items-center'>
                        <div className="text-accent-dark text-3xl font-bold">pix</div>
                        <div className="text-2xl font-bold text-neutral-100">EDiT</div>
                    </div>
                    <div className='hidden md:flex gap-16 justify-center items-center text-lg z-10'>
                        <Link href='#' className={navBarLinkStyles}>Home</Link>
                        <Link href='#features' className={navBarLinkStyles}> Features</Link>
                        <Link href='#howItWorks' className={navBarLinkStyles}>How It Works?</Link>
                    </div>
                </div>
                <div className='hidden text-lg md:flex gap-10 justify-center items-center'>
                    <Button className='border border-accent-dark/60 text-white hover:border-accent-light text-lg px-3 py-2' onClick={handleClick}>
                        Get Started
                    </Button>
                </div>
                <div className="md:hidden flex">{isOpen ? <Plus className="hover:cursor-pointer rotate-45" onClick={() => setIsOpen(prev => !prev)} /> : <Menu
                    className="hover:cursor-pointer" onClick={() => setIsOpen(prev => !prev)} />}
                </div>

                {isOpen && <div className="bg-background border border-neutral-800 rounded-md px-1 py-3 absolute top-10 w-full">
                    <div className="flex flex-col space-y-4 px-4">
                        <Link href="#" className="text-neutral-200 font-medium hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200">
                            Home
                        </Link>
                        <Link href="#features" className="text-neutral-200 font-medium hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200">
                            Features
                        </Link>
                        <Link href="#demo" className="text-neutral-200 font-medium hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200">
                            How it works
                        </Link>
                        <button className="bg-accent-dark cursor-pointer text-neutral-800 px-4 py-2 rounded-full font-light w-full " onClick={() => router.push('/signup')}>
                            Start Editing
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default Navbar