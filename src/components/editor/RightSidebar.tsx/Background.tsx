export default function Background() {
    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Background</h3>
        <div className="space-y-4">
            <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Remove Background
            </button>
            <div className="grid grid-cols-4 gap-2">
                {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((color) => (
                    <button
                        key={color}
                        className="w-12 h-12 rounded-lg border-2 border-neutral-300 hover:border-neutral-400 transition-colors"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    </div>
}