import React, { useState } from 'react';
import { removeBackground } from "@imgly/background-removal";
import { useBackgroundStore, useImagePreviewStore, useLoadingStore } from '@/store/store';
import { SketchPicker, ColorResult } from 'react-color';
import { BackgroundType } from '@/types/types';
import { baseColors, gradients, customImages } from '@/lib/constants'
import { IconBan } from '@/icons/icons';
import Image from 'next/image';

export default function Background() {
  const nullColor = '';
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const { dataURL, setDataURL } = useImagePreviewStore();
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#ffffff');
  const { setBackground } = useBackgroundStore();
  const { loading, setLoading } = useLoadingStore();
  const [hasRemovedBackground, setHasRemovedBackground] = useState(false);

  const blurRestClass = !hasRemovedBackground
    ? 'pointer-events-none select-none blur opacity-100'
    : '';

  const blurRemoveBgClass = hasRemovedBackground
    ? 'pointer-events-none select-none hidden'
    : '';
  const colors = [nullColor, ...baseColors, customColor];


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
    setHasRemovedBackground(true);
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
    <div className="w-full bg-background px-6 py-2 space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-neutral-200 mb-8">Background</h3>
        <div className="flex flex-col gap-3 space-y-4">
          <button
            onClick={() => {
              if (!hasRemovedBackground) handleBackgroundRemoval(dataURL);
            }}
            disabled={loading || hasRemovedBackground}
            className={`w-full py-3 bg-rose-500 hover:bg-rose-500 hover:cursor-pointer text-white rounded-lg transition-colors font-medium ${blurRemoveBgClass}`}>
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : 'Remove Background'}
          </button>

          <div className={`${blurRestClass} flex flex-col gap-6`}>
            <div>
              <h4 className="font-semibold text-neutral-200 mb-4">Solid Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color, index) => {
                  if (index === colors.length - 1) {

                    return (
                      <button
                        key="custom-color-picker"
                        onClick={() => {
                          if (!hasRemovedBackground) return;
                          setShowPicker(!showPicker)
                        }}
                        disabled={!hasRemovedBackground}
                        className={`w-8 h-8 rounded-lg border transition-colors ${selectedColor === customColor ? 'border-0' : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                        style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
                        title="Pick custom color"
                      />
                    );
                  } else if (index === 0) {
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          if (!hasRemovedBackground) return;
                          setSelectedColor(color)
                          setBackgroundChoice('color', color);
                        }}
                        disabled={!hasRemovedBackground}
                        className={`flex justify-center items-center w-8 h-8 rounded-lg border transition-colors ${selectedColor === color ? 'border-0 ring-1 ring-black' : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        <IconBan className='w-4 h-4 text-center text-white' />
                      </button>
                    );
                  }

                  return (
                    <button
                      key={color}
                      onClick={() => {
                        if (!hasRemovedBackground) return;
                        setSelectedColor(color)
                        setBackgroundChoice('color', color);
                      }}
                      disabled={!hasRemovedBackground}
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
              <h4 className="font-semibold text-neutral-200 mb-3">Gradients</h4>
              <div className="grid grid-cols-4 gap-2">
                {gradients.map((gradient, index) => {
                  const gradientStr = JSON.stringify(gradient);
                  const gradientCss = `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`; // For CSS

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!hasRemovedBackground) return;
                        setSelectedGradient(gradientStr);
                        setBackgroundChoice('gradient', gradientStr);
                      }}
                      disabled={!hasRemovedBackground}
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
              <h4 className="font-semibold text-neutral-200 mb-3">Custom</h4>

              <div className="flex space-x-4 overflow-x-auto py-2 px-1 mb-4 custom-scrollbar" style={{ scrollbarWidth: 'none'}}>
                {customImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[150px] h-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-accent-dark transition overflow-hidden"
                    onClick={() => setBackgroundChoice('image', src)}
                  >
                    <Image
                      src={src}
                      alt={`Custom background ${idx + 1}`}
                      width={150}
                      height={80} 
                      className="object-fill rounded-lg"
                      unoptimized={true} 
                    />
                  </div>
                ))}
              </div>


              <div className="relative inline-block w-full">
                <button className="w-full py-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg text-neutral-200 hover:text-neutral-300 transition-colors text-sm">
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
    </div>
  );
}