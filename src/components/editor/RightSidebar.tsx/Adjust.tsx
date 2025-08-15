import { Dispatch, SetStateAction } from "react";

export default function Adjust({ brightness, setBrightness, contrast, setContrast, saturation, setSaturation }: { brightness: number, setBrightness: Dispatch<SetStateAction<number>>, contrast: number, setContrast: Dispatch<SetStateAction<number>>, saturation: number, setSaturation: Dispatch<SetStateAction<number>> }) {
    
    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Adjustments</h3>
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-neutral-600 mb-2">Brightness</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full"
                />
                <span className="text-sm text-neutral-500">{brightness}%</span>
            </div>
            <div>
                <label className="block text-sm text-neutral-600 mb-2">Contrast</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full"
                />
                <span className="text-sm text-neutral-500">{contrast}%</span>
            </div>
            <div>
                <label className="block text-sm text-neutral-600 mb-2">Saturation</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full"
                />
                <span className="text-sm text-neutral-500">{saturation}%</span>
            </div>
            <button className="w-full py-2 bg-accent-dark/80 hover:bg-accent-dark text-white rounded-lg transition-colors">
                Auto Enhance
            </button>
        </div>
    </div>


}