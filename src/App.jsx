import React, { useEffect, useState, useRef } from 'react';

// --- Icons based on the screenshot/UI ---
const IconDroplet = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconSpray = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2h5a2.5 2.5 0 0 1 2.5 2.5V5h-10v-.5A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M7 5v2a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V5" />
    <path d="M9 10v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V10" />
  </svg>
);

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconBolt = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#E6FF00]">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const DemoWidget = () => {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && step > 0) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [step]);

  const simulateWash = () => {
    setStep(1);
    setTimeout(() => setStep(2), 800);
    setTimeout(() => setStep(3), 1600);
    setTimeout(() => setStep(4), 2400);
    setTimeout(() => setStep(5), 3200);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = {
    tldr: "Project canceled. Contractors fired. Money saved.",
    truth: "We're firing external help to save budget and shifting their workload onto you for $0 extra pay.",
    actions: [
      "Mark: Fire contractors by EOD tomorrow.",
      "Sarah: Lie to the client—call it an 'upgrade'."
    ],
    washed: "We are canceling the project and letting the contractors go to improve efficiency. Talk to the client and frame this as a strategic upgrade. Everyone needs to assist with the transition."
  };

  const SectionHeader = ({ icon: Icon, title, colorClass, showInfo = false }) => (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 mb-2 ${colorClass}`}>
      <div className="text-white/40"><IconArrowRight /></div>
      <div className="flex items-center gap-2">
        {Icon && <Icon />}
        <span className="text-[10px] font-black tracking-[0.15em] uppercase">{title}</span>
        {showInfo && <IconInfo />}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[400px] h-[520px] bg-[#000000] flex flex-col relative overflow-hidden rounded-xl border-t border-white/10 shadow-[0px_40px_80px_-20px_rgba(0,0,0,0.8)] mx-auto font-mono antialiased">

      {/* Header */}
      <div className="h-14 shrink-0 border-b border-white/5 flex items-center justify-between px-5 bg-[#000000] z-20">
        <div className="flex items-center gap-3">
          <div className="text-[#00E5FF]"><IconDroplet className="w-5 h-5" /></div>
          <span className="text-sm font-black tracking-widest text-white uppercase">SLOPWASH</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/40">
           <button aria-label="Spray" className="hover:text-white transition-colors"><IconSpray /></button>
           <button aria-label="History" className="hover:text-white transition-colors"><IconHistory /></button>
           <button aria-label="Close" className="hover:text-white transition-colors"><IconX /></button>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative p-5 space-y-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {step === 0 ? (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
             <div className="flex justify-between items-center mb-4">
               <span className="text-[9px] font-bold text-neutral-600 tracking-widest uppercase">Buffer: Incoming Stream</span>
               <span className="text-[9px] font-bold text-[#FF4500] px-2 py-0.5 bg-[#FF4500]/5 rounded border border-[#FF4500]/20 italic">TRASH DETECTED</span>
             </div>
             <div className="flex-1 bg-[#050505] p-4 border border-white/5 rounded-lg">
               <textarea
                readOnly
                className="w-full h-full bg-transparent border-none resize-none focus:ring-0 text-neutral-500 text-[11px] leading-relaxed outline-none"
                defaultValue={`Subject: Urgent: Q3 Agile Transformation & Resource Reallocation\n\nTeam,\n\nIn order to maintain our competitive edge and foster synergistic alignment across the enterprise, leadership has decided to pivot our Q3 roadmap. We are transitioning to a hyper-agile framework to optimize our bandwidth and right-size our departmental spend.\n\nEffective immediately, the migration project is sunsetting. Mark: wind down contractors. Sarah: operationalize client messaging.`}
               />
             </div>
          </div>
        ) : (
          <div className="space-y-4 pb-12">
             {/* 1. TL;DR */}
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SectionHeader title="TL;DR" colorClass="text-[#00E5FF] border-[#00E5FF]/20 bg-[#00E5FF]/5" />
                {step >= 2 && <p className="px-5 text-xs text-white/80 leading-relaxed mb-6">{content.tldr}</p>}
             </div>

             {/* 2. TRUTH */}
             {step >= 2 && (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <SectionHeader title="TRUTH" icon={IconBolt} colorClass="text-[#E6FF00] border-[#E6FF00]/20 bg-[#E6FF00]/5" showInfo={true} />
                  {step >= 3 && <p className="px-5 text-xs text-[#E6FF00] leading-relaxed italic mb-6">"{content.truth}"</p>}
               </div>
             )}

             {/* 3. ACTIONS */}
             {step >= 3 && (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <SectionHeader title="ACTIONS" colorClass="text-[#00FF66] border-[#00FF66]/20 bg-[#00FF66]/5" />
                  {step >= 4 && (
                    <div className="px-5 space-y-2 mb-6">
                      {content.actions.map((act, i) => (
                        <div key={i} className="text-[11px] text-white/60 flex items-start gap-2">
                           <span className="text-[#00FF66]">›</span> {act}
                        </div>
                      ))}
                    </div>
                  )}
               </div>
             )}

             {/* 4. WASH */}
             {step >= 4 && (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <SectionHeader title="WASH" colorClass="text-[#00E5FF] border-[#00E5FF]/20 bg-[#00E5FF]/5" />
                  {step >= 5 && (
                    <div className="px-5 text-[11px] text-neutral-400 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                      {content.washed}
                    </div>
                  )}
               </div>
             )}
          </div>
        )}
      </div>

      {/* Footer Button Area */}
      <div className="p-5 bg-gradient-to-t from-[#000000] to-transparent">
        {step === 0 ? (
          <button
            onClick={simulateWash}
            className="w-full h-12 bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 hover:bg-[#00E5FF] active:scale-[0.98]"
          >
            PRESSURE WASH
          </button>
        ) : (
          <button
            onClick={handleCopy}
            disabled={step < 5}
            className={`w-full h-12 font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 border rounded-lg ${
              step < 5
                ? 'border-white/10 text-white/20 cursor-not-allowed'
                : copied
                  ? 'bg-[#00FF66] border-[#00FF66] text-black'
                  : 'border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF]/10'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            {copied ? 'COPIED TO CLIPBOARD' : 'COPY FULL REPORT'}
          </button>
        )}
      </div>
    </div>
  );
};

export default function SlopWashLanding() {
  useEffect(() => {
    document.title = 'SlopWash — Stop Reading AI Slop. Get to the Point.';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'SlopWash is a native macOS utility that cuts through corporate jargon and AI slop. Highlight any text, press ⌘⇧W, and get the blunt truth. One-time license. No cloud. No subscriptions.');

    const script = document.createElement('script');
    script.src = "https://gumroad.com/js/gumroad.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#00E5FF] selection:text-black scroll-smooth">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Navbar */}
      <header>
        <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between sticky top-0 z-50 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="text-[#00E5FF] bg-[#00E5FF]/10 p-2 rounded border border-[#00E5FF]/30">
              <IconDroplet className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">SlopWash</span>
          </div>
          <div className="flex items-center gap-10">
            <a href="#benefits" className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 hover:text-[#00E5FF] transition-colors hidden md:block">Benefits</a>
            <a href="#about" className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 hover:text-[#00E5FF] transition-colors hidden md:block">About</a>
            <a href="#faq" className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 hover:text-[#00E5FF] transition-colors hidden md:block">FAQ</a>
            <a
              href="https://ampedintel.gumroad.com/l/slopwash"
              rel="noopener noreferrer"
              data-gumroad-overlay-checkout="true"
              className="px-6 py-3 text-[10px] font-black tracking-[0.3em] uppercase bg-[#00E5FF] text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            >
              GET - $14.99
            </a>
          </div>
        </nav>
      </header>

      <main>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6FF00] text-black text-[10px] font-black tracking-[0.2em] uppercase border border-black shadow-[4px_4px_0_0_#000]">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
              NATIVE MACOS UTILITY
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
              Stop reading AI slop. <br/>
              <span className="text-[#00E5FF] italic">Get to the f*cking point.</span>
            </h1>

            <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed max-w-xl font-mono">
              Stop drowning in jargon. Highlight any text, hit <span className="text-white border-b-2 border-[#00E5FF]">⌘⇧W</span>, and see the blunt reality.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <a
                href="https://ampedintel.gumroad.com/l/slopwash"
                rel="noopener noreferrer"
                data-gumroad-overlay-checkout="true"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 py-6 bg-[#00E5FF] text-black font-black text-sm tracking-[0.3em] uppercase border-2 border-black hover:bg-white hover:translate-y-[-2px] transition-all shadow-[8px_8px_0px_0px_#00E5FF33]"
              >
                Buy Lifetime License
              </a>
              <div className="space-y-1">
                <p className="text-[10px] font-black tracking-widest text-[#00FF66] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]"></span> 7-Day Free Trial
                </p>
                <p className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Drop it for any reason.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-20 bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <DemoWidget />
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section id="benefits" className="relative z-10 border-y border-white/5 bg-[#050505] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="text-[#00E5FF] font-black text-4xl">01</div>
              <h3 className="text-2xl font-black uppercase tracking-tight">GLOBAL SNAPPING</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-mono italic">Highlight any text in any app. Slack, Chrome, Mail, Zoom chat. Hit the bind. Get the report.</p>
            </div>

            <div className="space-y-6">
              <div className="text-[#FF4500] font-black text-4xl">02</div>
              <h3 className="text-2xl font-black uppercase tracking-tight">THE TRUTH ENGINE</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-mono italic">We don't summarize. We decode. Rips away corporate politeness to find the actual intent behind the words.</p>
            </div>

            <div className="space-y-6">
              <div className="text-[#E6FF00] font-black text-4xl">03</div>
              <h3 className="text-2xl font-black uppercase tracking-tight">LOCAL METAL</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-mono italic">No cloud telemetry. All AI processing happens on your local macOS chip. Your data is your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <div className="text-[10px] font-black tracking-[0.3em] uppercase text-[#00E5FF]">Why This Exists</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic">
              Your time is worth more than AI slop.
            </h2>
          </div>
          <div className="space-y-8 font-mono">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Emails. Slack threads. Meeting recaps. They're full of carefully worded nothing — language designed to sound important while saying as little as possible.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              SlopWash isn't a productivity app. It's a <span className="text-white">bullshit filter</span>. We built it because decoding vague corporate speak is not a skill anyone asked to develop.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed font-black uppercase tracking-wide">
              Sometimes you just need to get to the point.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-black uppercase mb-20 italic text-center">QUESTIONS?</h2>
        <div className="space-y-12">
          {[
            {
              q: "Is it just a wrapper?",
              a: "No. We run local models optimized to be blunt. It's explicitly tuned to avoid the flowery language typical of AI. It's an anti-slop tool."
            },
            {
              q: "Is my work data safe?",
              a: "100%. Processing happens on your machine. We have no servers, no databases, and no idea who you are or what you're washing."
            },
            {
              q: "Why a one-time fee?",
              a: "Subscriptions are the financial equivalent of jargon. Pay once ($14.99). Own it forever. Simple as that."
            }
          ].map((item, i) => (
            <div key={i} className="group border-l-2 border-white/10 pl-8 hover:border-[#00E5FF] transition-all">
              <h3 className="text-xl font-black text-white mb-4 uppercase">{item.q}</h3>
              <p className="text-neutral-500 font-mono text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      </main>

      <footer className="py-40 bg-[#000] text-center border-t border-white/5">
        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic mb-12">
          WASH THE <br/><span className="text-white/5">BULLSHIT.</span>
        </h2>
        <a
          href="https://ampedintel.gumroad.com/l/slopwash"
          rel="noopener noreferrer"
          data-gumroad-overlay-checkout="true"
          className="inline-block px-16 py-8 bg-white text-black font-black text-xl tracking-[0.4em] uppercase hover:bg-[#00E5FF] transition-all"
        >
          START FREE TRIAL
        </a>
        <p className="mt-6 text-[10px] font-black tracking-widest text-neutral-500 uppercase">7 days free. Drop it for any reason.</p>
        <div className="mt-20 text-[10px] text-neutral-600 font-mono tracking-[0.5em] uppercase">
          © {new Date().getFullYear()} SLOPWASH. BY HUMANS. FOR HUMANS.
        </div>
      </footer>

      <style>{`
        :root {
          --font-sans: 'Space Grotesk', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        body {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          background-color: #09090B;
        }

        .font-mono {
          font-family: var(--font-mono);
        }

        ::selection {
          background-color: #00E5FF;
          color: #000;
        }
      `}</style>
    </div>
  );
}
