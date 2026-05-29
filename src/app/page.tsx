"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { formatPhone, isValidPhone } from "@/hooks/usePhoneValidation";

/* ─── Constants ─── */
const PHONE = "(302) 764-0408";
const PHONE_HREF = "tel:3027640408";
const CTA_TEXT = "Speak With a Designer";
const CTA_SHORT = "Get Started";

/* ─── Scroll Reveal ─── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Lead Form ─── */
function LeadForm({
  id,
  dark = false,
  onSubmit,
  isSubmitting,
  isSuccess,
}: {
  id: string;
  dark?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
}) {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const cardBg = dark
    ? "bg-brand-green-dark/95 backdrop-blur-md border border-white/10"
    : "bg-white shadow-2xl border border-gray-100";
  const textColor = dark ? "text-white" : "text-charcoal";
  const inputBg = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-gold focus:ring-brand-gold/30"
    : "bg-brand-cream border-gray-200 text-charcoal placeholder:text-gray-400 focus:border-brand-green focus:ring-brand-green/20";
  const labelColor = dark ? "text-white/80" : "text-charcoal-light";

  if (isSuccess) {
    return (
      <div className={`${cardBg} rounded-2xl p-8 text-center`}>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${textColor}`} style={{ fontFamily: "var(--font-display)" }}>
          Thank You!
        </h3>
        <p className={`${dark ? "text-white/80" : "text-charcoal-light"} mb-4`}>
          We&apos;ve received your request. A DiSabatino designer will be in touch within 1 business day.
        </p>
        <p className={`text-sm ${dark ? "text-white/60" : "text-gray-400"}`}>
          Prefer to call?{" "}
          <a href={PHONE_HREF} className="text-brand-gold font-semibold hover:underline">
            {PHONE}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValidPhone(phone)) {
          setPhoneError("Please enter a valid 10-digit phone number.");
          return;
        }
        setPhoneError("");
        onSubmit(e);
      }}
      className={`${cardBg} rounded-2xl p-8 space-y-4`}
      noValidate
    >
      <h3 className={`text-xl font-bold ${textColor}`} style={{ fontFamily: "var(--font-display)" }}>
        Tell Us About Your Project
      </h3>
      <p className={`text-sm ${dark ? "text-white/70" : "text-charcoal-light"}`}>
        A DiSabatino designer will reach out within 1 business day.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-first-name`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            id={`${id}-first-name`}
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Jane"
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputBg}`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-last-name`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            id={`${id}-last-name`}
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Smith"
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputBg}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputBg}`}
        />
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
          Phone <span className="text-red-400">*</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(302) 555-1234"
          value={phone}
          onChange={(e) => {
            setPhone(formatPhone(e.target.value));
            if (phoneError) setPhoneError("");
          }}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputBg} ${phoneError ? "border-red-500" : ""}`}
        />
        {phoneError && <p className="mt-1 text-xs text-red-400">{phoneError}</p>}
      </div>

      <div>
        <label htmlFor={`${id}-budget`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
          How much are you looking to invest in your project?
        </label>
        <select
          id={`${id}-budget`}
          name="budget"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${inputBg}`}
        >
          <option value="">Select a range...</option>
          <option value="up-to-25k">Up to $25K</option>
          <option value="25k-50k">$25K – $50K</option>
          <option value="50k-100k">$50K – $100K</option>
          <option value="100k-plus">$100K+</option>
          <option value="not-sure">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-project-type`} className={`block text-sm font-medium mb-1 ${labelColor}`}>
          Type of Project
        </label>
        <textarea
          id={`${id}-project-type`}
          name="project_type"
          rows={3}
          placeholder="Tell us about your outdoor living project — patio, pergola, outdoor kitchen, landscape design, scope, materials, timing, anything else you'd like us to know."
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 resize-none ${inputBg}`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-gold hover:bg-brand-gold-light text-white font-bold py-4 rounded-xl transition-all duration-200 text-base shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          CTA_TEXT
        )}
      </button>
      <p className={`text-xs text-center ${dark ? "text-white/50" : "text-gray-400"}`}>
        By submitting, you agree to be contacted by DiSabatino Landscaping regarding your project.
      </p>
    </form>
  );
}

/* ─── Main Page ─── */
export default function OutdoorLivingPage() {
  useReveal();

  const { submit } = useMegaLeadForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useTracking({
    siteKey: "sk_morkk4an_zh29pn4ijnr",
    pixelId: "954247080070263",
  });

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    try {
      await submit({
        first_name: fd.get("first_name"),
        last_name: fd.get("last_name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        budget: fd.get("budget"),
        project_type: fd.get("project_type"),
      });
      setIsSuccess(true);
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "form_submit",
          form_id: "outdoor-living-lead",
          customer: "disabatino",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ─── Sticky Header ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-brand-green-dark transition-all duration-300 ${
          headerScrolled ? "header-scrolled" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#hero" aria-label="DiSabatino Landscaping — Home">
              <Image
                src="/images/logo.png"
                alt="DiSabatino Landscaping"
                width={220}
                height={56}
                className="h-12 md:h-14 w-auto"
                priority
              />
            </a>
            <div className="hidden md:flex items-center gap-4">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-white/80 hover:text-white font-semibold transition"
              >
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5V5z" />
                </svg>
                {PHONE}
              </a>
              <a
                href="#contact"
                className="bg-brand-gold hover:bg-brand-gold-light text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
              >
                {CTA_SHORT}
              </a>
            </div>
            <a
              href={PHONE_HREF}
              className="md:hidden bg-brand-gold text-white p-2.5 rounded-lg"
              aria-label={`Call ${PHONE}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5V5z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO */}
        {/* ═══════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center bg-brand-green-dark pt-16 md:pt-20 overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-outdoor-living.jpg"
              alt="Luxury outdoor living space by DiSabatino Landscaping"
              fill
              className="object-cover opacity-35"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/80 via-brand-green-dark/50 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold-light border border-brand-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Delaware Valley&apos;s Premier Outdoor Living Firm Since 1986
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your Backyard,<br />
                  <span className="text-brand-gold-light">Transformed.</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                  Custom patios, pergolas, outdoor kitchens, and luxury landscape design — crafted to reflect how you live, built to last decades. DiSabatino brings architecture, design, and construction together under one roof for a seamless, resort-quality result.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-brand-gold hover:bg-brand-gold-light text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    {CTA_TEXT}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-lg"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5V5z" />
                    </svg>
                    {PHONE}
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 text-white/70 text-sm">
                  {["30+ Years Experience", "A+ BBB Rating", "1,000+ Projects", "Industry-Best Warranty"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:max-w-md w-full lg:ml-auto">
                <LeadForm
                  id="hero-form"
                  dark
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 2: TRUST BAND */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="trust-band" className="bg-brand-cream border-b border-brand-cream-dark py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "38+", label: "Years in Business", icon: "🏛️" },
                { stat: "1,000+", label: "Projects Completed", icon: "🌿" },
                { stat: "A+", label: "BBB Rating", icon: "⭐" },
                { stat: "565+", label: "5-Star Reviews", icon: "💬" },
              ].map(({ stat, label, icon }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-3xl mb-1">{icon}</span>
                  <span className="text-3xl font-bold text-brand-green" style={{ fontFamily: "var(--font-display)" }}>
                    {stat}
                  </span>
                  <span className="text-sm text-charcoal-light mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 3: SERVICES */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="services" className="py-20 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 reveal">
              <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                Outdoor Living Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Every Element of Your Outdoor Space, Done Right
              </h2>
              <p className="text-charcoal-light text-lg">
                From the first design concept to the final stone laid, DiSabatino builds outdoor environments that feel intentional, refined, and built to last.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Patios & Hardscaping */}
              <div id="patios-hardscaping" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-green" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🪨</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Patios &amp; Hardscaping
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    A well-designed patio is the foundation of every great outdoor space. DiSabatino&apos;s hardscape specialists design and install custom paver patios, natural stone terraces, retaining walls, steps, and walkways using premium materials selected for Delaware Valley&apos;s climate. We plan for drainage, grade, and long-term durability from the outset — so your investment looks as good in year fifteen as it does on install day. Whether you want a simple seating area or a multi-level entertainment plaza, we design it to complement your home&apos;s architecture and your property&apos;s natural flow.
                  </p>
                  <a href="#contact" className="text-brand-green font-semibold text-sm hover:text-brand-green-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                    Plan Your Patio <span>→</span>
                  </a>
                </div>
              </div>

              {/* Pergolas & Arbors */}
              <div id="pergolas-arbors" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-green" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🌲</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Pergolas &amp; Arbors
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    A custom pergola transforms an open patio into a true outdoor room — shaded, defined, and architecturally beautiful. DiSabatino designs and builds pergolas in cedar, composite, and powder-coated aluminum, tailored to match your home&apos;s style and your lifestyle needs. We integrate built-in lighting, ceiling fans, retractable shades, and climbing plant structures to create an environment that&apos;s as functional as it is striking. From intimate garden arbors to grand entertaining pavilions, every structure is engineered to DiSabatino&apos;s exacting standards and backed by our workmanship warranty.
                  </p>
                  <a href="#contact" className="text-brand-green font-semibold text-sm hover:text-brand-green-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                    Design Your Pergola <span>→</span>
                  </a>
                </div>
              </div>

              {/* Outdoor Kitchens */}
              <div id="outdoor-kitchens" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-gold" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🍽️</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Outdoor Kitchens
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    An outdoor kitchen by DiSabatino isn&apos;t a grill on a countertop — it&apos;s a fully equipped culinary environment designed for the way you entertain. We design custom outdoor kitchens with built-in grills and smokers, refrigeration, pizza ovens, wet bars, prep sinks, and premium stone or porcelain countertops. Plumbing, gas, and electrical are integrated cleanly from day one. The result is a space where hosting a dinner for twenty feels effortless, and every detail — from the backsplash tile to the cabinet hardware — reflects the same premium quality as your home&apos;s interior.
                  </p>
                  <a href="#contact" className="text-brand-gold font-semibold text-sm hover:text-brand-gold-light flex items-center gap-1 group-hover:gap-2 transition-all">
                    Design Your Kitchen <span>→</span>
                  </a>
                </div>
              </div>

              {/* Landscape Design */}
              <div id="landscape-design" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-gold" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🌸</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Luxury Landscape Design
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    Great hardscape lives inside great planting. DiSabatino&apos;s licensed landscape architects design planting schemes that frame your outdoor spaces beautifully — seasonal color, screening privacy plantings, specimen trees, ornamental grasses, and curated garden beds that look intentional year-round. We design for four seasons in the Delaware Valley: bold structure in winter, dramatic blooms in spring and summer, rich color in fall. Every plant selection is site-specific, accounting for your soil, sun exposure, drainage, and maintenance preferences. The goal is a landscape that looks like it belongs — because it was designed to.
                  </p>
                  <a href="#contact" className="text-brand-gold font-semibold text-sm hover:text-brand-gold-light flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Your Design <span>→</span>
                  </a>
                </div>
              </div>

              {/* Outdoor Fireplaces & Fire Pits */}
              <div id="fireplaces-fire-pits" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-green" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🔥</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Outdoor Fireplaces &amp; Fire Pits
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    Nothing extends the outdoor season like a well-placed fireplace or fire pit. DiSabatino builds custom outdoor fireplaces in natural stone, brick, and stucco — architecturally matched to your home and integrated into the overall hardscape design. We also design and install custom gas and wood-burning fire pit surrounds that become the natural gathering point for every outdoor evening. From intimate circular seating arrangements to grand fireplace focal walls with built-in seating, we design for both visual impact and the warmth that turns a patio into a destination — well into autumn and even through mild winter evenings.
                  </p>
                  <a href="#contact" className="text-brand-green font-semibold text-sm hover:text-brand-green-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                    Add a Fire Feature <span>→</span>
                  </a>
                </div>
              </div>

              {/* Pavilions & Pool Houses */}
              <div id="pavilions-pool-houses" className="reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-brand-green" />
                <div className="p-7">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5 text-2xl">🏛️</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Pavilions &amp; Pool Houses
                  </h3>
                  <p className="text-charcoal-light leading-relaxed text-sm mb-5">
                    For properties where outdoor living is a lifestyle, DiSabatino designs and builds full pavilions and pool houses that function as true exterior rooms. These structures feature finished ceilings, recessed lighting, built-in audio, ceiling fans, outdoor TVs, and dedicated bar or kitchen areas. Pool houses include changing rooms, storage, and guest bath facilities, fully permitted and constructed to the same standards as your home. Every pavilion and pool house is custom-designed to complement your landscape and architecture — never a kit, always a DiSabatino original that adds significant value to your property.
                  </p>
                  <a href="#contact" className="text-brand-green font-semibold text-sm hover:text-brand-green-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Pavilions <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 reveal">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
              >
                {CTA_TEXT}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 4: TRANSFORMATION CALLOUT */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="transformation" className="py-20 bg-brand-green-dark text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="reveal">
                <span className="inline-block bg-white/10 text-white/80 font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
                  The DiSabatino Difference
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  One Team. Complete Accountability. An Outdoor Space Worth Living In.
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Most contractors specialize in one trade and hand you off to the next. DiSabatino handles everything — landscape architecture, design, hardscaping, construction, lighting, and plantings — with a single project manager and one point of contact. No finger-pointing. No coordination headaches. Just a seamless process and a finished result that exceeds what you imagined.
                </p>
                <ul className="space-y-4">
                  {[
                    "Licensed landscape architects and designers on staff — not outsourced",
                    "3D renderings before a single shovel hits the ground",
                    "Integrated outdoor lighting through Illuminations by DiSabatino",
                    "Custom pool installation available through Pronto Pools",
                    "Industry-best Workmanship Warranty, backed in writing",
                    "Serving Delaware County & the Brandywine Valley for 38 years",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                      <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {[
                      { value: "1986", label: "Year Founded" },
                      { value: "60+", label: "Team Members" },
                      { value: "120+", label: "Fleet Vehicles" },
                      { value: "565+", label: "5-Star Reviews" },
                    ].map(({ value, label }) => (
                      <div key={label} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-3xl font-bold text-brand-gold" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
                        <div className="text-white/70 text-sm mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="block w-full bg-brand-gold hover:bg-brand-gold-light text-white font-bold py-4 rounded-xl transition-all text-center text-lg shadow-lg"
                  >
                    {CTA_TEXT}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 5: PROCESS */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="our-process" className="py-20 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 reveal">
              <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>
                From First Conversation to Final Walkthrough
              </h2>
              <p className="text-charcoal-light text-lg">
                No confusion. No coordination headaches. A disciplined process that delivers exactly what we promised.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  desc: "We visit your property, listen to your vision, and assess your space. No pressure — just a real conversation about what&apos;s possible and what it takes to get there.",
                },
                {
                  step: "02",
                  title: "Custom Design & Budget",
                  desc: "Our licensed designers create a detailed plan and 3D rendering of your outdoor space, along with a transparent investment proposal so you know exactly what you&apos;re getting.",
                },
                {
                  step: "03",
                  title: "Expert Construction",
                  desc: "Our in-house crews build your project with the same craftsmen who designed it. One project manager. Regular updates. Zero surprises.",
                },
                {
                  step: "04",
                  title: "Warranty &amp; Enjoyment",
                  desc: "Every DiSabatino project is covered by our industry-best Workmanship Warranty. We don&apos;t disappear after the final walk — we stand behind everything we build.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="reveal text-center">
                  <div
                    className="w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3" style={{ fontFamily: "var(--font-display)" }}
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p className="text-charcoal-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 6: TESTIMONIALS */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="testimonials" className="py-20 bg-warm-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 reveal">
              <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                Client Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>
                What Homeowners Are Saying
              </h2>
              <p className="text-charcoal-light">565+ five-star reviews across Northern Delaware and Southeastern Pennsylvania.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Our consultant worked with us on planning and designing our backyard that is now our own little resort. Adrienne went above and beyond accommodating all of our needs — her professionalism and vision is outstanding.",
                  author: "The Mills Family",
                  location: "Bear, DE",
                },
                {
                  quote: "I have used DiSabatino many times in the past and have been consistently impressed with the quality of the work and professional and courteous staff. I have come to expect very high quality from DiSabatino and have never been disappointed.",
                  author: "Paul & Ellie O'Donnell",
                  location: "Chadds Ford, PA",
                },
                {
                  quote: "DiSabatino Landscaping is my landscaper of choice. Owner Chris DiSabatino and his team provide excellent service. Pavel and his team are courteous, always on time, and ensure the customer is satisfied. You will not be disappointed.",
                  author: "The Barker Family",
                  location: "Kennett Square, PA",
                },
              ].map(({ quote, author, location }) => (
                <div key={author} className="reveal bg-white rounded-2xl shadow-md p-7 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-charcoal-light text-sm leading-relaxed flex-1 italic mb-6">&ldquo;{quote}&rdquo;</p>
                  <div>
                    <p className="font-bold text-charcoal text-sm">{author}</p>
                    <p className="text-xs text-charcoal-light">{location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 7: SERVICE AREA */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="service-area" className="py-16 bg-brand-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
            <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Where We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Serving Delaware County, PA &amp; Northern Delaware
            </h2>
            <p className="text-charcoal-light mb-8 max-w-2xl mx-auto">
              DiSabatino serves high-end residential communities throughout the tri-state area, with deep roots in the communities we&apos;ve called home for nearly four decades.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Wilmington, DE", "Greenville, DE", "Centerville, DE", "Hockessin, DE",
                "Newark, DE", "West Chester, PA", "Kennett Square, PA", "Chadds Ford, PA",
                "Glen Mills, PA", "Newtown Square, PA", "Malvern, PA", "Villanova, PA",
                "Bryn Mawr, PA", "Wayne, PA", "Gladwyne, PA", "Devon, PA",
              ].map((city) => (
                <span key={city} className="bg-white border border-brand-cream-dark text-charcoal-light text-sm px-4 py-2 rounded-full shadow-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SECTION 8: CONTACT FORM */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 bg-warm-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="reveal">
                <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                  Get Started
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Ready to Build Your Outdoor Retreat?
                </h2>
                <p className="text-charcoal-light text-lg mb-8">
                  Tell us about your project and a DiSabatino designer will be in touch within 1 business day. No obligation — just a real conversation about your vision and what it takes to bring it to life.
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Call Us Directly</p>
                      <a href={PHONE_HREF} className="font-bold text-brand-green text-lg hover:underline">{PHONE}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Email</p>
                      <a href="mailto:reception@disabatinoinc.com" className="font-bold text-brand-green hover:underline">
                        reception@disabatinoinc.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Our Promise</p>
                      <p className="font-semibold text-charcoal">Industry-Best Workmanship Warranty</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <LeadForm
                  id="contact-form"
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-brand-green-dark text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="DiSabatino Landscaping"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-white/40 hidden md:block">|</span>
              <span className="text-white/60 text-sm hidden md:block">Outdoor Living &amp; Landscape Design · Delaware Valley</span>
            </div>
            <div className="text-center md:text-right">
              <a href={PHONE_HREF} className="text-brand-gold font-semibold hover:underline text-lg">{PHONE}</a>
              <p className="text-white/50 text-xs mt-1">
                © {new Date().getFullYear()} DiSabatino Inc. All rights reserved.{" "}
                <a href="https://disabatinoinc.com/privacy-policy" className="hover:text-white/80 transition">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Sticky CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-green border-t border-brand-green-light shadow-2xl">
        <div className="flex">
          <a
            href={PHONE_HREF}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold border-r border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5V5z" />
            </svg>
            Call Now
          </a>
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-gold text-white font-bold"
          >
            {CTA_SHORT}
          </a>
        </div>
      </div>
    </>
  );
}
