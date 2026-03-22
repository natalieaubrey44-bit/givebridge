import { ArrowRight } from "lucide-react";
import { useModalFlow, type FlowKey } from "../../hooks/useModalFlow";
import { Counter, DonateNowAction, SupporterFaceStack } from "../common/CommonUI";
import { CAMPAIGNS_DATA } from "../../data/campaignsData";
import { AVATAR_HERO } from "../../data/avatarAssets";

type HeroSectionProps = {
  onCampaignSelect: (id: string) => void;
};

export function HeroSection({ onCampaignSelect }: HeroSectionProps) {
  const { openFlow } = useModalFlow();

  return (
    <section id="home" className="section-px py-10 lg:py-0 lg:section-100vh">
      <div className="max-w-360 mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
          <div className="flex flex-col justify-center lg:py-16">
            <div className="flex items-center gap-3 mb-5">
              <SupporterFaceStack
                borderClass="border-brand-cream"
                sizeClass="h-7 w-7 lg:h-9 lg:w-9"
                images={AVATAR_HERO}
              />
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                17M+ people helping others
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-[1.05] tracking-tight mb-6">
              Your{" "}
              <span className="inline-block border-2 border-black bg-brand-lime px-2.5 py-0.5 rounded-xl">
                Kindness
              </span>
              <br />
              Can Change
              <br />
              Someone&apos;s Life
            </h1>

            <div className="flex flex-wrap gap-2.5 lg:gap-4 mb-6">
              <button
                onClick={() => openFlow("neilFlow", 0, CAMPAIGNS_DATA.neil)}
                type="button"
                className="bg-black text-white px-5 lg:px-7 py-3 lg:py-3.5 rounded-2xl font-black flex items-center gap-2 group text-[10px] lg:text-[11px] uppercase tracking-[0.15em] hover:bg-gray-900 transition-all whitespace-nowrap cursor-pointer"
              >
                DONATE NOW <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                className="bg-white border-2 border-black px-5 lg:px-7 py-3 lg:py-3.5 rounded-2xl font-black flex items-center gap-2 text-[10px] lg:text-[11px] uppercase tracking-[0.15em] hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-brand-lime border-2 border-black shrink-0" />
                START CAMPAIGN
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="rounded-4xl overflow-hidden w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-4/5 relative border-2 border-black/5 shadow-lg">
              <img src="/assets/images/hero/neil-portrait.avif" className="w-full h-full object-cover" alt="Neil - Portrait" />
              <div
                onClick={() => onCampaignSelect("neil")}
                className="absolute bottom-3 left-3 right-3 bg-white p-3 rounded-xl shadow-lg border border-black/5 cursor-pointer hover:border-black/20 transition-all"
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-black text-xs leading-tight uppercase tracking-tight flex-1">Support Neil</h3>
                  <span className="border-2 border-black bg-white text-black text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-widest shrink-0 whitespace-nowrap">
                    <div className="w-1 h-1 bg-[#BF5B5B] rounded-full" /> NEUROBLASTOMA
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-[#BF5B5B] rounded-full flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-2 h-2 text-white fill-current">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-[8px] text-gray-600 font-black uppercase tracking-tight">
                    Nationwide Children&apos;s Hospital
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-[8px] font-black mb-1 uppercase tracking-widest text-gray-400">
                    <span>Raised</span>
                    <Counter end={41200} pct={43} duration={2000} />
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#BF5B5B] w-[43%] rounded-full" />
                  </div>
                </div>
                <DonateNowAction
                  size="sm"
                  fullWidth
                  onMainClick={(event) => {
                    event.preventDefault();
                    openFlow("neilFlow" as FlowKey, 0, CAMPAIGNS_DATA.neil);
                  }}
                  onArrowClick={(event) => {
                    event.stopPropagation();
                    openFlow("neilFlow" as FlowKey, 0, CAMPAIGNS_DATA.neil);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
