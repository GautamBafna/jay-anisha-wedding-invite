import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, Navigation, ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import envelopeImage from "@/assets/envelope-opening.jpg";
import palaceImage from "@/assets/royal-palace-hills.jpg";
import terraceImage from "@/assets/mahabaleshwar-terrace.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jay & Anisha | Wedding Invitation" },
      { name: "description", content: "You are cordially invited to celebrate Jay Bafna and Anisha Gadia, 21–27 November 2026." },
      { property: "og:title", content: "Jay & Anisha | Wedding Invitation" },
      { property: "og:description", content: "A royal week of wedding celebrations in Pune and Mahabaleshwar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const events = [
  { day: "21", title: "Moong Bhekarna + Mehndi", items: [{ time: "1:00 PM", name: "Moong Bhekarna + Mehndi", venue: "Home (A39) · Market Yard" }] },
  { day: "22", title: "Siddhachakra Pujan + Mangalsadh", items: [{ time: "Afternoon", name: "Home Siddhachakra Pujan", venue: "Home (A39) · Market Yard" }, { time: "Evening", name: "Mangalsadh + Mehndi", venue: "Home (A39) · Market Yard" }] },
  { day: "23", title: "Kumkum · Mahera · Reception", items: [{ time: "Morning", name: "Kumkum", venue: "Turf Club · Race Course, Pune" }, { time: "Afternoon", name: "Mahera", venue: "Turf Club · Race Course, Pune" }, { time: "Evening", name: "Reception", venue: "Turf Club · Race Course, Pune" }] },
  { day: "24", title: "Bin Nakashi → Mahabaleshwar", items: [{ time: "Morning", name: "Bin Nakashi from Home", venue: "Home (A39) · Market Yard" }, { time: "Day", name: "Departure for Mahabaleshwar", venue: "Journey to the hills" }, { time: "Evening", name: "Sangeet", venue: "Taj Mahabaleshwar" }] },
  { day: "25", title: "Carnival · Pheras · Sufi Night", items: [{ time: "Morning", name: "Carnival", venue: "Taj Mahabaleshwar" }, { time: "Evening", name: "Pheras + Sufi Night", venue: "Taj Mahabaleshwar" }] },
  { day: "26", title: "Departure to Pune + Bahu Swagat", items: [{ time: "Whole day", name: "Departure to Pune followed by Bahu Swagat", venue: "Home (A39) · Market Yard" }] },
  { day: "27", title: "Churma Lunch", items: [{ time: "Afternoon", name: "Churma Lunch", venue: "Home (A39) · Market Yard" }] },
];

const venues = [
  { name: "Home (A39)", address: "Market Yard, Pune", query: "Market Yard Pune" },
  { name: "Turf Club", address: "Race Course, Pune", query: "Turf Club Race Course Pune" },
  { name: "Taj Mahabaleshwar", address: "Mahabaleshwar, Maharashtra", query: "Taj Mahabaleshwar" },
];

