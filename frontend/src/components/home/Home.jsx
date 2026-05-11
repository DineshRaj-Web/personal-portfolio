import Hero from "./Hero";
import AboutPreview from "./AboutPreview";
import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";
import ServicesSection from "./ServicesSection";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";

export default function Home() {
    return (
        <main className="bg-black relative">
            <Hero />
            <SkillsPreview />
            <ServicesSection />
            <WorkPreview />
            <ProcessSection />
            <AboutPreview />
            <TestimonialsSection />
            <CallToActionSection />
        </main>
    );
}
