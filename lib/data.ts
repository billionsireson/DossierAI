export type MatchLevel = "exact" | "similar" | "capable";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  image: string;
  material: string;
  colour: string;
  dimensions: string;
  business: string;
  businessId: string;
  location: string;
  availability: string;
  customization: string;
  productionTime: string;
  delivery: string;
  customizable: boolean;
  verified: boolean;
  match: MatchLevel;
  matchScore: number;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  location: string;
  serviceAreas: string[];
  capabilities: string[];
  verified: boolean;
  responseTime: string;
  operatingHours: string;
  contact: string;
  products: number;
  image: string;
  portfolio: string[];
}

// MVP §11 — three matching levels. §14 — every product carries the full
// business-verified field set (price, dimensions, availability, production,
// delivery) kept separate from AI-detected attributes.
export const products: Product[] = [
  {
    id: "p1",
    name: "Modern 3-Seater Fabric Sofa — Charcoal",
    category: "Sofas",
    price: 850000,
    priceLabel: "₦850,000",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop",
    material: "Fabric",
    colour: "Charcoal",
    dimensions: "220cm × 90cm × 85cm",
    business: "Lekki Comfort Works",
    businessId: "b1",
    location: "Lekki, Lagos",
    availability: "Made to order",
    customization: "Fabric, colour, leg finish",
    productionTime: "14 days",
    delivery: "Lagos",
    customizable: true,
    verified: true,
    match: "exact",
    matchScore: 96,
  },
  {
    id: "p2",
    name: "Scandi Oak Lounge Chair",
    category: "Chairs",
    price: 320000,
    priceLabel: "₦320,000",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80&auto=format&fit=crop",
    material: "Oak + Bouclé",
    colour: "Oat",
    dimensions: "72cm × 78cm × 76cm",
    business: "Ikeja Wood Studio",
    businessId: "b2",
    location: "Ikeja, Lagos",
    availability: "In stock",
    customization: "Fabric, wood stain",
    productionTime: "7 days",
    delivery: "Lagos",
    customizable: true,
    verified: true,
    match: "exact",
    matchScore: 92,
  },
  {
    id: "p3",
    name: "Round Travertine Coffee Table",
    category: "Tables",
    price: 480000,
    priceLabel: "₦480,000",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80&auto=format&fit=crop",
    material: "Travertine + Oak",
    colour: "Natural",
    dimensions: "90cm Ø × 40cm",
    business: "Victoria Island Atelier",
    businessId: "b1",
    location: "VI, Lagos",
    availability: "Made to order",
    customization: "Stone finish only",
    productionTime: "10 days",
    delivery: "Lagos",
    customizable: false,
    verified: true,
    match: "similar",
    matchScore: 84,
  },
  {
    id: "p4",
    name: "Upholstered Platform Bed — Oat Linen",
    category: "Beds",
    price: 1150000,
    priceLabel: "₦1,150,000",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80&auto=format&fit=crop",
    material: "Linen + Pine",
    colour: "Oat",
    dimensions: "180cm × 200cm",
    business: "Surulere Bed Co.",
    businessId: "b3",
    location: "Surulere, Lagos",
    availability: "Made to order",
    customization: "Size, fabric, headboard",
    productionTime: "21 days",
    delivery: "Lagos",
    customizable: true,
    verified: false,
    match: "similar",
    matchScore: 78,
  },
  {
    id: "p5",
    name: "Japandi 2-Seater — Mist Green",
    category: "Sofas",
    price: 690000,
    priceLabel: "₦690,000",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format&fit=crop",
    material: "Fabric + Beech",
    colour: "Mist",
    dimensions: "170cm × 85cm × 80cm",
    business: "Yaba Makers Collective",
    businessId: "b3",
    location: "Yaba, Lagos",
    availability: "In stock",
    customization: "Fabric, colour",
    productionTime: "7 days",
    delivery: "Lagos",
    customizable: true,
    verified: true,
    match: "capable",
    matchScore: 71,
  },
  {
    id: "p6",
    name: "Custom TV Console — Walnut",
    category: "Storage",
    price: 450000,
    priceLabel: "from ₦450,000",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80&auto=format&fit=crop",
    material: "Walnut veneer",
    colour: "Walnut",
    dimensions: "Custom — up to 240cm",
    business: "Lekki Comfort Works",
    businessId: "b1",
    location: "Lekki, Lagos",
    availability: "Custom",
    customization: "Fully custom",
    productionTime: "14–18 days",
    delivery: "Lagos",
    customizable: true,
    verified: true,
    match: "capable",
    matchScore: 68,
  },
];

