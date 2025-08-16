'use client'

import React, { useState } from 'react';
import LeftSidebar from '@/components/editor/LeftSidebar';
import Crop from '@/components/editor/RightSidebar.tsx/Crop';
import Adjust from '@/components/editor/RightSidebar.tsx/AddBlur';
import Filter from '@/components/editor/RightSidebar.tsx/Rotate';
import Effect from '@/components/editor/RightSidebar.tsx/MagicEraser';
import Text from '@/components/editor/RightSidebar.tsx/Text';
import Background from '@/components/editor/RightSidebar.tsx/Background';
import Canvas from '@/components/editor/Canvas';
import { useActiveTabStore } from '@/store/store';

const PhotoEditor = () => {
    const { activeTab } = useActiveTabStore();
    const [rotation, setRotation] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);

    const renderSidebarContent = () => {
        switch (activeTab) {
            case 'crop':
                return <Crop rotation={rotation} setRotation={setRotation}/>

            case 'adjust':
                return <Adjust brightness={brightness} setBrightness={setBrightness} contrast={contrast} setContrast={setContrast} saturation={saturation} setSaturation={setSaturation}/>

            case 'filters':
                return <Filter />

            case 'effects':
                return <Effect />

            case 'text':
                return <Text />

            case 'background':
                return <Background />

            default:
                return (
                    <div className="text-center text-neutral-500 py-8">
                        <p>Select a tool to begin editing</p>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen bg-white text-neutral-800 flex">
            <LeftSidebar />

            <Canvas brightness={brightness} contrast={contrast} saturation={saturation} rotation={rotation}/>

            <aside className="w-80 bg-white p-6 overflow-y-auto border-l border-neutral-200">
                <div className="transition-all duration-300">
                    {renderSidebarContent()}
                </div>
            </aside>
        </div>
    );
};

export default PhotoEditor;