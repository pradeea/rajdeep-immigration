import { ShieldCheck, ArrowRight } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import ServiceCard from "../components/ServiceCard";
import CTABanner from "../components/CTABanner";
import InstagramIcon from "../components/icons/InstagramIcon";
import { business, services, process, testimonials, stats } from "../data/site";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-cream-50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-navy-600/30 blur-3xl" />

        <Container className="relative grid gap-16 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
              <ShieldCheck size={14} />
              {business.credential}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
              Your pathway to Canada, guided with clarity and care.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cream-50/70">
              {business.founder} helps individuals and families navigate Express Entry, study &amp; work permits,
              sponsorship and more — with the honesty and accountability of a regulated consultant.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={business.calendlyUrl}>Book a Free Call</Button>
              <Button to="/services" variant="outline">
                Explore Services
                <ArrowRight size={16} />
              </Button>
            </div>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-cream-50/60 hover:text-cream-50"
            >
              <InstagramIcon size={16} className="text-gold-400" />
              Follow daily PR updates {business.instagramHandle}
            </a>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-cream-50/10 bg-navy-900/60 p-8 shadow-2xl shadow-navy-950/40 backdrop-blur">
              <p className="font-display text-lg leading-snug text-cream-50/90">
                "Clear communication, honest timelines, and a plan built around your specific profile — not a
                generic checklist."
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-cream-50/10 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm text-cream-50/60">{s.label}</span>
                    <span className="font-display text-lg font-semibold text-gold-400">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-3xl border border-gold-400/20" />
          </Reveal>
        </Container>
      </section>

      {/* Services preview */}
      <section className="py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">What we help with</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              Services built around real Canadian pathways
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Button to="/services" variant="dark">
              View All Services
              <ArrowRight size={16} />
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-navy-900 py-24 text-cream-50">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              A straightforward process, from first call to approval
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-5">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08} className="relative">
                <span className="font-display text-4xl font-semibold text-gold-400/40">{step.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-cream-50/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials preview */}
      <section className="py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">Client experiences</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              Trusted by clients across their immigration journey
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.attribution} delay={i * 0.08} className="rounded-2xl bg-white p-7 shadow-sm shadow-navy-950/5">
                <p className="text-ink-700">"{t.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-navy-950">{t.attribution}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </div>
  );
}
