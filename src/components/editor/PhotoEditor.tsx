'use client'

import LeftSidebar from '@/components/editor/LeftSidebar';
import Crop from '@/components/editor/RightSidebar/Crop';
import Filter from '@/components/editor/RightSidebar/Filters';
import Text from '@/components/editor/RightSidebar/Text';
import Background from '@/components/editor/RightSidebar/Background';
import Canvas from '@/components/editor/Canvas';
import { useActiveTabStore, useRightPanelStore } from '@/store/store';
import Draw from '@/components/editor/RightSidebar/Draw';
import AddBlur from '@/components/editor/RightSidebar/AddBlur';

const PhotoEditor = () => {
    const { activeTab } = useActiveTabStore();
    const { isRightPanelOpen, setIsRightPanelOpen } = useRightPanelStore();

    const renderSidebarContent = () => {
        switch (activeTab) {
            case 'crop':
                return <Crop />

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
        <div className="h-full w-full bg-background text-neutral-800 flex">
            <LeftSidebar />

            <Canvas />

            <aside className="hidden lg:block h-screen lg:w-72 xl:w-80 bg-background p-6 overflow-y-auto border-l-2 border-neutral-800 z-10">
                <div className="transition-all duration-300">
                    {renderSidebarContent()}
                </div>
            </aside>

            {isRightPanelOpen && (
                <div className="lg:hidden fixed inset-0 bg-opacity-50 z-20" onClick={() => setIsRightPanelOpen(false)}>
                    <aside
                        className="absolute right-0 top-0 w-80 h-full bg-background p-6 overflow-y-auto border-l-2 border-neutral-800 shadow-lg z-30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="transition-all duration-300">
                            {renderSidebarContent()}
                        </div>
                    </aside>
                </div>
            )}

        </div>
    );
};

export default PhotoEditor;