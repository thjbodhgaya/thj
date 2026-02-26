export type Product = {
  id: number;
  title: string;
  image: string;
    gallery?: string[];  
  price: number;
  oldPrice: number;
  tag?: "sale" | "new";
  category: string;
  sku: string;
  description: string;

  // UI-driven optional fields
  tags: string[];
  colors: string[];   // hex colors
  sizes: string[];    // size options
  rating: number;     // out of 5 (e.g. 4.5)
  reviewsCount: number;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Ganesha Statue",
    image: "/Bowl.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Decore",
    sku: "S001",
    description:
      "A beautifully handcrafted Ganesha statue symbolizing wisdom and prosperity. Perfect for home decor, meditation spaces, and gifting on auspicious occasions.",

    tags: ["Decor", "Spiritual", "Handcrafted"],
    colors: ["#816DFA", "#000000", "#B88E2F"],
    sizes: ["L", "XL", "XS"],
    rating: 4.5,
    reviewsCount: 5,
  },

  {
    id: 2,
    title: "Decorative Pot",
    image: "/decore.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Decore",
    sku: "S002",
    description:
      "An authentic decorative pot inspired by traditional Tibetan craftsmanship. Adds a rustic and cultural touch to living spaces and interiors.",

    tags: ["Decor", "Pottery", "Traditional"],
    colors: ["#0E7431", "#000000", "#EA79D1"],
    sizes: ["M", "L"],
    rating: 4.0,
    reviewsCount: 3,
  },

  {
    id: 3,
    title: "Mandala Art",
    image: "/item.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Art",
    sku: "S003",
    description:
      "Intricately designed mandala artwork representing harmony and balance. Ideal for spiritual decor, wall displays, and peaceful environments.",

    tags: ["Art", "Mandala", "Spiritual"],
    colors: ["#B88E2F", "#000000"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewsCount: 7,
  },

  {
    id: 4,
    title: "Buddha Statue",
    image: "/Pot.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Statue",
    sku: "S004",
    description:
      "A serene Buddha statue crafted to bring calmness and positive energy. Perfect for meditation rooms, offices, or sacred spaces.",

    tags: ["Statue", "Meditation", "Peace"],
    colors: ["#000000", "#B88E2F"],
    sizes: ["L"],
    rating: 5,
    reviewsCount: 10,
  },

  {
    id: 5,
    title: "Mandala Pendant",
    image: "/Statues.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Jewellery",
    sku: "S005",
    description:
      "Handmade mandala pendant designed with precision and spiritual symbolism. A meaningful accessory for daily wear or special occasions.",

    tags: ["Jewellery", "Pendant", "Mandala"],
    colors: ["#EA79D1", "#000000"],
    sizes: ["One Size"],
    rating: 4.3,
    reviewsCount: 4,
  },

  {
    id: 6,
    title: "Bronze Mandala",
    image: "/Pot.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Art",
    sku: "S006",
    description:
      "A finely crafted bronze mandala reflecting traditional artistry. Ideal for collectors and those seeking cultural elegance in decor.",

    tags: ["Bronze", "Art", "Traditional"],
    colors: ["#B88E2F"],
    sizes: ["M", "L"],
    rating: 4.6,
    reviewsCount: 6,
  },

  {
    id: 7,
    title: "Traditional Bowl",
    image: "/Bowl.png",
    price: 2500,
    oldPrice: 3500,
    tag: "new",
    category: "Utensils",
    sku: "S007",
    description:
      "A traditional handcrafted bowl made with authentic techniques. Suitable for rituals, decor, or as a unique collectible item.",

    tags: ["Utensils", "Handmade", "Traditional"],
    colors: ["#0E7431", "#000000"],
    sizes: ["S", "M"],
    rating: 4.2,
    reviewsCount: 2,
  },

  {
    id: 8,
    title: "Classic Decorative Pot",
    image: "/Pot.png",
    price: 2500,
    oldPrice: 3500,
    tag: "sale",
    category: "Decore",
    sku: "S008",
    description:
      "A classic decorative pot inspired by Himalayan culture. Blends seamlessly with modern and traditional interiors.",

    tags: ["Decor", "Himalayan", "Pottery"],
    colors: ["#816DFA", "#EA79D1"],
    sizes: ["L"],
    rating: 4.1,
    reviewsCount: 3,
  },
];
