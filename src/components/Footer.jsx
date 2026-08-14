import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "./Container";
import InstagramIcon from "./icons/InstagramIcon";
import { business, services } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-50/80">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div>
          <span className="font-display text-lg font-semibold text-cream-50">{business.name}</span>
          <p className="mt-3 text-sm leading-relaxed">
            {business.credential} helping clients navigate Canadian immigration with clarity and care.
          </p>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300"
          >
            <InstagramIcon size={16} />
            {business.instagramHandle}
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-400">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-cream-50">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-400">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-cream-50">About Rajdeep</Link></li>
            <li><Link to="/services" className="hover:text-cream-50">Services</Link></li>
            <li><Link to="/testimonials" className="hover:text-cream-50">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-cream-50">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold-400">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span>
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold-400" />
              <a href={business.phoneHref} className="hover:text-cream-50">{business.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold-400" />
              <a href={`mailto:${business.email}`} className="hover:text-cream-50">{business.email}</a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream-50/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-cream-50/50 md:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>Regulated by the College of Immigration and Citizenship Consultants (CICC).</p>
        </Container>
      </div>
    </footer>
  );
}
