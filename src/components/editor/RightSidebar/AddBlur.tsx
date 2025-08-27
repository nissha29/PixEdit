import { useBlurStore } from '@/store/store';
import { BlurType } from '@/types/types';
import React, { useState } from 'react';

const blurTypes = [
    { id: BlurType.pixelate, label: BlurType.pixelate },
    { id: BlurType.smudge, label: BlurType.smudge },
    { id: BlurType.dots, label: BlurType.dots },
    { id: BlurType.blur, label: BlurType.blur },
];

export default function AddBlur() {
    const { selectedBlur, setSelectedBlur } = useBlurStore();
    const [blurRadius, setBlurRadius] = useState(10);
    const [brushSize, setBrushSize] = useState(25);
    const [isActive, setIsActive] = useState(false);

    const getRadiusLabel = () => {
        switch (selectedBlur) {
            case 'pixelate':
                return 'Pixel Size';
            case 'smudge':
                return 'Smudge Size';
            case 'dots':
                return 'Dot Size';
            default:
                return 'Blur Radius';
        }
    };

    const getRadiusRange = () => {
        switch (selectedBlur) {
            case 'pixelate':
                return { min: 2, max: 20, step: 1 };
            case 'smudge':
                return { min: 3, max: 30, step: 1 };
            case 'dots':
                return { min: 1, max: 15, step: 1 };
            default:
                return { min: 5, max: 40, step: 1 };
        }
    };

    const handleApply = () => {
        console.log(`Apply ${selectedBlur} blur with radius ${blurRadius} and brush size ${brushSize}`);
        setIsActive(true);
    };

    const handleClear = () => {
        console.log('Clear all blur effects');
        setIsActive(false);
    };

    const range = getRadiusRange();

    return (
        <div className="w-full bg-white px-6 py-2 space-y-8">
            <div className="">
                <h3 className="text-lg font-semibold text-neutral-800">Add Blur</h3>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    {blurTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedBlur(type.id)}
                            className={`p-3 rounded-lg border transition-all duration-200 ${selectedBlur === type.id
                                ? 'border-[#075985] bg-[#075985]/5 text-[#075985]'
                                : 'border-gray-200 bg-white text-neutral-700 hover:border-[#075985]/30 hover:bg-gray-50'
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
                <label className="block font-medium text-neutral-700">
                    {getRadiusLabel()}: <span className="font-normal text-neutral-600">{blurRadius}px</span>
                </label>
                <input
                    type="range"
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={blurRadius}
                    onChange={(e) => setBlurRadius(Number(e.target.value))}
                    className="w-full flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent-dark [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #075985 0%, #075985 ${((blurRadius - range.min) / (range.max - range.min)) * 100}%, #e5e7eb ${((blurRadius - range.min) / (range.max - range.min)) * 100}%, #e5e7eb 100%)`
                    }}
                />
                <div className="flex justify-between text-sm text-neutral-500">
                    <span>{range.min}px</span>
                    <span>{range.max}px</span>
                </div>
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-medium text-neutral-700">
                    Brush Size: <span className="font-normal text-neutral-600">{brushSize}px</span>
                </label>
                <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent-dark [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #075985 0%, #075985 ${((brushSize - 10) / (60 - 10)) * 100}%, #e5e7eb ${((brushSize - 10) / (60 - 10)) * 100}%, #e5e7eb 100%)`
                    }}
                />
                <div className="flex justify-between text-neutral-500">
                    <span>10px</span>
                    <span>60px</span>
                </div>
            </div>

            <div className="space-y-2 pt-2">
                <button
                    onClick={handleApply}
                    disabled={isActive}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:cursor-pointer  text-white ${isActive
                        ? 'bg-sky-900'
                        : 'bg-accent-dark hover:bg-sky-900'
                        }`}
                >
                    {isActive ? '✓ Blur Active' : `Apply ${blurTypes.find(t => t.id === selectedBlur)?.label}`}
                </button>

                <button
                    onClick={handleClear}
                    className="w-full py-2.5 bg-rose-400 hover:bg-rose-500 hover:cursor-pointer text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                >
                    Clear All Blur
                </button>

                {isActive && (
                    <button
                        onClick={() => setIsActive(false)}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200"
                    >
                        Stop Blur Tool
                    </button>
                )}
            </div>

            <div className="p-3 rounded-lg">
                <h4 className="font-semibold text-neutral-700 mb-4">Current Settings</h4>
                <div className="space-y-1 text-neutral-600">
                    <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{blurTypes.find(t => t.id === selectedBlur)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{getRadiusLabel()}:</span>
                        <span className="font-medium">{blurRadius}px</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Brush Size:</span>
                        <span className="font-medium">{brushSize}px</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}