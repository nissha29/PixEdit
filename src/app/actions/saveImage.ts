'use server'

import { prisma } from "@/prisma/index";

export const saveImage = async(data: { userId: string, publicId: string; url: string }) => {
    try {
        if(!data.userId) return;
        await prisma.image.create({ data });
    } catch (error) {
        console.log(error);
    }
}