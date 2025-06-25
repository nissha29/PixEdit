import Background from "./components/Background";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import "./globals.css";

export default function Home() {
  return (
    <div className="main-wrapper bg-background min-h-screen">
      <Background />
      <Navbar />
      <Hero />
      <Video />
    </div>
  );
}
