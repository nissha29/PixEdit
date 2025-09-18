import { IconBlur, IconCrop, IconLayers, IconFilter, IconSparkles, IconType, IconWand } from '@/icons/icons'

export const toolbarItems = [
  { id: 'text', icon: IconType, label: 'Text', color: 'bg-yellow-500' },
  { id: 'crop', icon: IconCrop, label: 'Crop', color: 'bg-blue-500' },
  { id: 'filters', icon: IconFilter, label: 'Filters', color: 'bg-rose-500' },
  { id: 'background', icon: IconLayers, label: 'Background', color: 'bg-orange-500' },
  { id: 'draw', icon: IconWand, label: 'Draw', color: 'bg-fuchsia-500' },
  { id: 'addBlur', icon: IconBlur, label: 'Add Blur', color: 'bg-green-500' },
  { id: 'aiTools', icon: IconSparkles, label: 'AI Tools', color: 'bg-purple-500' },
];

export const baseColors = [
  '#ffffff', '#000000', '#ff6b6b', '#4ecdc4', '#556270', '#c7f464', '#ffcc5c', '#96ceb4',
  '#ff6f91', '#845ec2', '#d65db1', '#c34a36', '#ef798a', '#a29bfe', '#81ecec',
  '#fab1a0', '#55efc4', '#2d3436', '#00b894', '#fd79a8', '#0984e3', '#6c5ce7'
];


export const gradients = [
  { angle: 135, colors: ['#667eea', '#764ba2'] },
  { angle: 45, colors: ['#ff9a9e', '#fad0c4', '#fad0c4'] },
  { angle: 60, colors: ['#abecd6', '#fbed96'] },
  { angle: 120, colors: ['#89f7fe', '#66a6ff'] },
  { angle: 45, colors: ['#fbc7aa', '#9876aa'] },
  { angle: 240, colors: ['#319197', '#a7ede0'] },
  { angle: 45, colors: ['#a1c4fd', '#c2e9fb'] },
  { angle: 135, colors: ['#ffecd2', '#fcb69f'] },
  { angle: 60, colors: ['#ff5858', '#f09819'] },
  { angle: 45, colors: ['#43cea2', '#185a9d'] },
  { angle: 135, colors: ['#ee9ca7', '#ffe4e1'] },
  { angle: 60, colors: ['#3a6186', '#89253e'] },
];

export const customImages = [
  '/bg1.png',
  '/bg2.png',
  '/bg3.png',
  '/bg4.png',
  '/bg5.png',
  '/bg6.png',
];

export const filters = [
  { name: 'None', class: '' },
  { name: 'Sepia', class: 'sepia(100%)' },
  { name: 'Grayscale', class: 'grayscale(100%)' },
  { name: 'Vintage', class: 'sepia(50%) contrast(120%) brightness(110%)' },
  { name: 'Cool', class: 'hue-rotate(180deg) saturate(120%)' },
  { name: 'Warm', class: 'sepia(30%) saturate(120%) brightness(110%)' },
  { name: 'Blur', class: 'blur(3px)' },
  { name: 'Invert', class: 'invert(100%)' },
  { name: 'Brighten', class: 'brightness(150%)' },
  { name: 'Contrast', class: 'contrast(150%)' },
  { name: 'Hue Shift', class: 'hue-rotate(90deg)' },
  { name: 'Solarize', class: 'invert(10%) saturate(130%) brightness(110%)' },
  { name: 'Night', class: 'brightness(50%) saturate(150%)' },
  { name: 'Soft Glow', class: 'brightness(120%) contrast(90%) blur(1.5px)' },
  { name: 'Sharp', class: 'contrast(170%) saturate(140%)' },
  { name: 'Warm Glow', class: 'sepia(50%) brightness(120%) saturate(130%)' }
];

export const fonts = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Arial', 'Playfair Display', 'Oswald'
];

export const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' }
];

export const aspectRatios = [
  { name: 'Free Form', value: 'freeForm' },
  { name: 'Square', value: '1:1' },
  { name: '16:9', value: '16:9' },
  { name: '4:3', value: '4:3' },
  { name: '3:2', value: '3:2' },
  { name: '9:16', value: '9:16' },
]

export const quickRotations = [
  { label: '↻ 90°', value: 90 },
  { label: '↻ 180°', value: 180 },
  { label: '↺ -90°', value: -90 },
  { label: '⟲ Reset', value: 0 }
]

export const words = [
  "images",
  "illustrations",
  "pictures",
  "potraits"
];

export const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];




