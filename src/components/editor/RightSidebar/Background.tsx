import React, { useState } from 'react';
import { removeBackground } from "@imgly/background-removal";
import { useImagePreviewStore } from '@/store/store';
import { SketchPicker, ColorResult } from 'react-color';

export default function Background() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const { dataURL, setDataURL } = useImagePreviewStore();
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#ffffff');


  const baseColors = [
    '#ffffff', '#000000', '#ff6b6b', '#4ecdc4', '#556270', '#c7f464', '#ffcc5c', '#96ceb4',
    '#ff6f91', '#845ec2', '#d65db1', '#00c2cb', '#c34a36', '#ef798a', '#a29bfe', '#81ecec',
    '#fab1a0', '#55efc4', '#2d3436', '#00b894', '#fd79a8', '#0984e3', '#6c5ce7'
  ];

  const colors = [...baseColors, customColor];

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
    'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(45deg, #fbc7aa 0%, #9876aa 100%)',
    'linear-gradient(240deg, #319197 0%, #a7ede0 100%)',
    'linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(60deg, #ff5858 0%, #f09819 100%)',
    'linear-gradient(45deg, #43cea2 0%, #185a9d 100%)',
    'linear-gradient(135deg, #ee9ca7 0%, #ffe4e1 100%)',
    'linear-gradient(60deg, #3a6186 0%, #89253e 100%)'
  ];



  function handleColorChange(color: ColorResult) {
    setCustomColor(color.hex);
    setSelectedColor(color.hex);
  }

  async function handleBackgroundRemoval(imageSrc: string | null) {
    setLoading(true);
    const outputBlob = await removeBackground(imageSrc);
    const resultUrl = URL.createObjectURL(outputBlob);
    setDataURL(resultUrl);
    setLoading(false);
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
                    onClick={() => setSelectedColor(color)}
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
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGradient(gradient)}
                  className={`w-full h-12 rounded-lg transition-colors ${selectedGradient === gradient ? 'ring-2 ring-accent-light' : 'border-neutral-300 hover:border-neutral-400'}`}
                  style={{ background: gradient }}
                />
              ))}
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
                // onChange={handleFileSelect}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}