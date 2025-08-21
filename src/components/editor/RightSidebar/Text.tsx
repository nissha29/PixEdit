import React, { useState } from 'react';
import { ChevronDown, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';

export default function TextEditorTool() {
  const [textInput, setTextInput] = useState('Sample Text');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState('400');
  const [textColor, setTextColor] = useState('#000000');
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textAlign, setTextAlign] = useState('left');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [outlineWidth, setOutlineWidth] = useState(0);
  const [outlineColor, setOutlineColor] = useState('#ffffff');

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Playfair Display', 'Oswald'
  ];

  const fontWeights = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' }
  ];

  const presetColors = [
    '#000000', '#ffffff', '#ff4444', '#44ff44', '#4444ff',
    '#ffff44', '#ff44ff', '#44ffff', '#ff8844', '#8844ff'
  ];

  return (
    <div className="w-full bg-white p-2 space-y-8">
      <h2 className="text-lg font-semibold text-gray-900">Add Text</h2>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-200">
          <label className="block text-sm font-medium text-neutral-800 mb-2">Text Content</label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter your text..."
            className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-2 focus:border-neutral-500  resize-none h-20"
          />
        </div>

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
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
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

        {/* Text Style */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">Text Style</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isBold ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isItalic ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsUnderlined(!isUnderlined)}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${isUnderlined ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Alignment */}
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
                onClick={() => setTextAlign(value)}
                className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all ${textAlign === value ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">Text Color</label>
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${textColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'
                    } ${color === '#ffffff' ? 'shadow-inner' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Advanced Settings</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Letter Spacing: {letterSpacing}px</label>
            <input
              type="range"
              min="-3"
              max="10"
              step="0.5"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
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
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Line Height: {lineHeight}</label>
            <input
              type="range"
              min="0.8"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
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
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Text Outline: {outlineWidth}px</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={outlineWidth}
              onChange={(e) => setOutlineWidth(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
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
            {outlineWidth > 0 && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500">Outline Color:</span>
                <input
                  type="color"
                  value={outlineColor}
                  onChange={(e) => setOutlineColor(e.target.value)}
                  className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Add Button */}
        <button className="w-full py-3 bg-accent-dark hover:bg-sky-900 text-white rounded-lg transition-colors font-medium shadow-sm">
          Add Text to Canvas
        </button>
      </div>
    </div>
  );
}