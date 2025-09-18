"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconCheck, IconArrowRight, IconImage, IconTrash, IconUpload } from '@/icons/icons'
import { useSession } from "next-auth/react";
import { useFileStore, useImagePreviewStore } from "@/store/store";
import { FileData } from "@/types/types";

const SingleFileUpload = ({ onChange }: { onChange: (newFile: FileData | null) => void }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            onChange({ file: imageFile, name: imageFile.name, size: imageFile.size, type: imageFile.type });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onChange({ file, name: file.name, size: file.size, type: file.type });
        }
    };

    return (
        <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragOver
                ? 'border-blue-400 bg-neutral-900'
                : 'border-neutral-500 hover:border-neutral-600 hover:bg-neutral-900'
                }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-neutral-400">
                    <IconUpload className="w-full h-full" />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-neutral-400 mb-2">
                        Drop your photo here, or <span className="text-blue-600">browse</span>
                    </h3>
                    <p className="text-sm text-neutral-400">
                        Supports JPG, PNG, WEBP, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>
    );
};

export function Upload() {
    const { file, setFile, clearFile } = useFileStore();
    const { setDataURL, originalDataURL, setOriginalDataURL } = useImagePreviewStore();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleFileUpload = (newFile: FileData | null) => {
        if (!newFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setOriginalDataURL(e.target?.result as string);
            setDataURL(e.target?.result as string);
        };
        reader.readAsDataURL(newFile.file);
        setFile({ file: newFile.file, name: newFile.name, size: newFile.size, type: newFile.type });
    };

    const removeFile = () => {
        clearFile();
        setOriginalDataURL(null);
        setDataURL(null);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };


    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-4xl space-y-6 animate-pulse">
                    <div className="flex justify-between items-center">
                        <div className="h-8 w-32 bg-neutral-700 rounded"></div>
                        <div className="h-10 w-28 bg-neutral-700 rounded"></div>
                    </div>

                    <div className="h-10 w-1/2 bg-neutral-700 rounded mx-auto"></div>

                    <div className="h-64 w-full bg-neutral-800 rounded-xl border border-neutral-700"></div>
                </div>
            </div>
        );
    }


    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className='flex items-center'>
                                <div className="text-accent-dark text-3xl font-bold">pix</div>
                                <div className="text-2xl font-bold text-neutral-100">EDiT</div>
                            </div>
                        </div>


                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={() => { router.push('/manage') }}
                            className="bg-neutral-700 hover:bg-neutral-700/80 hover:cursor-pointer text-neutral-200 px-2 sm:px-3 py-3 rounded font-semibold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                            <IconImage className="w-5 h-5" />
                            <span>Manage Photos</span>
                        </motion.button>
                    </div>
                </div>
            </header>

            <div className="flex justify-center items-center text-3xl font-semibold text-neutral-200 mt-5 mb-2 lg:mb-12">{`Hi ${session?.user.name}, let's get started!`}</div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-bold text-neutral-200 mb-2">
                                Upload your photo
                            </h2>
                            <p className="text-neutral-400">
                                Start editing in seconds with pixEdiT. Upload one photo at a time for the best experience.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-neutral-900 rounded-xl shadow-lg border border-neutral-600 overflow-hidden"
                        >
                            {!file ? (
                                <SingleFileUpload onChange={handleFileUpload} />
                            ) : (
                                <div className="p-6">
                                    <div className="text-center">
                                        <div className="inline-flex items-center space-x-2 text-accent-dark mb-4">
                                            <IconCheck className="w-5 h-5" />
                                            <span className="font-medium">Photo uploaded successfully!</span>
                                        </div>

                                        {originalDataURL && (
                                            <div className="mb-4">
                                                <Image src={originalDataURL}
                                                    width={250}
                                                    height={400}
                                                    alt="Preview"
                                                    className="max-h-64 mx-auto rounded-lg shadow-md">
                                                </Image>
                                            </div>
                                        )}

                                        <div className="text-sm text-neutral-400 space-y-1">
                                            <p><strong>File:</strong> {file.name}</p>
                                            <p><strong>Size:</strong> {formatFileSize(file.size || 0)}</p>
                                            <p><strong>Type:</strong> {file.type}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        {file && (
                            <button
                                onClick={removeFile}
                                className="mt-8 flex items-center space-x-2 px-4 py-2 text-white bg-rose-400 hover:bg-rose-500 rounded-lg transition-colors hover:cursor-pointer"
                            >
                                <IconTrash className="w-4 h-4" />
                                <span>Remove Photo</span>
                            </button>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-neutral-900 rounded-xl shadow-lg border border-neutral-500 hover:border-neutral-600 p-6 sticky top-24"
                        >
                            <h3 className="text-lg font-semibold text-neutral-200 mb-4">
                                Upload Summary
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-200">File size:</span>
                                    <span className="font-medium text-neutral-200">
                                        {file ? formatFileSize(file.size || 0) : '0 Bytes'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-200">Status:</span>
                                    <span className={`font-medium ${file ? 'text-green-600' : 'text-neutral-200'}`}>
                                        {file ? 'Ready' : 'Not Uploaded'}
                                    </span>
                                </div>
                            </div>

                            {file && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-neutral-200 mb-3">Current Photo</h4>
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                                            <IconImage className="w-5 h-5 text-accent-dark flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium truncate text-neutral-200">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {formatFileSize(file.size || 0)}
                                                </p>
                                            </div>
                                        </div>
                                        <IconCheck className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                                    </motion.div>
                                </div>
                            )}

                            <AnimatePresence>
                                {file && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        onClick={() => { router.push('/editor') }}
                                        className="w-full bg-accent-dark hover:bg-accent-light text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 hover:cursor-pointer"
                                    >
                                        <span>Continue to Editor</span>
                                        <IconArrowRight className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            <div className="mt-8 pt-6 border-t-2 border-neutral-600">
                                <h4 className="text-lg font-semibold text-neutral-200 mb-3">{`What's Next?`}</h4>
                                <div className="space-y-2 text-sm text-neutral-400">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span>Remove or change background instantly</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>Smart crop and resize</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                                        <span>Rotate and Flip</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span>Text and typography</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                                        <span>Add Blur</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                        <span>AI Image Editing</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                                        <span>Export in various formats</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}