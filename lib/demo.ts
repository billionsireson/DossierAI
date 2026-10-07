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
      location: "Lagos, Nigeria · African insight. Global ambition.",
      summary:
        "I turn user needs into market growth. I lead product design across research, UX, UI systems and launch — connecting strategy to execution and attention to measurable outcomes.",
    },
    socialLinks: [
      { id: "li", label: "LinkedIn", url: "https://linkedin.com" },
      { id: "be", label: "Behance", url: "https://behance.net" },
    ],
    sections: [
      {
        id: "demo-hero",
        type: "hero",
        order: 0,
        visible: true,
        content: {
          headline: "Product Designer | UX Strategy | Digital Experiences",
          subheadline: "3+ years across fintech and e-commerce. Sample data for development.",
        },
      },
      {
        id: "demo-about",
        type: "about",
        order: 1,
        visible: true,
        content: {
          body: "I am a growth-oriented Product Designer with 3+ years of experience across fintech and e-commerce. I believe strong design carries the whole team along — the best work happens where ideas are respected and users are trusted.",
        },
      },
      {
        id: "demo-experience",
        type: "experience",
        order: 2,
        visible: true,
        content: {
          items: [
            {
              id: "demo-exp-1",
              company: "Paystack",
              role: "Senior Product Designer",
              startDate: "2023",
              endDate: "Present",
              summary: "Leading checkout experience and design systems for payments used across Africa.",
            },
            {
              id: "demo-exp-2",
              company: "Jumia",
              role: "Product Designer",
              startDate: "2021",
              endDate: "2023",
              summary: "Designed e-commerce flows and seller tools serving millions of shoppers.",
            },
          ],
        },
      },
      {
        id: "demo-projects",
        type: "projects",
        order: 3,
        visible: true,
        content: {
          items: [
            {
              id: "demo-proj-1",
              title: "Fintech Dashboard",
              summary:
                "Turning a legacy analytics view into a visible, actionable command center. Research, UX strategy, content direction and a full design system for a product serving teams globally.",
              role: "Lead Designer",
              tools: ["UX Strategy", "Design Systems", "Dashboards"],
            },
            {
              id: "demo-proj-2",
              title: "E-commerce Platform",
              summary:
                "Building a complete shopping experience from discovery to checkout. Led product design, prototyping, seller tools and a mobile-first design language across African markets.",
              role: "Product Designer",
              tools: ["Mobile UX", "Prototyping", "User Research"],
            },
            {
              id: "demo-proj-3",
              title: "Brand Identity System",
              summary:
                "Creating a clearer visual language for product, marketing and launch. Identity, guidelines and component libraries that keep every touchpoint moving in the same direction.",
              role: "Design Lead",
              tools: ["Branding", "Guidelines", "Launch"],
            },
          ],
        },
      },
      {
        id: "demo-skills",
        type: "skills",
        order: 4,
        visible: true,
        content: { skills: ["Product Design", "UX Research", "UI Design", "Design Systems", "Prototyping", "User Testing"] },
      },
      {
        id: "demo-education",
        type: "education",
        order: 5,
        visible: true,
        content: {
          items: [{ id: "demo-edu-1", school: "University of Lagos", degree: "B.Sc. Computer Science" }],
        },
      },
      {
        id: "demo-contact",
        type: "contact",
        order: 6,
        visible: true,
        content: { email: "esther@example.com", location: "Lagos, Nigeria" },
      },
    ],
    theme: { templateId: "spotlight", mode: "light" },
    seo: { title: "Esther Okafor — Product Designer" },
    publishing: { status: "published", publishedAt: new Date().toISOString() },
    version: 4,
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
