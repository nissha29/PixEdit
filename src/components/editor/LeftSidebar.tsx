import { IconCrop, IconFilter, IconLayers, IconMagic, IconPalette, IconType } from '@/icons/icons'
import { Dispatch, SetStateAction } from 'react';

export default function LeftSidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: Dispatch<SetStateAction<string>>}) {
    const toolbarItems = [
        { id: 'crop', icon: IconCrop, label: 'Crop', color: 'bg-blue-500' },
        { id: 'adjust', icon: IconPalette, label: 'Adjust', color: 'bg-green-500' },
        { id: 'filters', icon: IconFilter, label: 'Filters', color: 'bg-purple-500' },
        { id: 'effects', icon: IconMagic, label: 'Effects', color: 'bg-pink-500' },
        { id: 'text', icon: IconType, label: 'Text', color: 'bg-orange-500' },
        { id: 'background', icon: IconLayers, label: 'Background', color: 'bg-indigo-500' }
    ];

    return <div>
        <aside className="w-16 bg-neutral-50 border-r border-neutral-200 flex flex-col items-center py-6 space-y-2">
            {toolbarItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`p-3 rounded-xl transition-all tooltip ${activeTab === item.id
                            ? `${item.color} text-white shadow-lg transform scale-105`
                            : 'bg-white hover:bg-neutral-100 text-neutral-600 hover:shadow-md'
                            }`}
                        title={item.label}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                );
            })}
        </aside>
    </div>
}