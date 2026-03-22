import { AVATAR_TESTIMONIAL_FAMILIES } from "../../data/avatarAssets";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-black text-white section-px py-16 md:py-20">
      <div className="max-w-360 mx-auto w-full">
        <div className="text-center mb-10">
          <div className="border border-gray-800 text-[9px] font-black px-4 py-2 rounded-full inline-block mb-5 uppercase tracking-[0.15em] text-gray-400">
            Testimonial
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight mb-3">What People Say About Us</h2>
          <p className="text-gray-500 text-sm font-medium max-w-md mx-auto leading-relaxed">
            Hear real stories from families whose children received life-changing support through Givebridge.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              seed: "fam1",
              hl: false,
              quote:
                '"When our son Joe was diagnosed with leukemia, we had no idea how we\'d cover treatment. Givebridge connected us with thousands of strangers who gave everything they could. He\'s in remission now. We\'ll never forget what this community did for our family."',
              name: "The Morrison Family",
              role: "Joe's Parents · Leukemia Survivor",
            },
            {
              seed: "fam2",
              hl: true,
              quote:
                '"Our daughter Lacey needed open-heart surgery at 4 years old. The bills were impossible. Within three weeks on Givebridge, we had raised enough to cover everything - and then some. She danced at her fifth birthday party. I still cry thinking about it."',
              name: "The Taylor Family",
              role: "Lacey's Parents · Heart Disease Survivor",
            },
            {
              seed: "fam3",
              hl: false,
              quote:
                '"Charlie spent eight months in hospital. Givebridge not only helped fund his treatment but gave us a community of people cheering him on every single day. He\'s home now, healthy and full of life. We are forever grateful."',
              name: "The Hartley Family",
              role: "Charlie's Parents · Cancer Survivor",
            },
          ].map(({ seed, hl, quote, name, role }, i) => {
            const avatarSrc = AVATAR_TESTIMONIAL_FAMILIES[i];
            return (
            <div key={seed} className={`p-6 rounded-2xl flex flex-col justify-between transition-colors ${hl ? "bg-brand-lime text-black shadow-lg" : "border border-gray-800 hover:border-gray-600"}`}>
              <p className={`text-sm leading-relaxed mb-6 ${hl ? "font-black" : "font-medium text-gray-300 italic"}`}>{quote}</p>
              <div className="flex items-center gap-3">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt=""
                    className={`h-10 w-10 shrink-0 rounded-full border-2 object-cover ${hl ? "border-black/20" : "border-gray-700"}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span
                    className={`h-10 w-10 shrink-0 rounded-full border-2 ${hl ? "border-black/20 bg-black/10" : "border-gray-700 bg-gray-700"}`}
                    aria-hidden="true"
                  />
                )}
                <div>
                  <div className="text-[12px] font-black uppercase tracking-tight">{name}</div>
                  <div className={`text-[9px] font-black uppercase ${hl ? "text-black/50" : "text-gray-500"}`}>{role}</div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
