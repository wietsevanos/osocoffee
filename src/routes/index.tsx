import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/oso-logo.png";
import bearBrown from "@/assets/bear-brown.png.asset.json";
import bearYellow from "@/assets/bear-yellow.svg.asset.json";
import bearBlue from "@/assets/bear-blue-outlined.png.asset.json";
import nyc1940Audio from "@/assets/nyc-1940.mp3.asset.json";

// Real photography — imported as CDN pointers.
import p15 from "@/assets/oso-15.jpg.asset.json";
import p31 from "@/assets/oso-31.jpg.asset.json";
import p35 from "@/assets/oso-35.jpg.asset.json";
import p37 from "@/assets/oso-37.jpg.asset.json";
import p42 from "@/assets/oso-42.jpg.asset.json";
import p63 from "@/assets/oso-63.jpg.asset.json";
import p64 from "@/assets/oso-64.jpg.asset.json";
import p70 from "@/assets/oso-70.jpg.asset.json";
import p71 from "@/assets/oso-71.jpg.asset.json";
import p79 from "@/assets/oso-79.jpg.asset.json";
import p95 from "@/assets/oso-95.jpg.asset.json";
import p105 from "@/assets/oso-105.jpg.asset.json";
import p109 from "@/assets/oso-109.jpg.asset.json";
import p111 from "@/assets/oso-111.jpg.asset.json";
import p118 from "@/assets/oso-118.jpg.asset.json";
import p119 from "@/assets/oso-119.jpg.asset.json";
import p132 from "@/assets/oso-132.jpg.asset.json";
import p133 from "@/assets/oso-133.jpg.asset.json";
import p134 from "@/assets/oso-134.jpg.asset.json";
import p136 from "@/assets/oso-136.jpg.asset.json";
import p138 from "@/assets/oso-138.jpg.asset.json";
import p140 from "@/assets/oso-140.jpg.asset.json";
import p141 from "@/assets/oso-141.jpg.asset.json";
import p143 from "@/assets/oso-143.jpg.asset.json";
import p146 from "@/assets/oso-146.jpg.asset.json";
import p150 from "@/assets/oso-150.jpg.asset.json";
import p151 from "@/assets/oso-151.jpg.asset.json";
import p153 from "@/assets/oso-153.jpg.asset.json";
import p157 from "@/assets/oso-157.jpg.asset.json";
import p158 from "@/assets/oso-158.jpg.asset.json";
import p161 from "@/assets/oso-161.jpg.asset.json";
import p163 from "@/assets/oso-163.jpg.asset.json";
import p164 from "@/assets/oso-164.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OSO Coffee, Bar, coffee, bites & pastries · Haarlem" },
      { name: "description", content: "OSO Coffee is a neighborhood coffee bar in Haarlem, born from a love for Spanish fincas. Coffee and pastries at Ramplaan 44." },
      { property: "og:title", content: "OSO Coffee, Haarlem" },
      { property: "og:description", content: "A neighborhood coffee bar, born from a love for Spanish fincas. Coffee & pastries in Haarlem." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 1s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

const NAV = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Space", href: "#space" },
  { label: "Careers", href: "#careers" },
  { label: "Visit", href: "#visit" },
];

const HOURS: Array<[string, string]> = [
  ["Monday", "Closed"],
  ["Tuesday", "Closed"],
  ["Wednesday", "08:00 – 16:00"],
  ["Thursday", "08:00 – 16:00"],
  ["Friday", "08:00 – 17:00"],
  ["Saturday", "09:00 – 17:00"],
  ["Sunday", "09:00 – 17:00"],
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ambient background music, autoplay-muted then unmute on first gesture.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.35;
    el.muted = true;
    el.play().catch(() => {});
    const onGesture = () => {
      el.muted = false;
      if (el.paused) el.play().catch(() => {});
      setPlaying(!el.paused && !el.muted);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("scroll", onGesture);
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    window.addEventListener("scroll", onGesture, { once: true, passive: true });
    const onPlay = () => setPlaying(!el.muted);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("scroll", onGesture);
    };
  }, []);
  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused || el.muted) {
      el.muted = false;
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-ink selection:bg-espresso selection:text-cream">
      {/* Ambient audio */}
      <audio ref={audioRef} src={nyc1940Audio.url} loop preload="auto" playsInline />

      {/* Sticky sound toggle */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="fixed bottom-5 left-5 z-[60] group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/85 backdrop-blur-md pl-3 pr-4 py-2 text-[10px] uppercase tracking-[0.28em] text-ink/80 hover:bg-cream transition-all"
      >
        <span className="relative inline-flex items-end gap-[2px] h-3 w-4" aria-hidden>
          <span className={`w-[2px] bg-ink ${playing ? "animate-eq1" : "h-[3px]"}`} />
          <span className={`w-[2px] bg-ink ${playing ? "animate-eq2" : "h-[6px]"}`} />
          <span className={`w-[2px] bg-ink ${playing ? "animate-eq3" : "h-[4px]"}`} />
        </span>
        <span className="hidden sm:inline">{playing ? "Sound on" : "Sound off"}</span>
      </button>

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-md bg-cream/85 border-b border-ink/10" : "py-6"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center" aria-label="OSO Coffee">
            <img src={logo} alt="OSO Coffee" className="h-10 md:h-12 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.24em] text-ink/70">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="relative hover:text-ink transition-colors group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-[10px] uppercase tracking-[0.28em] hover:bg-ink hover:text-cream transition-colors"
          >
            Visit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-40 md:pt-56 pb-24 md:pb-40 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-3 text-eyebrow text-ink/60 animate-rise">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
            NOW OPEN, HAARLEM
          </div>

          <h1 className="mt-10 md:mt-14 text-display text-[clamp(3.5rem,13vw,13rem)] text-ink animate-rise">
            SLOW
            <br />
            MORNINGS.
          </h1>

          <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-end animate-rise" style={{ animationDelay: "160ms" }}>
            <p className="md:col-span-4 text-base md:text-lg leading-relaxed text-ink/70 max-w-sm">
              A neighborhood coffee bar in Haarlem, born from a love for Spanish fincas.
            </p>
            <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
              <a
                href="#about"
                className="group inline-flex items-center justify-between rounded-full bg-ink text-cream pl-6 pr-2 py-2 text-[11px] uppercase tracking-[0.26em] hover:bg-blue transition-colors"
              >
                Discover OSO
                <span className="ml-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink transition-transform group-hover:translate-x-1">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero image, single, calm, full-bleed feel */}
        <Reveal delay={200} className="mt-20 md:mt-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={p138.url}
                alt="Warm plaster interior of OSO Coffee with oak tables and a green banquette"
                className="w-full h-[60vh] md:h-[86vh] object-cover"
              />
              <img
                src={bearBlue.url}
                alt=""
                aria-hidden
                className="pointer-events-none absolute right-6 md:right-10 bottom-6 md:bottom-10 w-20 md:w-28 h-auto"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* MARQUEE */}
      <section aria-hidden className="py-5 overflow-hidden bg-blue text-cream border-y border-blue-deep/40">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 text-xl md:text-2xl text-cream font-light uppercase tracking-[0.24em]">
              <span>Now open</span>
              <span className="text-yellow">✦</span>
              <span>Coffee &amp; pastries</span>
              <img src={bearYellow.url} alt="" aria-hidden className="h-8 md:h-10 w-auto" />
              <span>Haarlem</span>
              <span className="text-yellow">✦</span>
              <span>We&rsquo;re hiring</span>
              <span className="text-yellow">✦</span>
              <span>Ramplaan 44</span>
              <img src={bearYellow.url} alt="" aria-hidden className="h-8 md:h-10 w-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 md:py-56">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">01 — ABOUT</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <Reveal className="md:col-span-7">
              <h2 className="text-display text-[clamp(2.6rem,7.5vw,6.5rem)] text-ink">
                A ROOM
                <br />
                THAT FEELS
                <br />
                LIKE HOME.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:pt-6">
              <p className="text-ink/70 leading-relaxed">
                OSO means bear in Spanish. Warm plaster, arched alcoves and oak benches, a contemporary read of a Spanish finca.
              </p>
              <p className="mt-6 text-ink/70 leading-relaxed">
                Considered coffee, honest pastries, doors open from morning to late afternoon.
              </p>
              <img src={bearBrown.url} alt="" aria-hidden className="mt-10 h-14 w-auto opacity-90" />
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-20 md:mt-28">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="overflow-hidden rounded-sm">
                <img src={p95.url} alt="Beau behind the OSO Coffee bar" className="w-full h-[46vh] md:h-[62vh] object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-sm">
                <img src={p134.url} alt="Setting the tables at OSO Coffee" className="w-full h-[46vh] md:h-[62vh] object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MENU / COFFEE & BITES */}
      <section id="menu" className="relative bg-cream-deep py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-espresso">02 — MENU</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-12 md:gap-20 items-start">
            <Reveal className="md:col-span-6">
              <h2 className="text-display text-[clamp(2.6rem,7vw,6rem)] text-ink">
                QUIET
                <br />
                MENU.
              </h2>
              <p className="mt-8 text-ink/70 max-w-md leading-relaxed">
                Espresso from a La Marzocco, filter on the side, pastries baked daily. A short list that changes with the season.
              </p>
              <div className="mt-12 overflow-hidden rounded-sm">
              <img
                src={p163.url}
                alt="Overhead spread of tostadas, cheese, padrón peppers and drinks on terracotta plates"
                className="w-full h-[52vh] md:h-[62vh] object-cover"
                loading="lazy"
              />
              </div>
            </Reveal>

            <Reveal delay={120} className="md:col-span-5 md:col-start-8">
              <ul className="divide-y divide-ink/10">
              {[
                ["Espresso", "Single origin, seasonal", "3.20"],
                ["Flat white", "Whole milk, oat on request", "4.20"],
                ["Cappuccino", "House blend, silky milk", "4.20"],
                ["Iced latte", "Double shot over ice", "4.50"],
                ["Iced matcha", "Ceremonial grade, oat milk", "4.80"],
                ["Granola bowl", "Yogurt, seasonal fruit, honey", "8.50"],
                ["Almond cake", "Baked in house, daily", "4.50"],
                ["Apple pie", "Butter crust, cinnamon", "4.80"],
              ].map(([name, desc, price]) => (
                <li key={name} className="flex items-baseline justify-between gap-6 py-6">
                  <div>
                    <p className="text-lg text-ink">{name}</p>
                    <p className="text-sm text-ink/55 mt-1">{desc}</p>
                  </div>
                  <span className="text-base text-ink/80 tabular-nums">{price}</span>
                </li>
              ))}
            </ul>

              <div className="mt-12 relative rounded-sm border border-ink/15 bg-cream p-8 overflow-hidden">
                <img src={bearYellow.url} alt="" aria-hidden className="pointer-events-none absolute -right-4 -bottom-6 h-24 w-auto opacity-80" />
                <span className="inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink">
                  Coming soon
                </span>
                <p className="mt-5 text-ink/70 max-w-sm leading-relaxed">
                  Tostadas, padrón peppers, Manchego and natural Spanish wines, joining the counter soon.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PASTRY / BITES DETAIL STRIP */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">03 — BAKED DAILY</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-16 md:mb-20">
            <Reveal className="md:col-span-7">
              <h2 className="text-display text-[clamp(2.4rem,6.5vw,5.5rem)] text-ink">
                PASTRIES,
                <br />
                WARM.
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-4 md:col-start-9">
              <p className="text-ink/70 leading-relaxed">
                A short pastry counter, refreshed each morning. Almond cakes, buttery apple pie, seasonal fruit.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              <div className="overflow-hidden rounded-sm md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-[80vh]">
                <img src={p37.url} alt="Pastries in the OSO display case" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-sm aspect-[4/5]">
                <img src={p31.url} alt="Slicing a piece of cake from the counter" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-sm aspect-[4/5]">
                <img src={p71.url} alt="Granola bowl with yogurt and berries on a terracotta plate" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COFFEE CRAFT */}
      <section className="py-32 md:py-48 bg-cream-deep">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          <Reveal className="md:col-span-7 order-2 md:order-1">
            <div className="overflow-hidden rounded-sm">
              <img
                src={p105.url}
                alt="Beau pulling a shot on the La Marzocco espresso machine"
                className="w-full h-[60vh] md:h-[80vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9 order-1 md:order-2">
            <span className="text-eyebrow text-espresso">04 — THE BAR</span>
            <h2 className="mt-8 text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-ink">
              PULLED
              <br />
              SLOWLY.
            </h2>
            <p className="mt-8 text-ink/70 leading-relaxed">
              Espresso, flat whites and filter on custom OSO cups in blue, yellow and espresso brown. Small equipment, careful hands.
            </p>
            <img src={bearBrown.url} alt="" aria-hidden className="mt-10 h-12 w-auto opacity-80" />
          </Reveal>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-32 md:py-48 bg-espresso text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-yellow">05 — IN MOTION</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
            <Reveal className="md:col-span-7">
              <h2 className="text-display text-[clamp(2.6rem,7vw,6rem)] text-cream">
                A QUIET
                <br />
                AFTERNOON.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-cream/75 leading-relaxed">
                Light, plaster and terracotta, the soft rhythm of the bar.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative overflow-hidden rounded-sm">
              <img src={bearYellow.url} alt="" aria-hidden className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-6 h-10 md:h-14 w-auto z-10" />
              <video
                src="/oso-video.mp4"
                poster={p109.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[60vh] md:h-[85vh] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPACE / INTERIOR */}
      <section id="space" className="py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">06 — THE SPACE</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 items-end mb-16 md:mb-24">
            <Reveal className="md:col-span-7">
              <h2 className="text-display text-[clamp(2.6rem,7.5vw,6.5rem)] text-ink">
                ALCOVES,
                <br />
                ARCHES,
                <br />
                LIGHT.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-ink/70 leading-relaxed">
                A Spanish finca in rhythm, warm textures and quiet corners that invite you to linger.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src={p158.url}
                alt="Long perspective of the OSO Coffee dining room with rush chairs and a soft banquette"
                className="w-full h-[60vh] md:h-[85vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { src: p151.url, alt: "Green banquette and rush chairs under a shelf of natural wines" },
              { src: p140.url, alt: "Row of oak tables with plaster shelves of terracotta pottery" },
              { src: p146.url, alt: "Shelf styled with terracotta jugs, a Spain cookbook and a candle" },
              { src: p150.url, alt: "Sideboard with painted rooster jug and dried flowers" },
              { src: p141.url, alt: "Communal oak table with red rush chairs and a green glass vase" },
              { src: p143.url, alt: "Front of house at OSO with plaster niches and rush seating" },
              { src: p118.url, alt: "Soft light casting the oso wordmark onto a linen mat" },
              { src: p35.url, alt: "Blue OSO bear stamp on a paper doily" },
            ].map((im, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="overflow-hidden rounded-sm aspect-[4/5] group">
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCE / COMING SOON */}
      <section className="py-32 md:py-48 bg-cream-deep">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          <Reveal className="md:col-span-7">
            <div className="overflow-hidden rounded-sm">
              <img
                src={p133.url}
                alt="Ripe tomatoes and dried peppers in terracotta bowls on an oak counter"
                className="w-full h-[60vh] md:h-[80vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <span className="inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink">
              Coming soon
            </span>
            <span className="mt-6 block text-eyebrow text-espresso">07 — LUNCH &amp; TAPAS</span>
            <h3 className="mt-6 text-display text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
              SLOW
              <br />
              LUNCH.
            </h3>
            <p className="mt-8 text-ink/70 leading-relaxed">
              Tomatoes, padrón peppers, Manchego and good bread. A short tapas menu and Spanish natural wines are on the way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SAY HELLO — brown block */}
      <section className="relative bg-ink text-cream py-40 md:py-56 overflow-hidden">
        <img
          src={bearYellow.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-10 w-[280px] opacity-30"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 text-center">
          <Reveal>
            <span className="text-eyebrow text-yellow">08 — SAY HELLO</span>
            <h2 className="mt-10 text-display text-[clamp(3.5rem,14vw,13rem)] text-cream">
              SAY
              <br />
              HELLO.
            </h2>
            <p className="mt-12 mx-auto max-w-md text-cream/70 leading-relaxed">
              The doors are open. Stop by Ramplaan 44 for a coffee, a slice of cake or a quiet moment.
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/osocoffee.haarlem/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-yellow text-ink px-6 py-3 text-[11px] uppercase tracking-[0.26em] hover:brightness-95 transition"
              >
                Instagram
              </a>
              <a
                href="#visit"
                className="inline-flex items-center rounded-full border border-cream/30 px-6 py-3 text-[11px] uppercase tracking-[0.26em] hover:bg-cream/10 transition-colors"
              >
                Find us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIRING */}
      <section id="careers" className="py-32 md:py-56">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">09 — CAREERS</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-16 md:mb-24">
            <Reveal className="md:col-span-7">
              <h2 className="text-display text-[clamp(2.6rem,7.5vw,6.5rem)] text-ink">
                JOIN
                <br />
                THE TEAM.
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-4 md:col-start-9">
              <p className="text-ink/70 leading-relaxed">
                Warm, considered people who care about craft and hospitality. Open roles below.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { role: "HEAD BARISTA", type: "Full-time", note: "Lead the bar, dial in our blends, mentor the team." },
              { role: "BARISTA", type: "Full / part-time", note: "Open mornings, considered pours, friendly to regulars." },
              { role: "PASTRY & KITCHEN", type: "Full-time", note: "Bake daily, develop the seasonal bites menu with us." },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 100}>
                <a
                  href="mailto:osohaarlem@outlook.com?subject=Application%20-%20OSO%20Coffee"
                  className="group relative block h-full rounded-sm border border-ink/10 bg-cream-deep p-8 md:p-10 transition-all duration-500 hover:border-ink hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-eyebrow text-ink/50">{r.type}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream transition-all duration-500 group-hover:bg-blue group-hover:-rotate-45">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-14 text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                    {r.role}
                  </h3>
                  <p className="mt-5 text-sm text-ink/65 max-w-xs leading-relaxed">{r.note}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-ink/10 p-8 md:p-10">
              <p className="text-lg md:text-xl text-ink">
                Don&rsquo;t see your role? We&rsquo;re still listening.
              </p>
              <a
                href="mailto:osohaarlem@outlook.com"
                className="group inline-flex items-center gap-3 rounded-full bg-ink text-cream px-5 py-3 text-[11px] uppercase tracking-[0.24em] hover:bg-blue transition-colors"
              >
                osohaarlem@outlook.com
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY / QUOTE */}
      <section className="py-40 md:py-56 bg-yellow relative overflow-hidden">
        <img
          src={bearBrown.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-8 md:right-16 bottom-8 md:bottom-12 w-20 md:w-28 opacity-90"
        />

        <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
          <Reveal>
            <span className="text-eyebrow text-ink/70">10 — IN THEIR WORDS</span>
          </Reveal>
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-12">
            <div className="col-span-12 md:col-span-10 md:col-start-2 mt-10 md:mt-14">
              <Reveal delay={80}>
                <blockquote className="text-[clamp(1.5rem,2.9vw,2.35rem)] leading-[1.4] text-ink font-light">
                  <p>
                    Born from a love for Spanish fincas and coffee, OSO opened its doors earlier this year.
                  </p>
                  <p className="mt-10">
                    Beau used to live on Ibiza, and back in Haarlem she missed the people, the Spanish mentality, the vibe. She&rsquo;s bringing all of that home, with great coffee, pastries and, soon, a lunch menu.
                  </p>
                  <p className="mt-10 text-[clamp(1.25rem,2.1vw,1.6rem)] text-espresso leading-[1.45] italic">
                    A must visit, and a perfect place to chill before or after a walk in Elswout.
                  </p>
                </blockquote>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-14 flex items-center gap-4">
                  <span className="inline-block h-px w-12 bg-ink/40" />
                  <span className="text-eyebrow text-ink/60">OVERHEARD IN HAARLEM</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="py-32 md:py-48 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">11 — INSTAGRAM</span>
          </Reveal>
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Reveal>
              <h2 className="text-display text-[clamp(2.2rem,6vw,5rem)] text-ink lowercase">
                <span className="text-blue">@</span>&nbsp;osocoffee.haarlem
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a
                href="https://www.instagram.com/osocoffee.haarlem/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-ink/70 hover:text-ink transition-colors"
              >
                Follow on Instagram <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={150} className="mt-16 md:mt-24">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
              {[
                { src: p161.url, alt: "Table set with tostadas, cheese and drinks at OSO Coffee" },
                { src: p164.url, alt: "Overhead tapas spread at OSO Coffee" },
                { src: p109.url, alt: "Cappuccino and granola bowl in soft window light" },
                { src: p153.url, alt: "Iced matcha with a striped ceramic jug" },
                { src: p70.url, alt: "Wine, water and toasts on a small oak table" },
                { src: p157.url, alt: "Empty candlelit oak tables in the OSO dining room" },
              ].map((p, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/osocoffee.haarlem/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-sm aspect-square"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-500" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISIT, HOURS + LOCATION */}
      <section id="visit" className="bg-cream-deep py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20">
          <Reveal className="md:col-span-5">
            <span className="text-eyebrow text-blue">12 — VISIT</span>
            <h2 className="mt-8 text-display text-[clamp(2.6rem,6.5vw,5.5rem)] text-ink">
              RAMPLAAN
              <br />
              FORTY-FOUR.
            </h2>
            <div className="mt-12 space-y-1 text-ink/75">
              <p>Ramplaan 44</p>
              <p>2015 GX Haarlem</p>
              <p>Netherlands</p>
            </div>
            <a
              href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-blue hover:text-blue-deep transition-colors"
            >
              Open in Maps <ArrowIcon className="h-3.5 w-3.5" />
            </a>
            <img src={bearYellow.url} alt="" aria-hidden className="mt-14 h-14 w-auto" />
          </Reveal>

          <Reveal delay={120} className="md:col-span-7">
            <div className="rounded-sm bg-cream p-8 md:p-12 border border-ink/10">
              <div className="flex items-baseline justify-between">
                <h3 className="text-eyebrow text-ink">HOURS</h3>
                <span className="text-eyebrow text-ink/50">CET</span>
              </div>
              <ul className="mt-8 divide-y divide-ink/10">
                {HOURS.map(([day, time]) => {
                  const closed = time === "Closed";
                  return (
                    <li key={day} className="flex items-baseline justify-between py-5">
                      <span className="text-base text-ink">{day}</span>
                      <span className={`tabular-nums text-sm ${closed ? "text-ink/35" : "text-ink/80"}`}>
                        {time}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream pt-24 md:pt-32 pb-10 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-10 border-b border-cream/15 pb-16">
            <div>
              <span className="text-eyebrow text-cream/50">FIND US</span>
              <p className="mt-5 text-lg">Ramplaan 44</p>
              <p className="text-cream/65">2015 GX Haarlem</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/50">CONTACT</span>
              <p className="mt-5 text-lg">osohaarlem@outlook.com</p>
              <p className="text-cream/65">Press &amp; partnerships welcome</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/50">FOLLOW</span>
              <div className="mt-5 flex flex-col gap-2">
                <a href="https://www.instagram.com/osocoffee.haarlem/" className="hover:text-yellow transition-colors">Instagram</a>
                <a href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem" className="hover:text-yellow transition-colors">Google Maps</a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-8">
            <img
              src={logo}
              alt="OSO Coffee"
              className="h-16 md:h-24 w-auto brightness-0 invert opacity-95"
            />
            <div className="flex flex-col items-end gap-1 text-[11px] uppercase tracking-[0.24em] text-cream/50">
              <p>© {new Date().getFullYear()} OSO Coffee</p>
              <p>Ramplaan 44 · Haarlem</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}