function Index() {
  const [opened, setOpened] = useState(false);
  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ left: `${(i * 37) % 97}%`, delay: `${-(i * 1.17)}s`, duration: `${10 + (i % 6)}s` })), []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    if (!opened) return () => { document.body.style.overflow = ""; };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal-section").forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); document.body.style.overflow = ""; };
  }, [opened]);

  return (
    <main className="min-h-screen bg-wine-deep text-ivory">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {petals.map((petal, i) => <span key={i} className="absolute -top-6 h-3 w-2 rounded-[80%_15%_80%_15%] bg-rose/35" style={{ left: petal.left, animation: `petal-fall ${petal.duration} linear ${petal.delay} infinite` }} />)}
      </div>

      <section className={`fixed inset-0 z-50 grid place-items-center overflow-hidden bg-wine-deep transition-[opacity,visibility] duration-500 ${opened ? "pointer-events-none invisible opacity-0 delay-[1100ms]" : "visible opacity-100"}`} aria-label="Open wedding invitation">
        <img src={envelopeImage} alt="Burgundy velvet wedding envelope with a gold J and A seal" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] ${opened ? "scale-110" : "scale-100"}`} />
        <div className="absolute inset-0 bg-wine-deep/35" />
        <div className="invitation-frame absolute inset-3 md:inset-7" />
        <div className={`paper-texture invitation-frame relative mx-6 flex min-h-[55vh] w-[min(86vw,560px)] flex-col items-center justify-center bg-ivory px-7 py-16 text-center text-wine-deep transition-all duration-1000 ${opened ? "animate-[card-rise_1.5s_cubic-bezier(.2,.8,.2,1)_forwards]" : "translate-y-[115%] opacity-0"}`}>
          <p className="text-[10px] uppercase tracking-[.3em] text-wine">Together with their families</p>
          <div className="my-6 h-px w-24 bg-gold" />
          <h1 className="font-names text-7xl leading-[1.1] sm:text-8xl">Jay <span className="block py-2 text-4xl">&amp;</span> Anisha</h1>
          <p className="mt-7 font-display text-xl italic">You are cordially invited</p>
          <p className="mt-5 text-xs uppercase tracking-[.22em] text-wine/75">21 — 27 November 2026</p>
          <p className="mt-2 text-[10px] uppercase tracking-[.25em] text-wine/60">Pune · Mahabaleshwar</p>
        </div>
        <Button variant="invitation" size="lg" onClick={() => setOpened(true)} className={`absolute bottom-12 h-12 rounded-full px-8 text-[10px] uppercase tracking-[.24em] transition-all duration-500 ${opened ? "pointer-events-none opacity-0" : "opacity-100"}`}>Open the invitation</Button>
      </section>

      <header id="home" className="relative grid min-h-[92svh] place-items-center overflow-hidden text-center">
        <img src={palaceImage} alt="Royal palace arch overlooking the Mahabaleshwar hills with a peacock and elephant" width={1440} height={1920} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-wine-deep/25" />
        <div className="invitation-frame absolute inset-3 md:inset-7" />
        <div className="relative z-10 mx-5 max-w-2xl bg-ivory/90 px-7 py-12 text-wine-deep shadow-invitation backdrop-blur-[2px] sm:px-14 sm:py-16">
          <p className="text-[10px] uppercase tracking-[.3em]">Together with their families</p>
          <div className="mx-auto my-5 h-px w-24 bg-gold" />
          <h1 className="font-script text-6xl leading-[1.1] sm:text-8xl">Jay <span className="block py-2 text-3xl">&amp;</span> Anisha</h1>
          <p className="mt-8 font-display text-2xl italic">You are cordially invited</p>
          <p className="mt-6 font-display text-lg uppercase tracking-[.16em]">21 — 27 November 2026</p>
          <p className="mt-2 text-[10px] uppercase tracking-[.27em] text-wine/70">Pune · Mahabaleshwar</p>
        </div>
        <a href="#events" aria-label="View the celebrations" className="absolute bottom-5 z-10 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[.22em] text-ivory"><span>The celebrations</span><ChevronDown className="h-4 w-4 animate-bounce" /></a>
      </header>

      <nav className="sticky top-0 z-30 border-y border-gold/25 bg-wine-deep/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <a href="#home" className="font-display text-xl text-gold-soft">J &amp; A</a>
          <div className="flex gap-5 overflow-x-auto text-[9px] uppercase tracking-[.18em] text-ivory/70"><a href="#events">Events</a><a href="#hills">The hills</a><a href="#venues">Venues</a></div>
        </div>
      </nav>

      <section className="reveal-section bg-ivory px-5 py-24 text-center text-wine-deep">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] uppercase tracking-[.28em] text-wine/65">A new chapter begins</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">Seven days.<br/><em>Countless memories.</em></h2>
          <div className="mx-auto my-8 h-px w-28 bg-gold" />
          <p className="mx-auto max-w-2xl font-display text-lg leading-8 text-wine/75">With joyful hearts, we invite you to share in the wedding celebrations of <strong>Jay Bafna</strong> and <strong>Anisha Gadia</strong> — a journey filled with traditions, music, laughter, family and love.</p>
        </div>
      </section>

      <section id="events" className="reveal-section px-5 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[.28em] text-gold">The celebrations</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Our wedding <em>diary</em></h2>
          <p className="mt-5 text-sm text-ivory/60">Select each day to unfold the celebrations.</p>
          <Accordion type="single" collapsible defaultValue="day-21" className="mt-12 space-y-3">
            {events.map((event) => (
              <AccordionItem key={event.day} value={`day-${event.day}`} className="event-panel rounded-sm px-5 data-[state=open]:border-gold/55">
                <AccordionTrigger className="gap-5 py-5 hover:no-underline [&>svg]:text-gold">
                  <span className="flex min-w-14 flex-col text-left text-[9px] uppercase tracking-[.18em] text-gold"><strong className="font-display text-4xl font-normal leading-none text-gold-soft">{event.day}</strong>Nov</span>
                  <span className="flex-1 text-left font-display text-xl font-normal sm:text-2xl">{event.title}</span>
                </AccordionTrigger>
                <AccordionContent className="border-t border-gold/15 pb-5 pt-2">
                  {event.items.map((item) => <div key={`${item.time}-${item.name}`} className="grid gap-2 border-b border-ivory/10 py-4 last:border-0 sm:grid-cols-[120px_1fr]"><span className="text-[10px] uppercase tracking-[.16em] text-gold">{item.time}</span><span><strong className="block font-display text-xl font-normal text-gold-soft">{item.name}</strong><span className="mt-1 flex items-center gap-1.5 text-xs text-ivory/55"><MapPin className="h-3.5 w-3.5" />{item.venue}</span></span></div>)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="hills" className="reveal-section relative grid min-h-[72svh] place-items-center overflow-hidden px-5 py-24 text-center">
        <img src={terraceImage} alt="Ornate palace terrace overlooking the Mahabaleshwar hills at sunset" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-wine-deep/45" />
        <div className="invitation-frame absolute inset-3 md:inset-7" />
        <div className="relative z-10 max-w-2xl">
          <p className="mx-auto mb-5 w-fit border border-gold/50 bg-wine-deep/60 px-4 py-2 text-[9px] uppercase tracking-[.22em] text-gold-soft">24—25 November · Mahabaleshwar</p>
          <h2 className="mx-auto w-fit rounded-sm bg-wine-deep/25 px-6 py-3 font-display text-5xl leading-none backdrop-blur-[2px] sm:text-7xl">And then, <em>the hills.</em></h2>
          <p className="mx-auto mt-7 max-w-xl rounded-sm bg-wine-deep/20 px-6 py-4 font-display text-lg leading-8 text-ivory/85 backdrop-blur-[2px]">The mountains become our backdrop for a Sangeet beneath the evening sky, a joyful Carnival, and the moment Jay and Anisha begin their forever together.</p>
        </div>
      </section>

      <section id="venues" className="reveal-section bg-ivory px-5 py-24 text-wine-deep">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] uppercase tracking-[.28em] text-wine/60">Find us here</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Three places.<br/><em>One celebration.</em></h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {venues.map((venue) => <article key={venue.name} className="border border-gold/45 p-7"><MapPin className="mb-5 h-5 w-5 text-gold"/><h3 className="font-display text-3xl">{venue.name}</h3><p className="mt-2 text-sm text-wine/60">{venue.address}</p><Button asChild variant="invitationGhost" className="mt-7 h-10 rounded-none px-4 text-[9px] uppercase tracking-[.18em]"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.query)}`} target="_blank" rel="noreferrer"><Navigation />Open map</a></Button></article>)}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden px-5 py-24 text-center">
        <CalendarDays className="mx-auto h-6 w-6 text-gold" />
        <h2 className="mt-7 font-display text-5xl leading-none sm:text-7xl">See you<br/><em>at the wedding.</em></h2>
        <p className="mx-auto mt-7 max-w-lg font-display text-lg leading-8 text-ivory/60">Come for the ceremonies, stay for the laughter, music and memories. We cannot wait to celebrate this beautiful beginning with you.</p>
        <Button variant="invitationGhost" className="mt-9 rounded-full px-5 text-[9px] uppercase tracking-[.18em]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp />Back to the beginning</Button>
      </footer>
    </main>
  );
}
