import { StickyScroll } from "../ui/sticky-scroll-reveal";

const content = [
    {
        title: "Create Your Account",
        number: "1",
        description:
            "Create your account to access editing tools designed to make your images stand out. Whether you’re enhancing photos, removing backgrounds, or adding creative effects, everything is just a few clicks away.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-neutral-800">
                Create Your Account
            </div>
        ),
    },
    {
        title: "Upload Your Image",
        number: "2",
        description:
            "Easily select and upload your image from your device to begin editing right away. Once uploaded, you can access powerful tools to enhance, adjust, and personalize your image exactly how you want it — all in just a few simple steps.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-neutral-800">
                Upload Your Image
            </div>
        ),
    },
    {
        title: "Choose a Tool",
        number: "3",
        description:
            "Choose from a set of powerful tools to edit your image with ease. Crop for the perfect frame, apply filters for creative effects, change or remove backgrounds, draw with custom brushes, and add blur for a polished look — everything you need to bring your ideas to life.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-neutral-800">
                Choose a Tool
            </div>
        ),
    },
    {
        title: "Start Editing",
        number: "4",
        description:
            "Start editing your image in just a few simple steps. Upload your photo, explore a wide range of tools, and easily apply filters, adjustments, effects, and more to enhance and personalize it. Whether you want to make quick fixes or unleash your creativity, everything you need is right at your fingertips.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-neutral-800">
                Start Editing
            </div>
        ),
    },
    {
        title: "Download Instantly",
        number: "5",
        description:
            "Once you’ve perfected your image, download it instantly in the format that works best for you. Choose from PNG, JPG, JPEG, or WebP to save and share your creation without any hassle or delay.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-neutral-800">
                Download Instantly
            </div>
        ),
    },
];
export default function HowItWorks() {
    return <div id='howItWorks' className="how itWorks w-full text-2xl sm:text-3xl md:text-4xl mb-32 bg-neutral-900 py-10 mt-10 flex justify-center items-center flex-col">
        <div className="flex text-foreground gap-3 justify-center items-center">
            How <div className='flex items-center'>
                <div className="text-accent-dark sm:text-3xl md:text-5xl font-bold">pix</div>
                <div className="sm:text-2xl md:text-4xl font-bold text-neutral-100">EDiT</div>
            </div> Works ?
        </div>
        <div className='text-lg text-neutral-400 flex-wrap sm:w-xl text-center mt-7'>Experience the ease of editing with powerful tools designed to help you create stunning images in just minutes.</div>
        <div className="w-full py-10">
            <StickyScroll content={content} />
        </div>
    </div>
}