import Container from "./Container";
import Button from "./Button";
import Reveal from "./Reveal";
import { business } from "../data/site";

export default function CTABanner() {
  return (
    <section className="bg-navy-950 py-20 text-cream-50">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Ready to talk about your Canadian pathway?
          </h2>
          <p className="max-w-xl text-cream-50/70">
            Book a free discovery call with {business.founder}, RCIC, and get honest, regulated guidance on the
            options that actually apply to you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={business.calendlyUrl}>Book a Free Call</Button>
            <Button to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
