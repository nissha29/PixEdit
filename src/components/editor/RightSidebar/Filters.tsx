import { useFilterStore, useImagePreviewStore } from "@/store/store";
import { filters } from "@/lib/constants";

export default function Filters() {
    const { setFilter } = useFilterStore();
    const { dataURL } = useImagePreviewStore();

    return <div className="space-y-6" style={{ scrollbarWidth: 'none' }}>
        <h3 className="text-xl font-semibold text-neutral-200 mb-4">Filters</h3>
        <div className="grid grid-cols-2 gap-3">
            {filters.map((filter, index) => (
                <div key={index} className="text-center">
                    <div
                        className="w-full h-28 aspect-square bg-neutral-300 rounded-lg mb-1 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${dataURL})`,
                            filter: filter.class
                        }}
                        onClick={() => setFilter(filter)}
                    />
                    <span className="text-xs text-neutral-200">{filter.name}</span>
                </div>
            ))}
        </div>
    </div>
}