export default function Effect() {
    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Effects</h3>
        <div className="grid grid-cols-2 gap-3">
            {['Blur', 'Sharpen', 'Vignette', 'Noise', 'Glow', 'Shadow'].map((effect) => (
                <button
                    key={effect}
                    className="p-3 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-sm text-neutral-800 transition-colors"
                >
                    {effect}
                </button>
            ))}
        </div>
    </div>
}