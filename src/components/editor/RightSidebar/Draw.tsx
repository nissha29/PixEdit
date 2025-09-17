import React, { useState, useRef, useEffect } from 'react';
import {
  Brush,
  Pencil,
  MoreHorizontal,
} from 'lucide-react';
import { IconEscalatorFilled } from '@tabler/icons-react';
import { ColorResult, SketchPicker } from 'react-color';
import { baseColors } from '@/lib/constants';
import { useDrawingStore } from '@/store/store';
import { BrushType, ToolType } from '@/types/types';

export default function Draw() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [customColor, setCustomColor] = useState('#000000');
  const [showPicker, setShowPicker] = useState(false);
  const { tool, setTool, selectedColor, setSelectedColor, brushSize, setBrushSize, brushType, setBrushType } = useDrawingStore();

  const tools = [
    { id: 'brush', icon: Brush, label: 'Brush' },
    { id: 'pencil', icon: Pencil, label: 'Pencil' },
    { id: 'dotted', icon: MoreHorizontal, label: 'Dotted' },
    { id: 'chalk', icon: IconEscalatorFilled, label: 'Chalk' },
  ];

  const colors = [...baseColors, customColor];

  const brushTypes = [
    { id: 'round', label: 'Round' },
    { id: 'square', label: 'Square' },
    { id: 'soft', label: 'Soft' }
  ];

  function handleColorChange(color: ColorResult) {
    setCustomColor(color.hex);
    setSelectedColor(color.hex);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="w-full bg-background px-1 xl:px-6 py-2 space-y-8"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <h3 className="text-xl font-semibold text-neutral-200">Draw</h3>

      <div className="space-y-4 flex flex-col gap-7">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((toolItem) => (
            <button
              key={toolItem.id}
              onClick={() => setTool(ToolType[toolItem.id as keyof typeof ToolType])}
              className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1.5 text-sm ${tool === toolItem.id
                ? 'bg-accent-dark text-white hover:cursor-pointer'
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800 hover:cursor-pointer'
                }`}
            >
              <toolItem.icon size={18} />
              <span className="font-medium">{toolItem.label}</span>
            </button>
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-neutral-200 mb-4">Solid Colors</h4>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color, index) => {
              if (index === colors.length - 1) {

                return (
                  <button
                    key="custom-color-picker"
                    onClick={() => {
                      setShowPicker(!showPicker)
                    }}
                    className={`w-8 h-8 rounded-lg border transition-colors`}
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
                  }}
                  className={`w-8 h-8 rounded-lg border transition-colors ${selectedColor === color && 'border-0 ring-1 ring-white'
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
          <label className="block font-semibold text-neutral-200 mb-2">
            Brush Size: {brushSize}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-1.5
                [&::-webkit-slider-thumb]:rounded
                [&::-webkit-slider-thumb]:bg-accent-dark
            "
            style={{
              background: `linear-gradient(to right, #40ac02 0%, #40ac02 ${((brushSize - 1) / (20 - 1)) * 100}%, #e5e7eb ${((brushSize - 1) / (20 - 1)) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-neutral-200 mt-1">
            <span>1px</span>
            <span>20px</span>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-neutral-200 mb-2">
            Brush Type
          </label>
          <div className="grid grid-cols-3 gap-1">
            {brushTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBrushType(BrushType[type.id as keyof typeof BrushType])}
                className={`px-2 py-1.5 rounded-md text-xs transition-colors ${brushType === type.id
                  ? 'bg-accent-dark text-white'
                  : 'bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer text-neutral-800'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}