import { IconBlur, IconCrop, IconLayers, IconRotate, IconSparkles, IconType, IconWand } from '@/icons/icons'
import { useActiveTabStore } from '@/store/store';

export default function LeftSidebar() {
    const { activeTab, setActiveTab } = useActiveTabStore();
    const toolbarItems = [
        { id: 'background', icon: IconLayers, label: 'Background', color: 'bg-indigo-500' },
        { id: 'crop', icon: IconCrop, label: 'Crop', color: 'bg-blue-500' },
        { id: 'rotate', icon: IconRotate, label: 'Rotate', color: 'bg-rose-500' },
        { id: 'text', icon: IconType, label: 'Text', color: 'bg-orange-500' },
        { id: 'magicEraser', icon: IconWand, label: 'Magic Eraser', color: 'bg-fuchisia-500' },
        { id: 'blur', icon: IconBlur, label: 'Add Blur', color: 'bg-green-500' },
        { id: 'aiTools', icon: IconSparkles, label: 'AI Tools', color: 'bg-purple-500' },
    ];

    return <div>
        <aside className="w-28 h-full bg-neutral-50 border-r border-neutral-200 flex flex-col items-center p-10 space-y-2">
            {toolbarItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className='flex flex-col justify-center items-center mt-3'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`p-3 rounded-xl transition-all tooltip ${activeTab === item.id
                                    ? `${item.color} text-white shadow-lg transform scale-105`
                                    : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600 hover:shadow-md'
                                    }`}
                                title={item.label}
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                            <div className='text-center'>{item.label}</div>
                        </div>
                    </div>
                );
            })}
        </aside>
    </div>
}