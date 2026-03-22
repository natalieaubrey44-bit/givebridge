import { useModalFlow, type FlowKey } from "../../hooks/useModalFlow";
import { Counter, DonateNowAction, SupporterFaceStack } from "../common/CommonUI";
import { CAMPAIGNS_DATA } from "../../data/campaignsData";
import { AVATAR_CAMPAIGN_BANNER } from "../../data/avatarAssets";

type FeaturedCampaignsSectionProps = {
  onCampaignSelect: (id: string) => void;
};

export function FeaturedCampaignsSection({ onCampaignSelect }: FeaturedCampaignsSectionProps) {
  const { openFlow } = useModalFlow();

  const campaigns = [
    {
      id: "liam",
      image: "/assets/images/campaigns/liam/cover.avif",
      data: CAMPAIGNS_DATA.liam,
    },
    {
      id: "aria",
      image: "/assets/images/campaigns/aria/cover.avif",
      data: CAMPAIGNS_DATA.aria,
    },
  ];

  return (
    <section id="campaigns" className="bg-black text-white section-px py-16 md:py-20">
      <div className="max-w-360 mx-auto w-full flex flex-col gap-6">
        <div className="relative pt-8 sm:pt-5">
          <div className="hidden sm:block absolute top-0 right-0 z-10 bg-white text-black text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-[0.12em] shadow-sm whitespace-nowrap">
            Your Donation Matters
          </div>

          <div className="bg-brand-lime text-black rounded-3xl px-5 sm:px-8 py-6 sm:py-7">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-[1.05] tracking-tight mb-6 max-w-3xl pr-0 sm:pr-44 md:pr-0">
              Children fighting for their lives - every donation brings them closer to recovery
            </h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <SupporterFaceStack
                  borderClass="border-brand-lime"
                  sizeClass="h-7 w-7"
                  images={AVATAR_CAMPAIGN_BANNER}
                />
                <span className="text-[11px] font-black uppercase tracking-widest text-black/60">17M+ people helping</span>
              </div>
              <p className="text-[12px] font-medium leading-snug text-black/70 md:max-w-65 md:text-right line-clamp-3">
                Discover children facing critical health battles right now. These campaigns are verified, transparent, and powered by families and communities rallying to fund life-saving care.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <div className="flex flex-col rounded-2xl overflow-hidden bg-white text-black group">
            <div className="relative overflow-hidden cursor-pointer" onClick={() => onCampaignSelect("liam")}>
              <img src={campaigns[0].image} className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500" alt="Liam" />
              <span className="absolute bottom-3 right-3 bg-white text-black text-[8px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> LEUKEMIA
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-black text-sm uppercase leading-tight tracking-tight">Support Liam</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tight">St. Jude Children&apos;s Research Hospital</span>
              </div>
              <div>
                <div className="flex justify-between text-[8px] font-black mb-1.5 uppercase tracking-widest text-gray-400">
                  <span>Raised</span><Counter end={34200} pct={58} duration={2000} />
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-purple-500 to-pink-400 w-[58%] rounded-full" />
                </div>
              </div>
              <DonateNowAction
                size="sm"
                fullWidth
                onMainClick={(event) => {
                  event.preventDefault();
                  openFlow("liamFlow" as FlowKey, 0, campaigns[0].data);
                }}
                onArrowClick={() => openFlow("liamFlow" as FlowKey, 0, campaigns[0].data)}
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-full hidden md:block">
            <img src="/assets/images/common/hospital-center.avif" className="w-full h-full object-cover min-h-90" alt="Child in hospital" />
          </div>

          <div className="flex flex-col rounded-2xl overflow-hidden bg-white text-black group">
            <div className="relative overflow-hidden cursor-pointer" onClick={() => onCampaignSelect("aria")}>
              <img src={campaigns[1].image} className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500" alt="Aria" />
              <span className="absolute bottom-3 right-3 bg-white text-black text-[8px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> HEART DISEASE
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-black text-sm uppercase leading-tight tracking-tight">Support Aria</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tight">Boston Children&apos;s Hospital</span>
              </div>
              <div>
                <div className="flex justify-between text-[8px] font-black mb-1.5 uppercase tracking-widest text-gray-400">
                  <span>Raised</span><Counter end={18600} pct={43} duration={2200} />
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-blue-500 to-cyan-400 w-[43%] rounded-full" />
                </div>
              </div>
              <DonateNowAction
                size="sm"
                fullWidth
                onMainClick={(event) => {
                  event.preventDefault();
                  openFlow("ariaFlow" as FlowKey, 0, campaigns[1].data);
                }}
                onArrowClick={() => openFlow("ariaFlow" as FlowKey, 0, campaigns[1].data)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
