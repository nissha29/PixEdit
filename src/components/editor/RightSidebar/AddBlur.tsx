import { useBlurStore } from '@/store/store';
import { BlurType } from '@/types/types';

const blurTypes = [
    { id: BlurType.pixelate, label: BlurType.pixelate },
    { id: BlurType.smudge, label: BlurType.smudge },
];

export default function AddBlur() {
    const { selectedBlur, setSelectedBlur, blurRadius, setBlurRadius, blurStrength, setBlurStrength } = useBlurStore();

    const getRadiusLabel = () => {
        switch (selectedBlur) {
            case 'pixelate':
                return 'Pixel Size';
            case 'smudge':
                return 'Smudge Size';
            default:
                return 'Pixel Size';
        }
    };

    const getRadiusRange = () => {
        switch (selectedBlur) {
            case 'pixelate':
                return { min: 2, max: 20, step: 1 };
            case 'smudge':
                return { min: 3, max: 30, step: 1 };
            default:
                return { min: 2, max: 20, step: 1 };
        }
    };

    const range = getRadiusRange();

    return (
        <div className="w-full px-6 py-2 space-y-8"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            <div className="">
                <h3 className="text-lg font-semibold text-neutral-200">Add Blur</h3>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    {blurTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedBlur(type.id)}
                            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer ${selectedBlur === type.id
                                ? 'bg-green-500 text-neutral-200'
                                : 'bg-white text-neutral-700'
                                }`}
                        >
                            <div className="text-center">
                                <div className="font-semibold">{type.label}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="block font-medium text-neutral-200">
                    {getRadiusLabel()}: <span className="font-normal text-neutral-300">{blurRadius}px</span>
                </label>
                <input
                    type="range"
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={blurRadius}
                    onChange={(e) => setBlurRadius(Number(e.target.value))}
                    className="w-full flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((blurRadius - range.min) / (range.max - range.min)) * 100}%, #e5e7eb ${((blurRadius - range.min) / (range.max - range.min)) * 100}%, #e5e7eb 100%)`
                    }}
                />
                <div className="flex justify-between text-sm text-neutral-300">
                    <span>{range.min}px</span>
                    <span>{range.max}px</span>
                </div>
            </div>

            <div className="space-y-3">
                <label className="block font-medium text-neutral-200">
                    Blur Strength: <span className="font-normal text-neutral-300">{blurStrength}px</span>
                </label>
                <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={blurStrength}
                    onChange={(e) => setBlurStrength(Number(e.target.value))}
                    className="w-full flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((blurStrength - 10) / (60 - 10)) * 100}%, #e5e7eb ${((blurStrength - 10) / (60 - 10)) * 100}%, #e5e7eb 100%)`
                    }}
                />
                <div className="flex justify-between text-sm text-neutral-300">
                    <span>10px</span>
                    <span>60px</span>
                </div>
            </div>

            <div className="py-3 rounded-lg">
                <h4 className="font-semibold text-neutral-200 mb-4">Current Settings</h4>
                <div className="space-y-1 text-neutral-300">
                    <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium text-neutral-400">{blurTypes.find(t => t.id === selectedBlur)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{getRadiusLabel()}:</span>
                        <span className="font-medium text-neutral-400">{blurRadius}px</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Blur Strength:</span>
                        <span className="font-medium text-neutral-400">{blurStrength}px</span>
                    </div>
                </div>
            </div>
        </div >
    );
}