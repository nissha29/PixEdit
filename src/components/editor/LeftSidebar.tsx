import { IconBlur, IconCrop, IconLayers, IconFilter, IconSparkles, IconType, IconWand } from '@/icons/icons'
import { useActiveTabStore } from '@/store/store';

export default function LeftSidebar() {
    const { activeTab, setActiveTab } = useActiveTabStore();
    const toolbarItems = [
        { id: 'background', icon: IconLayers, label: 'Background', color: 'bg-yellow-500' },
        { id: 'crop', icon: IconCrop, label: 'Crop', color: 'bg-blue-500' },
        { id: 'filters', icon: IconFilter, label: 'Filters', color: 'bg-rose-500' },
        { id: 'text', icon: IconType, label: 'Text', color: 'bg-orange-500' },
        { id: 'draw', icon: IconWand, label: 'Draw', color: 'bg-fuchsia-500' },
        { id: 'addBlur', icon: IconBlur, label: 'Add Blur', color: 'bg-green-500' },
        { id: 'aiTools', icon: IconSparkles, label: 'AI Tools', color: 'bg-purple-500' },
    ];

    return (
        <aside className="w-28 h-full bg-background border-r border-neutral-800 flex flex-col items-center p-10 space-y-2 z-20">
            {toolbarItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className='flex flex-col justify-center items-center mt-5'>
                        <div className='flex flex-col justify-center items-center gap-1.5'>
                            <button
                                onClick={() => {
                                    console.log('Button clicked:', item.id);
                                    setActiveTab(item.id);
                                }}
                                className={`p-3 rounded-xl transition-all duration-200 ease-in-out cursor-pointer ${activeTab === item.id
                                    ? `${item.color} text-white shadow-lg transform scale-105`
                                    : 'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-400 text-neutral-100 hover:shadow-md active:shadow-lg'
                                    }`}
                                title={item.label}
                            >
                                <Icon className="w-5 h-5 text-white" />
                            </button>
                            <div className='text-center text-neutral-200'>{item.label}</div>
                        </div>
                    </div>
                );
            })}
        </aside>
    );
}