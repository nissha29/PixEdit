'use server'

import { prisma } from "@/prisma/index";

export async function getImages(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const images = await prisma.image.findMany({
    where: { userId },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.image.count({ where: { userId } });

  return {
    images,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}