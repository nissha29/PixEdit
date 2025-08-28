"use client";

import { signIn } from "next-auth/react";
import Link from 'next/link'
import React from 'react'
import Button from "../forms/Button";

const navBarLinkStyles = `hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200 hover:cursor-pointer hover:scale-105`;

function Navbar() {
    return (
        <div className='relative'>
            <div className='px-24 flex justify-between items-center dark:text-foreground text-foreground sticky'>
                <div className='flex gap-32'>
                    <div className='flex items-center'>
                        <div className="text-accent-dark text-3xl font-bold">pix</div>
                        <div className="text-2xl font-bold text-neutral-100">EDiT</div>
                    </div>
                    <div className='flex gap-16 justify-center items-center text-lg z-10'>
                        <Link href='' className={navBarLinkStyles}>Home</Link>
                        <Link href='' className={navBarLinkStyles}> Features</Link>
                        <Link href='' className={navBarLinkStyles}>Products</Link>
                        <Link href='' className={navBarLinkStyles}>Images</Link>
                    </div>
                </div>
                <div className='text-lg flex gap-10 justify-center items-center'>
                    <Button className='bg-accent-dark text-white hover:bg-accent-light text-lg px-3 py-2' onClick={() => signIn('google', { callbackUrl: '/upload' })}>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar