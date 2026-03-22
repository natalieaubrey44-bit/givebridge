export function HashtagTicker() {
  return (
    <div className="bg-brand-lime py-3 overflow-hidden whitespace-nowrap border-y border-black">
      <div className="inline-block animate-marquee">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i}>
            <span className="text-xs font-bold uppercase mx-6">#Charity</span>
            <span className="text-xs font-bold uppercase mx-6">#Crowdfunding</span>
            <span className="text-xs font-bold uppercase mx-6">#Disaster</span>
            <span className="text-xs font-bold uppercase mx-6">#Donation</span>
            <span className="text-xs font-bold uppercase mx-6">#GiveHope</span>
            <span className="text-xs font-bold uppercase mx-6">#HelpChildren</span>
          </span>
        ))}
      </div>
    </div>
  );
}
