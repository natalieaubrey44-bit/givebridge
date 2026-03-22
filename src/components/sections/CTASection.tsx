import { ArrowRight } from "lucide-react";
import { useModalFlow } from "../../hooks/useModalFlow";
import { CAMPAIGNS_DATA } from "../../data/campaignsData";

export function CTASection() {
  const { openFlow } = useModalFlow();

  return (
    <section id="donate" className="section-100vh relative flex items-center justify-center text-center section-px">
      <div className="absolute inset-0 overflow-hidden">
        <img src="/assets/images/common/cta-bg.avif" className="w-full h-full object-cover" alt="Community" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>
      <div className="relative z-10 max-w-2xl px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-tight tracking-tight">
          Become part of a compassionate community
        </h2>
        <p className="text-white/70 text-sm md:text-base font-medium mb-8 leading-relaxed">
          Together, we can close the gap between those who want to help and those who urgently need it.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openFlow("neilFlow", 0, CAMPAIGNS_DATA.neil)}
            type="button"
            className="bg-white text-black px-8 py-3 rounded-xl font-black flex items-center gap-2 uppercase text-[10px] md:text-[11px] tracking-[0.15em] hover:bg-brand-lime transition-colors cursor-pointer"
          >
            Donate Now <ArrowRight size={16} />
          </button>
          <button type="button" className="bg-black/20 backdrop-blur-xl border border-white/30 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 uppercase text-[10px] md:text-[11px] tracking-[0.15em] hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
            Start a Campaign
          </button>
        </div>
      </div>
    </section>
  );
}
