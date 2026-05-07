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
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact Us" },
];

const industries = [
  "Restaurants",
  "Cafes",
  "Hotels",
  "Hospitality",
  "Hospitals & clinics",
  "IT companies",
  "MNC companies",
  "Tech companies",
  "Corporate offices",
  "Managed workspaces",
];

const pains: TextPair[] = [
  ["Too many vendors", "Your team buys cleaning, pantry, washroom, and office supplies from many vendors. This creates follow-ups, confusion, and wasted time."],
  ["No clear pricing", "Owners often do not know if they are paying the right price for housekeeping supplies, cleaning chemicals, and facility products."],
  ["Last-minute buying", "When stock runs out, teams buy from nearby shops at higher prices. These small urgent purchases quietly reduce profit."],
  ["Different branch prices", "Each branch may buy the same product from different vendors at different prices. This makes cost control difficult."],
  ["Missing documents", "GST invoices, delivery proof, and MSDS sheets are often lost in WhatsApp, email, or paper files."],
  ["No simple spend report", "Business owners cannot easily see what was bought, where it was used, and who approved it."],
];

const services: TextPair[] = [
  ["Facility supplies in one place", "Order housekeeping materials, cleaning chemicals, pantry items, washroom supplies, office stationery, and facility tools from one platform."],
  ["Simple spend dashboard", "See your facility spend by item, category, branch, and month so you know where your money is going."],
  ["Approved product catalog", "Create one approved list of products for your team and branches. This keeps quality and pricing consistent."],
  ["Easy repeat ordering", "Reorder common supplies quickly and reduce last-minute local purchases."],
  ["GST and MSDS documents", "Keep GST invoices, delivery proof, and chemical safety sheets in one easy-to-find place."],
  ["Order to invoice tracking", "Track every request from order to delivery to invoice, without depending only on WhatsApp messages."],
  ["Branch and team control", "Let teams order what they need while owners, admins, and finance teams keep visibility and approval control."],
  ["Verified supplier network", "Buy from verified suppliers so your business gets reliable products, fair pricing, and better delivery support."],
];

const pillars: TextPair[] = [
  ["One place to order", "Stop chasing many vendors. Order facility and housekeeping supplies from one clean platform."],
  ["Clear spend visibility", "See what was ordered, who ordered it, which branch used it, and how much it cost."],
  ["Audit-ready documents", "Keep GST invoices, delivery records, and MSDS sheets ready whenever you need them."],
  ["Same quality everywhere", "Use approved products across all locations so every branch follows the same standard."],
  ["Fewer urgent buys", "Use repeat orders and stock planning to avoid expensive last-minute purchases."],
  ["Reliable supply", "Reduce dependency on one local vendor by using verified supplier options through PrimeServe."],
];

const works: StepTuple[] = [
  ["01", "Set your approved list", "Choose the products your team is allowed to buy for cleaning, pantry, washroom, and office needs."],
  ["02", "Team places an order", "Your staff orders from the PrimeServe web store instead of calling or messaging many vendors."],
  ["03", "You see every detail", "Owners, admins, and finance teams can see items, quantity, price, branch, and documents."],
  ["04", "PrimeServe delivers", "Orders are fulfilled through verified suppliers with delivery proof and proper GST invoices."],
  ["05", "You track and improve", "Your dashboard helps you find high spend, repeat needs, branch differences, and possible leakage."],
];

const compareRows: StepTuple[] = [
  ["Vendors", "Before: your team managed many vendors, calls, WhatsApp chats, and payment follow-ups.", "Now: one platform for facility supplies, orders, invoices, and support."],
  ["Pricing", "Before: owners were not sure if prices were fair or inflated.", "Now: prices are visible before ordering, so every purchase is easier to check."],
  ["Ordering", "Before: teams repeated old messages, called vendors, and waited for replies.", "Now: teams order from a clear online catalog with approved products."],
  ["Urgent purchases", "Before: stockouts forced teams to buy locally at higher prices.", "Now: repeat ordering and stock planning reduce last-minute buying."],
  ["Branches", "Before: every branch could buy different products at different prices.", "Now: all branches can follow the same product list and buying rules."],
  ["Documents", "Before: GST invoices, delivery proof, and safety sheets were scattered everywhere.", "Now: documents stay connected to each order and are easy to find."],
];

function Button({ children, variant = "primary", onClick, href, className = "" }: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark";
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition duration-200 focus:outline-none";
  const variants = {
    primary: "bg-[#12C7B7] text-[#071225] shadow-[0_16px_34px_rgba(18,199,183,.28)] hover:bg-[#2EE5D5] hover:-translate-y-0.5",
    outline: "border border-[#DDE7F2] bg-white text-[#071225] hover:border-[#12C7B7]/70 hover:text-[#079889] hover:-translate-y-0.5",
    dark: "bg-[#071225] text-white hover:bg-[#10213C]",
  };

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" className={`${base} ${variants[variant]} ${className}`}>{children}</a>;
  }

  return <button type="button" onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#BDF5EE] bg-[#EFFFFD] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#079889]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#12C7B7]" />
      {children}
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button type="button" onClick={() => go("home")} className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#071225] font-black text-white">P</span>
          <span className="text-xl font-black tracking-tight text-[#071225]">Prime<span className="text-[#12C7B7]">Serve</span></span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {pages.map((page) => (
            <button key={page.id} type="button" onClick={() => go(page.id)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === page.id ? "bg-[#071225] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-[#071225]"}`}>{page.label}</button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" href={WEB_STORE_URL}>Open Web Store ↗</Button>
          <Button onClick={() => go("contact")}>Get Free Spend Audit →</Button>
        </div>

        <button type="button" onClick={() => setOpen(!open)} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black lg:hidden">Menu</button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {pages.map((page) => <button key={page.id} type="button" onClick={() => go(page.id)} className={`rounded-2xl px-4 py-3 text-left font-bold ${active === page.id ? "bg-[#071225] text-white" : "bg-slate-50 text-slate-700"}`}>{page.label}</button>)}
            <Button variant="outline" href={WEB_STORE_URL}>Open Web Store ↗</Button>
            <Button onClick={() => go("contact")}>Get Free Spend Audit →</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ setActive }: { setActive: SetActive }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#D7FFFA] blur-3xl" />
      <div className="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10">
          <SectionTag>B2B facility supplies and procurement</SectionTag>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.06em] text-[#071225] md:text-7xl">Buy facility supplies with less chaos and more control.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">PrimeServe helps hotels, restaurants, cafes, hospitals, offices, IT companies, MNCs, and workspaces order housekeeping supplies, cleaning chemicals, pantry items, washroom products, and office essentials from one simple platform.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setActive("contact")}>Get Free Spend Audit →</Button>
            <Button variant="outline" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>Check Hidden Leakage</Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {industries.slice(0, 6).map((item, index) => (
              <span key={item} className="hero-chip rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-600 shadow-[0_8px_22px_rgba(7,18,37,.06)] transition hover:-translate-y-0.5 hover:border-[#12C7B7]/65 hover:bg-[#F7FFFE] hover:text-[#071225] hover:shadow-[0_16px_34px_rgba(18,199,183,.14)]" style={{ animationDelay: `${index * 90}ms` }}>{item}</span>
            ))}
          </div>
        </div>
        <ExecutiveControlCard />
      </div>
    </section>
  );
}

function ExecutiveControlCard() {
  const metrics: TextPair[] = [
    ["12", "vendors managed"],
    ["28%", "price risk"],
    ["6/mo", "urgent buys"],
    ["1", "single platform"],
  ];

  const trails: Array<[string, string, string, string]> = [
    ["01", "Approved product list", "Teams order only approved items", "Live"],
    ["02", "Delivery and documents", "GST invoice, delivery proof, MSDS sheets", "Tracked"],
    ["03", "Owner visibility", "Spend by item, branch, and month", "Ready"],
  ];

  return (
    <div className="relative z-10 lg:pl-4">
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_72%_18%,rgba(18,199,183,.22),transparent_34%),radial-gradient(circle_at_20%_82%,rgba(7,18,37,.10),transparent_34%)] blur-2xl" />
      <div className="diagnostic-card relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_34px_90px_rgba(7,18,37,.13)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#071225] p-5 text-white">
          <div className="diagnostic-grid pointer-events-none absolute inset-0" />
          <div className="diagnostic-sweep pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#12C7B7]/16 blur-3xl" />

          <div className="relative mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /></div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">Facility spend check</p>
          </div>

          <div className="diagnostic-panel relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#12C7B7]/22 blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-black leading-tight tracking-[-0.035em]">Your facility spend may be leaking</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-white/62">Too many vendors, urgent purchases, missing documents, and branch price differences can quietly increase your monthly cost.</p>
              <div className="diagnostic-track relative mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="diagnostic-meter absolute inset-y-0 left-0 w-[78%] overflow-hidden rounded-full bg-gradient-to-r from-[#F4A64F] via-[#A7E7C0] to-[#12C7B7]"><span className="diagnostic-meter-shine pointer-events-none absolute inset-0" /></div>
                <span className="diagnostic-runner pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-white/50 bg-[#63FFF0] shadow-[0_0_22px_rgba(99,255,240,.75)]" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {metrics.map(([value, label], index) => (
                  <div key={label} className="diagnostic-metric group rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#12C7B7]/45 hover:bg-white/[0.09]" style={{ animationDelay: `${index * 110}ms` }}>
                    <p className="metric-value-glow text-3xl font-black tracking-[-0.045em] text-[#63FFF0]">{value}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.13em] text-white/48">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-4 space-y-3">
            {trails.map(([num, title, text, status], index) => (
              <div key={title} className="diagnostic-trail group relative flex items-center gap-4 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#12C7B7]/45 hover:bg-white/[0.085]" style={{ animationDelay: `${460 + index * 130}ms` }}>
                <span className="trail-flow-line pointer-events-none absolute inset-y-0 left-0 w-full" />
                <span className="trail-number relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#12C7B7]/16 text-sm font-black text-[#63FFF0] ring-1 ring-[#12C7B7]/20">{num}</span>
                <div className="min-w-0 flex-1"><p className="font-black tracking-[-0.01em] text-white">{title}</p><p className="mt-1 truncate text-sm text-white/48">{text}</p></div>
                <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-black text-[#63FFF0]">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryStrip() {
  const list = [...industries, ...industries];
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[#F8FBFD] py-9">
      <div className="absolute left-1/2 top-0 h-32 w-[620px] -translate-x-1/2 rounded-full bg-[#D7FFFA]/80 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-6 flex max-w-4xl items-center justify-center gap-4 text-center"><span className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 sm:block" /><p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">Built for teams that buy facility supplies every month</p><span className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-slate-300 sm:block" /></div>
        <div className="relative mx-auto max-w-6xl overflow-hidden py-3"><div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[#F8FBFD] to-transparent" /><div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[#F8FBFD] to-transparent" /><div className="industry-marquee flex w-max gap-3">{list.map((item, index) => <span key={`${item}-${index}`} className="industry-chip shrink-0 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">{item}</span>)}</div></div>
        <p className="mt-5 text-center text-sm font-semibold text-slate-500">One simple place to order and track facility supplies.</p>
      </div>
    </section>
  );
}

function Card({ index, title, text }: { index: number; title: string; text: string }) {
  return <div className="premium-card group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#12C7B7]/55 hover:shadow-[0_22px_55px_rgba(7,18,37,.10)]"><div className="card-sweep pointer-events-none absolute inset-0" /><div className="relative"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E9FFFC] text-sm font-black text-[#079889] ring-1 ring-[#BDF5EE]">{String(index).padStart(2, "0")}</div><h3 className="mt-5 text-xl font-black tracking-[-0.02em] text-[#071225]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></div></div>;
}

function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return <section className="relative overflow-hidden bg-[#F8FBFD] py-20"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D7FFFA] blur-3xl" /><div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8"><SectionTag>{label}</SectionTag><h1 className="text-5xl font-black leading-[1.04] tracking-[-0.055em] text-[#071225] md:text-7xl">{title}</h1><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">{text}</p></div></section>;
}

function DeepContext({ setActive }: { setActive: SetActive }) {
  return <section className="bg-white py-20"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:px-8"><div><SectionTag>What PrimeServe does</SectionTag><h2 className="text-4xl font-black tracking-[-0.04em] text-[#071225] md:text-5xl">PrimeServe makes facility purchasing simple.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Your business needs cleaning products, washroom supplies, pantry items, stationery, garbage bags, and other facility materials every month. PrimeServe helps you buy them from one place.</p><p className="mt-4 leading-8 text-slate-600">Your team gets an easy ordering system. You get clear pricing, proper documents, and better control over spending.</p><Button onClick={() => setActive("why")} className="mt-7">Why Choose PrimeServe →</Button></div><div className="grid gap-4 md:grid-cols-2">{pillars.map(([title, text], i) => <Card key={title} index={i + 1} title={title} text={text} />)}</div></div></section>;
}

function PainGrid() {
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-3xl text-center"><SectionTag>The problem</SectionTag><h2 className="text-4xl font-black tracking-[-0.04em] text-[#071225] md:text-5xl">Most businesses lose money in daily facility purchases.</h2><p className="mt-5 text-lg leading-8 text-slate-600">The problem is not only product cost. The real problem is too many vendors, unclear pricing, urgent buying, and missing documents.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{pains.map(([title, text], i) => <Card key={title} index={i + 1} title={title} text={text} />)}</div></div></section>;
}

function ServicesOverview({ setActive }: { setActive: SetActive }) {
  return <section className="bg-[#F8FBFD] py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:px-8"><div><SectionTag>Services</SectionTag><h2 className="text-4xl font-black tracking-[-0.04em] text-[#071225] md:text-5xl">Everything your facility team needs, in one platform.</h2><p className="mt-5 text-lg leading-8 text-slate-600">PrimeServe helps you order supplies, check prices, track spending, keep documents, and manage multiple branches from one place.</p><Button onClick={() => setActive("services")} className="mt-7">View Services →</Button></div><div className="grid gap-4 md:grid-cols-2">{services.slice(0, 4).map(([title, text], i) => <Card key={title} index={i + 1} title={title} text={text} />)}</div></div></section>;
}

function OperatingModel() {
  return <section className="relative overflow-hidden bg-[#F8FBFD] py-24"><div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(18,199,183,.11),transparent_66%)]" /><div className="pointer-events-none absolute -right-44 bottom-10 h-80 w-80 rounded-full bg-[#D7FFFA]/60 blur-3xl" /><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-4xl text-center"><SectionTag>How PrimeServe works</SectionTag><h2 className="text-4xl font-black tracking-[-0.045em] text-[#071225] md:text-6xl">Order, deliver, track, and audit from one place.</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">Your team orders approved supplies. PrimeServe delivers them. You track spending, invoices, documents, and branch-wise usage.</p></div><div className="relative mt-16"><div className="workflow-spine pointer-events-none absolute left-0 right-0 top-[3.1rem] hidden h-px bg-gradient-to-r from-transparent via-[#12C7B7]/30 to-transparent xl:block" /><div className="workflow-spine-dot pointer-events-none absolute top-[2.72rem] hidden h-3 w-3 rounded-full bg-[#12C7B7] shadow-[0_0_24px_rgba(18,199,183,.75)] xl:block" /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">{works.map(([num, title, text], index) => <div key={title} className="clean-work-card group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_14px_45px_rgba(7,18,37,.055)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#12C7B7]/55 hover:shadow-[0_28px_70px_rgba(7,18,37,.11)]" style={{ animationDelay: `${index * 115}ms` }}><div className="work-card-glow pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" /><div className="work-card-sweep pointer-events-none absolute inset-0" /><div className="relative z-10 flex items-center justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#071225] text-sm font-black text-white shadow-[0_14px_28px_rgba(7,18,37,.18)] transition duration-300 group-hover:bg-[#12C7B7] group-hover:text-[#071225]">{num}</div><span className="rounded-full border border-slate-200 bg-[#F8FBFD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 transition duration-300 group-hover:border-[#BDF5EE] group-hover:bg-[#EFFFFD] group-hover:text-[#079889]">Step {index + 1}</span></div><div className="relative z-10 mt-8"><h3 className="text-2xl font-black leading-tight tracking-[-0.035em] text-[#071225]">{title}</h3><p className="mt-4 text-[15px] leading-7 text-slate-600">{text}</p></div><div className="relative z-10 mt-8 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="work-progress h-full rounded-full bg-gradient-to-r from-[#12C7B7] to-[#63FFF0]" style={{ animationDelay: `${450 + index * 130}ms` }} /></div></div>)}</div></div></div></section>;
}

function Workflow() {
  const steps = ["Approved products", "Order request", "Delivery proof", "GST invoice", "Audit folder", "Spend report"];
  return <section className="bg-[#071225] py-20 text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8"><div><div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#A8FFF7]">Simple buying flow</div><h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">Stop buying facility supplies through scattered WhatsApp chats.</h2><p className="mt-5 text-lg leading-8 text-white/68">PrimeServe turns daily facility purchasing into a simple, trackable process that owners and finance teams can understand.</p></div><div className="workflow-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5"><div className="workflow-grid pointer-events-none absolute inset-0 opacity-70" /><div className="relative space-y-4">{steps.map((step, index) => <div key={step} className="workflow-step group relative flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-[#12C7B7]/45 hover:bg-white/[0.085]" style={{ animationDelay: `${index * 120}ms` }}><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#12C7B7] text-sm font-black text-[#071225] shadow-[0_0_0_6px_rgba(18,199,183,.08)]">{index + 1}</div><div><p className="font-black">{step}</p><p className="text-sm text-white/55">Easy to find, check, and report.</p></div><span className="ml-auto text-white/35 transition group-hover:translate-x-1 group-hover:text-[#A8FFF7]">→</span></div>)}</div></div></div></section>;
}

function ThenVsNow() {
  return <section className="relative overflow-hidden bg-[#F8FBFD] py-20"><div className="pointer-events-none absolute -left-40 top-24 h-72 w-72 rounded-full bg-[#D7FFFA]/50 blur-3xl" /><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-3xl text-center"><SectionTag>Before vs after</SectionTag><h2 className="text-4xl font-black tracking-[-0.04em] text-[#071225] md:text-5xl">Before PrimeServe, buying was messy. With PrimeServe, it becomes clear.</h2><p className="mt-5 text-lg leading-8 text-slate-600">See how PrimeServe changes daily facility procurement for hotels, restaurants, hospitals, offices, and multi-branch teams.</p></div><div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"><div className="grid bg-[#071225] text-white md:grid-cols-[.8fr_1.1fr_1.1fr]"><div className="p-5 text-sm font-black uppercase tracking-[0.16em] text-[#A8FFF7]">Area</div><div className="p-5 text-sm font-black uppercase tracking-[0.16em] md:border-l md:border-white/10">Before</div><div className="p-5 text-sm font-black uppercase tracking-[0.16em] md:border-l md:border-white/10">With PrimeServe</div></div>{compareRows.map(([area, before, after], index) => <div key={area} className="compare-row group relative grid border-b border-slate-200 last:border-b-0 md:grid-cols-[.8fr_1.1fr_1.1fr]" style={{ animationDelay: `${index * 80}ms` }}><div className="p-5 font-black text-[#071225]"><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-[#EFFFFD] text-xs font-black text-[#079889] ring-1 ring-[#BDF5EE]">{index + 1}</span>{area}</div><div className="border-slate-200 p-5 leading-7 text-slate-600 md:border-l">{before}</div><div className="border-slate-200 bg-[#EFFFFD]/40 p-5 leading-7 text-slate-700 md:border-l"><span className="prime-shift-pill mb-2 inline-flex rounded-full bg-[#12C7B7]/12 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#079889]">PrimeServe shift</span><p>{after}</p></div></div>)}</div></div></section>;
}

function Calculator({ setActive }: { setActive: SetActive }) {
  const [monthly, setMonthly] = useState(150000);
  const [branches, setBranches] = useState(3);
  const [vendors, setVendors] = useState(10);
  const [emergency, setEmergency] = useState(5);
  const money = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));
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
  const breakdown: Array<[string, number]> = [["Unclear pricing", result.priceLeakage], ["Urgent purchase cost", result.emergencyPremium], ["Too many vendors", result.vendorWaste], ["Branch price gap", result.branchVariance]];

  return <section id="calculator" className="relative overflow-hidden bg-white py-24"><div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D7FFFA]/70 blur-3xl" /><div className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-slate-100 blur-3xl" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.88fr_1.12fr] lg:items-start lg:px-8"><div><SectionTag>Free spend calculator</SectionTag><h2 className="text-4xl font-black tracking-[-0.045em] text-[#071225] md:text-6xl">Find hidden leakage in your facility spend.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Type your monthly spend, branches, vendors, and urgent purchases. The calculator will estimate how much money may be leaking every year.</p><div className="mt-7 rounded-[1.7rem] border border-[#BDF5EE] bg-[#EFFFFD] p-6 shadow-[0_18px_45px_rgba(18,199,183,.08)]"><p className="text-sm font-black uppercase tracking-[0.16em] text-[#079889]">Free audit</p><h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#071225]">Know where your money is going.</h3><p className="mt-3 leading-7 text-slate-700">We review your vendors, invoices, branches, and monthly supply spend. Then we show where you may save money.</p></div></div><div className="leakage-calculator-card relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[#F8FBFD] p-5 shadow-[0_30px_90px_rgba(7,18,37,.12)]"><div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#12C7B7]/18 blur-3xl" /><div className="relative grid gap-4 md:grid-cols-2"><CalculatorInput label="Monthly facility spend" prefix="₹" value={monthly} onChange={setMonthly} helper="Cleaning, pantry, washroom, office supplies" /><CalculatorInput label="Number of branches" value={branches} onChange={setBranches} helper="How many locations you manage" /><CalculatorInput label="Current vendors" value={vendors} onChange={setVendors} helper="Total suppliers your team calls or messages" /><CalculatorInput label="Urgent buys / month" value={emergency} onChange={setEmergency} helper="Urgent buys from local shops" /></div><div className="relative mt-5 overflow-hidden rounded-[1.8rem] bg-[#071225] p-6 text-white"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(18,199,183,.20),transparent_36%)]" /><div className="calculator-scan pointer-events-none absolute inset-0" /><div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#A8FFF7]">Estimated annual leakage</p><p className="mt-2 text-5xl font-black leading-none tracking-[-0.055em] md:text-6xl">{money(result.total)}</p><p className="mt-3 max-w-md text-sm leading-6 text-white/58">Based on unclear pricing, urgent buying, too many vendors, and different branch prices.</p></div><div className="rounded-[1.3rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-right"><p className="text-3xl font-black text-[#63FFF0]">{leakageRate}%</p><p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/45">risk rate</p></div></div><div className="relative mt-6 h-3 overflow-hidden rounded-full bg-white/10"><div className="leakage-meter h-full rounded-full bg-gradient-to-r from-[#F4A64F] via-[#A7E7C0] to-[#12C7B7]" style={{ width: `${Math.max(18, Math.min(88, leakageRate * 2.6))}%` }}><span className="leakage-meter-shine pointer-events-none absolute inset-0" /></div></div><div className="relative mt-6 grid gap-3 md:grid-cols-2">{breakdown.map(([label, value], index) => <div key={label} className="leakage-breakdown rounded-2xl border border-white/10 bg-white/[0.055] p-4" style={{ animationDelay: `${index * 90}ms` }}><p className="text-sm font-bold text-white/52">{label}</p><p className="mt-1 text-xl font-black tracking-[-0.03em] text-white">{money(value)}</p></div>)}</div><Button onClick={() => setActive("contact")} className="relative mt-6 w-full">Get Free Spend Audit →</Button></div></div></div></section>;
}

function CalculatorInput({ label, value, onChange, prefix = "", helper = "" }: { label: string; value: number; onChange: (value: number) => void; prefix?: string; helper?: string }) {
  const cleanValue = value === 0 ? "" : String(value);
  const updateValue = (raw: string) => {
    const next = Number(String(raw).replace(/[^0-9]/g, ""));
    onChange(Number.isFinite(next) ? next : 0);
  };
  return <label className="calc-input-card group block rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(7,18,37,.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#12C7B7]/55 hover:shadow-[0_22px_55px_rgba(7,18,37,.09)]"><span className="block text-sm font-black text-[#071225]">{label}</span><div className="mt-3 flex items-center rounded-2xl border border-slate-200 bg-[#F8FBFD] px-4 py-3 transition group-focus-within:border-[#12C7B7] group-focus-within:bg-white group-focus-within:ring-4 group-focus-within:ring-[#12C7B7]/10">{prefix && <span className="mr-2 text-lg font-black text-slate-400">{prefix}</span>}<input inputMode="numeric" type="text" value={cleanValue} onChange={(e) => updateValue(e.target.value)} placeholder="Type number" className="w-full bg-transparent text-2xl font-black tracking-[-0.03em] text-[#071225] outline-none placeholder:text-slate-300" /></div><span className="mt-2 block text-xs font-semibold leading-5 text-slate-500">{helper}</span></label>;
}

function CTA({ setActive }: { setActive: SetActive }) {
  return <section className="bg-[#F8FBFD] py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="rounded-[2.2rem] bg-[#071225] p-8 text-white md:p-12"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-[#A8FFF7]">Free spend audit</p><h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-5xl">See where your facility spend is leaking.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Get a simple review of your vendors, invoices, urgent purchases, and monthly supply costs.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button onClick={() => setActive("contact")}>Get Free Spend Audit →</Button><Button variant="outline" href={WEB_STORE_URL}>Open Web Store ↗</Button></div></div></div></div></section>;
}

function Home({ setActive }: { setActive: SetActive }) { return <><Hero setActive={setActive} /><IndustryStrip /><DeepContext setActive={setActive} /><PainGrid /><ServicesOverview setActive={setActive} /><OperatingModel /><Workflow /><Calculator setActive={setActive} /><CTA setActive={setActive} /></>; }
function ServicesPage({ setActive }: { setActive: SetActive }) { return <><PageHero label="Services" title="Facility supplies, ordering, documents, and spend tracking in one place." text="PrimeServe helps teams buy housekeeping supplies, cleaning chemicals, pantry items, washroom products, office stationery, and facility tools with better control." /><section className="bg-white py-20"><div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">{services.map(([title, text], i) => <Card key={title} index={i + 1} title={title} text={text} />)}</div></section><ThenVsNow /><OperatingModel /><CTA setActive={setActive} /></>; }
function WhyPage({ setActive }: { setActive: SetActive }) { return <><PageHero label="Why PrimeServe" title="Because facility buying should be simple, clear, and easy to control." text="PrimeServe helps business owners reduce vendor confusion, check prices, keep documents, and understand monthly facility spend." /><DeepContext setActive={setActive} /><Workflow /><Calculator setActive={setActive} /></>; }
function AboutPage({ setActive }: { setActive: SetActive }) { return <><PageHero label="About PrimeServe" title="We help businesses buy facility supplies without confusion." text="PrimeServe Facility Solutions is a B2B platform for recurring facility supplies, housekeeping materials, cleaning products, pantry items, washroom essentials, and office supplies." /><section className="bg-white py-20"><div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">{[["Mission", "Make facility procurement simple, clear, and easy to track for every business."], ["Trust", "Help businesses buy from verified suppliers with proper GST invoices and documents."], ["Outcome", "Reduce vendor chaos, avoid urgent purchases, improve quality, and keep spending visible."]].map(([title, text], i) => <Card key={title} index={i + 1} title={title} text={text} />)}</div></section><CTA setActive={setActive} /></>; }

function ContactPage() {
  const contactBlocks: TextPair[] = [["Phone", "+91 7795242918"], ["Email", "support@primeservefs.com"], ["Web Store", "Open the PrimeServe ordering platform"]];
  return <><PageHero label="Contact Us" title="Start with a free facility spend audit." text="Share your monthly spend, vendors, branches, and common supply categories. PrimeServe will help you find where money may be leaking." /><section className="bg-white py-20"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div className="space-y-5">{contactBlocks.map(([label, text], i) => <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-[#F8FBFD] p-6"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E9FFFC] text-sm font-black text-[#079889] ring-1 ring-[#BDF5EE]">{i + 1}</div><p className="mt-4 font-black text-[#071225]">{label}</p><p className="mt-1 text-slate-600">{text}</p></div>)}</div><form onSubmit={(e) => e.preventDefault()} className="rounded-[2rem] border border-slate-200 bg-[#F8FBFD] p-6 shadow-xl"><div className="grid gap-4 md:grid-cols-2"><Input label="Full name" placeholder="Your name" /><Input label="Company name" placeholder="Company / brand" /><Input label="Work email" placeholder="name@company.com" /><Input label="Phone number" placeholder="+91" /><Input label="Business type" placeholder="Hotel, cafe, IT office, hospital..." /><Input label="Monthly facility spend" placeholder="₹50,000 / ₹2L / ₹5L..." /></div><label className="mt-4 block"><span className="mb-2 block text-sm font-black text-[#071225]">What do you want to fix first?</span><textarea className="min-h-[130px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#12C7B7] focus:ring-4 focus:ring-teal-50" placeholder="Too many vendors, high prices, urgent buying, missing documents, branch-wise spend..." /></label><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button className="flex-1">Submit Audit Request →</Button><Button variant="outline" href={WEB_STORE_URL} className="flex-1">Open Web Store ↗</Button></div></form></div></section></>;
}

function Input({ label, placeholder }: { label: string; placeholder: string }) { return <label className="block"><span className="mb-2 block text-sm font-black text-[#071225]">{label}</span><input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#12C7B7] focus:ring-4 focus:ring-teal-50" placeholder={placeholder} /></label>; }

function Footer({ setActive }: { setActive: SetActive }) {
  const go = (id: PageId) => { setActive(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <footer className="border-t border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.1fr_.9fr_.9fr] lg:px-8"><div><div className="text-2xl font-black text-[#071225]">Prime<span className="text-[#12C7B7]">Serve</span></div><p className="mt-4 max-w-md leading-7 text-slate-600">B2B platform for facility supplies, housekeeping products, cleaning chemicals, office supplies, GST documents, and spend tracking.</p></div><div><p className="font-black text-[#071225]">Website</p><div className="mt-4 grid gap-2">{pages.map((page) => <button type="button" key={page.id} onClick={() => go(page.id)} className="text-left text-sm font-bold text-slate-600 hover:text-[#079889]">{page.label}</button>)}</div></div><div><p className="font-black text-[#071225]">Actions</p><div className="mt-4 flex flex-col gap-3"><Button onClick={() => go("contact")}>Get Free Spend Audit</Button><Button variant="outline" href={WEB_STORE_URL}>Open Web Store</Button></div></div></div><div className="border-t border-slate-200 px-5 py-5 text-center text-sm font-semibold text-slate-500">© 2026 PrimeServe Facility Solutions. All rights reserved.</div></footer>;
}

export default function PrimeServeWebsite() {
  const [active, setActive] = useState<PageId>("home");

  const navigateToPage = (pageId: PageId) => {
    setActive(pageId);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };

  const page = active === "services" ? <ServicesPage setActive={navigateToPage} /> : active === "why" ? <WhyPage setActive={navigateToPage} /> : active === "about" ? <AboutPage setActive={navigateToPage} /> : active === "contact" ? <ContactPage /> : <Home setActive={navigateToPage} />;

  return (
    <div className="min-h-screen bg-white font-sans text-[#071225]">
      <style>{`
        @keyframes chipEnter { from { opacity:0; transform: translateY(8px) scale(.985); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @keyframes softFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(10px) scale(.985); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(18,199,183,.35); } 50% { box-shadow: 0 0 0 8px rgba(18,199,183,0); } }
        @keyframes sweep { 0% { transform: translateX(-120%) skewX(-14deg); opacity:0; } 45% { opacity:.45; } 100% { transform: translateX(120%) skewX(-14deg); opacity:0; } }
        @keyframes diagnosticFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes diagnosticSweep { 0% { transform: translateX(-86%); opacity:0; } 38% { opacity:.20; } 100% { transform: translateX(86%); opacity:0; } }
        @keyframes diagnosticIn { from { opacity:0; transform: translateY(10px) scale(.985); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes diagnosticMeter { from { transform: scaleX(0); opacity:.7; } to { transform: scaleX(1); opacity:1; } }
        @keyframes diagnosticRunner { 0% { left: 2%; opacity:0; } 12% { opacity:1; } 76% { left: 76%; opacity:1; } 100% { left: 76%; opacity:0; } }
        @keyframes meterShine { 0% { transform: translateX(-130%) skewX(-18deg); opacity:0; } 38% { opacity:.45; } 100% { transform: translateX(130%) skewX(-18deg); opacity:0; } }
        @keyframes metricGlow { 0%,100% { text-shadow: 0 0 0 rgba(99,255,240,0); } 50% { text-shadow: 0 0 18px rgba(99,255,240,.45); } }
        @keyframes trailFlow { 0% { transform: translateX(-100%); opacity:0; } 35% { opacity:.28; } 100% { transform: translateX(100%); opacity:0; } }
        @keyframes workCardIn { from { opacity:0; transform: translateY(18px) scale(.985); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes workProgressGrow { from { transform: scaleX(0); opacity:.6; } to { transform: scaleX(1); opacity:1; } }
        @keyframes workSpineMove { 0% { left: 8%; opacity:0; } 12% { opacity:1; } 88% { left: 90%; opacity:1; } 100% { left: 90%; opacity:0; } }
        @keyframes workSweep { 0% { transform: translateX(-130%) skewX(-16deg); opacity:0; } 42% { opacity:.22; } 100% { transform: translateX(130%) skewX(-16deg); opacity:0; } }
        @keyframes calculatorFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes calculatorScan { 0% { transform: translateX(-90%); opacity:0; } 40% { opacity:.16; } 100% { transform: translateX(90%); opacity:0; } }
        @keyframes leakageMeterShine { 0% { transform: translateX(-130%) skewX(-16deg); opacity:0; } 38% { opacity:.42; } 100% { transform: translateX(130%) skewX(-16deg); opacity:0; } }
        @keyframes breakdownIn { from { opacity:0; transform: translateY(8px) scale(.985); } to { opacity:1; transform: translateY(0) scale(1); } }
        .hero-chip { opacity:0; animation: chipEnter .5s cubic-bezier(.2,.8,.2,1) forwards; }
        .industry-marquee { animation: marquee 26s linear infinite; }
        .industry-marquee:hover { animation-play-state: paused; }
        .industry-chip { animation: softFloat 5.5s ease-in-out infinite; }
        .diagnostic-card { animation: diagnosticFloat 6.8s ease-in-out infinite; }
        .diagnostic-grid { background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(circle at 56% 22%, black, transparent 78%); }
        .diagnostic-sweep { background: linear-gradient(110deg, transparent 18%, rgba(255,255,255,.08) 48%, transparent 76%); animation: diagnosticSweep 7.6s ease-in-out infinite; }
        .diagnostic-panel { box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 18px 55px rgba(0,0,0,.20); }
        .diagnostic-meter { transform-origin:left; animation: diagnosticMeter 1.15s cubic-bezier(.2,.8,.2,1) forwards; }
        .diagnostic-meter-shine { background: linear-gradient(105deg, transparent 22%, rgba(255,255,255,.48) 48%, transparent 72%); animation: meterShine 2.8s ease-in-out infinite 1.15s; }
        .diagnostic-runner { animation: diagnosticRunner 3.1s cubic-bezier(.2,.8,.2,1) infinite 1.2s; }
        .metric-value-glow { animation: metricGlow 4.2s ease-in-out infinite; }
        .trail-flow-line { background: linear-gradient(90deg, transparent 0%, rgba(18,199,183,.18) 45%, transparent 80%); animation: trailFlow 4.4s ease-in-out infinite; }
        .diagnostic-trail:nth-child(2) .trail-flow-line { animation-delay: .55s; }
        .diagnostic-trail:nth-child(3) .trail-flow-line { animation-delay: 1.1s; }
        .trail-number { animation: pulse 3.2s ease-in-out infinite; }
        .diagnostic-metric, .diagnostic-trail { opacity:0; animation: diagnosticIn .62s cubic-bezier(.2,.8,.2,1) forwards; }
        .premium-card::after { content:""; position:absolute; inset:-1px; border-radius:1.6rem; padding:1px; background:linear-gradient(135deg, rgba(18,199,183,.55), rgba(7,18,37,0) 42%, rgba(18,199,183,.22)); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity .28s ease; pointer-events:none; }
        .premium-card:hover::after { opacity:1; }
        .card-sweep { background: linear-gradient(105deg, transparent 15%, rgba(18,199,183,.13) 48%, transparent 72%); transform: translateX(-120%) skewX(-14deg); }
        .premium-card:hover .card-sweep { animation: sweep 1.15s ease-in-out; }
        .clean-work-card { opacity:0; animation: workCardIn .68s cubic-bezier(.2,.8,.2,1) forwards; }
        .work-card-glow { background: radial-gradient(circle at 50% 100%, rgba(18,199,183,.16), transparent 58%); }
        .work-card-sweep { background: linear-gradient(105deg, transparent 18%, rgba(18,199,183,.10) 48%, transparent 72%); transform: translateX(-130%) skewX(-16deg); }
        .clean-work-card:hover .work-card-sweep { animation: workSweep 1.2s ease-in-out; }
        .work-progress { transform-origin:left; animation: workProgressGrow 1s cubic-bezier(.2,.8,.2,1) forwards; }
        .workflow-spine-dot { animation: workSpineMove 5.8s ease-in-out infinite 1.1s; }
        .workflow-grid { background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(circle at 48% 30%, black, transparent 76%); }
        .workflow-step, .compare-row { opacity:0; animation: fadeUp .62s cubic-bezier(.2,.8,.2,1) forwards; }
        .leakage-calculator-card { animation: calculatorFloat 7s ease-in-out infinite; }
        .calculator-scan { background: linear-gradient(110deg, transparent 18%, rgba(255,255,255,.08) 48%, transparent 76%); animation: calculatorScan 7.6s ease-in-out infinite; }
        .leakage-meter { position:relative; transform-origin:left; transition: width .55s cubic-bezier(.2,.8,.2,1); }
        .leakage-meter-shine { background: linear-gradient(105deg, transparent 22%, rgba(255,255,255,.50) 48%, transparent 72%); animation: leakageMeterShine 2.9s ease-in-out infinite; }
        .leakage-breakdown { opacity:0; animation: breakdownIn .58s cubic-bezier(.2,.8,.2,1) forwards; }
        .prime-shift-pill { animation: pulse 3.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { * { animation:none !important; scroll-behavior:auto !important; } .hero-chip, .diagnostic-metric, .diagnostic-trail, .clean-work-card, .workflow-step, .compare-row, .leakage-breakdown { opacity:1 !important; } }
      `}</style>
      <Header active={active} setActive={navigateToPage} />
      {page}
      <Footer setActive={navigateToPage} />
      <div className="fixed bottom-5 right-5 z-40 hidden gap-3 md:flex"><Button variant="outline" href={WEB_STORE_URL}>Web Store</Button><Button onClick={() => navigateToPage("contact")}>Free Audit</Button></div>
    </div>
  );
}
