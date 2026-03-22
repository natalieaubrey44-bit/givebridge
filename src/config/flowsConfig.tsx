import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Heart, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components for Steps ---

const FlowBadge = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="mb-4">
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-black/60 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
      Progress: {Math.round(((currentStep + 1) / totalSteps) * 100)}%
      <span className="mx-2 text-black/20">|</span>
      Step {currentStep + 1} of {totalSteps}
    </div>
  </div>
);

const StepHeader = ({ title, subtitle, currentStep, totalSteps, onClose }: any) => (
  <div className="relative pb-4 border-b border-black/5 mb-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] text-black/60 outline-none">
          <span className="h-1 w-1 rounded-full bg-brand-lime" />
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="size-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white transition-all shadow-sm"
      >
        <X size={14} />
      </button>
    </div>
    <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-black">
      {title}
    </h3>
    {subtitle && <p className="text-[9px] font-black text-black/40 mt-0.5 uppercase tracking-widest">{subtitle}</p>}
  </div>
);

/** Renders **bold** segments as <strong>; all other text is escaped via React text nodes (no HTML sink). */
function StoryParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-[11px]">
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="text-black font-black">
              {m[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

const StepFooter = ({ onNext, onBack, isFirst, isLast, nextLabel = "Next Step" }: any) => (
  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between gap-4">
    <div className="flex gap-2">
      {!isFirst && (
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 border-2 border-black/10 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-black/50 hover:border-black hover:text-black transition-all active:scale-95"
        >
          <ArrowLeft size={12} /> Back
        </button>
      )}
    </div>
    
    <button
      onClick={onNext}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg group active:scale-95 ${
        isLast ? 'bg-brand-lime text-black border-2 border-black' : 'bg-black text-white hover:bg-gray-900 border-2 border-black'
      }`}
    >
      {isLast ? "Complete" : nextLabel}
      {!isLast && <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
    </button>
  </div>
);

// --- CAMPAIGN SUMMARY STEP ---
const CampaignSummaryStep = ({ data, onNext, onBack, currentStep, totalSteps, ...props }: any) => {
  if (!data) return <div className="p-10 text-center">Loading campaign details...</div>;

  return (
    <div className="flex flex-col gap-4 py-0.5">
      <FlowBadge currentStep={currentStep} totalSteps={totalSteps} />
      <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        {/* Left Card */}
        <div className="bg-white border-2 border-black/5 rounded-[28px] p-4 shadow-lg flex flex-col gap-3">
           <div className="inline-block px-3 py-1 bg-brand-cream border border-black/5 rounded-full w-fit">
              <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Featured Campaign</span>
           </div>
           
           <div>
              <h1 className="text-lg font-black uppercase tracking-tight mb-1 leading-tight sm:text-xl">{data.name}</h1>
              <p className="text-[11px] font-medium text-black/50 uppercase tracking-tight">Fighting {data.condition} with everything he has.</p>
           </div>

           <div className="bg-brand-cream/30 p-4 rounded-2xl border border-black/5 flex flex-col gap-3">
              <div className="flex justify-between items-end">
                 <div className="flex flex-col gap-0">
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Raised so far</span>
                    <span className="text-lg font-black">${data.raised.toLocaleString()}</span>
                 </div>
                 <span className="text-sm font-black text-brand-lime bg-black px-2 py-0.5 rounded-full">{Math.round((data.raised / data.goal) * 100)}%</span>
              </div>
              <div className="h-2 bg-white rounded-full border border-black/5 overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(data.raised / data.goal) * 100}%` }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-brand-lime" 
                 />
              </div>
           </div>

        </div>

        {/* Right Card / Visual */}
        <div className="bg-white border-2 border-black/5 rounded-[28px] p-4 shadow-lg flex flex-col items-center justify-center text-center gap-3">
           <div className="relative size-24 sm:size-28">
              <div className="absolute inset-0 rounded-full bg-brand-lime/10 blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
                 <img src={data.image} alt={data.firstName} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 size-8 bg-brand-lime border border-black rounded-full flex items-center justify-center shadow-md">
                 <Heart size={14} fill="black" />
              </div>
           </div>
           
           <p className="text-[8px] font-medium text-black/50 leading-relaxed italic max-w-[150px] sm:text-[9px]">
              "{data.firstName}'s campaign remains the primary focus on Givebridge while supporters rally."
           </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <button 
          onClick={onNext}
          className="w-full bg-white text-black py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.18em] shadow-lg hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 group sm:py-3.5 sm:text-[10px]"
        >
          Donate to {data.firstName} via BitPay <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        
        <div className="flex items-center justify-between gap-3 px-0.5">
           <button 
             onClick={onBack}
             disabled={props.currentStep === 0}
             className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors disabled:opacity-0"
           >
             <ArrowLeft size={12} /> Prev Step
           </button>
           <button 
             onClick={onNext}
             className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/60 hover:text-black transition-colors group"
           >
             Next Page <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

// --- STORY STEP ---
const CampaignStoryStep = ({ data, onNext, onBack, currentStep, totalSteps, ...props }: any) => {
  const [index, setIndex] = useState(0);
  if (!data) return null;

  const images = data.gallery && data.gallery.length > 0 
    ? data.gallery 
    : [{ src: data.image, caption: data.firstName }];

  // Auto-play
  React.useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex flex-col gap-4 py-0.5">
      <FlowBadge currentStep={currentStep} totalSteps={totalSteps} />
      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Story Text */}
        <div className="flex flex-col gap-3">
           <h2 className="text-xl font-black uppercase tracking-tight mb-0.5 sm:text-2xl">His Story</h2>
           <div className="prose prose-xs max-w-none text-black/60 font-medium leading-[1.6] space-y-3">
             {data.story.split('\n\n').slice(0, 3).map((p: string, i: number) => (
                <StoryParagraph key={i} text={p} />
             ))}
           </div>
        </div>

        {/* Right Column: Image Carousel */}
        <div className="relative rounded-[28px] overflow-hidden border-2 border-white shadow-xl aspect-3/4 max-h-[260px] bg-black/5">
           <AnimatePresence mode="wait">
             <motion.img
               key={index}
               src={images[index].src}
               alt={images[index].caption || "Story visual"}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full object-cover"
             />
           </AnimatePresence>
           
           <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
           
           {/* Caption */}
           {images[index].caption && (
             <motion.div 
               key={`caption-${index}`}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 p-2.5 rounded-xl z-10"
             >
                <p className="text-[8px] font-black text-white uppercase tracking-widest leading-tight">
                  {images[index].caption}
                </p>
             </motion.div>
           )}

           {/* Pagination Dots */}
           {images.length > 1 && (
             <div className="absolute top-4 right-4 flex gap-1.5 z-10">
               {images.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setIndex(i)}
                   className={`h-1 rounded-full transition-all duration-300 ${
                     i === index ? "w-4 bg-brand-lime" : "w-1 bg-white/50"
                   }`}
                 />
               ))}
             </div>
           )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-black/5">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors active:scale-95"
        >
          <ArrowLeft size={12} /> Previous Page
        </button>
        <button 
          onClick={onNext}
          className="bg-black text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg active:scale-95 group border border-black"
        >
          Medical Details <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- MEDICAL DETAILS STEP ---
