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
        className="fixed bottom-5 left-5 z-[60] group inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-cream/85 backdrop-blur-md pl-3 pr-4 py-2 text-[11px] uppercase tracking-[0.22em] text-ink/80 shadow-[0_10px_30px_-15px_rgba(111,63,31,0.35)] hover:bg-cream transition-all"
      >
        <span className="relative inline-flex items-end gap-[2px] h-3 w-4" aria-hidden>
          <span className={`w-[2px] bg-espresso ${playing ? "animate-eq1" : "h-[3px]"}`} />
          <span className={`w-[2px] bg-espresso ${playing ? "animate-eq2" : "h-[6px]"}`} />
          <span className={`w-[2px] bg-espresso ${playing ? "animate-eq3" : "h-[4px]"}`} />
        </span>
        <span className="hidden sm:inline">{playing ? "Sound on" : "Sound off"}</span>
      </button>

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-md bg-cream/80 border-b border-espresso/10" : "py-6"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center" aria-label="OSO Coffee">
            <img src={logo} alt="OSO Coffee" className="h-10 md:h-12 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-9 text-sm text-ink/80">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="relative hover:text-espresso transition-colors group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-espresso transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 rounded-full border border-espresso/30 px-4 py-2 text-xs uppercase tracking-[0.22em] hover:bg-espresso hover:text-cream transition-colors"
          >
            Visit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-3 text-eyebrow text-espresso/70 animate-rise">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
            Now open, Haarlem
          </div>

          <div className="mt-8 grid md:grid-cols-12 gap-6 md:gap-10 items-end animate-rise">
            <h1 className="md:col-span-9 text-display text-[clamp(3rem,10vw,10rem)] text-ink">
              Coffee,
              <br />
              slow mornings.
            </h1>
            <div className="md:col-span-3 hidden md:flex justify-end pb-2">
              <img
                src={bearBlue.url}
                alt=""
                aria-hidden
                className="w-28 lg:w-36 h-auto opacity-90"
              />
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <p className="md:col-span-5 text-base md:text-lg leading-relaxed text-ink/75 max-w-md animate-rise" style={{ animationDelay: "120ms" }}>
              A neighborhood coffee bar in Haarlem, born from a love for Spanish fincas.
            </p>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 animate-rise" style={{ animationDelay: "240ms" }}>
              <a
                href="#about"
                className="group inline-flex items-center justify-between rounded-full bg-espresso text-cream pl-6 pr-2 py-2 text-sm tracking-wide hover:bg-espresso-deep transition-colors"
              >
                Discover OSO
                <span className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-espresso transition-transform group-hover:translate-x-1">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#careers"
                className="text-sm text-ink/70 hover:text-espresso transition-colors pl-6 inline-flex items-center gap-2"
              >
                We&rsquo;re hiring, join the team
                <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* hero image block */}
          <Reveal delay={200} className="mt-16 md:mt-24">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-8 relative overflow-hidden rounded-sm">
                <img
                  src={p138.url}
                  alt="Warm plaster interior of OSO Coffee with oak tables and a green banquette"
                  className="w-full h-[55vh] md:h-[78vh] object-cover"
                  width={1600}
                  height={1067}
                />
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-6">
                <div className="relative overflow-hidden rounded-sm flex-1 min-h-[28vh]">
                  <img
                    src={p79.url}
                    alt="La Marzocco espresso machine with stacked OSO cups"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={1800}
                  />
                </div>
                <div className="relative bg-sand/60 rounded-sm p-6 md:p-7 flex-1 flex flex-col justify-between min-h-[28vh] overflow-hidden">
                  <img
                    src={bearBrown.url}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -bottom-6 w-40 opacity-15"
                  />
                  <span className="text-eyebrow text-espresso/70">A neighborhood bar</span>
                  <div className="mt-4 relative">
                    <p className="text-3xl md:text-4xl leading-tight text-ink font-light">
                      Coffee <span className="font-script text-espresso">&amp;</span> pastries.
                    </p>
                    <p className="mt-3 text-sm text-ink/70">Ramplaan 44, 2015 GX Haarlem</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-hidden className="py-6 overflow-hidden bg-blue text-cream">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 text-3xl md:text-5xl text-cream font-light">
              <span>Now open</span>
              <img src={bearYellow.url} alt="" aria-hidden className="h-10 md:h-14 w-auto" />
              <span>coffee &amp; pastries</span>
              <span className="text-yellow">✦</span>
              <span>Haarlem</span>
              <img src={bearYellow.url} alt="" aria-hidden className="h-10 md:h-14 w-auto" />
              <span>we&rsquo;re hiring</span>
              <span className="text-yellow">✦</span>
              <span>Ramplaan 44</span>
              <span className="text-yellow">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="text-eyebrow text-blue">01, About</span>
              <img src={bearBrown.url} alt="" aria-hidden className="h-8 w-auto opacity-80" />
            </div>
            <p className="mt-6 text-2xl leading-snug text-ink font-light">
              OSO means <span className="text-emphasis text-espresso">bear</span> in Spanish. A symbol of warmth, of comfort, of the kind of slow afternoons we&rsquo;re built around.
            </p>
          </Reveal>
          <Reveal delay={100} className="md:col-span-8">
            <h2 className="text-display text-[clamp(2.4rem,6.5vw,5.5rem)] text-ink">
              A neighborhood
              <br />
              bar, designed to
              <br />
              feel like home.
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-2xl text-ink/75">
              <p>
                The space draws from Spanish fincas: warm plaster, arched alcoves, oak benches and soft
                linen. A contemporary read of an old, familiar feeling.
              </p>
              <p>
                We pour considered coffee, bake honest pastries and keep the door open from morning to
                late afternoon. Stay an hour. Or three.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 md:gap-6">
              <div className="overflow-hidden rounded-sm">
                <img src={p95.url} alt="Beau behind the OSO Coffee bar" className="w-full h-[36vh] md:h-[46vh] object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-sm">
                <img src={p134.url} alt="Setting the tables at OSO Coffee" className="w-full h-[36vh] md:h-[46vh] object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MENU / COFFEE & BITES */}
      <section id="menu" className="relative bg-sand/40 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <Reveal className="md:col-span-6">
            <div className="overflow-hidden rounded-sm">
              <img
                src={p163.url}
                alt="Overhead spread of tostadas, cheese, padrón peppers and drinks on terracotta plates"
                className="w-full h-[70vh] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4 md:mt-6 grid grid-cols-2 gap-4 md:gap-6">
              <div className="overflow-hidden rounded-sm">
                <img src={p119.url} alt="Iced latte poured over ice" className="w-full h-[28vh] object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-sm">
                <img src={p111.url} alt="Cappuccino with latte art and a granola bowl" className="w-full h-[28vh] object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-6">
            <span className="text-eyebrow text-espresso">02, Coffee &amp; bites</span>
            <h2 className="mt-6 text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-ink">
              Quiet menu.
              <br />
              Loud care.
            </h2>

            <p className="mt-6 text-ink/75 max-w-md">
              Espresso from a La Marzocco, filter on the side, pastries baked daily. A short, honest list that changes with the season.
            </p>

            <ul className="mt-10 divide-y divide-espresso/15">
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
                <li key={name} className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <p className="text-xl text-ink font-light">{name}</p>
                    <p className="text-sm text-ink/60 mt-1">{desc}</p>
                  </div>
                  <span className="text-lg text-espresso tabular-nums">{price}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 relative rounded-sm border border-espresso/20 bg-cream/70 p-6 overflow-hidden">
              <img src={bearYellow.url} alt="" aria-hidden className="pointer-events-none absolute -right-4 -bottom-6 h-28 w-auto opacity-70" />
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-ink font-medium">
                  Coming soon
                </span>
                <span className="text-eyebrow text-espresso">Lunch, wine &amp; tapas</span>
              </div>
              <p className="mt-4 text-ink/75">
                Tostadas, padrón peppers, Manchego, natural Spanish wines and small plates, joining the menu in the coming months. A slow, seasonal lunch, from the finca to Ramplaan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PASTRY / BITES DETAIL STRIP */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-10 md:mb-14">
            <Reveal className="md:col-span-6">
              <span className="text-eyebrow text-blue">03, Baked in house</span>
              <h2 className="mt-6 text-display text-[clamp(2rem,5vw,4rem)] text-ink">
                Pastries, cakes,
                <br />
                quiet mornings.
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5 md:col-start-8">
              <p className="text-ink/75">
                A short pastry counter, refreshed each morning. Whole almond cakes, buttery apple pie, seasonal fruit, warm from the oven when you arrive.
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
      <section className="py-20 md:py-28 bg-cream-deep">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-7 order-2 md:order-1">
            <div className="overflow-hidden rounded-sm">
              <img
                src={p105.url}
                alt="Beau pulling a shot on the La Marzocco espresso machine"
                className="w-full h-[55vh] md:h-[75vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9 order-1 md:order-2">
            <span className="text-eyebrow text-espresso">04, The bar</span>
            <h2 className="mt-6 text-display text-[clamp(2rem,4.8vw,3.6rem)] text-ink">
              La Marzocco,
              <br />
              pulled slowly.
            </h2>
            <p className="mt-6 text-ink/75">
              Espresso, flat whites and filter on our custom OSO cups, blue, yellow and espresso brown. Small equipment, careful hands, honest coffee.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 md:py-28 bg-espresso text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-10 md:mb-14">
            <Reveal className="md:col-span-7">
              <span className="text-eyebrow text-yellow">05, In motion</span>
              <h2 className="mt-6 text-display text-[clamp(2.2rem,6vw,5rem)] text-cream">
                A quiet
                <br />
                afternoon at OSO.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-cream/80">
                Light, plaster, terracotta and the soft rhythm of the bar. A short film from the space.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative overflow-hidden rounded-sm">
              <img src={bearYellow.url} alt="" aria-hidden className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-6 h-12 md:h-16 w-auto z-10 drop-shadow-lg" />
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
      <section id="space" className="py-24 md:py-32 bg-cream-deep">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-12 md:mb-20">
            <Reveal className="md:col-span-7">
              <span className="text-eyebrow text-blue">06, The space</span>
              <h2 className="mt-6 text-display text-[clamp(2.4rem,7vw,6rem)] text-ink">
                Alcoves, arches,
                <br />
                afternoon light.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-ink/75">
                Inspired by the rhythm of a Spanish finca, the interior layers warm textures and quiet corners, a room that invites you to linger.
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

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-7">
            <div className="overflow-hidden rounded-sm">
              <img
                src={p133.url}
                alt="Ripe tomatoes and dried peppers in terracotta bowls on an oak counter"
                className="w-full h-[55vh] md:h-[75vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-ink font-medium">
                Coming soon
              </span>
              <span className="text-eyebrow text-espresso">07, Lunch &amp; tapas</span>
            </div>
            <p className="mt-6 text-2xl leading-snug text-ink font-light">
              Sourced weekly, cooked slowly, served warm.
            </p>
            <p className="mt-5 text-ink/70">
              Sweet tomatoes, padrón peppers, Manchego and good bread. A short lunch and tapas menu will join the counter soon, alongside a small list of Spanish natural wines.
            </p>

            <ul className="mt-8 space-y-3 text-ink/70">
              <li className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-espresso" />Tostadas, three ways</li>
              <li className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-espresso" />Padrón peppers, sea salt</li>
              <li className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-espresso" />Manchego &amp; membrillo</li>
              <li className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-espresso" />Spanish natural wines, by the glass</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SAY HELLO — brown block */}
      <section className="relative bg-ink text-cream py-28 md:py-40 overflow-hidden">
        <img
          src={bearBrown.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-10 w-[380px] opacity-[0.10]"
        />
        <img
          src={bearYellow.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 w-[300px] opacity-[0.18] -scale-x-100"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 text-center">
          <Reveal>
            <span className="text-eyebrow text-yellow">08, Say hello</span>
            <h2 className="mt-8 text-display text-[clamp(3rem,12vw,11rem)] text-cream">
              Come
              <br />
              <span className="font-script text-yellow">say hello.</span>
            </h2>
            <p className="mt-10 mx-auto max-w-xl text-cream/75">
              The doors are open. Stop by Ramplaan 44 for a coffee, a slice of cake, or a quiet moment in the bar.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/osocoffee.haarlem/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-yellow text-ink px-6 py-3 text-sm hover:brightness-95 transition"
              >
                Follow on Instagram
              </a>
              <a
                href="#visit"
                className="inline-flex items-center rounded-full border border-cream/40 px-6 py-3 text-sm hover:bg-cream/10 transition-colors"
              >
                Find us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIRING */}
      <section id="careers" className="py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-14 md:mb-20">
            <Reveal className="md:col-span-7">
              <span className="text-eyebrow text-blue">09, Careers</span>
              <h2 className="mt-6 text-display text-[clamp(2.4rem,7vw,6rem)] text-ink">
                We&rsquo;re building
                <br />
                a team.
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-4 md:col-start-9">
              <p className="text-ink/75">
                OSO is hiring warm, considered people who care about craft and hospitality. Open roles below, we&rsquo;d love to hear from you.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { role: "Head Barista", type: "Full-time", note: "Lead the bar, dial in our blends, mentor the team." },
              { role: "Barista", type: "Full / part-time", note: "Open mornings, considered pours, friendly to regulars." },
              { role: "Pastry & Kitchen", type: "Full-time", note: "Bake daily, develop the seasonal bites menu with us." },
            ].map((r, i) => (
              <Reveal key={r.role} delay={i * 100}>
                <a
                  href="mailto:osohaarlem@outlook.com?subject=Application%20-%20OSO%20Coffee"
                  className="group relative block h-full rounded-sm border border-espresso/15 bg-cream-deep p-7 md:p-9 transition-all duration-500 hover:border-espresso hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(111,63,31,0.35)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-eyebrow text-espresso/60">{r.type}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-espresso/30 text-espresso transition-all group-hover:bg-espresso group-hover:text-cream group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </div>
                  <h3 className="mt-10 text-3xl md:text-4xl text-ink leading-tight font-light">
                    {r.role}
                  </h3>
                  <p className="mt-4 text-sm text-ink/70 max-w-xs">{r.note}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-sm bg-sand/50 p-6 md:p-8">
              <p className="text-xl md:text-2xl text-ink font-light">
                Don&rsquo;t see your role? We&rsquo;re still listening.
              </p>
              <a
                href="mailto:osohaarlem@outlook.com"
                className="inline-flex items-center gap-3 rounded-full bg-espresso text-cream px-5 py-3 text-sm hover:bg-espresso-deep transition-colors"
              >
                osohaarlem@outlook.com →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY / QUOTE */}
      <section className="py-28 md:py-44 bg-yellow relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-6 md:top-10 md:left-10 font-script text-[18rem] md:text-[26rem] leading-none text-ink/[0.10] select-none"
        >
          &ldquo;
        </div>
        <img
          src={bearBrown.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-6 md:right-16 bottom-6 md:bottom-10 w-24 md:w-32 opacity-90"
        />

        <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-12">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="flex items-center gap-3 text-eyebrow text-espresso">
                  <span className="inline-block h-px w-8 bg-espresso/60" />
                  10, In their words
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 text-ink/80 text-lg leading-snug hidden md:block font-light">
                  A neighborhood
                  <br />
                  note from a
                  <br />
                  recent visit.
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-9">
              <Reveal delay={80}>
                <blockquote className="text-[clamp(1.5rem,2.9vw,2.35rem)] leading-[1.35] text-ink font-light">
                  <p>
                    Born from a love for Spanish fincas and coffee, OSO opened its doors earlier this year.
                  </p>

                  <p className="mt-8">
                    Beau used to live on Ibiza, and back in Haarlem she missed the people, the Spanish mentality, the vibe. She&rsquo;s bringing all of that home, with great coffee, pastries and, soon, a lunch menu.{" "}
                    <span className="font-script text-blue">
                      The homemade tostadas are so good.
                    </span>
                  </p>

                  <p className="mt-10 text-[clamp(1.25rem,2.1vw,1.65rem)] text-espresso leading-[1.45] font-light italic">
                    A must visit, and a perfect place to chill before or after a walk in Elswout.
                  </p>
                </blockquote>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-12 flex items-center gap-4">
                  <span className="inline-block h-px w-12 bg-ink/40" />
                  <span className="text-eyebrow text-ink/70">Overheard in Haarlem</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="py-24 md:py-36 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-blue">11, Instagram</span>
          </Reveal>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Reveal>
              <h2 className="text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] text-ink font-light">
                <span className="font-script text-blue">@</span>&nbsp;osocoffee.haarlem
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a
                href="https://www.instagram.com/osocoffee.haarlem/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink/80 hover:text-espresso transition-colors underline-offset-4 hover:underline"
              >
                Volg ons op Instagram →
              </a>
            </Reveal>
          </div>

          <Reveal delay={150} className="mt-14 md:mt-20">
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
                  className="group relative block overflow-hidden rounded-md aspect-square"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/25 transition-colors duration-500" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISIT, HOURS + LOCATION */}
      <section id="visit" className="bg-cream-deep py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="text-eyebrow text-blue">12, Visit</span>
              <img src={bearYellow.url} alt="" aria-hidden className="h-8 w-auto" />
            </div>
            <h2 className="mt-6 text-display text-[clamp(2.4rem,6vw,5rem)] text-ink">
              Ramplaan 44.
              <br />
              See you soon.
            </h2>
            <div className="mt-10 space-y-2 text-ink/80">
              <p>Ramplaan 44</p>
              <p>2015 GX Haarlem</p>
              <p>Netherlands</p>
            </div>
            <a
              href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-blue underline-offset-4 hover:underline"
            >
              Open in Maps →
            </a>
          </Reveal>

          <Reveal delay={120} className="md:col-span-7">
            <div className="rounded-sm bg-cream p-7 md:p-10 border border-espresso/10">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl text-ink font-light">Hours</h3>
                <span className="text-eyebrow text-espresso/60">CET</span>
              </div>
              <ul className="mt-6 divide-y divide-espresso/15">
                {HOURS.map(([day, time]) => {
                  const closed = time === "Closed";
                  return (
                    <li key={day} className="flex items-baseline justify-between py-4">
                      <span className="text-lg text-ink font-light">{day}</span>
                      <span className={`tabular-nums text-sm ${closed ? "text-ink/40" : "text-espresso"}`}>
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
      <footer className="bg-ink text-cream pt-20 md:pt-28 pb-10 relative overflow-hidden">
        <img
          src={bearBrown.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-16 w-[420px] opacity-[0.09]"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex">
            <img
              src={logo}
              alt="OSO Coffee"
              className="h-16 md:h-24 w-auto brightness-0 invert opacity-90"
            />
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-10 border-t border-cream/15 pt-10">
            <div>
              <span className="text-eyebrow text-cream/60">Find us</span>
              <p className="mt-4 text-xl font-light">Ramplaan 44</p>
              <p className="text-cream/70">2015 GX Haarlem</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/60">Contact</span>
              <p className="mt-4 text-xl font-light">osohaarlem@outlook.com</p>
              <p className="text-cream/70">Press &amp; partnerships welcome</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/60">Follow</span>
              <div className="mt-4 flex flex-col gap-1">
                <a href="https://www.instagram.com/osocoffee.haarlem/" className="hover:text-yellow transition-colors">Instagram →</a>
                <a href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem" className="hover:text-yellow transition-colors">Google Maps →</a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs text-cream/50">
            <p>© {new Date().getFullYear()} OSO Coffee. All rights reserved.</p>
            <p>Ramplaan 44 · Haarlem</p>
          </div>
        </div>
      </footer>
    </main>
  );
}