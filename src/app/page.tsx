import Footer from "@/components/hero/Footer";
import Hero from "../components/hero/Hero";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div className="lg:px-14 xl:px-24 2xl:px-32 py-10 main-wrapper bg-background min-h-screen">
        <Hero />
      </div>
      <Footer />
    </>
  );
}
