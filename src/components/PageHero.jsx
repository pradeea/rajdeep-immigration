import Container from "./Container";
import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-cream-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-600/30 blur-3xl" />
      <Container className="relative">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-cream-50/70">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
