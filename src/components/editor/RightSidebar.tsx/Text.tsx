export default function Text() {
    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Add Text</h3>
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Enter text..."
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-3">
                {['Arial', 'Times', 'Helvetica', 'Georgia', 'Impact', 'Comic Sans'].map((font) => (
                    <button
                        key={font}
                        className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-sm text-neutral-800 transition-colors"
                        style={{ fontFamily: font }}
                    >
                        {font}
                    </button>
                ))}
            </div>
        </div>
    </div>
}