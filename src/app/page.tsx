import Footer from "@/components/hero/Footer";
import Hero from "../components/hero/Hero";
import "./globals.css";

export const metadata = {
  title: "Pixedit | AI Image Generator & Editor",
  description: "Create, edit, and enhance images effortlessly with Pixedit. An all-in-one image editor platform for artists, designers, and creators to bring ideas to life.",
  keywords: [
    "Pixedit",
    "AI Image Generator",
    "AI Image Editor",
    "Online Image Editing Tool",
    "AI Art Creator",
    "Photo Enhancement",
    "Digital Art Studio"
  ],
  authors: [{ name: "Nisha" }],
  openGraph: {
    title: "Pixedit | AI Image Generator & Editor",
    description: "Create, edit, and enhance images effortlessly with Pixedit. An all-in-one AI-powered platform for artists, designers, and creators to bring ideas to life.",
    type: "website",
    locale: "en_IN",
    url: "https://www.pixedit.pro",
  },
};

export default function Home() {
  return (
    <>
      <div className="px-3 sm:px-5 md:px-10 lg:px-14 xl:px-24 2xl:px-32 py-10 main-wrapper bg-background min-h-screen">
        <Hero />
      </div>
      <Footer />
    </>
  );
}
