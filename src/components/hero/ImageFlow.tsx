import { IconArrow, IconArrowDown } from '@/icons/icons';
import Image from 'next/image';

export function ImageFlow() {

    return (
        <div className="flex flex-col justify-center items-center mb-32 mt-56">
            <div className="text-5xl text-foreground mb-7 flex flex-col justify-center items-center gap-6">
                <div><span className="text-white bg-accent-dark px-2 py-0.5">MINIMAL</span> yet mighty</div>
                <div className='text-lg text-neutral-400 flex-wrap w-2xl text-center'>All the editing tools you need, thoughtfully designed to keep things simple — so you can focus on making your photos look amazing without any distractions.</div>
            </div>
            <div
                className="max-h-[45rem] overflow-y-auto overscroll-contain flex flex-col justify-start items-start gap-10 mt-16"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none', 
                    overscrollBehavior: 'contain',
                }}
            >
                <Feature mainText="Add Text" description="Easily add and style text on your images with a variety of fonts, sizes, colors, and placement options — customize every detail to create visually stunning designs that perfectly match your message, all in just a few clicks." image1="/text1.png" image2="/text2.png" />
                <Feature mainText="Crop and Rotate photos" description="Quickly crop and rotate your photos to focus on what matters most — adjust the composition, straighten angles, and enhance your images effortlessly for a polished, professional look." image1="/crop1.png" image2="/crop2.png" />
                <Feature mainText="Apply Filters" description="Give your photos a fresh look with easy-to-use filters — tweak colors, lighting, and effects to bring out the best in every image." image1="/filter1.png" image2="/filter2.png" />
                <Feature mainText="Remove or Change Background" description="Remove backgrounds with precision or switch them to colors, gradients, or entirely new images — personalize your photos and make them stand out effortlessly." image1="/background1.png" image2="/background2.png" />
                <Feature mainText="Draw" description="Add creativity on the go — explore brush, pencil, dotted, and chalk styles to draw freely and enhance your images with unique artistic effects." image1="/draw1.png" image2="/draw2.png" />
                <Feature mainText="Add Blur" description="Add blur effects like pixelate and smudge to your photos — create focus, hide details, or add artistic touches to enhance your images with ease." image1="/blur1.png" image2="/blur2.png" />
            </div>
        </div>
    );
}

function Feature({ mainText, description, image1, image2 }: { mainText: string; description: string; image1: string; image2: string }) {
    return (
        <div className="flex flex-col justify-start items-center gap-4 w-4xl">
            <div className="flex justify-between items-center">
                <Image src={image1} width={1200} height={1200} alt="" className="w-96 h-96 rounded-xl border border-neutral-600" />
                <IconArrowDown className="flex md:hidden" />
                <IconArrow className="hidden md:flex" />
                <Image src={image2} width={1200} height={1200} alt="" className="w-96 h-96 rounded-xl border border-neutral-600" />
            </div>
            <div className="flex flex-col flex-wrap justify-start items-start gap-4">
                <div className="text-2xl text-white border border-accent-dark p-2">{mainText}</div>
                <div className="text-neutral-400 text-lg">{description}</div>
            </div>
        </div>
    );
}

export default ImageFlow;