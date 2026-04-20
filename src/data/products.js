/** Placeholder catalog — inspired by wellness / preparedness retail layouts */

export const products = [
  {
    id: 'foligrow-plus',
    name: 'Foligrow Plus Adult Tonic',
    price: 45.99,
    tagline: 'Liquid Iron with Vitamin B Complex and Minerals.',
    rating: 4.9,
    reviews: 267,
    badge: null,
    image: '/foligrow.png',
    description:
      'A premium tonic for health, vitality, and energy. Formulated with iron, zinc, vitamin B complex, and minerals with honey and malt.',
    highlights: [
      'Supports red blood cells',
      'Enriched with honey and malt',
      'Daily vitality support',
    ],
  },
  {
    id: 'emergency-kit',
    name: 'Medical Emergency Kit',
    price: 299.99,
    tagline: 'Physician-grade preparedness.',
    rating: 4.9,
    reviews: 1649,
    badge: 'Best Seller',
    image: '/hero section home.png',
    images: [
      '/hero section home.png',
      '/hero-emergency-kit.png',
    ],
    description:
      'The definitive TOBINCO EmergencyCare Kit. Organized by scenario with professional-grade supplies and a printed quick-reference guide.',
    highlights: [
      'Scenario-based organization',
      'Includes emergency kit guide',
      'Durable red carry case',
    ],
  },
  {
    id: 'entramol-plus',
    name: 'Entramol Plus',
    price: 12.99,
    tagline: 'Fast-acting relief for pain and fever.',
    rating: 4.9,
    reviews: 106,
    badge: 'Best Seller',
    image: '/Entramol.png',
    description:
      'Paracetamol 500mg + Caffeine 30mg tablets. Effective relief for headaches, fever, and body aches.',
    highlights: [
      'Pain & fever relief',
      'Dual-action formula',
      '2 x 12 tablets pack',
    ],
  },
  {
    id: 'kofof-syrup',
    name: 'Kofof Cough Syrup',
    price: 18.50,
    tagline: 'Effective relief for stubborn coughs.',
    rating: 4.8,
    reviews: 412,
    badge: 'New',
    image: '/kofof.png',
    description:
      'Dextromethorphan Hydrobromide & Chlorpheniramine Maleate. A powerful suppressant for dry and irritating coughs.',
    highlights: [
      'Suppressant & Antihistamine',
      '100ml bottle',
      'Fast relief',
    ],
  },
  {
    id: 'lufart-ds',
    name: 'Lufart DS',
    price: 34.99,
    tagline: 'Modern treatment for malaria.',
    rating: 4.7,
    reviews: 88,
    badge: null,
    image: '/lufart ds.png',
    description:
      'Artemether 80mg + Lumefantrine 480mg tablets. Clinical strength treatment for uncomplicated malaria.',
    highlights: ['Double strength formula', '6 tablets pack', 'Clinical grade'],
  },
  {
    id: 'recharge-nad',
    name: 'Recharge NAD+',
    price: 79.99,
    tagline: 'Cellular energy with modern cofactors.',
    rating: 4.8,
    reviews: 203,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80',
    description:
      'Placeholder science-forward supplement page. Replace with real formulation details in production.',
    highlights: ['NAD+ precursor blend', 'PQQ support', 'Lab tested'],
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

/** PDP gallery — use explicit `images` when set, else repeat main image for layout demo */
export function getGalleryImages(product) {
  if (product.images?.length) return product.images
  return [product.image, product.image, product.image, product.image]
}

export function getRelatedProducts(currentId, limit = 4) {
  return products.filter((p) => p.id !== currentId).slice(0, limit)
}

export const testimonials = [
  {
    quote:
      'The emergency kit gave our family a clear plan. Everything is labeled and the guide is easy to follow.',
    author: 'Michael O.',
    product: 'Medical Emergency Kit',
  },
  {
    quote:
      'I noticed better energy within two weeks. Customer support answered my questions quickly.',
    author: 'Terry R.',
    product: 'Ultimate Cellular Detox',
  },
  {
    quote:
      'Focus and stress feel more manageable. I have recommended Tobin Emergency Kit Hub to friends.',
    author: 'H.R.',
    product: 'Shield Daily',
  },
]

export const team = [
  {
    name: 'Dr. Marcus Adeyemi, MD',
    role: 'Chief Scientific Officer',
    bio: 'Cardiologist and researcher focused on preventive care and population health strategies.',
    image: '/Dr. Marcus Adeyemi (CMO).png',
  },
  {
    name: 'Dr. Aisha Williams, MD',
    role: 'Chief Patient Officer',
    bio: 'Internist with a passion for clear communication and evidence-informed wellness education.',
    image: '/Dr. Aisha Williams (CPO).jpg',
  },
  {
    name: 'Michael Okoro',
    role: 'Managing Director',
    bio: 'Specializing in pharmaceutical supply chain and community health access across the region.',
    image: '/Michael Okoro (Managing Director).jpg',
  },
]
