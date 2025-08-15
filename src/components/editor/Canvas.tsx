import { IconDownload, IconRedo, IconUndo } from "@/icons/icons";
import { useImagePreviewStore } from "@/store/store";
import Image from "next/image";

export default function Canvas({ brightness, contrast, saturation, rotation }: { brightness: number, contrast: number, saturation: number, rotation: number }) {
    const { dataURL } = useImagePreviewStore();

    return <main className="flex-1 flex flex-col">
        <header className="bg-white p-4 border-b border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <div className="font-extralight text-2xl text-white bg-accent-dark text-center p-1 rounded-l-lg">A</div>
                        <div className="text-2xl text-white bg-accent-dark ml-0.5 p-1 rounded-r-lg">pex</div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-lg transition-colors">
                        <IconUndo className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-lg transition-colors">
                        <IconRedo className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-accent-dark hover:bg-sky-900 hover:cursor-pointer text-white font-semibold rounded-lg transition-colors flex items-center space-x-2">
                        <IconDownload className="w-5 h-5" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </header>

        <div className="flex-1 bg-neutral-100 p-8 flex items-center justify-center overflow-auto">
            <div className="max-w-full max-h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-4">
                {dataURL && (
                    <Image
                        src={dataURL}
                        alt="Editing canvas"
                        fill
                        className="object-contain py-40"
                        style={{
                            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                            transform: `rotate(${rotation}deg)`
                        }}
                    />
                )}
            </div>
        </div>
    </main>
}