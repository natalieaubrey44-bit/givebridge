import { ModalFlowProvider, useModalFlow, type FlowKey } from "./hooks/useModalFlow";
import { GlobalModal } from "./components/GlobalModal";
import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { FeaturedCampaignsSection } from "./components/sections/FeaturedCampaignsSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { CTASection } from "./components/sections/CTASection";
import { FooterSection } from "./components/sections/FooterSection";
import { HashtagTicker } from "./components/sections/HashtagTicker";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { CAMPAIGNS_DATA } from "./data/campaignsData";

function AppContent() {
  const { openFlow } = useModalFlow();

  const handleCampaignSelect = (id: string) => {
    openFlow(`${id}Flow` as FlowKey, 0, CAMPAIGNS_DATA[id]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      <Navbar onHomeClick={scrollToTop} onCampaignClick={() => { window.location.hash = "#campaigns"; }} />
      <HeroSection onCampaignSelect={handleCampaignSelect} />
      <FeaturedCampaignsSection onCampaignSelect={handleCampaignSelect} />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection onHomeClick={scrollToTop} />
      <HashtagTicker />
      <GlobalModal />
    </div>
  );
}

export default function App() {
  return (
    <ModalFlowProvider>
      <AppErrorBoundary>
        <AppContent />
      </AppErrorBoundary>
    </ModalFlowProvider>
  );
}
