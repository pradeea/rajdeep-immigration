import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import { business } from "../data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-950/95 backdrop-blur shadow-lg shadow-navy-950/20" : "bg-navy-950"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <NavLink to="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-semibold text-cream-50">{business.name}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gold-400">Immigration Consulting</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-gold-400" : "text-cream-50/80 hover:text-cream-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href={business.phoneHref} className="flex items-center gap-2 text-sm text-cream-50/80 hover:text-cream-50">
            <Phone size={16} className="text-gold-400" />
            {business.phone}
          </a>
          <Button href={business.calendlyUrl}>Book a Free Call</Button>
        </div>

        <button
          className="text-cream-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-cream-50/10 bg-navy-950 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? "bg-navy-900 text-gold-400" : "text-cream-50/90"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-3 px-3">
              <a href={business.phoneHref} className="flex items-center gap-2 text-sm text-cream-50/80">
                <Phone size={16} className="text-gold-400" />
                {business.phone}
              </a>
              <Button href={business.calendlyUrl} className="w-full">
                Book a Free Call
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
