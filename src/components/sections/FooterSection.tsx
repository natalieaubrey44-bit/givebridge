import { Instagram, Twitter } from "lucide-react";

type FooterSectionProps = {
  onHomeClick: () => void;
};

export function FooterSection({ onHomeClick }: FooterSectionProps) {
  const whatsappLink = "https://wa.me/19365263055";

  return (
    <footer id="contact" className="bg-black text-white pt-12 pb-8 section-px">
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          <div>
            <h4 className="text-[9px] font-black uppercase text-gray-600 mb-5 tracking-[0.2em]">Sitemap</h4>
            <ul className="space-y-3 text-[13px] font-medium">
              {[
                ["Home", "#home"],
                ["Campaign", "#campaigns"],
                ["Impact", "#how-it-works"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      onHomeClick();
                      window.location.hash = href;
                    }}
                    className="text-gray-300 hover:text-brand-lime transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start sm:items-center sm:text-center">
            <h4 className="text-[9px] font-black uppercase text-gray-600 mb-5 tracking-[0.2em]">Head Quarter Office</h4>
            <p className="text-[13px] text-gray-300 font-medium leading-relaxed mb-5">
              220 Church Street,
              <br />
              New Haven, CT 06510,
              <br />
              United States
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:border-brand-lime hover:text-brand-lime"
            >
              WhatsApp: +1 936 526 3055
            </a>
            <div className="flex gap-5">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <h4 className="text-[9px] font-black uppercase text-gray-600 mb-5 tracking-[0.2em]">Achievement</h4>
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 40 100" className="w-8 h-20 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 10 C20 12 10 20 8 30 C12 26 18 22 26 20 C20 24 14 30 12 38 C16 34 22 30 30 28 C24 32 18 40 17 48 C21 44 26 40 33 38 C28 43 23 50 22 58 C26 54 30 50 36 48 C32 54 28 62 28 70 C31 66 34 60 38 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M30 8 C26 14 20 18 14 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M28 22 C24 26 18 30 12 32" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M27 36 C23 40 17 43 11 44" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M26 50 C22 54 17 56 11 56" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M27 64 C23 67 18 69 13 68" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
              <div className="text-center px-1">
                <div className="text-[14px] font-black uppercase text-white leading-tight tracking-tight">Website Of</div>
                <div className="text-[14px] font-black uppercase text-white leading-tight tracking-tight">The Day</div>
              </div>
              <svg viewBox="0 0 40 100" className="w-8 h-20 fill-white mirror-x" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 10 C20 12 10 20 8 30 C12 26 18 22 26 20 C20 24 14 30 12 38 C16 34 22 30 30 28 C24 32 18 40 17 48 C21 44 26 40 33 38 C28 43 23 50 22 58 C26 54 30 50 36 48 C32 54 28 62 28 70 C31 66 34 60 38 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M30 8 C26 14 20 18 14 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M28 22 C24 26 18 30 12 32" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M27 36 C23 40 17 43 11 44" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M26 50 C22 54 17 56 11 56" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M27 64 C23 67 18 69 13 68" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-3 items-center gap-3 sm:gap-0 pt-8 border-t border-gray-800 text-[11px] font-medium text-gray-600">
          <div>© GIVEBRIDGE Inc.</div>
          <div className="sm:text-center">
            <a href="#" className="hover:text-white transition-colors">Terms of Services</a>
          </div>
          <div className="sm:text-right">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <img src="/assets/brand/logo-mark.svg" className="w-14 h-14 md:w-16 md:h-16 shrink-0" alt="Givebridge logo" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-[-0.04em] uppercase">GIVEBRIDGE</h1>
        </div>
      </div>
    </footer>
  );
}
