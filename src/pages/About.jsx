import { ShieldCheck, CheckCircle2 } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import InstagramIcon from "../components/icons/InstagramIcon";
import { business, stats } from "../data/site";

const values = [
  {
    title: "Regulated & accountable",
    description: `As an ${business.credential}, ${business.founder} is held to a professional code of conduct set by the CICC — your file is handled with real accountability.`,
  },
  {
    title: "Honest assessments",
    description: "No false promises. You'll always know exactly where you stand and what your realistic options are.",
  },
  {
    title: "Personalized strategy",
    description: "Every profile is different — pathways are built around your specific background, not a generic template.",
  },
  {
    title: "Clear communication",
    description: "Regular updates and a team that actually responds — you're never left wondering about your file.",
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title={`Meet ${business.founder}`}
        description="A Regulated Canadian Immigration Consultant helping individuals and families build their future in Canada."
      />

      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-gold-400/30 bg-gradient-to-br from-navy-900 to-navy-950">
              <span className="font-display text-7xl font-semibold text-gold-400">
                {business.founder
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">Her story</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              Immigration guidance built on trust, not guesswork
            </h2>
            <p className="mt-5 text-ink-700">
              {business.founder} works as a {business.credential}, supporting clients through some of the most
              important decisions of their lives — from a first study permit to permanent residence and
              citizenship.
            </p>
            <p className="mt-4 text-ink-700">
              Through {business.instagramHandle}, she shares day-to-day office routines, real approvals, and PR
              pathway updates to a growing community of {stats[0].value} followers navigating Canadian immigration
              — bringing that same transparency to every client relationship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-950/5 px-4 py-2 text-sm font-medium text-navy-950">
                <ShieldCheck size={16} className="text-gold-600" />
                {business.credential}
              </div>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-navy-950/5 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-navy-950/10"
              >
                <InstagramIcon size={16} className="text-gold-600" />
                {business.instagramHandle}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream-100 py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">Why clients choose her</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              What working with Raavi Pathway looks like
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="flex gap-4 rounded-2xl bg-white p-7 shadow-sm shadow-navy-950/5">
                <CheckCircle2 size={22} className="mt-1 shrink-0 text-gold-600" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-950">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </div>
  );
}
