"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export function CTA() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-6xl text-neutral-50 font-bold inter-var text-center">
        Give Your Photos a Fresh Look!
      </p>
      <p className="text-base md:text-lg mt-6 text-neutral-300 font-normal inter-var text-center">
        Simple controls and intuitive design let you edit your photos like a pro in just a few clicks.
      </p>
    </WavyBackground>
  );
}
