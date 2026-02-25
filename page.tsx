import Link from "next/link";
import {
    ChevronRight,
    Truck,
    CreditCard,
    Headphones,
    Package,
    BarChart3,
    Shield,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const services = [
    {
        icon: Package,
        title: "Bulk Supply & Procurement",
        description:
            "One-stop procurement for all facility management supplies. We offer 395+ products across 4 categories with automatic bulk pricing tiers — the more you buy, the more you save.",
        features: [
            "Housekeeping, cleaning, stationery, pantry",
            "Automatic tiered pricing",
            "Minimum order value: just ₹500",
            "20+ trusted brands",
        ],
    },
    {
        icon: CreditCard,
        title: "Credit Terms & Flexible Payment",
        description:
            "Approved businesses can purchase on 45-day credit terms via Razorpay payment links. No upfront payment, no interest — just pay within the agreed timeline.",
        features: [
            "45-day standard credit (60 days for Pro)",
            "Credit lines up to ₹10 lakh",
            "Automated payment reminders",
            "Multiple payment methods: Card, UPI, Net Banking",
        ],
    },
    {
        icon: Shield,
        title: "GST-Compliant Invoicing via Zoho",
        description:
            "Every order automatically generates a GST-compliant invoice through Zoho Books. Download invoices anytime from your dashboard. Perfect for your accounting team.",
        features: [
            "Auto-generated GST invoices",
            "HSN code support",
            "Download PDF from dashboard",
            "GSTR-1 & GSTR-3B ready",
        ],
    },
    {
        icon: Truck,
        title: "Reliable Delivery Network",
        description:
            "We deliver across all major Indian cities with a 98% on-time delivery rate. Free standard delivery on orders above ₹5,000. Express delivery available.",
        features: [
            "3–5 day standard delivery",
            "1–2 day express option",
            "Free on orders ₹5,000+",
            "Real-time order tracking",
        ],
    },
    {
        icon: Headphones,
        title: "Dedicated Account Management",
        description:
            "Pro plan customers get a dedicated account manager who understands your business needs, handles reorders, and resolves issues proactively.",
        features: [
            "Single point of contact",
            "Proactive reorder suggestions",
            "Priority issue resolution",
            "Monthly account reviews",
        ],
    },
    {
        icon: BarChart3,
        title: "Procurement Analytics & Reporting",
        description:
            "Track your spending, order history, and usage patterns through your dashboard. Get insights to optimize procurement budgets and forecasting.",
        features: [
            "Spending breakdown by category",
            "Order history & trends",
            "Budget tracking tools",
            "Exportable reports",
        ],
    },
];

export default function ServicesPage() {
    return (
        <>
            <div className="bg-surface border-b border-border-custom">
                <div className="container-custom py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">Services</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-gradient-to-br from-primary to-primary-dark text-white section-padding">
                <div className="container-custom text-center max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
                    <p className="text-white/80 text-lg leading-relaxed">
                        More than just a supplier — we&apos;re your complete facility procurement partner
                        with credit terms, GST invoicing, analytics, and dedicated support.
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding">
                <div className="container-custom space-y-12">
                    {services.map((service, i) => (
                        <div
                            key={service.title}
                            className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
                        >
                            <div className={i % 2 === 1 ? "md:order-2" : ""}>
                                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                                    <service.icon size={28} className="text-primary" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle2 size={16} className="text-secondary shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`bg-surface rounded-2xl p-10 flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                                <service.icon size={120} className="text-primary/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-surface">
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Whether you manage a single office or 50 facilities, we have the services
                        and pricing to help you streamline procurement.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/contact" className="btn-primary">
                            Contact Sales <ArrowRight size={16} />
                        </Link>
                        <Link href="/pro-plan" className="btn-secondary">
                            Explore Pro Plan
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
