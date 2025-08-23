import React, { useState } from 'react';
import { ChevronDown, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';
import { ColorResult, SketchPicker } from 'react-color';
import { baseColors } from '@/lib/constants';
import { useActiveTabStore, useImageDimensionStore, useTextStore } from '@/store/store';
import { AlignType, TextBox } from '@/types/types';

export default function TextEditorTool() {
  const [showPicker, setShowPicker] = useState(false);
  const { customColor, setCustomColor, selectedTextColor, setSelectedTextColor, selectedFont, setSelectedFont, fontSize, setFontSize, fontWeight, setFontWeight, isBold, setIsBold, isItalic, setIsItalic, isUnderlined, setIsUnderlined, textAlign, setTextAlign, textBoxes, setTextBoxes, setActiveTextBox } = useTextStore();
  const { activeTab } = useActiveTabStore();
  const { imageDimensions } = useImageDimensionStore();

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Playfair Display', 'Oswald'
  ];

  function handleColorChange(color: ColorResult) {
    setCustomColor(color.hex);
    setSelectedTextColor(color.hex);
  }

  const fontWeights = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' }
  ];

  const addNewText = () => {
    if (activeTab !== "text") return;
    if (!imageDimensions.width || !imageDimensions.height) {
      return;
    }

    const centerX = imageDimensions.width / 2;
    const centerY = imageDimensions.height / 2;

    const newBox: TextBox = {
      id: crypto.randomUUID(),
      text: "New Text",
      x: centerX,
      y: centerY,
      fontSize,
      fontFamily: selectedFont,
      fontWeight,
      isBold,
      isItalic,
      isUnderlined,
      textAlign,
      color: selectedTextColor,
    };
    setTextBoxes([...textBoxes, newBox]);
    setActiveTextBox(newBox);
  };

  return (
    <div className="w-full bg-white p-2 space-y-8">
      <h2 className="text-xl font-semibold text-neutral-800">Add Text</h2>

      <button onClick={addNewText} className="w-full py-3 bg-accent-dark hover:bg-sky-900 text-white rounded-lg transition-colors font-medium shadow-sm">
        Add Text to Canvas
      </button>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200">
        <label className="block text-sm font-medium text-neutral-800 mb-3">Font Family</label>
        <div className="relative">
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md appearance-none bg-white"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutal-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-2">Font Size</label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="12"
              max="120"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-1.5 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-accent-dark 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:w-5 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-accent-dark
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #075985 0%, #075985 ${((fontSize - 12) / (120 - 12)) * 100}%, #e5e7eb ${((fontSize - 12) / (120 - 12)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center bg-gray-50">
              {fontSize}px
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
          <div className="relative">
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>{weight.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200">
        <label className="block text-sm font-medium text-neutral-800 mb-3">Text Style</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isBold ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-300 hover:border-neutral-400'
              }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isItalic ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-300 hover:border-neutral-400'
              }`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsUnderlined(!isUnderlined)}
            className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isUnderlined ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-300 hover:border-neutral-400'
              }`}
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">Text Alignment</label>
        <div className="flex items-center space-x-2">
          {[
            { value: 'left', icon: AlignLeft },
            { value: 'center', icon: AlignCenter },
            { value: 'right', icon: AlignRight }
          ].map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTextAlign(AlignType[value as keyof typeof AlignType])}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${textAlign === value ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-300 hover:border-neutral-400'
                }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">Text Color</label>
        <div className="grid grid-cols-6 gap-2">
          {baseColors.map((color, index) => {
            if (index === baseColors.length - 1) {

              return (
                <button
                  key="custom-color-picker"
                  onClick={() => {
                    setShowPicker(!showPicker)
                  }}
                  className={`w-8 h-8 rounded-lg border transition-colors ${selectedTextColor === customColor ? 'border-0' : 'border-neutral-300 hover:border-neutral-400'
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
                  setSelectedTextColor(color)
                }}
                className={`w-8 h-8 rounded-lg border transition-colors ${selectedTextColor === color ? 'border-0 ring-1 ring-black' : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            );
          })}
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
      </div>
    </div>
  );
}