import { serviceIcons } from "../data/icons";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import { services, process } from "../data/site";

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Every pathway starts with the right assessment"
        description="Regulated support across the immigration categories that matter most — clear, honest, and tailored to your profile."
      />

      <section className="py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.slug];
            return (
              <Reveal
                key={service.slug}
                delay={(i % 2) * 0.08}
                className="flex gap-5 rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm shadow-navy-950/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  {Icon && <Icon size={22} />}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="bg-navy-900 py-24 text-cream-50">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">Process</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              What to expect when you start
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-5">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <span className="font-display text-4xl font-semibold text-gold-400/40">{step.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-cream-50/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </div>
  );
}
