import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuCategory } from "@/components/menu-category";
import { menuCategories } from "@/lib/menu-data";
import logo from "@/assets/oso-logo.png";
import foodPhoto from "@/assets/oso-163.jpg.asset.json";

const title = "Menu | OSO Coffee, Haarlem";
const description = "Ontdek de menukaart van OSO Coffee in Haarlem: Spaans ontbijt, tostadas, lunch, huisgemaakt gebak en warme en koude dranken, met alle prijzen en serveertijden.";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState("desayuno");
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content");
    document.title = title;
    descriptionTag?.setAttribute("content", description);
    const previousMeta: { element: Element; value: string | null }[] = [];
    for (const [selector, content] of [
      ['meta[property="og:title"]', title], ['meta[property="og:description"]', description],
      ['meta[property="og:type"]', "website"], ['meta[name="twitter:card"]', "summary_large_image"],
      ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description],
    ]) {
      const element = document.querySelector(selector);
      if (element) { previousMeta.push({ element, value: element.getAttribute("content") }); element.setAttribute("content", content); }
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-170px 0px -55% 0px", threshold: 0 });
    document.querySelectorAll(".menu-category").forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) descriptionTag?.setAttribute("content", previousDescription);
      previousMeta.forEach(({ element, value }) => { if (value !== null) element.setAttribute("content", value); });
    };
  }, []);

  return (
    <main className="menu-page min-h-screen bg-cream text-ink">
      <header className="menu-header">
        <div className="menu-container flex items-center justify-between gap-4">
          <a href="/" aria-label="OSO Coffee home"><img src={logo} alt="OSO Coffee" className="h-10 w-auto" /></a>
          <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-8">
            <Button asChild variant="link" className="menu-back"><a href="/"><ArrowLeft /> <span>Home</span></a></Button>
            <Button asChild variant="outline" className="rounded-full border-ink/25 bg-transparent text-ink shadow-none hover:bg-ink hover:text-cream"><a href="/#visit">Visit</a></Button>
          </nav>
        </div>
      </header>

      <div className="menu-container">
        <section className="menu-intro">
          <div>
            <p className="menu-kicker">Comida y bebida</p>
            <h1>MENU</h1>
            <p className="menu-intro-copy">Een stukje Spanje, hier in Haarlem. Van een ontspannen ontbijt tot tostadas, verse lunchgerechten en je favoriete koffie.</p>
          </div>
          <img src={foodPhoto.url} alt="Tostadas, manchego en pimientos de padrón op de tafel bij OSO" className="menu-intro-photo" />
        </section>
      </div>

      <div className="menu-navigation-band">
        <nav aria-label="Menucategorieën" className="menu-container menu-category-nav">
          {menuCategories.map((category) => (
            <Button key={category.id} asChild variant="ghost" className="menu-category-link" data-active={active === category.id}>
              <a href={`#${category.id}`} aria-current={active === category.id ? "location" : undefined} onClick={() => setActive(category.id)}>{category.name}</a>
            </Button>
          ))}
        </nav>
      </div>

      <div className="menu-container menu-content" lang="nl">
        <div className="menu-food-grid">
          {menuCategories.slice(0, 4).map((category, index) => <MenuCategory key={category.id} category={category} number={index + 1} />)}
        </div>
        <div className="menu-drinks-heading"><p className="menu-kicker">Bebidas</p><p>Voor erbij, of gewoon voor een goed moment.</p></div>
        <div className="menu-drinks-grid">
          {menuCategories.slice(4).map((category, index) => <MenuCategory key={category.id} category={category} number={index + 5} compact />)}
        </div>
      </div>

      <footer className="menu-footer bg-ink text-cream">
        <div className="menu-container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div><a href="/" aria-label="OSO Coffee home"><img src={logo} alt="OSO Coffee" className="h-12 w-auto brightness-0 invert" /></a><p className="mt-4 text-sm text-cream/70">Ramplaan 44, Haarlem</p></div>
          <Button asChild variant="outline" className="rounded-full border-cream/30 bg-transparent text-cream shadow-none hover:bg-cream hover:text-ink self-start"><a href="/#visit">Come say hello <ArrowRight /></a></Button>
        </div>
      </footer>
    </main>
  );
}