import { IconDownload, IconUpload } from "@/icons/icons";
import { useActiveTabStore, useBackgroundStore, useBlurStore, useCropStore, useDrawingStore, useFileStore, useFilterStore, useImageDimensionStore, useImagePreviewStore, useTextStore } from "@/store/store";
import { Blurs, Stroke, TextBox } from "@/types/types";
import { drawText, drawBoundingBox, getBoundingBox, getBox, getCanvasCoords, isPointInRect, pixelate, smudge, drawStrokes, drawBoundingBoxForCrop, pushPointToLast } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export default function Canvas() {
    const { dataURL } = useImagePreviewStore();
    const { background, setBackground, setHasRemovedBackground } = useBackgroundStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [open, setOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState('png');
    const { filter, setFilter } = useFilterStore();
    const { activeTab } = useActiveTabStore();
    const { tool, selectedColor, brushSize, brushType, setStrokes, strokes } = useDrawingStore();
    const [isDrawing, setIsDrawing] = useState(false);
    const [isBlurring, setIsBlurring] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { textBoxes, setTextBoxes, activeTextBox, setActiveTextBox } = useTextStore();
    const { imageDimensions, setImageDimensions } = useImageDimensionStore();
    const [interactionMode, setInteractionMode] = useState<'none' | 'dragging'>('none');
    const [dragStartPos, setDragStartPos] = useState<{ x: number, y: number } | null>(null);
    const { selectedBlur, blurRadius, blurStrength, blurs, setBlurs } = useBlurStore();
    let lastPos: { x: number; y: number } | null = null;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { setDataURL, setOriginalDataURL } = useImagePreviewStore();
    const { setFile } = useFileStore();
    const { selectedRatio, cropBox, setCropBox, isCropping, setIsCropping, rotation, setRotation } = useCropStore();
    const [draggingHandler, setDraggingHandler] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const minWidth = 30;
    const minHeight = 30;

    useEffect(() => {
        if (!dataURL) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = dataURL;
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
            const crop = { minX: 2, minY: 2, maxX: img.width - 2, maxY: img.height - 2 }
            setCropBox(crop);
            if (canvasRef.current) {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
            }
        };
    }, [dataURL, setImageDimensions, setCropBox]);

    function getHandlerUnderPoint(x: number, y: number, box: typeof cropBox) {
        const handlerRadius = 20;

        const corners = [
            { name: 'top-left', x: box.minX, y: box.minY },
            { name: 'top-right', x: box.maxX, y: box.minY },
            { name: 'bottom-left', x: box.minX, y: box.maxY },
            { name: 'bottom-right', x: box.maxX, y: box.maxY },
        ];

        for (const corner of corners) {
            const dx = x - corner.x;
            const dy = y - corner.y;
            if (dx * dx + dy * dy <= handlerRadius * handlerRadius) {
                return corner.name;
            }
        }

        return null;
    }

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
        setBackground(null);
        setHasRemovedBackground(false);
        setCropBox({ minX: 2, minY: 2, maxX: imageDimensions.width - 2, maxY: imageDimensions.height - 2 });
        setRotation(0);
        setFilter({ name: 'None', class: '' });
        setTextBoxes([]);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setOriginalDataURL(event.target?.result as string);
            setDataURL(event.target?.result as string);
        };
        reader.readAsDataURL(file);
        setFile({ file, name: file.name, size: file.size, type: file.type });
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

        drawStrokes(ctx, tool, brushType, selectedColor, brushSize);

        ctx.beginPath();
        ctx.moveTo(x, y);
        const newStroke: Stroke = {
            tool,
            type: brushType,
            color: selectedColor,
            size: brushSize,
            points: [{ x, y }]
        };

        setStrokes((prev) => [...prev, newStroke]);
    };

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

        setStrokes((prev) => pushPointToLast(prev, { x, y }));
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

        const updatedTextBoxes = textBoxes.map((box) => {
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

        setTextBoxes(updatedTextBoxes);
        setDragStartPos({ x: mouseX, y: mouseY });
    }

    const onMouseUpText = () => {
        setInteractionMode("none");
        setDragStartPos(null);
    }

    const onMouseDownBlur = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsBlurring(true);
        const canvas = canvasRef.current;
        const pos: { x: number, y: number } | null = getCanvasCoords(canvas, e);
        if (!pos) return;

        const newBlur: Blurs = {
            type: selectedBlur,
            points: [pos],
            radius: blurRadius,
            strength: blurStrength,
        };

        setBlurs(prev => [...prev, newBlur]);

    }

    const onMouseMoveBlur = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isBlurring) return;
        const canvas = canvasRef.current;
        const pos = getCanvasCoords(canvas, e);
        if (!pos) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        if (!lastPos) {
            lastPos = pos;
            return;
        }

        const distX = pos.x - lastPos.x;
        const distY = pos.y - lastPos.y;
        const distance = Math.hypot(distX, distY);
        const step = blurStrength / 4;

        for (let i = 0; i < distance; i += step) {
            const x = lastPos.x + (distX * i) / distance;
            const y = lastPos.y + (distY * i) / distance;

            switch (selectedBlur) {
                case 'pixelate':
                    pixelate(ctx, x, y, blurRadius, blurStrength);
                    break;
                case 'smudge':
                    smudge(ctx, x, y, blurRadius, blurStrength);
                    break;
                default:
                    break;
            }
        }

        const updated = [...blurs];
        const last = updated[updated.length - 1];
        if (last) {
            last.points.push(pos);
        }
        setBlurs(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last) {
                last.points.push(pos);
            }
            return updated;
        });


        lastPos = pos;
    }

    const onMouseUpBlur = () => {
        setIsBlurring(false);
        lastPos = null;
    }

    const onMouseDownCrop = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (selectedRatio !== 'Free Form') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        const handler = getHandlerUnderPoint(mouseX, mouseY, cropBox);
        console.log('Handler detected:', handler);

        if (handler) {
            setDraggingHandler(handler);
            setDragStart({ x: mouseX, y: mouseY });
            setIsCropping(true);
        }
    };


    const onMouseMoveCrop = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isCropping || !draggingHandler || !dragStart || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        const dx = mouseX - dragStart.x;
        const dy = mouseY - dragStart.y;

        const newBox = { ...cropBox };
        switch (draggingHandler) {
            case 'top-left':
                newBox.minX = Math.min(newBox.maxX - minWidth, Math.max(0, newBox.minX + dx));
                newBox.minY = Math.min(newBox.maxY - minHeight, Math.max(0, newBox.minY + dy));
                break;
            case 'top-right':
                newBox.maxX = Math.max(newBox.minX + minWidth, Math.min(canvas.width, newBox.maxX + dx));
                newBox.minY = Math.min(newBox.maxY - minHeight, Math.max(0, newBox.minY + dy));
                break;
            case 'bottom-left':
                newBox.minX = Math.min(newBox.maxX - minWidth, Math.max(0, newBox.minX + dx));
                newBox.maxY = Math.max(newBox.minY + minHeight, Math.min(canvas.height, newBox.maxY + dy));
                break;
            case 'bottom-right':
                newBox.maxX = Math.max(newBox.minX + minWidth, Math.min(canvas.width, newBox.maxX + dx));
                newBox.maxY = Math.max(newBox.minY + minHeight, Math.min(canvas.height, newBox.maxY + dy));
                break;
        }

        setCropBox(newBox);
        setDragStart({ x: mouseX, y: mouseY });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = dataURL!;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawBoundingBoxForCrop(ctx, newBox);
        };
    }

    const onMouseUpCrop = () => {
        setDraggingHandler(null);
        setDragStart(null);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        switch (activeTab) {
            case 'draw':
                onMouseDownDraw(e);
                break;
            case 'text':
                onMouseDownText(e);
                break;
            case 'addBlur':
                onMouseDownBlur(e);
                break;
            case 'crop':
                onMouseDownCrop(e);
                break;
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        switch (activeTab) {
            case 'draw':
                onMouseMoveDraw(e);
                break;
            case 'text':
                onMouseMoveText(e);
                break;
            case 'addBlur':
                onMouseMoveBlur(e);
                break;
            case 'crop':
                onMouseMoveCrop(e);
                break;
        }
    };

    const onMouseUp = () => {
        switch (activeTab) {
            case 'draw':
                onMouseUpDraw();
                break;
            case 'text':
                onMouseUpText();
                break;
            case 'addBlur':
                onMouseUpBlur();
                break;
            case 'crop':
                onMouseUpCrop();
                break;
        }
    };

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
        link.download = `pixEDiT-${crypto.randomUUID()}.${exportFormat}`;
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
                    ctx.filter = 'blur(1px)';
                    ctx.drawImage(bgImg, 0, 0, width+15, height+15);
                    ctx.restore();
                    drawForeground();
                };
                return;
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            function drawForeground() {
                const canvas = canvasRef.current;
                if (!canvas) return;

                if (ctx) {
                    ctx.save();
                    ctx.filter = ctx.filter = filter?.class || 'none';

                    const rad = (rotation * Math.PI) / 180;

                    const rotatedWidth = Math.abs(fgImg.width * Math.cos(rad)) + Math.abs(fgImg.height * Math.sin(rad));
                    const rotatedHeight = Math.abs(fgImg.width * Math.sin(rad)) + Math.abs(fgImg.height * Math.cos(rad));

                    let scale = Math.max(canvas.width / rotatedWidth, canvas.height / rotatedHeight);

                    if (scale < 1) scale = 1;
                    const angleFactor = 1 + Math.abs(Math.sin(rad)) * 1;
                    scale *= angleFactor;

                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rad);
                    ctx.scale(scale, scale);

                    ctx.drawImage(fgImg, -fgImg.width / 2, -fgImg.height / 2);
                    ctx.restore();

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

                    blurs.forEach(blur => {
                        blur.points.forEach(point => {
                            switch (blur.type) {
                                case 'pixelate':
                                    pixelate(ctx, point.x, point.y, blur.radius, blur.strength);
                                    break;
                                case 'smudge':
                                    smudge(ctx, point.x, point.y, blur.radius, blur.strength);
                                    break;
                            }
                        });
                    });

                    strokes.forEach(stroke => {
                        if (stroke.points.length < 2) return;

                        drawStrokes(ctx, stroke.tool, stroke.type, stroke.color, stroke.size);

                        ctx.beginPath();
                        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

                        for (let i = 1; i < stroke.points.length; i++) {
                            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                        }

                        ctx.stroke();
                        ctx.closePath();
                    });

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

                    if (activeTab === 'crop') {
                        if (isCropping) {
                            drawBoundingBoxForCrop(ctx, cropBox);
                        }
                    }
                }
            }
            drawForeground();
        };
    }, [dataURL, background, filter, textBoxes, activeTab, setImageDimensions, activeTextBox, selectedRatio, cropBox, isCropping, rotation]);

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
            />
            <main className="flex-1 flex flex-col">
                <header className="bg-background p-4 border-b-2 border-neutral-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="text-accent-dark text-3xl font-bold">pix</div>
                                <div className="text-2xl font-bold text-neutral-100">EDiT</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center space-x-2">
                            <button onClick={() => triggerFileSelect()} className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer text-neutral-800 rounded transition-colors flex items-center space-x-2">
                                <IconUpload className="w-5 h-5" />
                                <span>Upload new</span>
                            </button>
                            <button onClick={() => setOpen(prev => !prev)} className="px-3 py-2 bg-accent-dark hover:bg-accent-light hover:cursor-pointer text-white tracking-wider rounded transition-colors flex items-center space-x-2">
                                <IconDownload className="w-5 h-5" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                    {open && (
                        <div className="relative">
                            <div className="absolute right-2 top-2 bg-background border border-neutral-800 rounded-lg shadow-lg p-4 w-48 z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <IconDownload className="w-4 h-4 text-neutral-300" />
                                    <label className="font-medium text-neutral-200">Export as:</label>
                                </div>

                                <select
                                    className="w-full p-2 rounded-md border border-neutral-800 bg-background text-neutral-200 focus:outline-none transition-colors"
                                    value={exportFormat}
                                    onChange={(e) => setExportFormat(e.target.value)}
                                >
                                    <option value="png">PNG</option>
                                    <option value="jpg">JPG</option>
                                    <option value="jpeg">JPEG</option>
                                    <option value="webp">WEBP</option>
                                </select>

                                <button
                                    className="w-full mt-3 bg-accent-dark hover:bg-accent-light hover:cursor-pointer text-white py-2 px-4 rounded-md transition-colors font-medium"
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
                    className="flex-1 bg-background p-8 flex items-center justify-center overflow-auto relative"
                >
                    <canvas
                        ref={canvasRef}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        style={{
                            maxWidth: '40vw',
                            maxHeight: '80vh',
                            width: 'auto',
                            height: 'auto',
                            border: '2px solid #fce300',
                        }}
                    />
                </div>
            </main>
        </>
    );
}