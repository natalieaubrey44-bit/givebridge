export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-brand-cream section-px py-16 md:py-20">
      <div className="max-w-360 mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-14">
          <div className="flex flex-col">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight mb-4">How It Works</h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 max-w-sm">
                Publish your campaign and spread the word. Share it across social media, email, communities, and anyone who believes in your vision. The more people you reach, the faster your momentum grows.
              </p>
              <button type="button" className="border-2 border-black px-6 py-2.5 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest hover:bg-black hover:text-white transition-all w-fit cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-lime border border-black" />
                Start a campaign
              </button>
            </div>
            <div className="flex gap-12 mt-12">
              <div className="stat-box">
                <div className="stat-value">98%</div>
                <div className="stat-label">Success rate</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">$125M+</div>
                <div className="stat-label">Total Funded</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "Create Campaign", desc: "", active: false, n: "1" },
              {
                label: "Build Community",
                desc: "Share your vision and engage supporters. Build momentum with updates, rewards, and authentic connection.",
                active: true,
                n: "2",
              },
              { label: "Get Funded", desc: "", active: false, n: "3" },
            ].map(({ label, desc, active, n }) => (
              <div key={n} className="relative flex items-center gap-4">
                <span className="absolute -left-8 text-6xl font-black text-gray-100 select-none leading-none pointer-events-none hidden md:block">{n}</span>
                <div className={`relative z-10 flex-1 flex ${desc ? "items-start" : "items-center"} gap-4 p-4 rounded-2xl transition-all duration-200 ${active ? "bg-brand-lime shadow-sm" : "border-2 border-gray-200 hover:border-black bg-brand-cream"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-black/10 mt-0.5" : "border-2 border-gray-200"}`}>
                    {n === "1" ? "🌐" : n === "2" ? "👥" : "🏆"}
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-tight mb-1">{label}</h3>
                    {desc && <p className="text-[11px] text-black/65 font-medium leading-relaxed">{desc}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-lime rounded-3xl px-6 sm:px-8 py-7 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight max-w-lg">
            Tracing the path of every donation as it transforms into help, healing, and hope for those who need it most.
          </h2>
          <button type="button" className="border-2 border-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all whitespace-nowrap w-fit shrink-0 cursor-pointer">
            Read Our Story
          </button>
        </div>

        <div className="relative">
          <div className="flex justify-end gap-2 mb-4">
            <button type="button" aria-label="Previous" className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors bg-brand-cream text-sm cursor-pointer">
              ←
            </button>
            <button type="button" aria-label="Next" className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors bg-brand-cream text-sm cursor-pointer">
              →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            <div className="relative rounded-2xl overflow-hidden shrink-0 w-5/12 sm:w-5/12 min-w-50 aspect-3/4 snap-start">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Story 1" />
              <button type="button" aria-label="View story" className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-brand-lime px-3 py-2 rounded-xl">
                <p className="text-[10px] font-black uppercase leading-tight">Journey of Hope: How Your Support Reached Those in Need</p>
              </div>
            </div>
            {[
              "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=400",
            ].map((src, i) => (
              <div key={src} className="relative rounded-2xl overflow-hidden flex-1 min-w-30 aspect-3/4 snap-start">
                <img src={src} className="w-full h-full object-cover" alt={`Story ${i + 2}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
