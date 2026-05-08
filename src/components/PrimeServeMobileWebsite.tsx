"use client";

import { useMemo, useState } from "react";

const WEB_STORE_URL = "https://primeservefms.vercel.app/";

type PageId = "home" | "services" | "why" | "about" | "contact";
type SetActive = (page: PageId) => void;
type TextPair = [string, string];
type StepTuple = [string, string, string];

const pages: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why PrimeServe" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const industries = [
  "Hotels",
  "Restaurants",
  "Cafes",
  "Hospitals",
  "IT companies",
  "MNC offices",
  "Tech parks",
  "Managed workspaces",
];

const pains: TextPair[] = [
  ["Too many vendors", "Your team handles cleaning, pantry, washroom, and office supplies through scattered vendors and follow-ups."],
  ["No clear pricing", "Owners cannot easily verify if facility products are being bought at fair market prices."],
  ["Last-minute buying", "Stockouts force teams to buy locally at higher prices, quietly reducing profit."],
  ["Different branch prices", "Each location may buy the same product at a different price with different quality standards."],
  ["Missing documents", "GST invoices, delivery proof, and MSDS sheets get buried in WhatsApp, email, and paper files."],
  ["No simple spend report", "Owners cannot quickly see what was bought, who ordered it, where it went, and what it cost."],
];

const services: TextPair[] = [
  ["One ordering platform", "Housekeeping materials, cleaning chemicals, pantry items, washroom supplies, stationery, and facility tools in one place."],
  ["Spend visibility", "Track facility spend by item, branch, category, and month so finance teams can see every rupee clearly."],
  ["Approved catalog", "Create one controlled product list for teams and branches to keep quality and prices consistent."],
  ["Quick reorder", "Repeat common monthly orders faster and reduce expensive emergency purchases."],
  ["GST and MSDS documents", "Keep invoices, delivery proof, and chemical safety sheets attached to orders."],
  ["Verified suppliers", "Buy through a controlled supplier network instead of depending on one local vendor relationship."],
];

const works: StepTuple[] = [
  ["01", "Approve your catalog", "Choose the supplies your team and branches are allowed to buy."],
  ["02", "Team orders online", "Staff orders from the PrimeServe web store instead of calling many vendors."],
  ["03", "PrimeServe fulfills", "Orders are handled with delivery proof and proper GST documents."],
  ["04", "You track spend", "Owners and finance teams see item, quantity, price, branch, and monthly trends."],
];

const compareRows: StepTuple[] = [
  ["Vendors", "Many calls, WhatsApp chats, and payment follow-ups.", "One platform for supplies, orders, invoices, and support."],
  ["Pricing", "Owners are unsure whether prices are fair.", "Prices are visible before ordering and easier to review."],
  ["Branches", "Every branch can buy different products at different prices.", "Branches can follow one approved catalog and buying rules."],
  ["Documents", "Invoices and safety sheets are scattered.", "Documents stay connected to each order."],
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark";
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-center text-sm font-black transition sm:w-auto focus:outline-none focus:ring-4 focus:ring-[#12C7B7]/20";
  const variants = {
    primary: "bg-[#12C7B7] text-[#071225] shadow-[0_12px_28px_rgba(18,199,183,.22)] hover:bg-[#2EE5D5]",
    outline: "border border-slate-200 bg-white text-[#071225] hover:border-[#12C7B7] hover:text-[#079889]",
    dark: "bg-[#071225] text-white hover:bg-[#10213C]",
  };
  const classNames = cx(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classNames}>
      {children}
    </button>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#BDF5EE] bg-[#EFFFFD] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#079889] sm:text-xs">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#12C7B7]" />
      <span className="break-words">{children}</span>
    </div>
  );
}

function SectionHeader({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionTag>{label}</SectionTag>
      <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#071225] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
        {text}
      </p>
    </div>
  );
}

function Header({ active, setActive }: { active: PageId; setActive: SetActive }) {
  const [open, setOpen] = useState(false);

  const go = (id: PageId) => {
    setActive(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button type="button" onClick={() => go("home")} className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#071225] text-sm font-black text-white">
            P
          </span>
          <span className="truncate text-lg font-black tracking-tight text-[#071225] sm:text-xl">
            Prime<span className="text-[#12C7B7]">Serve</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => go(page.id)}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-bold transition",
                active === page.id ? "bg-[#071225] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-[#071225]",
              )}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" href={WEB_STORE_URL} className="w-auto">
            Web Store
          </Button>
          <Button onClick={() => go("contact")} className="w-auto">
            Free Audit
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-[#071225] lg:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="grid gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => go(page.id)}
                className={cx(
                  "rounded-2xl px-4 py-3 text-left text-base font-bold",
                  active === page.id ? "bg-[#071225] text-white" : "bg-slate-50 text-slate-700",
                )}
              >
                {page.label}
              </button>
            ))}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Button variant="outline" href={WEB_STORE_URL}>
                Open Web Store
              </Button>
              <Button onClick={() => go("contact")}>Get Free Audit</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ setActive }: { setActive: SetActive }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D7FFFA] blur-3xl sm:h-96 sm:w-96" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10 text-center lg:text-left">
          <SectionTag>B2B facility supplies and procurement</SectionTag>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.055em] text-[#071225] sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
            Buy facility supplies with less chaos and more control.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
            PrimeServe helps hotels, restaurants, cafes, hospitals, offices, IT companies, MNCs, and workspaces order housekeeping supplies, cleaning chemicals, pantry items, washroom products, and office essentials from one simple platform.
          </p>
          <div className="mt-7 grid gap-3 sm:mx-auto sm:max-w-xl sm:grid-cols-2 lg:mx-0">
            <Button onClick={() => setActive("contact")}>Get Free Spend Audit</Button>
            <Button variant="outline" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
              Check Hidden Leakage
            </Button>
          </div>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
            {industries.slice(0, 6).map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm sm:px-4 sm:text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
        <MobileControlCard />
      </div>
    </section>
  );
}

