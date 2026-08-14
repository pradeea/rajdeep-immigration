import { useState } from "react";
import { Mail, MapPin, Phone, CalendarClock } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import InstagramIcon from "../components/icons/InstagramIcon";
import { business } from "../data/site";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${business.addressLine1}, ${business.addressLine2}`
)}&output=embed`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0A%0A${form.message}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      "Website enquiry"
    )}&body=${body}`;
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your pathway to Canada"
        description="Reach out directly, or book a free discovery call at a time that works for you."
      />

      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-navy-950">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold-600" />
                <span className="text-ink-700">
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-gold-600" />
                <a href={business.phoneHref} className="text-ink-700 hover:text-navy-950">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-gold-600" />
                <a href={`mailto:${business.email}`} className="text-ink-700 hover:text-navy-950">
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={20} className="shrink-0 text-gold-600" />
                <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-ink-700 hover:text-navy-950">
                  {business.instagramHandle}
                </a>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-navy-950 p-6 text-cream-50">
              <div className="flex items-center gap-2 text-gold-400">
                <CalendarClock size={18} />
                <span className="text-sm font-semibold uppercase tracking-widest">Prefer to book directly?</span>
              </div>
              <p className="mt-2 text-sm text-cream-50/70">
                Skip the form and pick a time that works for you on Calendly.
              </p>
              <Button href={business.calendlyUrl} className="mt-4 w-full">
                Book a Free Call
              </Button>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-900/10">
              <iframe
                title="Office location"
                src={mapSrc}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm shadow-navy-950/5"
            >
              <h2 className="font-display text-2xl font-semibold text-navy-950">Send a message</h2>
              <p className="mt-2 text-sm text-ink-500">
                Fill this out and it'll open a pre-filled email to {business.founder}.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-sm font-medium text-navy-950">Full name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-navy-900/15 bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-gold-500"
                    placeholder="Your name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="text-sm font-medium text-navy-950">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-navy-900/15 bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-gold-500"
                    placeholder="+1 (___) ___-____"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium text-navy-950">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-navy-900/15 bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-gold-500"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-navy-950">How can we help?</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-navy-900/15 bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-gold-500"
                    placeholder="Tell us a bit about your situation and goals..."
                  />
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
