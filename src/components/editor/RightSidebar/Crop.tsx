import { aspectRatios, quickRotations } from "@/lib/constants"
import { useCropStore, useImageDimensionStore, useImagePreviewStore } from "@/store/store";
import { ArrowRight } from 'lucide-react'

export default function Crop() {
    const { rotation, setRotation, selectedRatio, setSelectedRatio } = useCropStore();
    const { dataURL, setDataURL } = useImagePreviewStore();
    const { cropBox, setCropBox, setIsCropping } = useCropStore();
    const { imageDimensions } = useImageDimensionStore();

    const handleApplyCrop = () => {
        if (!cropBox || !dataURL) return;

        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            const cropWidth = cropBox.maxX - cropBox.minX;
            const cropHeight = cropBox.maxY - cropBox.minY;

            const offCanvas = document.createElement("canvas");
            offCanvas.width = cropWidth;
            offCanvas.height = cropHeight;
            const offCtx = offCanvas.getContext("2d")!;
            offCtx.drawImage(
                img,
                cropBox.minX, cropBox.minY, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight
            );

            setDataURL(offCanvas.toDataURL("image/png"));
            setIsCropping(false);
        };
    };

    const handleAspectRatio = (ratio: string) => {
        setSelectedRatio(ratio);
        setIsCropping(true);

        const { width: imgW, height: imgH } = imageDimensions;
        let cropWidth = imgW;
        let cropHeight = imgH;
        switch (ratio) {
            case 'Free Form':
                setCropBox({ minX: 2, minY: 2, maxX: imgW - 2, maxY: imgW - 2 });
                break;
            case 'square':
                const side = Math.min(imgW, imgW) - 4;
                setCropBox({ minX: 2, minY: 2, maxX: 2 + side, maxY: 2 + side });
                break;
            case '16:9':
                const aspect169 = 16 / 9;
                if (imgW / imgH > aspect169) {
                    cropHeight = imgH - 4;
                    cropWidth = cropHeight * aspect169;
                } else {
                    cropWidth = imgW - 4;
                    cropHeight = cropWidth / aspect169;
                }
                break;
            case '3:2':
                const aspect32 = 3 / 2;
                if (imgW / imgH > aspect32) {
                    cropHeight = imgH - 4;
                    cropWidth = cropHeight * aspect32;
                } else {
                    cropWidth = imgW - 4;
                    cropHeight = cropWidth / aspect32;
                }
                break;
            case '9:16':
                const aspect = 9 / 16;
                if (imgW / imgH > aspect) {
                    cropHeight = imgH - 4;
                    cropWidth = cropHeight * aspect;
                } else {
                    cropWidth = imgW - 4;
                    cropHeight = cropWidth / aspect;
                }
                break;
            default:
                setCropBox({ minX: 2, minY: 2, maxX: imgW - 2, maxY: imgH - 2 });
                break;
        }
    }

    const handleQuickRotation = (value: number) => {
        if (value === 0) {
            setRotation(0)
        } else {
            let newRotation = rotation + value;
            if (newRotation > 180) newRotation -= 360;
            if (newRotation < -180) newRotation += 360;
            setRotation(newRotation);
        }
    }

    return (
        <div className="space-y-6 p-4 rounded-xl">
            <h3 className="text-xl font-semibold text-neutral-200">
                Crop & Transform
            </h3>

            <div className="flex flex-col gap-12">
                <div className="space-y-3">
                    <label className="block font-medium text-neutral-300">Aspect Ratio</label>
                    <div className="grid grid-cols-2 gap-2">
                        {aspectRatios.map((ratio) => (
                            <button
                                key={ratio.name}
                                onClick={() => handleAspectRatio(ratio.name)}
                                className={`px-3 py-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${selectedRatio === ratio.name
                                    ? 'bg-accent-dark text-white scale-105'
                                    : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800 hover:scale-105 hover:cursor-pointer'
                                    }`}
                            >
                                <span>{ratio.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block font-medium text-neutral-300 tracking-wider">Rotation</label>

                    <div className="grid grid-cols-2 gap-2">
                        {quickRotations.map((quick) => (
                            <button
                                key={quick.label}
                                onClick={() => handleQuickRotation(quick.value)}
                                className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm text-neutral-200 transition-colors hover:cursor-pointer"
                            >
                                {quick.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-neutral-300">Fine Adjustment</span>
                            <span className="text-sm text-neutral-300 font-mono bg-neutral-800 px-2 py-1 rounded">
                                {rotation > 0 ? '+' : ''}{rotation}°
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                step="1"
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="w-full flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent-dark [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #40ac02 0%, #40ac02 ${((rotation - (-180)) / (180 - (-180))) * 100}%, #e5e7eb ${((rotation - (-180)) / (180 - (-180))) * 100}%, #e5e7eb 100%)`
                                }}
                            />
                            <div className="flex justify-between text-sm text-neutral-400 mt-1">
                                <span>-180°</span>
                                <span>0°</span>
                                <span>+180°</span>
                            </div>
                        </div>
                        <button onClick={() => handleApplyCrop()} className="mt-5 text-white text-lg bg-accent-dark w-full p-2 rounded-lg flex gap-2 justify-center items-center font-semibold hover:cursor-pointer">{'Apply Crop'} <ArrowRight className="w-5 h-5 stroke-2" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}