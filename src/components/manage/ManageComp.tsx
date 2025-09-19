'use client'

import { useImagePreviewStore } from "@/store/store";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getImages } from "@/app/actions/getImages";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ImageType } from "@/types/types";

type ImagesResponse = {
    images: ImageType[];
    total: number;
    page: number;
    totalPages: number;
};

export default function ManageComp() {
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { setDataURL } = useImagePreviewStore();
    const { data: session } = useSession();
    const limit = 10;

    const userId = session?.user.id;
    if (!userId) {
        throw new Error('userId missing');

    }

    const { data, isLoading } = useQuery<ImagesResponse>({
        queryKey: ["images", userId, page],
        queryFn: () => getImages(userId, page, limit),
        placeholderData: keepPreviousData,
    });

    const images = data?.images ?? [];

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="text-center mb-6">
                    <div className="h-8 w-64 bg-neutral-700 rounded mx-auto animate-pulse" />
                    <div className="h-4 w-96 bg-neutral-800 rounded mt-4 mx-auto animate-pulse" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    {Array.from({ length: limit }).map((_, idx) => (
                        <div
                            key={idx}
                            className="w-96 h-72 bg-neutral-800 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <div className="bg-neutral-800 px-24 py-16 rounded-2xl shadow-md flex flex-col items-center max-w-2xl">
                    <div className="bg-neutral-700 p-4 rounded-full mb-4">
                        <ImagePlus className="h-10 w-10 text-neutral-300" />
                    </div>

                    <h2 className="text-4xl font-semibold text-neutral-200 mb-2">
                        No photos yet
                    </h2>
                    <p className="text-neutral-400 mb-5">
                        Edit and save images to see them here.
                    </p>

                    <button onClick={() => router.push('/upload')} className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-medium hover:opacity-90 transition hover:cursor-pointer">
                        Start Editing
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="p-6 text-center shrink-0">
                <h2 className="text-4xl font-extrabold text-neutral-300 drop-shadow-sm">
                    Your Edited Images
                </h2>
                <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
                    Browse your saved edits below. You can{" "}
                    <span className="font-medium text-neutral-50">re-edit</span> to refine them further, or{" "}
                    <span className="font-medium text-neutral-50">view</span> in full resolution.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-32">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((image: ImageType) => (
                        <div key={image.id} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <Image
                                src={image.url}
                                alt={image.publicId}
                                width={300}
                                height={300}
                                className="object-cover w-96 h-72 group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                                <button
                                    onClick={() => {
                                        setDataURL(image.url);
                                        router.push("/editor");
                                    }}
                                    className="px-3 py-1 bg-white/90 text-sm rounded-lg shadow hover:bg-white transition text-neutral-800 hover:cursor-pointer"
                                >
                                    Re-edit
                                </button>
                                <Link
                                    href={image.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-white/90 text-sm rounded-lg shadow hover:bg-white transition text-neutral-800"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-neutral-300">
                        Page {data?.page} of {data?.totalPages}
                    </span>
                    <button
                        disabled={page === data?.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full text-center text-neutral-500 text-sm py-3 bg-neutral-900/80 backdrop-blur-md border-t border-neutral-800">
                Tip: Click <span className="font-medium">“Re-edit”</span> to make changes, or{" "}
                <span className="font-medium">“View”</span> to open in a new tab.
            </div>
        </div>
    );
}
