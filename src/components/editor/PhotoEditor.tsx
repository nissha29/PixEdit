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
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AIEditor from './RightSidebar/AIEditor';

const PhotoEditor = () => {
    const { activeTab } = useActiveTabStore();
    const { isRightPanelOpen, setIsRightPanelOpen } = useRightPanelStore();
    const { status } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

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

            case 'aiEditor':
                return <AIEditor />

            default:
                return (
                    <div className="text-center text-neutral-500 py-8">
                        <p>Select a tool to begin editing</p>
                    </div>
                );
        }
    };

    if (status === "loading") {
        return (
            <div className="h-screen w-screen bg-background flex animate-pulse">
                <aside className="hidden lg:flex flex-col w-20 bg-neutral-900 p-4 space-y-6 border-r border-neutral-800">
                    <div className="h-10 w-10 bg-neutral-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-neutral-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-neutral-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-neutral-700 rounded-lg"></div>
                </aside>

                <main className="flex-1 flex items-center justify-center bg-neutral-950">
                    <div className="h-[500px] w-[700px] bg-neutral-800 rounded-xl border border-neutral-700"></div>
                </main>

                <aside className="hidden lg:block w-72 xl:w-80 bg-neutral-900 p-6 border-l border-neutral-800 space-y-4">
                    <div className="h-6 w-32 bg-neutral-700 rounded"></div>
                    <div className="h-10 w-full bg-neutral-800 rounded"></div>
                    <div className="h-10 w-3/4 bg-neutral-800 rounded"></div>
                    <div className="h-10 w-1/2 bg-neutral-800 rounded"></div>
                    <div className="h-32 w-full bg-neutral-800 rounded"></div>
                </aside>
            </div>
        );
    }



    if (status === "unauthenticated") {
        return null;
    }


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