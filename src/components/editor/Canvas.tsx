import { IconDownload, IconRedo, IconUndo } from "@/icons/icons";
import { useActiveTabStore, useBackgroundStore, useDrawingStore, useFilterStore, useImageDimensionStore, useImagePreviewStore, useTextStore } from "@/store/store";
import { TextBox } from "@/types/types";
import { drawBoundingBox, getBoundingBox, getBox, isPointInRect } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export default function Canvas() {
    const { dataURL } = useImagePreviewStore();
    const { background } = useBackgroundStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [open, setOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState('png');
    const { filter } = useFilterStore();
    const { activeTab } = useActiveTabStore();
    const { tool, selectedColor, brushSize, brushType } = useDrawingStore();
    const [isDrawing, setIsDrawing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { textBoxes, setTextBoxes, activeTextBox, setActiveTextBox } = useTextStore();
    const { setImageDimensions } = useImageDimensionStore();
    const [interactionMode, setInteractionMode] = useState<'none' | 'dragging'>('none');
    const [dragStartPos, setDragStartPos] = useState<{ x: number, y: number } | null>(null);;


    function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options: {
        fontFamily: string;
        fontSize: number;
        fontWeight: string | number;
        isBold: boolean;
        isItalic: boolean;
        isUnderlined: boolean;
        textAlign: CanvasTextAlign;
        fillStyle: string;
    }) {
        const fontParts = [];
        if (options.isItalic) fontParts.push('italic');
        if (options.isBold) fontParts.push('bold');
        else fontParts.push(options.fontWeight);
        fontParts.push(`${options.fontSize}px`);
        fontParts.push(options.fontFamily);

        ctx.font = fontParts.join(' ');
        ctx.fillStyle = options.fillStyle;
        ctx.textAlign = options.textAlign;
        ctx.textBaseline = 'top';

        ctx.fillText(text, x, y);

        if (options.isUnderlined) {
            const textWidth = ctx.measureText(text).width;
            const underlineHeight = options.fontSize / 15;
            let startX = x;
            if (options.textAlign === 'center') startX = x - textWidth / 2;
            else if (options.textAlign === 'right') startX = x - textWidth;

            const underlineY = y + options.fontSize + 2;
            ctx.fillRect(startX, underlineY, textWidth, underlineHeight);
        }
    }

    const resetContextStyles = (ctx: CanvasRenderingContext2D) => {
        ctx.globalAlpha = 1;
        ctx.lineDashOffset = 0;
        ctx.setLineDash([]);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.lineCap = brushType === 'round' ? 'round' : 'square';
        ctx.lineJoin = brushType === 'round' ? 'round' : 'miter';

        switch (tool) {
            case 'brush':
                ctx.strokeStyle = selectedColor;
                ctx.lineWidth = brushSize;

                if (brushType === 'soft') {
                    ctx.shadowColor = selectedColor;
                    ctx.shadowBlur = brushSize * 1.5;
                }
                break;

            case 'pencil':
                ctx.globalAlpha = 0.6;
                ctx.lineWidth = brushSize * 0.6;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const pctx = patternCanvas.getContext('2d');
                if (pctx) {
                    const rgbaColor = hexToRGBA(selectedColor, 0.15);
                    for (let i = 0; i < 50; i++) {
                        pctx.fillStyle = rgbaColor;
                        pctx.beginPath();
                        pctx.arc(Math.random() * 20, Math.random() * 20, 1, 0, Math.PI * 2);
                        pctx.fill();
                    }
                    const pattern = ctx.createPattern(patternCanvas, 'repeat');
                    if (pattern) ctx.strokeStyle = pattern;
                }
                ctx.setLineDash([]);
                break;

            case 'dotted':
                ctx.strokeStyle = selectedColor;
                ctx.lineWidth = brushSize;
                ctx.setLineDash([5, 15]);
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                break;

            case 'chalk':
                ctx.globalAlpha = 0.6;
                ctx.lineWidth = brushSize * 10;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = selectedColor;
                ctx.shadowBlur = brushSize * 1;
                ctx.strokeStyle = selectedColor;
                ctx.setLineDash([]);
                break;

            default:
                ctx.strokeStyle = selectedColor;
                ctx.lineWidth = brushSize;
        }
    };

    const onMouseDownDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTab !== 'draw') return;
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        resetContextStyles(ctx);

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    function hexToRGBA(hex: string, alpha = 1): string {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    const onMouseMoveDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        if (activeTab !== 'draw') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const onMouseUpDraw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.closePath();
        setIsDrawing(false);
    };

    const onMouseDownText = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        for (let i = textBoxes.length - 1; i >= 0; i--) {
            const box = textBoxes[i];
            const boxRect = getBoundingBox(
                {
                    x: box.x,
                    y: box.y,
                    text: box.text,
                    font: `${box.isBold ? "bold" : box.fontWeight} ${box.fontSize}px ${box.fontFamily}`,
                    fontSize: box.fontSize,
                    textAlign: box.textAlign,
                },
                ctx
            );

            if (boxRect && isPointInRect(mouseX, mouseY, boxRect)) {
                setActiveTextBox(box);
                setInteractionMode("dragging");
                setDragStartPos({ x: mouseX, y: mouseY });
                return;
            }
        }

        setActiveTextBox(null);
        setInteractionMode("none");
        setDragStartPos(null);
    };

    const onMouseMoveText = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (interactionMode !== "dragging" || !dragStartPos || !activeTextBox) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        const dx = mouseX - dragStartPos.x;
        const dy = mouseY - dragStartPos.y;

        setTextBoxes(
            textBoxes.map((box) => {
                if (box.id === activeTextBox.id) {
                    const movedBox = {
                        ...box,
                        x: box.x + dx,
                        y: box.y + dy,
                    };
                    setActiveTextBox(movedBox);
                    return movedBox;
                }
                return box;
            })
        );

        setDragStartPos({ x: mouseX, y: mouseY });

    }

    const onMouseUpText = () => {
        setInteractionMode("none");
        setDragStartPos(null);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        switch (activeTab) {
            case 'draw':
                onMouseDownDraw(e);
            case 'text':
                onMouseDownText(e);
        }
    }

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        switch (activeTab) {
            case 'draw':
                onMouseMoveDraw(e);
            case 'text':
                onMouseMoveText(e);
        }
    }

    const onMouseUp = () => {
        switch (activeTab) {
            case 'draw':
                onMouseUpDraw();
            case 'text':
                onMouseUpText();
        }
    }

    function downloadImage() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const validFormats = ['png', 'jpeg', 'jpg', 'webp'];
        if (!validFormats.includes(exportFormat)) {
            alert(`Export format "${exportFormat}" not supported for canvas export. Defaulting to PNG.`);
            setExportFormat('png');
        }

        const mimeType = exportFormat === 'jpg' ? 'image/jpeg' : `image/${exportFormat}`;
        const quality = 0.92;

        const dataURL = canvas.toDataURL(mimeType, quality);

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `apex-${crypto.randomUUID()}.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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

            setImageDimensions({ width, height });

            canvas.width = width;
            canvas.height = height;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

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

            } else if (background?.type === 'image' && background.value) {
                const bgImg = new window.Image();
                bgImg.crossOrigin = 'anonymous';
                bgImg.src = background.value;
                bgImg.onload = () => {
                    ctx.save();
                    ctx.filter = 'blur(10px)';
                    ctx.drawImage(bgImg, 0, 0, width, height);
                    ctx.restore();
                    drawForeground();
                };
                return;
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            function drawForeground() {
                if (ctx) {
                    ctx.save();
                    ctx.filter = ctx.filter = filter?.class || 'none';
                    ctx.drawImage(fgImg, 0, 0, width, height);
                    ctx.restore();

                    if (activeTab === 'text') {
                        textBoxes.forEach((box: TextBox) => {
                            drawText(ctx,
                                box.text,
                                box.x,
                                box.y,
                                {
                                    fontFamily: box.fontFamily,
                                    fontSize: box.fontSize,
                                    fontWeight: box.fontWeight,
                                    isBold: box.isBold,
                                    isItalic: box.isItalic,
                                    isUnderlined: box.isUnderlined,
                                    textAlign: box.textAlign,
                                    fillStyle: box.color,
                                }
                            );
                        })
                    }
                    if (activeTab === 'text' && activeTextBox) {
                        const box = getBoundingBox({
                            x: activeTextBox.x,
                            y: activeTextBox.y,
                            text: activeTextBox.text,
                            font: `${activeTextBox.isBold ? 'bold' : activeTextBox.fontWeight} ${activeTextBox.fontSize}px ${activeTextBox.fontFamily}`,
                            fontSize: activeTextBox.fontSize,
                            textAlign: activeTextBox.textAlign,
                        }, ctx);

                        if (box) {
                            const { paddedBox } = getBox(box);
                            drawBoundingBox(ctx, paddedBox);
                        }
                    }

                }
            }
            drawForeground();
        };
    }, [dataURL, background, filter, textBoxes, activeTab, setImageDimensions, activeTextBox]);

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
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value)}
                            >
                                <option value="png">PNG</option>
                                <option value="jpg">JPG</option>
                                <option value="jpeg">JPEG</option>
                                <option value="webp">WEBP</option>
                            </select>

                            <button
                                className="w-full mt-3 bg-accent-dark hover:bg-sky-900 hover:cursor-pointer text-white py-2 px-4 rounded-md transition-colors font-medium"
                                onClick={() => downloadImage()}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <div
                ref={containerRef}
                className="flex-1 bg-neutral-200 p-8 flex items-center justify-center overflow-auto relative"
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    style={{
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                        width: 'auto',
                        height: 'auto',
                        border: '1px solid #075985',
                    }}
                />
            </div>
        </main>
    );
}