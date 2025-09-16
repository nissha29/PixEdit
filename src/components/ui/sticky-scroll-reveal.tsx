"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        number: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0,
        );
        setActiveCard(closestBreakpointIndex);
    });

    const linearGradients = [
        "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
        "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
        "linear-gradient(to bottom right, #63f8c6, #ffe74f)", // orange-500 to yellow-500
        "linear-gradient(to bottom right, #743bf8, #83aff7)", // violet-500 to blue-500
        "linear-gradient(to bottom right, #34d399, #059669)"  // green-400 to green-700
    ];


    const [backgroundGradient, setBackgroundGradient] = useState(
        linearGradients[0],
    );

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <motion.div
            animate={{

            }}
            className="relative flex h-[28rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                overscrollBehavior: 'contain',
            }}
            ref={ref}
        >
            <div className="div relative flex items-start sm:px-4">
                <div className="">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-10 sm:my-20">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-xl sm:text-2xl font-bold text-neutral-100 flex gap-3 ml-11 justify-start items-center"
                            >
                                <span className="px-4 py-1 bg-neutral-50 rounded-full text-neutral-800">{item.number}</span> {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-base sm:text-lg mt-5 sm:mt-10 w-64 sm:max-w-md text-neutral-400 ml-11"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>
            <div
                style={{ background: backgroundGradient }}
                className={cn(
                    "sticky top-10 hidden xl:h-full lg:h-72 lg:w-80 xl:w-sm 2xl:w-xl overflow-hidden rounded-md bg-white lg:block lg:text-2xl xl:text-3xl 2xl:text-4xl",
                    contentClassName,
                )}
            >
                {content[activeCard].content ?? null}
            </div>
        </motion.div>
    );
};
