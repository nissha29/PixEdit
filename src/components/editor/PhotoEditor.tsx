'use client'

import React, { useState } from 'react';
import LeftSidebar from '@/components/editor/LeftSidebar';
import Crop from '@/components/editor/RightSidebar/Crop';
import Filter from '@/components/editor/RightSidebar/Filters';
import Text from '@/components/editor/RightSidebar/Text';
import Background from '@/components/editor/RightSidebar/Background';
import Canvas from '@/components/editor/Canvas';
import { useActiveTabStore } from '@/store/store';
import Draw from '@/components/editor/RightSidebar/Draw';
import AddBlur from '@/components/editor/RightSidebar/AddBlur';

const PhotoEditor = () => {
    const { activeTab } = useActiveTabStore();
    const [rotation, setRotation] = useState(0);

    console.log('Current activeTab:', activeTab);

    const renderSidebarContent = () => {
        switch (activeTab) {
            case 'crop':
                return <Crop rotation={rotation} setRotation={setRotation}/>

            case 'addBlur':
                return <AddBlur />

            case 'filters':
                return <Filter />

            case 'draw':
                return <Draw />

            case 'text':
                return <Text />

            case 'background':
                return <Background />

            case 'aiTools':
                return (
                    <div className="text-center text-neutral-500 py-8">
                        <p>AI Tools coming soon...</p>
                    </div>
                );

            default:
                return (
                    <div className="text-center text-neutral-500 py-8">
                        <p>Select a tool to begin editing</p>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen bg-background text-neutral-800 flex">
            <LeftSidebar />

            <Canvas />

            <aside className="w-80 bg-background p-6 overflow-y-auto border-l border-neutral-800 z-10">
                <div className="transition-all duration-300">
                    {renderSidebarContent()}
                </div>
            </aside>
        </div>
    );
};

export default PhotoEditor;