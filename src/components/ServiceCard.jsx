import { serviceIcons } from "../data/icons";

export default function ServiceCard({ service }) {
  const Icon = serviceIcons[service.slug];
  return (
    <div className="group rounded-2xl border border-navy-900/10 bg-white p-7 shadow-sm shadow-navy-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
        {Icon && <Icon size={22} />}
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-navy-950">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-700">{service.short}</p>
    </div>
  );
}
