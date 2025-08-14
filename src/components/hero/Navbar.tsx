"use client";

import { signIn } from "next-auth/react";
import Link from 'next/link'
import React from 'react'
import Button from '../forms/Button';

const navBarLinkStyles = `hover:underline underline-offset-8 decoration-2 decoration-accent-dark transition-all ease-in-out duration-200 hover:cursor-pointer hover:scale-105`;

function Navbar() {
    return (
        <div className='relative'>
            <div className='px-24 flex justify-between items-center dark:text-foreground text-foreground sticky'>
                <div className='flex gap-32'>
                    <div className='flex items-center'>
                        <div className='font-extralight text-2xl text-white bg-accent-dark text-center p-1 rounded-l-lg'>A</div>
                        <div className='text-2xl text-white bg-accent-dark ml-0.5 p-1 rounded-r-lg'>pex</div>
                    </div>
                    <div className='flex gap-16 justify-center items-center text-lg z-10'>
                        <Link href='' className={navBarLinkStyles}>Home</Link>
                        <Link href='' className={navBarLinkStyles}> Features</Link>
                        <Link href='' className={navBarLinkStyles}>Products</Link>
                        <Link href='' className={navBarLinkStyles}>Images</Link>
                    </div>
                </div>
                <div className='text-lg flex gap-10 justify-center items-center'>
                    <Button className='border-2 border-accent-light text-black px-4 py-2' onClick={() => signIn('google', { callbackUrl: '/upload' })}>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar