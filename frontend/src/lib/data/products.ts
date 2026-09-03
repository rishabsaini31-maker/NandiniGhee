import { IMG } from "./images";
import { Product, Review } from "../types";

/* ── Shared review pools ── */
const gheeReviews: Review[] = [
  {
    id: "gr1", author: "Ananya Deshpande", location: "Pune", rating: 5, date: "12 Aug 2026", verified: true,
    title: "Takes me back to my grandmother's kitchen",
    text: "The aroma when you open the jar is unbelievable — pure, nutty, grainy texture just like the ghee made at home growing up. I have replaced all refined oils with this. Worth every rupee.",
  },
  {
    id: "gr2", author: "Rahul Malhotra", location: "New Delhi", rating: 5, date: "28 Jul 2026", verified: true,
    title: "Best A2 ghee I have tried",
    text: "I have ordered from four brands over the last year and NANDINI is easily the best. The danedar texture, the golden colour, and the packaging is beautiful. Delivery was quick too.",
  },
  {
    id: "gr3", author: "Meera Iyer", location: "Chennai", rating: 5, date: "19 Jul 2026", verified: true,
    title: "My whole family noticed the difference",
    text: "Even my kids can tell the difference in the taste of dal and rotis. The 1L jar lasts us a month. Will keep reordering.",
  },
  {
    id: "gr4", author: "Arvind Sharma", location: "Jaipur", rating: 4, date: "02 Jul 2026", verified: true,
    title: "Excellent quality, jar could be sturdier",
    text: "The ghee itself is superb — proper bilona, proper aroma. One suggestion: the lid could be tighter as a little ghee leaked during transit. Customer care replaced it immediately though.",
  },
  {
    id: "gr5", author: "Kavitha Reddy", location: "Hyderabad", rating: 5, date: "21 Jun 2026", verified: true,
    title: "Genuine bilona, finally",
    text: "Most brands claiming 'bilona' just sell cream-separated ghee. You can taste the authenticity in this one — slightly grainy, deep flavour. My purohit actually asked where I bought it from!",
  },
];

const nutReviews: Review[] = [
  {
    id: "nr1", author: "Sanjay Kulkarni", location: "Mumbai", rating: 5, date: "05 Aug 2026", verified: true,
    title: "Fresh, crunchy, premium",
    text: "You can tell these are fresh stock — crunchy, no bitterness, uniform size. The resealable pack keeps them well. Far better than the local kirana stuff.",
  },
  {
    id: "nr2", author: "Pooja Nair", location: "Kochi", rating: 5, date: "26 Jul 2026", verified: true,
    title: "My morning handful, sorted",
    text: "I soak a few overnight for my family every day. Quality is consistent across my three orders now. Beautiful packaging too — great for gifting.",
  },
  {
    id: "nr3", author: "Vikram Singh Rathore", location: "Udaipur", rating: 4, date: "14 Jul 2026", verified: true,
    title: "Very good, slightly pricey",
    text: "Quality is genuinely premium and you get what you pay for. A small discount on bulk orders would make this five stars.",
  },
  {
    id: "nr4", author: "Divya Krishnan", location: "Bengaluru", rating: 5, date: "30 Jun 2026", verified: true,
    title: "Gifted these — got compliments",
    text: "Bought two packs for my in-laws and they loved them so much they ordered more themselves. Fresh and cleanly packed.",
  },
];

const hamperReviews: Review[] = [
  {
    id: "hr1", author: "Neha Gupta", location: "Gurugram", rating: 5, date: "01 Aug 2026", verified: true,
    title: "The perfect corporate Diwali gift",
    text: "Ordered 25 hampers for our clients. The unboxing experience is stunning — the box, the note, the contents all feel luxurious. Several clients asked where they were from.",
  },
  {
    id: "hr2", author: "Aditya Bhatt", location: "Ahmedabad", rating: 5, date: "18 Jul 2026", verified: true,
    title: "Made my mother-in-law very happy",
    text: "First meeting gift pressure — solved! The hamper looks even better than the photos. Quality of contents is excellent, not just pretty packaging.",
  },
  {
    id: "hr3", author: "Shreya Banerjee", location: "Kolkata", rating: 4, date: "09 Jul 2026", verified: true,
    title: "Beautiful, arrived one day late",
    text: "The hamper itself is gorgeous and everything tasted great. It arrived a day after the committed date during a festive rush, but the support team kept me informed throughout.",
  },
];

function rv(pool: Review[], count: number): Review[] {
  return pool.slice(0, count);
}

