'use client'

import { Dispatch, SetStateAction } from "react"


export default function Crop({ rotation, setRotation }: { rotation: number, setRotation: Dispatch<SetStateAction<number>> }) {

    return <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Crop & Resize</h3>
        <div className="grid grid-cols-2 gap-3">
            {['Square', '16:9', '4:3', '3:2', '9:16', 'Free'].map((ratio) => (
                <button
                    key={ratio}
                    className="p-3 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-sm text-neutral-800 transition-colors"
                >
                    {ratio}
                </button>
            ))}
        </div>
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-neutral-600 mb-2">Rotation</label>
                <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full"
                />
                <span className="text-sm text-neutral-500">{rotation}°</span>
            </div>
        </div>
    </div>
}