const CampaignMedicalStep = ({ data, onNext, onBack, currentStep, totalSteps, ...props }: any) => {
  if (!data) return null;

  const details = [
    { label: "Hospital", value: data.hospital, icon: "🏥" },
    { label: "Diagnosis", value: data.condition, icon: "🧬" },
    { label: "Treatment", value: data.treatment, icon: "💊" },
    { label: "Expected Surgery", value: data.surgeryDate, icon: "📅" },
    { label: "Lead Oncologist", value: data.oncologist, icon: "👨‍⚕️" },
  ];

  const pct = Math.round((data.raised / data.goal) * 100);

  return (
    <div className="flex flex-col gap-4 py-0.5">
      <FlowBadge currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="text-xl font-black uppercase tracking-tight sm:text-2xl">Medical Details</h2>
      
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
        {details.map((detail, i) => (
          <div key={i} className="bg-white border-2 border-black/5 rounded-2xl p-3.5 shadow-sm flex flex-col gap-2 group hover:border-black/10 transition-all">
            <div className="flex items-center gap-2">
              <span className="text-sm">{detail.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{detail.label}:</span>
            </div>
            <p className="text-[11px] font-bold text-black/70 leading-relaxed">
              {detail.value}
            </p>
          </div>
        ))}

        {/* Progress Bar Card (Replacing Total Estimated Cost) */}
        <div className="bg-white border-2 border-black/5 rounded-2xl p-3.5 shadow-sm flex flex-col justify-center gap-3">
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               <span className="text-sm">📈</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Fundraising Progress:</span>
             </div>
             <span className="text-[10px] font-black text-brand-lime bg-black px-2 py-0.5 rounded-full">{pct}%</span>
           </div>
           <div className="flex flex-col gap-1.5">
             <div className="h-2 bg-black/5 rounded-full overflow-hidden border border-black/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-brand-lime"
                />
             </div>
             <div className="flex justify-between items-center">
               <span className="text-[11px] font-black text-black">${data.raised.toLocaleString()}</span>
               <span className="text-[9px] font-black text-black/20 uppercase tracking-widest">Raised</span>
             </div>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-2 pt-3 border-t border-black/5">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors active:scale-95"
        >
          <ArrowLeft size={12} /> Previous Page
        </button>
        <button 
          onClick={onNext}
          className="bg-black text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg active:scale-95 group border border-black"
        >
          Continue <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- Final Step Component ---
const ConfettiBurst = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
        animate={{ 
          y: (Math.random() - 0.5) * 600, 
          x: (Math.random() - 0.5) * 600, 
          opacity: 0,
          rotate: Math.random() * 360,
          scale: 0.5
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute size-2 rounded-full"
        style={{ backgroundColor: i % 2 === 0 ? '#B6F61F' : '#BF5B5B' }}
      />
    ))}
  </div>
);

function openExternalUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

const FinalStep = ({ name, bitpayUrl = "https://bitpay.com/", onClose, ...props }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-4 relative">
      <ConfettiBurst />
      
      <div className="size-16 bg-brand-lime rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(182,246,31,0.4)] border-2 border-black relative z-10">
        <CheckCircle2 size={28} className="text-black" />
      </div>

      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 relative z-10">You're Awesome!</h3>
      <p className="text-[11px] font-medium text-black/60 max-w-[240px] mb-8 leading-relaxed relative z-10">
        Your support for {name} will make a direct impact. Complete your donation via BitPay to finalize.
      </p>

    <div className="space-y-3 w-full relative z-10 max-w-[300px]">
        <a
          href={bitpayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-black text-white px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 group border border-black"
        >
          DONATE VIA BITPAY <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </a>

        <div className="flex gap-2.5 justify-center pt-4 items-center">
           <button type="button" onClick={() => openExternalUrl('https://twitter.com/intent/tweet?text=Support this campaign!')} className="size-10 rounded-full border-2 border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><Twitter size={14} /></button>
           <button type="button" onClick={() => openExternalUrl('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href))} className="size-10 rounded-full border-2 border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><Facebook size={14} /></button>
           <button 
             onClick={handleCopy}
             className="flex items-center gap-2 border-2 border-black/5 bg-white px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:border-black transition-all shadow-sm active:scale-95"
           >
              {copied ? <><Check size={12} className="text-brand-lime" /> Copied!</> : <><LinkIcon size={12} /> Copy Link</>}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Flow Definitions ---

const createCampaignFlow = (name: string, condition: string, extraSteps: any[] = []) => [
  {
    wide: true,
    render: (props: any) => <CampaignSummaryStep {...props} data={props.flowData} />
  },
  {
    wide: true,
    render: (props: any) => <CampaignStoryStep {...props} data={props.flowData} />
  },
  {
    wide: true,
    render: (props: any) => <CampaignMedicalStep {...props} data={props.flowData} />
  },
  ...extraSteps,
  {
    render: (props: any) => <FinalStep {...props} name={name} />
  }
];

export const flows = {
  neilFlow: createCampaignFlow("Neil", "Cancer"),
  liamFlow: createCampaignFlow("Liam", "Leukemia"),
  ariaFlow: createCampaignFlow("Aria", "Heart Disease"),
  donationFlow: [
    {
       title: "Confirm Campaign",
       wide: true,
       render: (props: any) => <CampaignSummaryStep {...props} data={props.flowData} />
    },
    {
       title: "His Story",
       wide: true,
       render: (props: any) => <CampaignStoryStep {...props} data={props.flowData} />
    },
    {
       title: "Medical Details",
       wide: true,
       render: (props: any) => <CampaignMedicalStep {...props} data={props.flowData} />
    },
    {
      title: "Choose Amount",
      content: (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[25, 50, 100, 250].map((amt) => (
            <button key={amt} className="p-4 border-2 border-black/5 hover:border-black rounded-xl font-black transition-all text-base">
              ${amt}
            </button>
          ))}
          <div className="col-span-2 p-4 border-2 border-black/5 rounded-xl flex items-center justify-between">
            <span className="text-[11px] uppercase font-black text-black/20">$</span>
            <input type="number" placeholder="Other amount" className="bg-transparent border-none outline-none text-right font-black text-base w-full" />
          </div>
        </div>
      )
    },
    {
      render: (props: any) => <FinalStep {...props} name={props.flowData?.firstName || "this campaign"} />
    }
  ],
  supportFlow: [
    {
      title: "Ways to Help",
      content: (
        <div className="space-y-3">
          <div className="p-5 bg-brand-lime/10 rounded-2xl border-2 border-brand-lime/20 flex gap-3 items-start">
            <Share2 className="text-black shrink-0" size={20} />
            <div>
               <h4 className="font-black uppercase text-[10px] mb-0.5 tracking-widest text-black">Share Campaign</h4>
               <p className="text-[10px] font-medium text-black/60 leading-relaxed">Sharing on social media doubles the chances of reaching a goal.</p>
            </div>
          </div>
          <div className="p-5 bg-black/5 rounded-2xl border-2 border-black/5 flex gap-3 items-start">
            <MapPin className="text-black shrink-0" size={20} />
            <div>
               <h4 className="font-black uppercase text-[10px] mb-0.5 tracking-widest text-black">How it reaches them</h4>
               <p className="text-[10px] font-medium text-black/60 leading-relaxed">Funds are settled directly with the verified medical provider.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      render: (props: any) => <FinalStep {...props} name="the children" />
    }
  ]
};
