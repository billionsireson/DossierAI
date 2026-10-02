import type { Portfolio } from "@/types/portfolio";

export const demoUser = {
  id: "demo-user",
  name: "Esther Okafor",
  email: "esther@example.com",
  plan: "FREE" as const,
  credits: 12,
};

export const demoPortfolios: Portfolio[] = [
  {
    id: "demo-fintech",
    userId: demoUser.id,
    slug: "esther-okafor",
    profile: {
      name: "Esther Okafor",
      headline: "Product Designer | UX Strategy | Digital Experiences",
      location: "Lagos, Nigeria",
      summary:
        "Product designer with 3+ years across fintech and e-commerce. Sample data for development.",
    },
    socialLinks: [
      { id: "li", label: "LinkedIn", url: "https://linkedin.com" },
      { id: "be", label: "Behance", url: "https://behance.net" },
    ],
    sections: [],
    theme: { templateId: "modern-professional", mode: "light" },
    seo: { title: "Esther Okafor — Product Designer" },
    publishing: { status: "published", publishedAt: new Date().toISOString() },
    version: 3,
  },
  {
    id: "demo-ecommerce",
    userId: demoUser.id,
    slug: "ecommerce-platform",
    profile: {
      name: "Esther Okafor",
      headline: "E-commerce Platform Case Study",
      summary: "Draft portfolio — sample data for development.",
    },
    socialLinks: [],
    sections: [],
    theme: { templateId: "creative-minimal", mode: "light" },
    seo: {},
    publishing: { status: "draft" },
    version: 1,
  },
];
