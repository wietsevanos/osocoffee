import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/oso-logo.png";
import photoTable from "@/assets/photo-table.jpg";
import photoShelf from "@/assets/photo-shelf.jpg";
import photoCakes from "@/assets/photo-cakes.jpg";
import photoDoor from "@/assets/photo-door.jpg";
import photoChair from "@/assets/photo-chair.jpg";
import photoProduce from "@/assets/photo-produce.jpg";
import photoDrinks from "@/assets/photo-drinks.jpg";
import photoCups from "@/assets/photo-cups.jpg";
import elCamionAudio from "@/assets/el-camion.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OSO Coffee, Bar, coffee, bites & pastries · Haarlem" },
      { name: "description", content: "OSO Coffee is a neighborhood coffee bar in Haarlem. Bar, coffee, bites & pastries at Ramplaan 44." },
      { property: "og:title", content: "OSO Coffee, Haarlem" },
      { property: "og:description", content: "A cozy, finca-inspired coffee bar. Bar, coffee, bites & pastries." },
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
      { threshold: 0.15 },
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

  // Ambient background music: La Bolsa, Gabriel Rios.
  // Browsers block autoplay with sound, so we try once on mount, and
  // also start on the first user gesture if that attempt is denied.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.35;
    const tryPlay = () => {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    tryPlay();
    const onGesture = () => {
      if (el.paused) tryPlay();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("scroll", onGesture);
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    window.addEventListener("scroll", onGesture, { once: true, passive: true });
    const onPlay = () => setPlaying(true);
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
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <main className="min-h-screen bg-cream text-espresso-deep selection:bg-espresso selection:text-cream">
      {/* Ambient audio */}
      <audio
        ref={audioRef}
        src={elCamionAudio.url}
        loop
        preload="auto"
        playsInline
      />

      {/* Sticky audio toggle */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="fixed bottom-5 left-5 z-[60] group inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-cream/85 backdrop-blur-md pl-3 pr-4 py-2 text-[11px] uppercase tracking-[0.18em] text-espresso-deep/80 shadow-[0_10px_30px_-15px_rgba(110,63,35,0.35)] hover:bg-cream transition-all"
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
          scrolled ? "py-3 backdrop-blur-md bg-cream/75 border-b border-espresso/10" : "py-6"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center" aria-label="OSO Coffee">
            <img src={logo} alt="OSO Coffee" className="h-10 md:h-12 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-9 text-sm text-espresso-deep/80">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="relative hover:text-espresso transition-colors group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-espresso transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#visit"
            className="inline-flex items-center gap-2 rounded-full border border-espresso/30 px-4 py-2 text-xs uppercase tracking-[0.18em] hover:bg-espresso hover:text-cream transition-colors"
          >
            Visit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-3 text-eyebrow text-espresso/70 animate-rise">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />
            Now open · Haarlem
          </div>

          <h1 className="text-display mt-8 text-[clamp(3.2rem,11vw,11rem)] text-espresso-deep animate-rise">
            A cozy
            <br />
            corner for
            <br />
            <span className="italic text-espresso">slow mornings.</span>
          </h1>

          <div className="mt-10 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <p className="md:col-span-5 text-base md:text-lg leading-relaxed text-espresso-deep/75 max-w-md animate-rise" style={{ animationDelay: "120ms" }}>
              OSO, Spanish for <em>bear</em>, is a neighborhood coffee bar at Ramplaan 44.
              Bar, coffee, bites &amp; pastries, served in a warm, finca-inspired space.
            </p>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 animate-rise" style={{ animationDelay: "240ms" }}>
              <a
                href="#about"
                className="group inline-flex items-center justify-between rounded-full bg-espresso text-cream pl-6 pr-2 py-2 text-sm tracking-wide hover:bg-espresso-deep transition-colors"
              >
                Discover OSO
                <span className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-espresso transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#careers"
                className="text-sm text-espresso-deep/70 hover:text-espresso transition-colors pl-6"
              >
                We&rsquo;re hiring, join the team →
              </a>
            </div>
          </div>

          {/* hero image block */}
          <Reveal delay={200} className="mt-16 md:mt-24">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-8 relative overflow-hidden rounded-sm">
                <img
                  src={photoTable}
                  alt="OSO menu, terracotta dishes, candle and a glass of red wine on an oak table"
                  className="w-full h-[55vh] md:h-[78vh] object-cover"
                  width={1600}
                  height={1920}
                />
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-6">
                <div className="relative overflow-hidden rounded-sm flex-1 min-h-[28vh]">
                  <img
                    src={photoShelf}
                    alt="Soft sconce light on a plaster wall above an oak shelf with stacked glassware"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={1500}
                  />
                </div>
                <div className="bg-sand/60 rounded-sm p-6 md:p-7 flex-1 flex flex-col justify-between min-h-[28vh]">
                  <span className="text-eyebrow text-espresso/70">Est. 2026</span>
                  <div className="mt-4">
                    <p className="font-serif text-2xl md:text-3xl leading-tight text-espresso-deep">
                      Bar, coffee, bites &amp; pastries.
                    </p>
                    <p className="mt-3 text-sm text-espresso-deep/70">
                      Ramplaan 44 · 2015 GX Haarlem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-hidden className="border-y border-espresso/15 py-6 overflow-hidden bg-cream-deep">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 font-serif text-3xl md:text-5xl text-espresso/80">
              <span>Now open</span>
              <span className="text-clay">✦</span>
              <span className="italic">Bar · coffee · bites</span>
              <span className="text-clay">✦</span>
              <span>Haarlem</span>
              <span className="text-clay">✦</span>
              <span className="italic">We&rsquo;re hiring</span>
              <span className="text-clay">✦</span>
              <span>Ramplaan 44</span>
              <span className="text-clay">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-4">
            <span className="text-eyebrow text-clay">01, About</span>
            <p className="mt-6 font-serif text-2xl leading-snug text-espresso-deep">
              OSO means <em>bear</em> in Spanish. A symbol of warmth, of comfort, of the kind of slow afternoons we&rsquo;re built around.
            </p>
          </Reveal>
          <Reveal delay={100} className="md:col-span-8">
            <h2 className="text-display text-[clamp(2.4rem,6.5vw,5.5rem)] text-espresso-deep">
              A neighborhood
              <br />
              bar, designed
              <br />
              <span className="italic text-espresso">to feel like home.</span>
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-2xl text-espresso-deep/75">
              <p>
                The space draws from Spanish fincas, warm plaster, arched alcoves, oak benches and soft
                linen. A contemporary read of an old, familiar feeling.
              </p>
              <p>
                We pour considered coffee, bake honest pastries and keep the door open from morning to
                late afternoon. Stay an hour. Or three.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MENU / BITES */}
      <section id="menu" className="relative bg-sand/40 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="overflow-hidden rounded-sm">
              <img
                src={photoCakes}
                alt="Almond cake and slices of banana bread on terracotta plates"
                className="w-full h-[70vh] object-cover"
                loading="lazy"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-6">
            <span className="text-eyebrow text-clay">02, Coffee &amp; bites</span>
            <h2 className="mt-6 text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-espresso-deep">
              Quiet menu.
              <br />
              <span className="italic">Loud care.</span>
            </h2>
            <ul className="mt-10 divide-y divide-espresso/15">
              {[
                ["Espresso", "Single origin · seasonal", "3.20"],
                ["Flat white", "Whole milk · oat on request", "4.20"],
                ["Iced matcha", "Ceremonial grade, oat milk", "4.80"],
                ["Almond cake", "Baked in house, daily", "4.50"],
                ["Albóndigas", "Slow tomato, basil, parmesan", "9.50"],
                ["Natural wine", "From 16:00, Wed to Sun", "—"],
              ].map(([name, desc, price]) => (
                <li key={name} className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <p className="font-serif text-xl text-espresso-deep">{name}</p>
                    <p className="text-sm text-espresso-deep/60 mt-1" dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                  <span className="font-serif text-lg text-espresso tabular-nums">{price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-espresso-deep/60">Full menu revealed at opening.</p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCE STRIP */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-7 order-2 md:order-1">
            <div className="overflow-hidden rounded-sm">
              <img
                src={photoProduce}
                alt="Heirloom tomatoes, padrón peppers, avocados and rhubarb on an oak counter"
                className="w-full h-[55vh] md:h-[70vh] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9 order-1 md:order-2">
            <span className="text-eyebrow text-clay">Produce</span>
            <p className="mt-6 font-serif text-2xl md:text-3xl leading-snug text-espresso-deep">
              Sourced weekly, cooked slowly, served warm.
            </p>
            <p className="mt-5 text-espresso-deep/70">
              Seasonal vegetables, soft cheeses and good bread. A short menu that changes when the market does.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 md:py-28 bg-sand/40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-10 md:mb-14">
            <Reveal className="md:col-span-7">
              <span className="text-eyebrow text-clay">In motion</span>
              <h2 className="mt-6 text-display text-[clamp(2.2rem,6vw,5rem)] text-espresso-deep">
                A quiet
                <br />
                <span className="italic text-espresso">afternoon at OSO.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-espresso-deep/75">
                Light, plaster, terracotta and the soft rhythm of the bar. A short film from the space.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-sm">
              <video
                src="/oso-video.mp4"
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
      <section id="space" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-12 md:mb-20">
            <Reveal className="md:col-span-7">
              <span className="text-eyebrow text-clay">03, The space</span>
              <h2 className="mt-6 text-display text-[clamp(2.4rem,7vw,6rem)] text-espresso-deep">
                Alcoves, arches,
                <br />
                <span className="italic text-espresso">afternoon light.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-espresso-deep/75">
                Inspired by the rhythm of a Spanish finca, the interior layers warm textures and quiet
                corners, a room that invites you to linger.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src={photoChair}
                alt="Handwoven rush chair stacked on an oak table in a plaster-walled room"
                className="w-full h-[60vh] md:h-[85vh] object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[photoDoor, photoDrinks, photoCups, photoShelf].map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <div className="overflow-hidden rounded-sm aspect-[4/5] group">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    width={1000}
                    height={1200}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="relative bg-espresso text-cream py-28 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 text-center">
          <Reveal>
            <span className="text-eyebrow text-cream/70">Now open</span>
            <h2 className="mt-8 text-display text-[clamp(3rem,12vw,11rem)] text-cream">
              Come
              <br />
              <span className="italic">say hello.</span>
            </h2>
            <p className="mt-10 mx-auto max-w-xl text-cream/75">
              The doors are open. Stop by Ramplaan 44 for a coffee, a bite, or a quiet moment in the bar.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-cream text-espresso px-6 py-3 text-sm hover:bg-cream-deep transition-colors"
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
              <span className="text-eyebrow text-clay">04, Careers</span>
              <h2 className="mt-6 text-display text-[clamp(2.4rem,7vw,6rem)] text-espresso-deep">
                We&rsquo;re building
                <br />
                <span className="italic text-espresso">a team.</span>
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-4 md:col-start-9">
              <p className="text-espresso-deep/75">
                OSO is hiring warm, considered people who care about craft and hospitality. Open roles
                below, we&rsquo;d love to hear from you.
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
                  className="group relative block h-full rounded-sm border border-espresso/15 bg-cream-deep p-7 md:p-9 transition-all duration-500 hover:border-espresso hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(110,63,35,0.35)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-eyebrow text-espresso/60">{r.type}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-espresso/30 text-espresso transition-all group-hover:bg-espresso group-hover:text-cream group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </div>
                  <h3 className="mt-10 font-serif text-3xl md:text-4xl text-espresso-deep leading-tight">
                    {r.role}
                  </h3>
                  <p className="mt-4 text-sm text-espresso-deep/70 max-w-xs">{r.note}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-sm bg-sand/50 p-6 md:p-8">
              <p className="font-serif text-xl md:text-2xl text-espresso-deep">
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
      <section className="py-24 md:py-36 bg-sand/40">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-clay">In their words</span>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="mt-8 font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.25] text-espresso-deep">
              <span className="italic text-clay">&ldquo;</span>
              Born from a love for Spanish fincas and coffee, OSO opened its
              doors earlier this year. Beau used to live on Ibiza, and back in
              Haarlem she missed the people, the Spanish mentality, the vibe.
              She&rsquo;s bringing all of that home, with great coffee,
              pastries and a lunch menu, the homemade tostadas are so good.
              Soon Spanish wines and bites will join the menu.
              <br />
              <span className="italic">
                A must visit, and a perfect place to chill before or after a
                walk in Elswout.
              </span>
              <span className="italic text-clay">&rdquo;</span>
            </blockquote>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex items-center gap-3 text-eyebrow text-espresso/60">
              <span className="inline-block h-px w-10 bg-espresso/40" />
              A neighborhood note
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="py-24 md:py-36 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <span className="text-eyebrow text-clay">Instagram</span>
          </Reveal>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Reveal>
              <h2 className="font-serif text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] text-espresso-deep">
                <span className="italic">@</span>osocoffee.haarlem
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a
                href="https://www.instagram.com/osocoffee.haarlem/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-espresso-deep/80 hover:text-espresso transition-colors underline-offset-4 hover:underline"
              >
                Volg ons op Instagram →
              </a>
            </Reveal>
          </div>

          <Reveal delay={150} className="mt-14 md:mt-20">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
              {[
                { src: photoCups, alt: "OSO Coffee, freshly poured cups on the bar" },
                { src: photoCakes, alt: "Seasonal pastries and cakes at OSO Coffee" },
                { src: photoDrinks, alt: "Signature drinks at OSO Coffee" },
                { src: photoTable, alt: "Candlelit oak table at OSO Coffee" },
                { src: photoProduce, alt: "Fresh produce used in the OSO kitchen" },
                { src: photoDoor, alt: "Entrance of OSO Coffee at Ramplaan 44" },
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
            <span className="text-eyebrow text-clay">05, Visit</span>
            <h2 className="mt-6 text-display text-[clamp(2.4rem,6vw,5rem)] text-espresso-deep">
              Ramplaan 44.
              <br />
              <span className="italic">See you soon.</span>
            </h2>
            <div className="mt-10 space-y-2 text-espresso-deep/80">
              <p>Ramplaan 44</p>
              <p>2015 GX Haarlem</p>
              <p>Netherlands</p>
            </div>
            <a
              href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-espresso underline-offset-4 hover:underline"
            >
              Open in Maps →
            </a>
          </Reveal>

          <Reveal delay={120} className="md:col-span-7">
            <div className="rounded-sm bg-cream p-7 md:p-10 border border-espresso/10">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl text-espresso-deep">Hours</h3>
                <span className="text-eyebrow text-espresso/60">CET</span>
              </div>
              <ul className="mt-6 divide-y divide-espresso/15">
                {HOURS.map(([day, time]) => {
                  const closed = time === "Closed";
                  return (
                    <li key={day} className="flex items-baseline justify-between py-4">
                      <span className="font-serif text-lg text-espresso-deep">{day}</span>
                      <span className={`tabular-nums text-sm ${closed ? "text-espresso-deep/40" : "text-espresso"}`}>
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
      <footer className="bg-espresso-deep text-cream pt-20 md:pt-28 pb-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
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
              <p className="mt-4 font-serif text-xl">Ramplaan 44</p>
              <p className="text-cream/70">2015 GX Haarlem</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/60">Contact</span>
              <p className="mt-4 font-serif text-xl">osohaarlem@outlook.com</p>
              <p className="text-cream/70">Press &amp; partnerships welcome</p>
            </div>
            <div>
              <span className="text-eyebrow text-cream/60">Follow</span>
              <div className="mt-4 flex flex-col gap-1">
                <a href="https://instagram.com" className="hover:text-clay transition-colors">Instagram →</a>
                <a href="https://maps.google.com/?q=Ramplaan+44,+2015+GX+Haarlem" className="hover:text-clay transition-colors">Google Maps →</a>
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