// MVP §16 — capabilities use the exact taxonomy. Profiles carry description,
// hours, contact and portfolio (no invented fields).
export const businesses: Business[] = [
  {
    id: "b1",
    name: "Lekki Comfort Works",
    description:
      "Sofa and living-room specialists. Ready-made pieces plus full custom builds from photos and descriptions.",
    location: "Lekki Phase 1, Lagos",
    serviceAreas: ["Lekki", "VI", "Ikoyi", "Ajah"],
    capabilities: ["Ready-made", "Custom-made", "Delivery", "Installation"],
    verified: true,
    responseTime: "~2 hrs",
    operatingHours: "Mon–Sat · 9:00–18:00",
    contact: "Request contact via enquiry",
    products: 48,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&auto=format&fit=crop",
    portfolio: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=60&auto=format&fit=crop",
    ],
  },
  {
    id: "b2",
    name: "Ikeja Wood Studio",
    description:
      "Solid-wood workshop for chairs, tables and repairs. Made-to-order with wood-stain options.",
    location: "Ikeja, Lagos",
    serviceAreas: ["Ikeja", "Ogba", "Yaba", "Surulere"],
    capabilities: ["Custom-made", "Made-to-order", "Repair/refurbishment"],
    verified: true,
    responseTime: "~5 hrs",
    operatingHours: "Mon–Fri · 8:30–17:30",
    contact: "Request contact via enquiry",
    products: 32,
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80&auto=format&fit=crop",
    portfolio: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=60&auto=format&fit=crop",
    ],
  },
  {
    id: "b3",
    name: "Yaba Makers Collective",
    description:
      "Young collective of furniture makers. Strong on custom sofas and beds, Lagos-wide delivery.",
    location: "Yaba, Lagos",
    serviceAreas: ["Yaba", "Surulere", "Lagos Island"],
    capabilities: ["Custom-made", "Made-to-order", "Delivery"],
    verified: false,
    responseTime: "~1 day",
    operatingHours: "Tue–Sat · 10:00–18:00",
    contact: "Request contact via enquiry",
    products: 21,
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80&auto=format&fit=crop",
    portfolio: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=60&auto=format&fit=crop",
    ],
  },
];

export const categories = [
  { label: "Sofas", icon: "🛋️" },
  { label: "Chairs", icon: "🪑" },
  { label: "Tables", icon: "☕" },
  { label: "Beds", icon: "🛏️" },
  { label: "Storage", icon: "🗄️" },
  { label: "Custom", icon: "✨" },
];

// MVP §15 — structured enquiry prompts, verbatim.
export const enquiryPrompts = [
  "Is this available?",
  "What is the current price?",
  "Can you customise it?",
  "Can you make this from the image?",
  "What are the dimensions?",
  "Do you deliver to my location?",
  "How long will production take?",
];

// MVP §13 — request fields + status flow, verbatim.
export const requestFields: Array<[string, string]> = [
  ["Image", "Phone photo · Screenshot · Product image"],
  ["Description", "e.g. Modern 3-seater sofa, dark grey fabric, low arms"],
  ["Category", "Sofas / Chairs / Tables / Beds / Storage / Custom"],
  ["Budget", "e.g. 500,000 – 1,000,000"],
  ["Location", "e.g. Deliver to Ikeja"],
  ["Quantity", "e.g. 1"],
  ["Dimensions", "e.g. 220cm × 90cm × 85cm"],
  ["Material", "e.g. Fabric, oak legs"],
  ["Colour", "e.g. Charcoal"],
  ["Desired completion date", "e.g. Before Dec 20"],
  ["Delivery requirement", "e.g. Delivery required to Ikeja"],
];

export const requestStatuses = [
  "DRAFT",
  "SUBMITTED",
  "MATCHING",
  "SENT TO BUSINESSES",
  "RESPONSES RECEIVED",
  "CUSTOMER REVIEWING",
  "CONNECTED",
  "CLOSED",
];
