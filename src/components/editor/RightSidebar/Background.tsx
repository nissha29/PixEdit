import React, { useState } from 'react';
import { removeBackground } from "@imgly/background-removal";
import { useBackgroundStore, useImagePreviewStore } from '@/store/store';
import { SketchPicker, ColorResult } from 'react-color';
import { BackgroundType } from '@/types/types';
import { baseColors, gradients } from '@/lib/constants'

export default function Background() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const { dataURL, setDataURL } = useImagePreviewStore();
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#ffffff');
  const { setBackground } = useBackgroundStore();


  const colors = [...baseColors, customColor];


  function setBackgroundChoice(type: BackgroundType, value: string) {
    setBackground({ type, value });
  }

  function handleColorChange(color: ColorResult) {
    setCustomColor(color.hex);
    setSelectedColor(color.hex);
    setBackgroundChoice('color', color.hex);
  }

  async function handleBackgroundRemoval(imageSrc: string | null) {
    setLoading(true);
    const outputBlob = await removeBackground(imageSrc);
    const resultUrl = URL.createObjectURL(outputBlob);
    setDataURL(resultUrl);
    setLoading(false);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBackgroundChoice('image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }


  return (
    <div className="w-full bg-white px-6 py-2 space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">Background</h3>
        <div className="flex flex-col gap-3 space-y-4">
          <button onClick={() => { handleBackgroundRemoval(dataURL) }} className="w-full py-3 bg-rose-500 hover:bg-rose-500 hover:cursor-pointer text-white rounded-lg transition-colors font-medium">
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : 'Remove Background'}
          </button>

          <div>
            <h4 className="font-semibold text-neutral-800 mb-4">Solid Colors</h4>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, index) => {
                if (index === colors.length - 1) {

                  return (
                    <button
                      key="custom-color-picker"
                      onClick={() => setShowPicker(!showPicker)}
                      className={`w-8 h-8 rounded-lg border transition-colors ${selectedColor === customColor ? 'border-0' : 'border-neutral-300 hover:border-neutral-400'
                        }`}
                      style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
                      title="Pick custom color"
                    />
                  );
                }

                return (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color)
                      setBackgroundChoice('color', color);
                    }}
                    className={`w-8 h-8 rounded-lg border transition-colors ${selectedColor === color ? 'border-0 ring-1 ring-black' : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                );
              })}
            </div>

            {showPicker && (
              <div className="absolute z-10 mt-2">
                <SketchPicker color={customColor} onChange={handleColorChange} />
                <button
                  onClick={() => setShowPicker(false)}
                  className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800 mb-3">Gradients</h4>
            <div className="grid grid-cols-4 gap-2">
              {gradients.map((gradient, index) => {
                const gradientStr = JSON.stringify(gradient);
                const gradientCss = `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`; // For CSS

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedGradient(gradientStr);
                      setBackgroundChoice('gradient', gradientStr);
                    }}
                    className={`w-full h-12 rounded-lg transition-colors ${selectedGradient === gradientStr ? 'ring-1 ring-black' : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    style={{ background: gradientCss }}
                    title={gradientCss}
                  />
                );
              })}
            </div>
          </div>


          <div>
            <h4 className="font-semibold text-neutral-800 mb-3">Custom</h4>
            <div className="relative inline-block w-full">
              <button className="w-full py-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg text-neutral-600 hover:text-neutral-700 transition-colors text-sm">
                Upload Background Image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}