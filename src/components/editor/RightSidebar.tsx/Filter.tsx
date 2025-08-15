export default function Filter() {

    const filters = [
        { name: 'None', class: '' },
        { name: 'Sepia', class: 'sepia(100%)' },
        { name: 'Grayscale', class: 'grayscale(100%)' },
        { name: 'Vintage', class: 'sepia(50%) contrast(120%) brightness(110%)' },
        { name: 'Cool', class: 'hue-rotate(180deg) saturate(120%)' },
        { name: 'Warm', class: 'sepia(30%) saturate(120%) brightness(110%)' }
    ];

    const mockImageURL = "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop";

    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Filters</h3>
        <div className="grid grid-cols-2 gap-3">
            {filters.map((filter, index) => (
                <div key={index} className="text-center">
                    <div
                        className="w-full aspect-square bg-neutral-300 rounded-lg mb-2 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${mockImageURL})`,
                            filter: filter.class
                        }}
                    />
                    <span className="text-xs text-neutral-600">{filter.name}</span>
                </div>
            ))}
        </div>
    </div>
}