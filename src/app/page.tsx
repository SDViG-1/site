import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Empathy } from "@/components/sections/Empathy";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Gamification } from "@/components/sections/Gamification";
import { Privacy } from "@/components/sections/Privacy";
import { Articles } from "@/components/sections/Articles";
import { Pricing } from "@/components/sections/Pricing";
import { Download } from "@/components/sections/Download";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <Empathy />
        <Ecosystem />
        <Gamification />
        <Privacy />
        <Articles />
        <Pricing />
        <Download />
      </main>
      <Footer />
    </>
  );
}
