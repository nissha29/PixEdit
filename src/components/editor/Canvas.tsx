import { IconDownload, IconRedo, IconUndo } from "@/icons/icons";
import { useBackgroundStore, useImagePreviewStore } from "@/store/store";
import { useEffect, useRef, useState } from "react";

export default function Canvas({ brightness, contrast, saturation }: { brightness: number, contrast: number, saturation: number, rotation: number }) {
    const { dataURL } = useImagePreviewStore();
    const { background } = useBackgroundStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !dataURL) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const fgImg = new window.Image();
        fgImg.crossOrigin = "anonymous";
        fgImg.src = dataURL;

        fgImg.onload = () => {
            const width = fgImg.width;
            const height = fgImg.height;

            canvas.width = width;
            canvas.height = height;

            if (background?.type === "color" && background.value) {
                ctx.fillStyle = background.value;
                ctx.fillRect(0, 0, width, height);
            } else if (background?.type === "gradient" && background.value) {
                const gradientObj = typeof background.value === 'string'
                    ? JSON.parse(background.value)
                    : background.value;

                const grad = ctx.createLinearGradient(0, 0, width, height);
                gradientObj.colors.forEach((color: string, index: number) => {
                    grad.addColorStop(index / (gradientObj.colors.length - 1), color);
                });

                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);

            } else if (background?.type === "image" && background.value) {
                const bgImg = new window.Image();
                bgImg.crossOrigin = "anonymous";
                bgImg.src = background.value;
                bgImg.onload = () => {
                    ctx.drawImage(bgImg, 0, 0, width, height);
                    drawForeground();
                };
                return;
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            function drawForeground() {
                if (ctx) {
                    ctx.save();
                    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
                    ctx.drawImage(fgImg, 0, 0, width, height);
                    ctx.restore();
                }
            }
            drawForeground();
        };
    }, [dataURL, background, brightness, contrast, saturation]);

    return (
        <main className="flex-1 flex flex-col">
            <header className="bg-white p-4 border-b border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="font-extralight text-2xl text-white bg-accent-dark text-center p-1 rounded-l-lg">A</div>
                            <div className="text-2xl text-white bg-accent-dark ml-0.5 p-1 rounded-r-lg">pex</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center space-x-2">
                        <button className="p-2 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-lg transition-colors">
                            <IconUndo className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-lg transition-colors">
                            <IconRedo className="w-5 h-5" />
                        </button>
                        <button onClick={() => setOpen(prev => !prev)} className="px-4 py-2 bg-accent-dark hover:bg-sky-900 hover:cursor-pointer text-white font-semibold rounded-lg transition-colors flex items-center space-x-2">
                            <IconDownload className="w-5 h-5" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
                {open && (
                    <div className="relative">
                        <div className="absolute right-2 top-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <IconDownload className="w-4 h-4 text-gray-600" />
                                <label className="font-medium text-gray-800">Export as:</label>
                            </div>

                            <select
                                className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none transition-colors"
                                onChange={e => {
                                    const format = e.target.value;
                                    console.log("Selected export format:", format);
                                }}
                                defaultValue="png"
                            >
                                <option value="png">PNG - Lossless</option>
                                <option value="jpg">JPG - Compressed</option>
                                <option value="jpeg">JPEG - High Quality</option>
                                <option value="webp">WEBP - Modern</option>
                                <option value="svg">SVG - Vector</option>
                                <option value="pdf">PDF - Document</option>
                            </select>

                            <button className="w-full mt-3 bg-accent-dark hover:bg-sky-900 hover:cursor-pointer text-white py-2 px-4 rounded-md transition-colors font-medium">
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <div className="flex-1 bg-neutral-200 p-8 flex items-center justify-center overflow-auto">
                <canvas
                    ref={canvasRef}
                    style={{
                        maxWidth: '100vw',
                        maxHeight: '90vh',
                        borderRadius: '12px',
                        width: 'auto',
                        height: 'auto',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}
                />
            </div>
        </main>
    );
}
