import { Quote } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import { testimonials } from "../data/site";

export default function Testimonials() {
  return (
    <div>
      <PageHero
        eyebrow="Testimonials"
        title="Real journeys, real outcomes"
        description="A look at what it's like to work through your immigration pathway with Raavi Pathway."
      />

      <section className="py-24">
        <Container className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.attribution}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm shadow-navy-950/5"
            >
              <Quote size={28} className="text-gold-500" />
              <p className="mt-4 flex-1 text-ink-700">"{t.quote}"</p>
              <p className="mt-6 text-sm font-semibold text-navy-950">{t.attribution}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <CTABanner />
    </div>
  );
}
