import React, { useState } from 'react';
import { ChevronDown, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';
import { ColorResult, SketchPicker } from 'react-color';
import { baseColors } from '@/lib/constants';
import { useActiveTabStore, useImageDimensionStore, useTextStore } from '@/store/store';
import { AlignType, TextBox } from '@/types/types';
import { fonts, fontWeights } from '@/lib/constants';

export default function TextEditorTool() {
  const [showPicker, setShowPicker] = useState(false);
  const { customColor, setCustomColor, selectedTextColor, setSelectedTextColor, selectedFont, setSelectedFont, fontSize, setFontSize, fontWeight, setFontWeight, isBold, setIsBold, isItalic, setIsItalic, isUnderlined, setIsUnderlined, textAlign, setTextAlign, textBoxes, setTextBoxes, textInput, setTextInput, activeTextBox, setActiveTextBox } = useTextStore();
  const { activeTab } = useActiveTabStore();
  const { imageDimensions } = useImageDimensionStore();

  function handleColorChange(color: ColorResult) {
    setCustomColor(color.hex);
    setSelectedTextColor(color.hex);
    updateActiveTextBox({ color: color.hex });
  }

  const addNewText = () => {
    if (activeTab !== "text" || (!imageDimensions.width || !imageDimensions.height)) return;
    if (textInput.trim() === '') return;

    const centerX = imageDimensions.width / 2;
    const centerY = imageDimensions.height / 2;

    const newBox: TextBox = {
      id: crypto.randomUUID(),
      text: textInput,
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
    setTextInput('');
  };

  function updateActiveTextBox(updatedProps: Partial<TextBox>) {
    if (!textBoxes.length) return;

    const activeBox = textBoxes.find((box) => box.id === activeTextBox?.id);
    if (!activeBox) return;

    const updatedBox = { ...activeBox, ...updatedProps };
    setTextBoxes(textBoxes.map((box) => (box.id === updatedBox.id ? updatedBox : box)));
    setActiveTextBox(updatedBox);
  }

  return (
    <div className="w-full bg-background p-2 space-y-8"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <h2 className="text-xl font-semibold text-neutral-200">Add Text</h2>

      <textarea
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
        placeholder="Enter text here"
        className="w-full p-2 border border-neutral-600 rounded mb-2 resize-none text-neutral-200"
        rows={2}
      />

      <div className='flex gap-3 flex-col'>
        <button onClick={addNewText} className="w-full py-3 bg-accent-dark hover:cursor-pointer hover:bg-accent-light text-white rounded-lg transition-colors font-medium shadow-sm px-2">
          Add New Text
        </button>

        <button
          onClick={() => {
            if (!activeTextBox) return;
            setTextBoxes(textBoxes.filter(box => box.id !== activeTextBox.id));
            setActiveTextBox(null);
          }}
          className={`py-3 cursor-pointer text-white rounded-lg transition-colors font-medium shadow-sm px-2 w-full ${!activeTextBox ? 'hidden' : 'bg-neutral-700 hover:bg-rose-600'}`}>
          Delete Active Text
        </button>
      </div>

      {activeTextBox && <div className='flex flex-col gap-7'>
        <div className="p-1">
          <label className="block font-medium text-neutral-200 mb-3">Font Family</label>
          <div className="relative">
            <select
              value={selectedFont}
              onChange={(e) => {
                const fontFamily = e.target.value;
                setSelectedFont(fontFamily);
                updateActiveTextBox({ fontFamily });
              }}
              className="w-full px-3 py-2 border border-neutral-600 rounded-md appearance-none text-white pr-8"
            >
              {fonts.map((font) => (
                <option className="bg-background text-white" key={font} value={font}>{font}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <div className="p-1 space-y-4">
          <div>
            <label className="block font-medium text-neutral-200 mb-2">Font Size</label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="12"
                max="120"
                value={fontSize}
                onChange={(e) => {
                  const fontSize = parseInt(e.target.value);
                  setFontSize(fontSize);
                  updateActiveTextBox({ fontSize });
                }}
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
                  background: `linear-gradient(to right, #40ac02 0%, #40ac02 ${((fontSize - 12) / (120 - 12)) * 100}%, #e5e7eb ${((fontSize - 12) / (120 - 12)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="w-16 px-2 py-1 text-sm rounded border border-neutral-600 text-center bg-neutral-800 text-white">
                {fontSize}px
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium text-neutral-200 mb-2">Font Weight</label>
            <div className="relative">
              <select
                value={fontWeight}
                onChange={(e) => {
                  const fontWeight = e.target.value;
                  setFontWeight(fontWeight);
                  updateActiveTextBox({ fontWeight });
                }}
                className="w-full px-3 py-2 border border-neutral-600 rounded-md appearance-none text-white pr-8"
              >
                {fontWeights.map((weight) => (
                  <option className="bg-background text-white" key={weight.value} value={weight.value}>{weight.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="p-1">
          <label className="block font-medium text-neutral-200 mb-3">Text Style</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsBold(!isBold)
                updateActiveTextBox({ isBold: !isBold })
              }}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all text-neutral-200 ${isBold ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-500 hover:border-neutral-600'
                }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsItalic(!isItalic)
                updateActiveTextBox({ isItalic: !isItalic })
              }}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all text-neutral-200 ${isItalic ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-500 hover:border-neutral-600'
                }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsUnderlined(!isUnderlined)
                updateActiveTextBox({ isUnderlined: !isUnderlined })
              }}
              className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all text-neutral-200 ${isUnderlined ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-500 hover:border-neutral-600'
                }`}
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-1">
          <label className="block font-medium text-neutral-200 mb-3">Text Alignment</label>
          <div className="flex items-center space-x-2">
            {[
              { value: 'left', icon: AlignLeft },
              { value: 'center', icon: AlignCenter },
              { value: 'right', icon: AlignRight }
            ].map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  const textAlign = AlignType[value as keyof typeof AlignType];
                  setTextAlign(textAlign);
                  updateActiveTextBox({ textAlign })
                }}
                className={`w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all text-white ${textAlign === value ? 'border-accent-dark/80 bg-accent-dark/10 text-accent-dark' : 'border-neutral-500 hover:border-neutral-600'
                  }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-1">
          <label className="block font-medium text-neutral-200 mb-3">Text Color</label>
          <div className="grid grid-cols-6 gap-2">
            {baseColors.map((color, index) => {
              if (index === baseColors.length - 1) {

                return (
                  <button
                    key="custom-color-picker"
                    onClick={() => {
                      setShowPicker(!showPicker)
                    }}
                    className={`w-8 h-8 rounded-lg border transition-colors ${selectedTextColor === customColor && 'border-neutral-300 hover:border-neutral-400'
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
                    updateActiveTextBox({ color })
                  }}
                  className={`w-8 h-8 rounded-lg border transition-colors ${selectedTextColor === color && 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              );
            })}
            {showPicker && (
              <div className="absolute z-10 -mt-96 mr-40">
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
      </div>}
    </div>
  );
}