export const PRODUCTS: Product[] = [
  /* ═══════════════════════ GHEE ═══════════════════════ */
  {
    id: "p01",
    slug: "traditional-bilona-a2-cow-ghee",
    name: "Traditional Bilona A2 Cow Ghee",
    category: "ghee",
    tagline: "Hand-churned the ancient way",
    shortDescription: "Cultured A2 ghee from grass-fed desi cows, slow-cooked over a wood fire after traditional bilona churning.",
    description:
      "Our flagship A2 Desi Cow Ghee is made exactly as it was centuries ago in Rajasthani households. Fresh morning milk from indigenous Gir and Tharparkar cows is set into whole-milk curd overnight, then hand-churned with a wooden bilona to extract makkhan (cultured butter). This butter is simmered slowly over a controlled flame until it turns golden and develops its signature nutty aroma and danedar (grainy) texture. No creams, no shortcuts, no machinery — just patience and tradition in every spoonful. Rich in Omega-3, CLA and fat-soluble vitamins, this is ghee the way your great-grandmother would recognise it.",
    ingredients: "100% A2 Cultured Butter (from indigenous desi cow milk). Nothing else.",
    howItsMade:
      "Fresh A2 milk → cultured into curd overnight → hand-churned in a wooden bilona → makkhan separated → slow simmered in small batches → grainy golden ghee → jarred by hand.",
    nutrition: {
      servingSize: "1 tbsp (14 g)",
      energy: "130 kcal",
      protein: "0 g",
      carbs: "0 g",
      fat: "14 g",
      highlights: ["Rich in Omega-3 & CLA", "Source of Vitamins A, D, E & K", "High smoke point (~250°C)", "Naturally lactose-free"],
    },
    images: [IMG.ghee.jar1, IMG.ghee.spoon, IMG.ghee.jar3, IMG.process.bilona1],
    variants: [
      { id: "v1", label: "250 ml", price: 699, mrp: 899, weightGrams: 250 },
      { id: "v2", label: "500 ml", price: 1299, mrp: 1599, weightGrams: 500 },
      { id: "v3", label: "1 L", price: 2399, mrp: 2999, weightGrams: 1000 },
    ],
    rating: 4.9, reviewCount: 328,
    badges: ["Bestseller"],
    tags: ["A2", "Bilona", "Cultured", "Desi Cow"],
    dietary: ["Vegetarian", "Gluten-Free", "Lactose-Free"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(gheeReviews, 5),
  },
  {
    id: "p02",
    slug: "desi-cow-cultured-ghee",
    name: "Desi Cow Cultured Ghee",
    category: "ghee",
    tagline: "Everyday golden goodness",
    shortDescription: "Creamy, aromatic cultured ghee for daily cooking — dals, halwas, rotis and everything your kitchen loves.",
    description:
      "A softer, everyday expression of our bilona craft. Made from the milk of desi cows grazing on open pasture, this cultured ghee is churned and simmered in slightly larger batches to keep it accessible for daily use without compromising on purity. Expect a creamy spoon, a gentle caramel aroma, and a clean finish that lifts everything from a simple dal tadka to festive halwa. If our Bilona A2 is the heirloom, this is the trusted workhorse of the NANDINI kitchen.",
    ingredients: "100% Cultured Butter from desi cow milk.",
    howItsMade: "Desi cow milk → curd → churned butter → slow simmered → creamy cultured ghee.",
    nutrition: {
      servingSize: "1 tbsp (14 g)", energy: "128 kcal", protein: "0 g", carbs: "0 g", fat: "14 g",
      highlights: ["Vitamin A rich", "Ideal everyday cooking fat", "Naturally grainy when set"],
    },
    images: [IMG.ghee.jar2, IMG.ghee.jar4, IMG.lifestyle.roti1, IMG.ghee.trad2],
    variants: [
      { id: "v1", label: "250 ml", price: 649, mrp: 799, weightGrams: 250 },
      { id: "v2", label: "500 ml", price: 1199, mrp: 1449, weightGrams: 500 },
      { id: "v3", label: "1 L", price: 2199, mrp: 2749, weightGrams: 1000 },
    ],
    rating: 4.8, reviewCount: 214,
    badges: [],
    tags: ["Cultured", "Desi Cow", "Everyday"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true, isBestseller: true,
    reviews: rv(gheeReviews, 4),
  },
  {
    id: "p03",
    slug: "a2-gir-cow-ghee-wood-fired",
    name: "A2 Gir Cow Ghee — Wood-Fired",
    category: "ghee",
    tagline: "Fire-kissed, small batch",
    shortDescription: "Rare small-batch ghee simmered over live wood fire for a deeper, smokier aroma and amber hue.",
    description:
      "Our most artisanal ghee. In partnership with a single family dairy near Pushkar, Gir cow curd is churned and the resulting makkhan is simmered over a live wood fire in iron kadhais. The gentle smoke and iron contact lend this ghee a deeper amber colour, a smokier nose, and an intensely rich finish. Production is limited to 40 jars a week — once it is gone, it is gone. Each jar is numbered by hand.",
    ingredients: "100% A2 Cultured Butter from Gir cow milk. Wood-fired.",
    howItsMade: "Gir cow curd → bilona churned → wood-fired slow simmer in iron kadhai → hand-numbered small batches.",
    nutrition: {
      servingSize: "1 tbsp (14 g)", energy: "131 kcal", protein: "0 g", carbs: "0 g", fat: "14.2 g",
      highlights: ["Small batch of 40 jars/week", "Deep smoky aroma", "Amber colour", "Hand-numbered jars"],
    },
    images: [IMG.ghee.jar5, IMG.ghee.trad3, IMG.ghee.spoon2, IMG.process.bilona2],
    variants: [
      { id: "v1", label: "250 ml", price: 849, mrp: 1049, weightGrams: 250 },
      { id: "v2", label: "500 ml", price: 1549, mrp: 1899, weightGrams: 500 },
    ],
    rating: 4.9, reviewCount: 96,
    badges: ["Limited", "New"],
    tags: ["A2", "Wood-Fired", "Small Batch", "Gir Cow"],
    dietary: ["Vegetarian", "Gluten-Free", "Lactose-Free"],
    inStock: true, isNew: true, featured: true,
    reviews: rv(gheeReviews, 3),
  },
  {
    id: "p04",
    slug: "buffalo-bilona-ghee",
    name: "Buffalo Bilona Ghee",
    category: "ghee",
    tagline: "White gold, richer body",
    shortDescription: "Traditional bilona buffalo ghee — whiter, denser and ideal for sweets and slow cooking.",
    description:
      "Prized across North India for sweets and deep-flavoured cooking, buffalo ghee has a denser body and a higher fat content than cow ghee. We make ours the same patient way — curd set overnight, wooden bilona churn, slow simmer. The result is a pearly-white ghee with a rich, rounded aroma that makes besan laddoo, moong dal halwa and panjiri taste like they came from a halwai who refuses to compromise.",
    ingredients: "100% Cultured Butter from grass-fed buffalo milk.",
    howItsMade: "Buffalo milk curd → wooden bilona churn → slow simmer → pearly white ghee.",
    nutrition: {
      servingSize: "1 tbsp (14 g)", energy: "135 kcal", protein: "0 g", carbs: "0 g", fat: "14.6 g",
      highlights: ["Richer, denser body", "Perfect for Indian sweets", "High smoke point"],
    },
    images: [IMG.ghee.jar6, IMG.ghee.trad4, IMG.ghee.jar8],
    variants: [
      { id: "v1", label: "500 ml", price: 1099, mrp: 1349, weightGrams: 500 },
      { id: "v2", label: "1 L", price: 1999, mrp: 2449, weightGrams: 1000 },
    ],
    rating: 4.7, reviewCount: 88,
    badges: [],
    tags: ["Bilona", "Buffalo", "For Sweets"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true,
    reviews: rv(gheeReviews, 3),
  },
  {
    id: "p05",
    slug: "kesar-saffron-ghee",
    name: "Kesar Saffron-Infused Ghee",
    category: "ghee",
    tagline: "Pashan gold meets Pampore",
    shortDescription: "Our A2 bilona ghee infused with hand-picked Pampore saffron — festive, floral, extraordinary.",
    description:
      "A celebration in a jar. We steep premium Mongra saffron threads from Pampore, Kashmir, into warm freshly-set A2 bilona ghee for 48 hours until the ghee blushes gold and carries saffron's unmistakable honeyed-floral perfume. Spoon it over hot khichdi, finish kheer with it, or simply warm a spoon and fold it into dal for a meal that tastes like a wedding feast. Made in monthly limited batches.",
    ingredients: "A2 Cultured Bilona Ghee (99.4%), Kashmiri Mongra Saffron (0.6%).",
    howItsMade: "A2 bilona ghee warmed gently → Pampore saffron steeped 48 hours → jarred in monthly batches.",
    nutrition: {
      servingSize: "1 tbsp (14 g)", energy: "130 kcal", protein: "0 g", carbs: "0.2 g", fat: "14 g",
      highlights: ["Real Pampore saffron", "48-hour infusion", "Limited monthly batch"],
    },
    images: [IMG.ghee.jar7, IMG.ghee.spoon, IMG.ghee.trad5],
    variants: [
      { id: "v1", label: "200 g", price: 999, mrp: 1199, weightGrams: 200 },
      { id: "v2", label: "350 g", price: 1699, mrp: 2049, weightGrams: 350 },
    ],
    rating: 4.8, reviewCount: 64,
    badges: ["Limited"],
    tags: ["Saffron", "A2", "Festive", "Gifting"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true, featured: true,
    reviews: rv(gheeReviews, 3),
  },
  {
    id: "p06",
    slug: "herb-infused-brahmi-ghee",
    name: "Brahmi Herb-Infused Ghee",
    category: "ghee",
    tagline: "Ayurveda's quiet classic",
    shortDescription: "A2 ghee slow-infused with shade-dried brahmi following classical Ayurvedic preparation.",
    description:
      "Following the classical shita-kalpa method, shade-dried brahmi is simmered in A2 ghee over the lowest flame across two days, then strained. The result carries a faint herbal-green note over buttery warmth — traditionally enjoyed warm with rice at dinner, or melted into khichdi. Prepared in consultation with an Ayurvedic physician in Jodhpur. No flavours, no essences, no shortcuts.",
    ingredients: "A2 Cultured Bilona Ghee, Water-soluble Extract of Brahmi (Bacopa monnieri).",
    howItsMade: "A2 ghee + brahmi decoction → 2-day slow simmer (sneha siddhi) → strained & jarred.",
    nutrition: {
      servingSize: "1 tbsp (14 g)", energy: "129 kcal", protein: "0 g", carbs: "0 g", fat: "14 g",
      highlights: ["Classical Ayurvedic method", "2-day infusion", "No added flavours"],
    },
    images: [IMG.ghee.jar3, IMG.ghee.trad6, IMG.ghee.jar5],
    variants: [
      { id: "v1", label: "250 g", price: 899, mrp: 1099, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 1599, mrp: 1949, weightGrams: 500 },
    ],
    rating: 4.6, reviewCount: 41,
    badges: ["New"],
    tags: ["Ayurvedic", "Brahmi", "A2"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true, isNew: true,
    reviews: rv(gheeReviews, 3),
  },

  /* ═══════════════════════ DRY FRUITS ═══════════════════════ */
  {
    id: "p07",
    slug: "premium-california-almonds",
    name: "Premium California Almonds",
    category: "dry-fruits",
    subCategory: "Almonds",
    tagline: "Crunch that wakes you up",
    shortDescription: "Plump, uniform California almonds — hand-graded, naturally crunchy, never stale.",
    description:
      "The benchmark almond, done properly. We source the current season's crop, grade for size and density, and pack in small batches so nothing sits in a warehouse losing its crunch. Every almond is pasteurised without chemicals and hand-inspected before it reaches the resealable pack. Ideal for soaking overnight, toasting into pinnis, or simply eating by the handful.",
    ingredients: "100% California Almonds.",
    howItsMade: "Current-season sourcing → size & density grading → chemical-free pasteurisation → hand inspection → small-batch packing.",
    nutrition: {
      servingSize: "28 g (≈23 almonds)", energy: "164 kcal", protein: "6 g", carbs: "6 g", fat: "14 g", fiber: "3.5 g",
      highlights: ["Vitamin E rich", "Magnesium & riboflavin", "No oil, no salt, no coating"],
    },
    images: [IMG.dryFruits.almonds1, IMG.dryFruits.almonds2, IMG.dryFruits.almonds3],
    variants: [
      { id: "v1", label: "250 g", price: 399, mrp: 499, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 699, mrp: 849, weightGrams: 500 },
      { id: "v3", label: "1 kg", price: 1299, mrp: 1599, weightGrams: 1000 },
    ],
    rating: 4.8, reviewCount: 512,
    badges: ["Bestseller"],
    tags: ["Almonds", "California", "Raw"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(nutReviews, 4),
  },
  {
    id: "p08",
    slug: "premium-cashews-w240",
    name: "Premium Cashews — W240",
    category: "dry-fruits",
    subCategory: "Cashews",
    tagline: "Whole, ivory, buttery",
    shortDescription: "Large W240-grade whole cashews — creamy, sweet and unbroken.",
    description:
      "W240 is the grade halwais quietly seek: large, unbroken, ivory-white wholes with a buttery bite. Ours come from a single processor in Panruti, Tamil Nadu, sun-dried and steam-treated — never oil-fried. Eat them straight, roast with a whisper of ghee and black salt, or float them in kheer. The 500 g pack is our most gifted dry fruit after hampers.",
    ingredients: "100% Whole Cashews (W240).",
    howItsMade: "Single-origin Panruti sourcing → steam processing → hand-grading W240 → small-batch packing.",
    nutrition: {
      servingSize: "28 g", energy: "157 kcal", protein: "5 g", carbs: "9 g", fat: "12 g", fiber: "1 g",
      highlights: ["W240 premium grade", "Copper & magnesium", "Naturally cholesterol free"],
    },
    images: [IMG.dryFruits.cashews1, IMG.dryFruits.cashews2, IMG.dryFruits.cashews3],
    variants: [
      { id: "v1", label: "250 g", price: 449, mrp: 549, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 799, mrp: 979, weightGrams: 500 },
      { id: "v3", label: "1 kg", price: 1499, mrp: 1849, weightGrams: 1000 },
    ],
    rating: 4.8, reviewCount: 389,
    badges: ["Bestseller"],
    tags: ["Cashews", "W240", "Whole"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(nutReviews, 4),
  },
  {
    id: "p09",
    slug: "premium-iranian-pistachios-roasted-salted",
    name: "Premium Iranian Pistachios — Roasted & Salted",
    category: "dry-fruits",
    subCategory: "Pistachios",
    tagline: "The laughing nut, done right",
    shortDescription: "Naturally split Iranian pistachios, dry-roasted and finished with pink salt.",
    description:
      "Sourced from Rafsanjan, the pistachio capital of Iran, these naturally-split nuts are dry-roasted in small batches and finished with a whisper of Himalayan pink salt — no oil bath, no dusting chemicals. The kernels inside are vivid green with the deep, almost-sweet flavour that only Rafsanjan orchards produce. Crack them open one by one; it is part of the joy.",
    ingredients: "Iranian Pistachios (in shell), Himalayan Pink Salt. Contains nuts.",
    howItsMade: "Rafsanjan harvest → natural split selection → small-batch dry roasting → pink salt finish.",
    nutrition: {
      servingSize: "28 g", energy: "159 kcal", protein: "6 g", carbs: "8 g", fat: "13 g", fiber: "3 g",
      highlights: ["Naturally split", "Dry roasted — no oil", "Lutein & B6 rich"],
    },
    images: [IMG.dryFruits.pistachios1, IMG.dryFruits.pistachios2, IMG.dryFruits.pistachios3],
    variants: [
      { id: "v1", label: "250 g", price: 699, mrp: 849, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 1299, mrp: 1599, weightGrams: 500 },
    ],
    rating: 4.9, reviewCount: 277,
    badges: ["Bestseller"],
    tags: ["Pistachios", "Iranian", "Roasted", "Salted"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(nutReviews, 4),
  },
  {
    id: "p10",
    slug: "kashmiri-walnut-kernels",
    name: "Kashmiri Walnut Kernels",
    category: "dry-fruits",
    subCategory: "Walnuts",
    tagline: "Light-coloured, paper-thin shells",
    shortDescription: "Hand-extracted walnut kernels from Kashmiri paper-shell walnuts — 60% brain halves.",
    description:
      "Paper-shell walnuts from Anantnag, Kashmir, crack open between two fingers to reveal plump kernels that we extract by hand — never machine-crushed — so over 60% arrive as unbroken 'brain' halves. Light in colour, mild in tannin, and buttery on the finish. Keep them in the fridge for a cool-season treat with jaggery, the way Kashmiri winters intended.",
    ingredients: "100% Kashmiri Walnut Kernels.",
    howItsMade: "Anantnag paper-shell harvest → hand extraction → light-colour sorting → vacuum-adjacent packing.",
    nutrition: {
      servingSize: "28 g", energy: "185 kcal", protein: "4.3 g", carbs: "3.9 g", fat: "18.5 g", fiber: "1.9 g",
      highlights: ["Highest omega-3 among nuts", "Hand-extracted halves", "Cold-chain stored"],
    },
    images: [IMG.dryFruits.walnuts1, IMG.dryFruits.walnuts2, IMG.dryFruits.walnuts3],
    variants: [
      { id: "v1", label: "250 g", price: 499, mrp: 599, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 899, mrp: 1099, weightGrams: 500 },
    ],
    rating: 4.7, reviewCount: 203,
    badges: [],
    tags: ["Walnuts", "Kashmiri", "Raw"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p11",
    slug: "premium-medjool-dates",
    name: "Premium Medjool Dates",
    category: "dry-fruits",
    subCategory: "Dates",
    tagline: "Nature's caramel",
    shortDescription: "Jumbo Medjool dates — soft, honeyed and impossibly caramel-like.",
    description:
      "Jumbo-grade Medjool dates with a jammy, almost-caramel flesh that peels away from the pit. We select for moisture and size, then pack them in single layers so every date arrives unmarked. Stuff them with almonds for the classic Arabian pairing, blend them into smoothies for unrefined sweetness, or serve them with coffee — they turn any moment into an occasion.",
    ingredients: "100% Medjool Dates.",
    howItsMade: "Jumbo grade selection → single-layer packing → moisture-locked pouches.",
    nutrition: {
      servingSize: "2 dates (48 g)", energy: "133 kcal", protein: "0.8 g", carbs: "36 g", fat: "0 g", fiber: "3.2 g",
      highlights: ["Jumbo grade", "Naturally sweet — no added sugar", "Potassium rich"],
    },
    images: [IMG.dryFruits.dates1, IMG.dryFruits.dates2, IMG.dryFruits.dates3],
    variants: [
      { id: "v1", label: "250 g", price: 299, mrp: 379, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 449, mrp: 579, weightGrams: 500 },
      { id: "v3", label: "1 kg", price: 799, mrp: 1049, weightGrams: 1000 },
    ],
    rating: 4.8, reviewCount: 341,
    badges: ["Bestseller"],
    tags: ["Dates", "Medjool", "Jumbo"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true, isBestseller: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p12",
    slug: "premium-afghani-anjeer",
    name: "Premium Afghani Anjeer (Figs)",
    category: "dry-fruits",
    subCategory: "Anjeer",
    tagline: "Honeycombed, seed-crunching",
    shortDescription: "Large Afghani figs with the prized seed-crunch and honeyed jammy centre.",
    description:
      "Afghanistan's Kandahar valley produces the world's most sought-after dried figs — large, open-eyed, and honeycombed with seeds that crackle between your teeth. Ours are sun-dried without sulphur and graded so every fig is plump and pliable, never stiff or sugared. Soak three overnight for a Mughal-style breakfast, or simmer into Anjeer ka halwa for celebrations.",
    ingredients: "100% Dried Afghan Figs. No sulphur, no added sugar.",
    howItsMade: "Kandahar sourcing → sun drying → sulphur-free processing → plumpness grading.",
    nutrition: {
      servingSize: "3 figs (45 g)", energy: "125 kcal", protein: "1.2 g", carbs: "32 g", fat: "0.4 g", fiber: "4 g",
      highlights: ["Sulphur-free", "Calcium & fibre rich", "Seed-crunch texture"],
    },
    images: [IMG.dryFruits.anjeer1, IMG.dryFruits.anjeer2, IMG.dryFruits.anjeer3],
    variants: [
      { id: "v1", label: "250 g", price: 599, mrp: 729, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 1099, mrp: 1349, weightGrams: 500 },
    ],
    rating: 4.7, reviewCount: 186,
    badges: [],
    tags: ["Anjeer", "Afghani", "Raw"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p13",
    slug: "premium-golden-raisins",
    name: "Premium Long Green Raisins",
    category: "dry-fruits",
    subCategory: "Raisins",
    tagline: "Sun-cured sweetness",
    shortDescription: "Long green kishmish — soft, seedless and naturally honey-sweet.",
    description:
      "The long green kishmish that old Delhi mithai shops guard jealously. Soft, seedless and a shade sweeter than black raisins, these grapes are shade-cured slowly to keep their colour and moisture. Toss into pulao, fold into sheera, or soak a spoonful overnight for children — a small luxury that quietly lifts everything.",
    ingredients: "100% Long Green Raisins. No added sugar or preservatives.",
    howItsMade: "Seedless grape harvest → shade curing → hand sorting → moisture-balanced packing.",
    nutrition: {
      servingSize: "28 g", energy: "85 kcal", protein: "0.8 g", carbs: "22 g", fat: "0.1 g", fiber: "0.9 g",
      highlights: ["Seedless", "Shade-cured colour", "Natural energy"],
    },
    images: [IMG.dryFruits.raisins1, IMG.dryFruits.raisins2],
    variants: [
      { id: "v1", label: "250 g", price: 199, mrp: 249, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 349, mrp: 429, weightGrams: 500 },
    ],
    rating: 4.6, reviewCount: 158,
    badges: [],
    tags: ["Raisins", "Kishmish", "Raw"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p14",
    slug: "mamra-almonds",
    name: "Mamra Almonds — Iranian",
    category: "dry-fruits",
    subCategory: "Almonds",
    tagline: "The connoisseur's almond",
    shortDescription: "Rare Iranian Mamra almonds — sweeter, oilier and grown only in high-altitude orchards.",
    description:
      "Mamra is to almonds what saffron is to spices — less than 4% of world production, grown only in a handful of high-altitude Iranian orchards. Smaller and more irregular than California almonds, they are dramatically sweeter and richer in natural oils. Traditionally gifted at weddings and given to children during exams. Limited stock, priced accordingly, worth it absolutely.",
    ingredients: "100% Iranian Mamra Almonds.",
    howItsMade: "High-altitude Iranian orchards → seasonal sourcing → hand sorting → limited packing.",
    nutrition: {
      servingSize: "28 g", energy: "172 kcal", protein: "6.1 g", carbs: "5.5 g", fat: "15 g", fiber: "3 g",
      highlights: ["<4% of world almond output", "Naturally sweeter", "High natural oil content"],
    },
    images: [IMG.dryFruits.mamra, IMG.dryFruits.almonds2],
    variants: [
      { id: "v1", label: "250 g", price: 899, mrp: 1099, weightGrams: 250 },
    ],
    rating: 4.9, reviewCount: 77,
    badges: ["Limited"],
    tags: ["Mamra", "Iranian", "Premium"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true, featured: true,
    reviews: rv(nutReviews, 2),
  },
  {
    id: "p15",
    slug: "premium-hazelnuts",
    name: "Premium Hazelnuts",
    category: "dry-fruits",
    subCategory: "Mixed Dry Fruits",
    tagline: "Orchard-sweet, gently toasted",
    shortDescription: "Turkish hazelnut kernels — sweet, round and perfect for roasting.",
    description:
      "Round Turkish hazelnut kernels with the unmistakable orchard sweetness that makes them the soul of praline. We pack them raw so you can toast them fresh — five minutes in a pan and your kitchen smells like a patisserie. Chop into brownies, blend into chutneys, or snack straight from the pack.",
    ingredients: "100% Turkish Hazelnut Kernels.",
    howItsMade: "Turkish Black Sea coast sourcing → kernel grading → raw packing for fresh toasting.",
    nutrition: {
      servingSize: "28 g", energy: "178 kcal", protein: "4.2 g", carbs: "4.7 g", fat: "17 g", fiber: "2.7 g",
      highlights: ["Vitamin E rich", "Raw — toast fresh", "Folate source"],
    },
    images: [IMG.dryFruits.hazelnut, IMG.dryFruits.mixed2],
    variants: [
      { id: "v1", label: "250 g", price: 649, mrp: 799, weightGrams: 250 },
    ],
    rating: 4.6, reviewCount: 92,
    badges: ["New"],
    tags: ["Hazelnuts", "Turkish"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"],
    inStock: true, isNew: true,
    reviews: rv(nutReviews, 2),
  },
  {
    id: "p16",
    slug: "dried-cranberries",
    name: "Dried Cranberries",
    category: "dry-fruits",
    subCategory: "Mixed Dry Fruits",
    tagline: "Tart little jewels",
    shortDescription: "Plump, ruby cranberries — sweet-tart bursts for salads, bakes and trail mixes.",
    description:
      "Plump ruby cranberries with a sweet-tart snap that cuts through richness beautifully. Scatter over kheer for a modern-classic contrast, fold into muesli, or soak and purée into chutney. Our version keeps them soft and juicy without a heavy syrup bath.",
    ingredients: "Dried Cranberries, Sugar, Sunflower Oil (trace, anti-stick). Contains naturally occurring fruit sugars.",
    howItsMade: "North American harvest → infusion → gentle drying → softness grading.",
    nutrition: {
      servingSize: "28 g", energy: "92 kcal", protein: "0 g", carbs: "25 g", fat: "0.4 g", fiber: "1.5 g",
      highlights: ["Soft & juicy", "Antioxidant rich", "Bake-stable"],
    },
    images: [IMG.dryFruits.cranberry, IMG.dryFruits.mixed3],
    variants: [
      { id: "v1", label: "250 g", price: 349, mrp: 429, weightGrams: 250 },
    ],
    rating: 4.5, reviewCount: 118,
    badges: [],
    tags: ["Cranberries", "Baking"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    inStock: true,
    reviews: rv(nutReviews, 2),
  },

  /* ═══════════════════════ COMBOS ═══════════════════════ */
  {
    id: "p17",
    slug: "daily-nutrition-combo",
    name: "Daily Nutrition Combo",
    category: "combos",
    tagline: "Your daily handful, solved",
    shortDescription: "Almonds 250g + Cashews 250g + Long Green Raisins 250g — the everyday trio at a kinder price.",
    description:
      "The three packs our nutritionist friends recommend most, bundled: crunchy California almonds for the morning, buttery W240 cashews for the evening, and long green raisins for the children who raid the pantry. Packed in our standard resealables inside a sturdy kraft carton. Saves ₹149 versus buying separately.",
    ingredients: "Premium California Almonds 250 g, Premium Cashews W240 250 g, Long Green Raisins 250 g.",
    howItsMade: "Each item packed fresh to order in small batches, boxed together with a linen ribbon.",
    nutrition: {
      servingSize: "30 g mixed", energy: "168 kcal", protein: "5 g", carbs: "10 g", fat: "13 g",
      highlights: ["Save ₹149 vs separate packs", "Three resealable packs", "Ideal family starter"],
    },
    images: [IMG.dryFruits.mixed1, IMG.dryFruits.almonds1, IMG.dryFruits.cashews1],
    variants: [
      { id: "v1", label: "750 g total", price: 1199, mrp: 1348, weightGrams: 750 },
    ],
    rating: 4.8, reviewCount: 143,
    badges: ["Value Pack"],
    tags: ["Combo", "Everyday", "Gifting"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    inStock: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p18",
    slug: "immunity-boost-combo",
    name: "Winter Warmth Combo",
    category: "combos",
    tagline: "Cold-weather companions",
    shortDescription: "Kashmiri Walnuts 250g + Afghani Anjeer 250g + Medjool Dates 250g for the season of slowing down.",
    description:
      "Built for Indian winters: walnut kernels for omega-3s, Afghani anjeer soaked overnight the traditional way, and Medjool dates to sweeten the season naturally. The trio our grandmothers would assemble without a nutritionist in sight. Presented in a forest-green gift carton tied with gold thread — ready to gift or keep.",
    ingredients: "Kashmiri Walnut Kernels 250 g, Premium Afghani Anjeer 250 g, Premium Medjool Dates 250 g.",
    howItsMade: "Packed fresh to order; each origin item sealed separately, then boxed together.",
    nutrition: {
      servingSize: "30 g mixed", energy: "104 kcal", protein: "1.8 g", carbs: "19 g", fat: "6 g",
      highlights: ["Save ₹159 vs separate packs", "Winter-focused trio", "Gift-ready carton"],
    },
    images: [IMG.dryFruits.mixed2, IMG.dryFruits.walnuts1, IMG.dryFruits.dates1],
    variants: [
      { id: "v1", label: "750 g total", price: 1399, mrp: 1558, weightGrams: 750 },
    ],
    rating: 4.7, reviewCount: 96,
    badges: ["Seasonal"],
    tags: ["Combo", "Winter", "Gifting"],
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    inStock: true,
    reviews: rv(nutReviews, 3),
  },
  {
    id: "p19",
    slug: "ghee-almonds-starter-combo",
    name: "The Morning Ritual Combo",
    category: "combos",
    tagline: "Begin the NANDINI way",
    shortDescription: "Bilona A2 Ghee 250 ml + Premium California Almonds 250 g — the classic start.",
    description:
      "The simplest possible upgrade to a morning: a spoon of warm bilona A2 ghee on your first roti, a handful of soaked almonds beside your chai. This pairing is how most families first meet NANDINI, and it remains our most gifted combo. Arrives in a cream rigid box with a handwritten-style note card you can personalise at checkout.",
    ingredients: "Traditional Bilona A2 Cow Ghee 250 ml, Premium California Almonds 250 g.",
    howItsMade: "Ghee jarred to order; almonds packed fresh; assembled with note card in rigid gift box.",
    nutrition: {
      servingSize: "1 tbsp ghee + 10 almonds", energy: "226 kcal", protein: "2.5 g", carbs: "3 g", fat: "21 g",
      highlights: ["Save ₹120 vs separate", "Personalisable note card", "Perfect introduction set"],
    },
    images: [IMG.ghee.jar1, IMG.dryFruits.almonds1, IMG.lifestyle.roti2],
    variants: [
      { id: "v1", label: "250 ml + 250 g", price: 1079, mrp: 1199, weightGrams: 500 },
    ],
    rating: 4.9, reviewCount: 211,
    badges: ["Bestseller"],
    tags: ["Combo", "Ghee", "Gifting", "Starter"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(gheeReviews, 2).concat(rv(nutReviews, 2)),
  },
  {
    id: "p20",
    slug: "royal-trail-mix",
    name: "Royal Trail Mix",
    category: "combos",
    tagline: "Six treasures in one bowl",
    shortDescription: "Almonds, cashews, pistachios, walnuts, raisins and cranberries — roasted to order, never stale.",
    description:
      "Our signature mix: whole almonds, W240 cashews, Iranian pistachios, Kashmiri walnuts, long green raisins and ruby cranberries in chef-set proportions. Roasted the morning it ships, so the pistachios crackle and the cashews keep their buttery snap. The pack our customers take on treks, to offices, and (let's be honest) hide from their families.",
    ingredients: "Almonds, Cashews, Pistachios, Walnut Kernels, Raisins, Dried Cranberries. Contains nuts.",
    howItsMade: "Six premium ingredients → chef-set ratios → roasted to order → hot-fill packing.",
    nutrition: {
      servingSize: "30 g", energy: "165 kcal", protein: "5 g", carbs: "11 g", fat: "12.5 g",
      highlights: ["Roasted to order", "Six premium ingredients", "No fried lentils or fillers"],
    },
    images: [IMG.dryFruits.mixed3, IMG.dryFruits.mixed1, IMG.dryFruits.pistachios1],
    variants: [
      { id: "v1", label: "250 g", price: 449, mrp: 549, weightGrams: 250 },
      { id: "v2", label: "500 g", price: 849, mrp: 1029, weightGrams: 500 },
    ],
    rating: 4.8, reviewCount: 264,
    badges: ["Bestseller"],
    tags: ["Trail Mix", "Roasted", "Snacking"],
    dietary: ["Vegetarian", "Gluten-Free"],
    inStock: true, isBestseller: true,
    reviews: rv(nutReviews, 4),
  },

  /* ═══════════════════════ GIFT HAMPERS ═══════════════════════ */
  {
    id: "p21",
    slug: "the-classic-hamper",
    name: "The Classic Hamper",
    category: "gift-hampers",
    tagline: "The art of enough",
    shortDescription: "A2 Ghee 250 ml + Almonds 250 g + Medjool Dates 250 g in a hand-tied ivory box.",
    description:
      "Our entry into the art of gifting, and a masterclass in restraint. A numbered jar of A2 bilona ghee, a pack of California almonds, and jumbo Medjool dates — arranged in a warm-ivory rigid box lined with tissue and sealed with a wax-stamped card. Personalise the note at checkout; we write it by hand before dispatch.",
    ingredients: "A2 Ghee 250 ml, California Almonds 250 g, Medjool Dates 250 g, gift box & hand-written note.",
    howItsMade: "Contents packed to order, arranged by hand, wax-stamped and ribbon-tied.",
    nutrition: {
      servingSize: "—", energy: "—", protein: "—", carbs: "—", fat: "—",
      highlights: ["Hand-written note", "Wax-stamped seal", "Corporate orders welcome"],
    },
    images: [IMG.hampers.hamper1, IMG.hampers.hamper2, IMG.ghee.jar1],
    variants: [
      { id: "v1", label: "3 items", price: 2499, mrp: 2848, weightGrams: 750 },
    ],
    rating: 4.9, reviewCount: 128,
    badges: ["Bestseller"],
    tags: ["Hamper", "Gifting", "Festive"],
    dietary: ["Vegetarian"],
    inStock: true, isBestseller: true, featured: true,
    reviews: rv(hamperReviews, 3),
  },
  {
    id: "p22",
    slug: "the-royal-hamper",
    name: "The Royal Hamper",
    category: "gift-hampers",
    tagline: "Rajasthan in a box",
    shortDescription: "Kesar Ghee 200 g + Pistachios 250 g + Anjeer 250 g + Cashews 250 g in a forest-green keepsake box.",
    description:
      "Deep forest-green keepsake box embossed in gold foil, containing our most celebrated pieces: saffron-infused kesar ghee, Rafsanjan pistachios, Kandahar anjeer and W240 cashews. The unboxing unfolds in three layers — a ritual our customers describe as 'too beautiful to open'. A conversation piece long after the contents are finished.",
    ingredients: "Kesar Saffron Ghee 200 g, Iranian Pistachios 250 g, Afghani Anjeer 250 g, W240 Cashews 250 g.",
    howItsMade: "Layered by hand into keepsake box; gold-foil embossed; includes story booklet.",
    nutrition: {
      servingSize: "—", energy: "—", protein: "—", carbs: "—", fat: "—",
      highlights: ["Keepsake box", "Story booklet included", "3-layer unboxing"],
    },
    images: [IMG.hampers.hamper3, IMG.hampers.hamper4, IMG.ghee.jar7],
    variants: [
      { id: "v1", label: "4 items", price: 3999, mrp: 4546, weightGrams: 950 },
    ],
    rating: 4.9, reviewCount: 87,
    badges: ["Signature"],
    tags: ["Hamper", "Premium", "Festive", "Corporate"],
    dietary: ["Vegetarian"],
    inStock: true, featured: true,
    reviews: rv(hamperReviews, 3),
  },
  {
    id: "p23",
    slug: "festive-grand-hamper",
    name: "The Festive Grand Hamper",
    category: "gift-hampers",
    tagline: "For the ones who matter most",
    shortDescription: "Six premium items incl. wood-fired ghee & Mamra almonds in a hand-finished trunk box.",
    description:
      "Our grandest expression: numbered wood-fired A2 ghee, rare Mamra almonds, pistachios, cashews, anjeer and Medjool dates — six items in a hand-finished trunk-style box with brass clasps, finished with a silk ribbon and your message on thick cotton paper. Limited numbers per festive season; reserve early for Diwali.",
    ingredients: "Wood-Fired A2 Ghee 250 ml, Mamra Almonds 250 g, Pistachios 200 g, Cashews 250 g, Anjeer 200 g, Medjool Dates 250 g.",
    howItsMade: "Trunk boxes hand-finished in Jaipur; contents arranged and sealed per order.",
    nutrition: {
      servingSize: "—", energy: "—", protein: "—", carbs: "—", fat: "—",
      highlights: ["Brass-clasp trunk box", "Limited festive numbers", "Silk ribbon & cotton paper note"],
    },
    images: [IMG.hampers.hamper5, IMG.hampers.hamper6, IMG.hampers.hamper3],
    variants: [
      { id: "v1", label: "6 items", price: 5499, mrp: 6349, weightGrams: 1400 },
    ],
    rating: 5.0, reviewCount: 52,
    badges: ["Signature", "Limited"],
    tags: ["Hamper", "Diwali", "Corporate", "Luxury"],
    dietary: ["Vegetarian"],
    inStock: true,
    reviews: rv(hamperReviews, 3),
  },
  {
    id: "p24",
    slug: "corporate-gift-hamper",
    name: "The Corporate Hamper",
    category: "gift-hampers",
    tagline: "Gratitude, formally stated",
    shortDescription: "Ghee 250 ml + Almonds + Cashews + custom-branded card — 25+ orders get volume pricing.",
    description:
      "Designed for businesses that gift with intent. Contains our A2 ghee 250 ml, California almonds and W240 cashews in a clean forest-green box, with space for your brand's card. Volume pricing from 25 hampers, dedicated support on WhatsApp, and consolidated GST invoicing. Clients remember good taste — this guarantees it.",
    ingredients: "A2 Ghee 250 ml, California Almonds 250 g, W240 Cashews 250 g, branded note card.",
    howItsMade: "Assembled per order; bulk dispatch coordinated with your team's calendar.",
    nutrition: {
      servingSize: "—", energy: "—", protein: "—", carbs: "—", fat: "—",
      highlights: ["Volume pricing 25+", "GST invoicing", "Dedicated WhatsApp support"],
    },
    images: [IMG.hampers.hamper7, IMG.hampers.hamper8, IMG.ghee.jar2],
    variants: [
      { id: "v1", label: "3 items", price: 4499, mrp: 4697, weightGrams: 750 },
    ],
    rating: 4.8, reviewCount: 34,
    badges: ["For Business"],
    tags: ["Hamper", "Corporate", "Bulk"],
    dietary: ["Vegetarian"],
    inStock: true,
    reviews: rv(hamperReviews, 2),
  },
  {
    id: "p25",
    slug: "diwali-signature-hamper",
    name: "The Diwali Signature",
    category: "gift-hampers",
    tagline: "Light, in every sense",
    shortDescription: "Kesar Ghee + 5 dry fruits + brass diya — our festive masterpiece with limited numbers.",
    description:
      "Our festive masterpiece: kesar saffron ghee, five premium dry fruits, and a hand-cast brass diya from Moradabad artisans — because Diwali deserves light as well as taste. Numbered edition, wrapped in banana-silk with a marigold-toned seal. Books open 60 days before Diwali and sell out most years.",
    ingredients: "Kesar Ghee 200 g, Almonds 200 g, Cashews 200 g, Pistachios 200 g, Anjeer 200 g, Dates 200 g, brass diya.",
    howItsMade: "Brass diyas cast by Moradabad artisans; hampers assembled and numbered per order.",
    nutrition: {
      servingSize: "—", energy: "—", protein: "—", carbs: "—", fat: "—",
      highlights: ["Numbered edition", "Artisan brass diya", "Books 60 days pre-Diwali"],
    },
    images: [IMG.hampers.hamper2, IMG.hampers.hamper5, IMG.hampers.hamper1],
    variants: [
      { id: "v1", label: "7 items", price: 6999, mrp: 8199, weightGrams: 1400 },
    ],
    rating: 4.9, reviewCount: 68,
    badges: ["Signature", "Limited"],
    tags: ["Hamper", "Diwali", "Luxury"],
    dietary: ["Vegetarian"],
    inStock: true,
    reviews: rv(hamperReviews, 3),
  },
];

/* ── Helpers ── */
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelated(product: Product, count = 4): Product[] {
  const sameCat = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category && (p.isBestseller || p.featured));
  return [...sameCat, ...others].slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.subCategory?.toLowerCase().includes(q)
  );
}
