'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconCrop, IconFilter, IconLayers, IconMagic, IconPalette, IconRedo, IconType, IconUndo } from '@/icons/icons'
import { IconDownload } from '@tabler/icons-react';
import { useImagePreviewStore } from '@/store/store';

const PhotoEditor = () => {
    const [activeTab, setActiveTab] = useState('crop');
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [rotation, setRotation] = useState(0);
    const { dataURL } = useImagePreviewStore();


    const toolbarItems = [
        { id: 'crop', icon: IconCrop, label: 'Crop', color: 'bg-blue-500' },
        { id: 'adjust', icon: IconPalette, label: 'Adjust', color: 'bg-green-500' },
        { id: 'filters', icon: IconFilter, label: 'Filters', color: 'bg-purple-500' },
        { id: 'effects', icon: IconMagic, label: 'Effects', color: 'bg-pink-500' },
        { id: 'text', icon: IconType, label: 'Text', color: 'bg-orange-500' },
        { id: 'background', icon: IconLayers, label: 'Background', color: 'bg-indigo-500' }
    ];

    const filters = [
        { name: 'None', class: '' },
        { name: 'Sepia', class: 'sepia(100%)' },
        { name: 'Grayscale', class: 'grayscale(100%)' },
        { name: 'Vintage', class: 'sepia(50%) contrast(120%) brightness(110%)' },
        { name: 'Cool', class: 'hue-rotate(180deg) saturate(120%)' },
        { name: 'Warm', class: 'sepia(30%) saturate(120%) brightness(110%)' }
    ];

    const renderSidebarContent = () => {

        switch (activeTab) {
            case 'crop':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Crop & Resize</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {['Square', '16:9', '4:3', '3:2', '9:16', 'Free'].map((ratio) => (
                                <button
                                    key={ratio}
                                    className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm text-gray-800 transition-colors"
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Rotation</label>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={rotation}
                                    onChange={(e) => setRotation(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{rotation}°</span>
                            </div>
                        </div>
                    </div>
                );

            case 'adjust':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Adjustments</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Brightness</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={brightness}
                                    onChange={(e) => setBrightness(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{brightness}%</span>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Contrast</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={contrast}
                                    onChange={(e) => setContrast(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{contrast}%</span>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Saturation</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={saturation}
                                    onChange={(e) => setSaturation(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{saturation}%</span>
                            </div>
                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Auto Enhance
                            </button>
                        </div>
                    </div>
                );

            case 'filters':
                 return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {filters.map((filter, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className="w-full aspect-square bg-gray-300 rounded-lg mb-2 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                                        style={{
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: filter.class
                                        }}
                                    />
                                    <span className="text-xs text-gray-600">{filter.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center text-gray-500">
                        <p>Select a tool to begin editing</p>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen bg-white text-neutral-800 flex">
            <main className="flex-1 flex flex-col">
                <header className="bg-white p-4 border-b border-neutral-200 shadow-sm z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-10">
                            <div className='flex items-center'>
                                <div className='font-extralight text-2xl text-white bg-accent-dark text-center p-1 rounded-l-lg'>A</div>
                                <div className='text-2xl text-white bg-accent-dark ml-0.5 p-1 rounded-r-lg'>pex</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {toolbarItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`p-3 rounded-lg transition-all ${activeTab === item.id
                                            ? `${item.color} text-white shadow-lg`
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                            }`}
                                        title={item.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors">
                                <IconUndo className="w-5 h-5" />
                            </button>
                            <button className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors">
                                <IconRedo className="w-5 h-5" />
                            </button>
                            <button className="px-4 py-2 bg-accent-dark hover:bg-sky-900 text-white font-semibold tracking-wider rounded-lg transition-colors flex items-center space-x-2">
                                <IconDownload className="w-5 h-5 font-semibold" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-auto">
                    <div className="max-w-full max-h-full flex items-center justify-center">
                        {dataURL && (
                            <Image
                                src={dataURL}
                                alt="Editing canvas"
                                width={1920} 
                                height={1080} 
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                style={{
                                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                                    transform: `rotate(${rotation}deg)`
                                }}
                            />
                        )}
                    </div>
                </div>
            </main>

            <aside className="w-80 bg-white p-6 overflow-y-auto border-l border-neutral-200">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderSidebarContent()}
                </motion.div>
            </aside>
        </div>
    );
};

export default PhotoEditor;