function MobileControlCard() {
  const metrics: TextPair[] = [
    ["12", "vendors"],
    ["28%", "price risk"],
    ["6/mo", "urgent buys"],
    ["1", "platform"],
  ];

  return (
    <div className="relative z-10 mx-auto w-full max-w-lg lg:max-w-none">
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(7,18,37,.12)] sm:rounded-[2rem] sm:p-4">
        <div className="rounded-[1.35rem] bg-[#071225] p-5 text-white sm:rounded-[1.75rem] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A8FFF7]">Facility spend check</p>
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">
            Your facility spend may be leaking.
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            Vendor chaos, urgent purchases, missing invoices, and branch price differences can quietly increase cost.
          </p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#F4A64F] via-[#A7E7C0] to-[#12C7B7]" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {metrics.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-3xl font-black tracking-[-0.04em] text-[#63FFF0]">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryStrip() {
  return (
    <section className="border-y border-slate-200 bg-[#F8FBFD] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          Built for teams that buy facility supplies every month
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {industries.map((item) => (
            <span key={item} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-xs font-black text-slate-700 shadow-sm sm:text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ index, title, text }: { index: number; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E9FFFC] text-sm font-black text-[#079889] ring-1 ring-[#BDF5EE]">
        {String(index).padStart(2, "0")}
      </div>
      <h3 className="mt-5 text-xl font-black leading-tight tracking-[-0.02em] text-[#071225]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{text}</p>
    </div>
  );
}

function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-[#F8FBFD] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D7FFFA] blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionTag>{label}</SectionTag>
        <h1 className="text-4xl font-black leading-tight tracking-[-0.055em] text-[#071225] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {text}
        </p>
      </div>
    </section>
  );
}

function DeepContext({ setActive }: { setActive: SetActive }) {
  const pillars: TextPair[] = [
    ["One place to order", "Stop chasing many vendors and order supplies from one clean platform."],
    ["Clear spend visibility", "See what was ordered, who ordered it, which branch used it, and how much it cost."],
    ["Audit-ready documents", "Keep GST invoices, delivery records, and MSDS sheets easy to find."],
    ["Same quality everywhere", "Use approved products across all locations so each branch follows the same standard."],
  ];

  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div className="text-center lg:text-left">
          <SectionTag>What PrimeServe does</SectionTag>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#071225] sm:text-4xl lg:text-5xl">
            PrimeServe makes facility purchasing simple.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Your team gets an easy ordering system. You get clear pricing, proper documents, and better control over spending.
          </p>
          <div className="mx-auto mt-6 max-w-md lg:mx-0">
            <Button onClick={() => setActive("why")}>Why Choose PrimeServe</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map(([title, text], index) => (
            <Card key={title} index={index + 1} title={title} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainGrid() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="The problem"
          title="Most businesses lose money in daily facility purchases."
          text="The real problem is too many vendors, unclear pricing, urgent buying, branch inconsistency, and missing documents."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map(([title, text], index) => (
            <Card key={title} index={index + 1} title={title} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview({ setActive }: { setActive: SetActive }) {
  return (
    <section className="bg-[#F8FBFD] px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="text-center lg:text-left">
          <SectionTag>Services</SectionTag>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#071225] sm:text-4xl lg:text-5xl">
            Everything your facility team needs, in one platform.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Order supplies, check prices, track spending, keep documents, and manage multiple branches from one place.
          </p>
          <div className="mx-auto mt-6 max-w-md lg:mx-0">
            <Button onClick={() => setActive("services")}>View Services</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.slice(0, 4).map(([title, text], index) => (
            <Card key={title} index={index + 1} title={title} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingModel() {
  return (
    <section className="relative overflow-hidden bg-[#F8FBFD] px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="How PrimeServe works"
          title="Order, deliver, track, and audit from one place."
          text="Your team orders approved supplies. PrimeServe delivers them. You track spending, invoices, documents, and branch-wise usage."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {works.map(([num, title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#071225] text-sm font-black text-white">
                  {num}
                </span>
                <span className="rounded-full border border-slate-200 bg-[#F8FBFD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Step
                </span>
              </div>
              <h3 className="mt-6 text-xl font-black leading-tight tracking-[-0.03em] text-[#071225]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = ["Approved products", "Order request", "Delivery proof", "GST invoice", "Audit folder", "Spend report"];

  return (
    <section className="bg-[#071225] px-4 py-14 text-white sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#A8FFF7] sm:text-xs">
            Simple buying flow
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Stop buying facility supplies through scattered WhatsApp chats.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            PrimeServe turns daily facility purchasing into a simple, trackable process that owners and finance teams can understand.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[2rem] sm:p-5">
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#12C7B7] text-sm font-black text-[#071225]">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className="font-black">{step}</p>
                  <p className="text-sm text-white/55">Easy to find, check, and report.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ThenVsNow() {
  return (
    <section className="bg-[#F8FBFD] px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Before vs after"
          title="Before PrimeServe, buying was messy. With PrimeServe, it becomes clear."
          text="See how PrimeServe changes daily facility procurement for hotels, restaurants, hospitals, offices, and multi-branch teams."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {compareRows.map(([area, before, after], index) => (
            <div key={area} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#071225] p-4 text-white">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#12C7B7] text-xs font-black text-[#071225]">
                  {index + 1}
                </span>
                <p className="font-black">{area}</p>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Before</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{before}</p>
                </div>
                <div className="rounded-2xl bg-[#EFFFFD] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#079889]">With PrimeServe</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator({ setActive }: { setActive: SetActive }) {
  const [monthly, setMonthly] = useState(150000);
  const [branches, setBranches] = useState(3);
  const [vendors, setVendors] = useState(10);
  const [emergency, setEmergency] = useState(5);

  const money = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
      Math.max(0, Math.round(amount || 0)),
    );

  const result = useMemo(() => {
    const annualSpend = monthly * 12;
    const priceLeakage = annualSpend * 0.18;
    const emergencyPremium = emergency * 750 * 12 * Math.max(1, branches * 0.7);
    const vendorWaste = Math.max(0, vendors - 3) * 8500;
    const branchVariance = branches > 1 ? annualSpend * 0.065 : annualSpend * 0.025;
    const total = priceLeakage + emergencyPremium + vendorWaste + branchVariance;
    return { annualSpend, priceLeakage, emergencyPremium, vendorWaste, branchVariance, total };
  }, [monthly, branches, vendors, emergency]);

  const leakageRate = result.annualSpend > 0 ? Math.min(34, Math.round((result.total / result.annualSpend) * 100)) : 0;
  const breakdown: Array<[string, number]> = [
    ["Unclear pricing", result.priceLeakage],
    ["Urgent purchase cost", result.emergencyPremium],
    ["Too many vendors", result.vendorWaste],
    ["Branch price gap", result.branchVariance],
  ];

  return (
    <section id="calculator" className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
        <div className="text-center lg:text-left">
          <SectionTag>Free spend calculator</SectionTag>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.045em] text-[#071225] sm:text-4xl lg:text-5xl">
            Find hidden leakage in your facility spend.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Type your monthly spend, branches, vendors, and urgent purchases. This gives a quick estimate of possible yearly leakage.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-[#F8FBFD] p-4 shadow-[0_20px_60px_rgba(7,18,37,.08)] sm:rounded-[2rem] sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <CalculatorInput label="Monthly facility spend" prefix="₹" value={monthly} onChange={setMonthly} helper="Cleaning, pantry, washroom, office supplies" />
            <CalculatorInput label="Number of branches" value={branches} onChange={setBranches} helper="How many locations you manage" />
            <CalculatorInput label="Current vendors" value={vendors} onChange={setVendors} helper="Total suppliers your team calls" />
            <CalculatorInput label="Urgent buys / month" value={emergency} onChange={setEmergency} helper="Urgent buys from local shops" />
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-[#071225] p-5 text-white sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A8FFF7]">Estimated annual leakage</p>
            <p className="mt-2 text-4xl font-black leading-none tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {money(result.total)}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Based on unclear pricing, urgent buying, too many vendors, and different branch prices.
            </p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#F4A64F] via-[#A7E7C0] to-[#12C7B7] transition-all duration-500"
                style={{ width: `${Math.max(18, Math.min(88, leakageRate * 2.6))}%` }}
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {breakdown.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-sm font-bold text-white/52">{label}</p>
                  <p className="mt-1 text-xl font-black tracking-[-0.03em] text-white">{money(value)}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setActive("contact")} className="mt-5">
              Get Free Spend Audit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorInput({
  label,
  value,
  onChange,
  prefix = "",
  helper = "",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  helper?: string;
}) {
  const cleanValue = value === 0 ? "" : String(value);
  const updateValue = (raw: string) => {
    const next = Number(String(raw).replace(/[^0-9]/g, ""));
    onChange(Number.isFinite(next) ? next : 0);
  };

  return (
    <label className="block rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <span className="block text-sm font-black text-[#071225]">{label}</span>
      <div className="mt-3 flex items-center rounded-2xl border border-slate-200 bg-[#F8FBFD] px-4 py-3 focus-within:border-[#12C7B7] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#12C7B7]/10">
        {prefix && <span className="mr-2 text-lg font-black text-slate-400">{prefix}</span>}
        <input
          inputMode="numeric"
          type="text"
          value={cleanValue}
          onChange={(event) => updateValue(event.target.value)}
          placeholder="Type number"
          className="w-full bg-transparent text-xl font-black tracking-[-0.03em] text-[#071225] outline-none placeholder:text-slate-300 sm:text-2xl"
        />
      </div>
      <span className="mt-2 block text-xs font-semibold leading-5 text-slate-500">{helper}</span>
    </label>
  );
}

function CTA({ setActive }: { setActive: SetActive }) {
  return (
    <section className="bg-[#F8FBFD] px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.75rem] bg-[#071225] p-6 text-center text-white sm:rounded-[2.2rem] sm:p-10 lg:p-12 lg:text-left">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A8FFF7]">Free spend audit</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                See where your facility spend is leaking.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                Get a simple review of your vendors, invoices, urgent purchases, and monthly supply costs.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Button onClick={() => setActive("contact")}>Get Free Spend Audit</Button>
              <Button variant="outline" href={WEB_STORE_URL}>
                Open Web Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home({ setActive }: { setActive: SetActive }) {
  return (
    <>
      <Hero setActive={setActive} />
      <IndustryStrip />
      <DeepContext setActive={setActive} />
      <PainGrid />
      <ServicesOverview setActive={setActive} />
      <OperatingModel />
      <Workflow />
      <Calculator setActive={setActive} />
      <CTA setActive={setActive} />
    </>
  );
}

function ServicesPage({ setActive }: { setActive: SetActive }) {
  return (
    <>
      <PageHero
        label="Services"
        title="Facility supplies, ordering, documents, and spend tracking in one place."
        text="PrimeServe helps teams buy housekeeping supplies, cleaning chemicals, pantry items, washroom products, office stationery, and facility tools with better control."
      />
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text], index) => (
            <Card key={title} index={index + 1} title={title} text={text} />
          ))}
        </div>
      </section>
      <ThenVsNow />
      <OperatingModel />
      <CTA setActive={setActive} />
    </>
  );
}

function WhyPage({ setActive }: { setActive: SetActive }) {
  return (
    <>
      <PageHero
        label="Why PrimeServe"
        title="Because facility buying should be simple, clear, and easy to control."
        text="PrimeServe helps business owners reduce vendor confusion, check prices, keep documents, and understand monthly facility spend."
      />
      <DeepContext setActive={setActive} />
      <Workflow />
      <Calculator setActive={setActive} />
    </>
  );
}

function AboutPage({ setActive }: { setActive: SetActive }) {
  const blocks: TextPair[] = [
    ["Mission", "Make facility procurement simple, clear, and easy to track for every business."],
    ["Trust", "Help businesses buy from verified suppliers with proper GST invoices and documents."],
    ["Outcome", "Reduce vendor chaos, avoid urgent purchases, improve quality, and keep spending visible."],
  ];

  return (
    <>
      <PageHero
        label="About PrimeServe"
        title="We help businesses buy facility supplies without confusion."
        text="PrimeServe Facility Solutions is a B2B platform for recurring facility supplies, housekeeping materials, cleaning products, pantry items, washroom essentials, and office supplies."
      />
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([title, text], index) => (
            <Card key={title} index={index + 1} title={title} text={text} />
          ))}
        </div>
      </section>
      <CTA setActive={setActive} />
    </>
  );
}

function ContactPage() {
  const contactBlocks: TextPair[] = [
    ["Phone", "+91 7795242918"],
    ["Email", "support@primeservefs.com"],
    ["Web Store", "Open the PrimeServe ordering platform"],
  ];

  return (
    <>
      <PageHero
        label="Contact Us"
        title="Start with a free facility spend audit."
        text="Share your monthly spend, vendors, branches, and common supply categories. PrimeServe will help you find where money may be leaking."
      />
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactBlocks.map(([label, text], index) => (
              <div key={label} className="rounded-[1.35rem] border border-slate-200 bg-[#F8FBFD] p-5">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E9FFFC] text-sm font-black text-[#079889] ring-1 ring-[#BDF5EE]">
                  {index + 1}
                </div>
                <p className="mt-4 font-black text-[#071225]">{label}</p>
                <p className="mt-1 break-words text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="rounded-[1.5rem] border border-slate-200 bg-[#F8FBFD] p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" placeholder="Your name" />
              <Input label="Company name" placeholder="Company / brand" />
              <Input label="Work email" placeholder="name@company.com" />
              <Input label="Phone number" placeholder="+91" />
              <Input label="Business type" placeholder="Hotel, cafe, IT office, hospital..." />
              <Input label="Monthly facility spend" placeholder="₹50,000 / ₹2L / ₹5L..." />
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-black text-[#071225]">What do you want to fix first?</span>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#12C7B7] focus:ring-4 focus:ring-teal-50"
                placeholder="Too many vendors, high prices, urgent buying, missing documents, branch-wise spend..."
              />
            </label>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button>Submit Audit Request</Button>
              <Button variant="outline" href={WEB_STORE_URL}>
                Open Web Store
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#071225]">{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#12C7B7] focus:ring-4 focus:ring-teal-50"
        placeholder={placeholder}
      />
    </label>
  );
}

function Footer({ setActive }: { setActive: SetActive }) {
  const go = (id: PageId) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 bg-white px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:py-12">
        <div>
          <div className="text-2xl font-black text-[#071225]">
            Prime<span className="text-[#12C7B7]">Serve</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            B2B platform for facility supplies, housekeeping products, cleaning chemicals, office supplies, GST documents, and spend tracking.
          </p>
        </div>
        <div>
          <p className="font-black text-[#071225]">Website</p>
          <div className="mt-4 grid gap-2">
            {pages.map((page) => (
              <button key={page.id} type="button" onClick={() => go(page.id)} className="text-left text-sm font-bold text-slate-600 hover:text-[#079889]">
                {page.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-black text-[#071225]">Actions</p>
          <div className="mt-4 grid gap-3">
            <Button onClick={() => go("contact")}>Get Free Spend Audit</Button>
            <Button variant="outline" href={WEB_STORE_URL}>
              Open Web Store
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-slate-200 py-5 text-center text-sm font-semibold text-slate-500">
        © 2026 PrimeServe Facility Solutions. All rights reserved.
      </div>
    </footer>
  );
}

export default function PrimeServeMobileWebsite() {
  const [active, setActive] = useState<PageId>("home");

  const navigateToPage = (pageId: PageId) => {
    setActive(pageId);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };

  const page =
    active === "services" ? (
      <ServicesPage setActive={navigateToPage} />
    ) : active === "why" ? (
      <WhyPage setActive={navigateToPage} />
    ) : active === "about" ? (
      <AboutPage setActive={navigateToPage} />
    ) : active === "contact" ? (
      <ContactPage />
    ) : (
      <Home setActive={navigateToPage} />
    );

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-white font-sans text-[#071225]">
      <Header active={active} setActive={navigateToPage} />
      <main>{page}</main>
      <Footer setActive={navigateToPage} />
      <div className="fixed bottom-5 right-5 z-40 hidden gap-3 lg:flex">
        <Button variant="outline" href={WEB_STORE_URL} className="w-auto shadow-lg">
          Web Store
        </Button>
        <Button onClick={() => navigateToPage("contact")} className="w-auto shadow-lg">
          Free Audit
        </Button>
      </div>
    </div>
  );
}
