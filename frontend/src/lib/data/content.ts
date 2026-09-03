import { IMG } from "./images";
import { AppNotification, BlogPost } from "../types";

/* ── Categories ── */
export const CATEGORIES = [
  {
    slug: "ghee",
    name: "Desi Cow Ghee",
    homeCard: IMG.ghee.jar1,
    homeCardWide: IMG.ghee.jar3,
    description: "Traditional richness in every spoon.",
    longDescription:
      "Cultured, bilona-churned and slow-cooked in small batches. Ghee the way Rajasthan has made it for centuries — golden, grainy and honest.",
  },
  {
    slug: "dry-fruits",
    name: "Premium Dry Fruits",
    homeCard: IMG.dryFruits.almonds1,
    homeCardWide: IMG.dryFruits.mixed2,
    description: "Handpicked goodness for every occasion.",
    longDescription:
      "Current-season almonds, W240 cashews, Iranian pistachios, Kashmiri walnuts, Medjool dates and Afghani anjeer — graded, inspected and packed fresh.",
  },
  {
    slug: "gift-hampers",
    name: "Gift Hampers",
    homeCard: IMG.hampers.hamper1,
    homeCardWide: IMG.hampers.hamper4,
    description: "Thoughtful gifts inspired by Indian tradition.",
    longDescription:
      "Keepsake boxes, hand-tied ribbons, hand-written notes and our finest contents inside. Corporate volumes welcome — gifting done with intent.",
  },
] as const;

/* ── Farm to Family timeline ── */
export const FARM_TO_FAMILY = [
  { step: "01", title: "Desi Cow", text: "Indigenous Gir & Tharparkar cows, pasture-raised and never tethered to milking schedules.", image: IMG.farm.cow1 },
  { step: "02", title: "Fresh Milk", text: "Morning milk collected at first light — only the A2-quality, only the fresh.", image: IMG.farm.cow3 },
  { step: "03", title: "Traditional Curd", text: "Whole milk set into curd overnight in earthen pots, as it has always been.", image: IMG.process.curd },
  { step: "04", title: "Bilona Churning", text: "Wooden bilona churns the curd by hand to release cultured makkhan.", image: IMG.process.bilona1 },
  { step: "05", title: "Slow Cooking", text: "Makkhan simmered low and patient until the aroma turns deep and nutty.", image: IMG.process.slowCook },
  { step: "06", title: "Pure Ghee", text: "Golden, grainy ghee — jarred by hand, numbered by batch, sent to your table.", image: IMG.process.ghee },
] as const;

/* ── Process page steps ── */
export const PROCESS_STEPS = [
  {
    step: "01", title: "Milk", subtitle: "The first light",
    text: "Our day begins before sunrise at partner farms outside Jodhpur. Indigenous desi cows — Gir, Tharparkar, Rathi — are milked only after their calves have had their fill, a practice our farmers call 'the calf's share'. The milk is never chilled, never stored — it walks straight from the shed to the curd room.",
    image: IMG.process.milk,
  },
  {
    step: "02", title: "Curd", subtitle: "Overnight patience",
    text: "Whole milk is gently warmed and set with a spoon of the previous batch's curd, in earthen pots that breathe. By morning the curd is just set — softly holding its shape, alive with cultures that will later give the ghee its characteristic depth.",
    image: IMG.process.curd,
  },
  {
    step: "03", title: "Bilona", subtitle: "The wooden rhythm",
    text: "The curd meets the bilona — a wooden churn turned by hand in slow, rhythmic strokes. It takes close to an hour before white cultured butter rises to the top. Machines can do this in minutes; they cannot do it right. This is where the ghee's soul is set.",
    image: IMG.process.bilona1,
  },
  {
    step: "04", title: "Butter", subtitle: "White gold gathered",
    text: "The makkhan is gathered by hand and washed in cool water to remove all buttermilk. It is soft, fragrant, faintly tangy — a moment most commercial ghee never knows, because they start from cream separated by centrifuges.",
    image: IMG.process.butter,
  },
  {
    step: "05", title: "Slow Cooking", subtitle: "Low flame, long watch",
    text: "The butter simmers on the lowest flame, stirred occasionally, watched constantly. Water leaves as whispers of steam; milk solids settle and toast gently; the kitchen fills with a nutty, caramel-like aroma that no factory has ever reproduced.",
    image: IMG.process.slowCook,
  },
  {
    step: "06", title: "Ghee", subtitle: "Golden & grainy",
    text: "Cooled slowly, the ghee sets into its signature danedar — grainy crystals that melt on the tongue. It is jarred by hand while still faintly warm, each batch numbered, each jar inspected against the light before it earns the NANDINI seal.",
    image: IMG.process.ghee,
  },
] as const;

/* ── Why NANDINI ── */
export const WHY_NANDINI = [
  { icon: "flame", title: "Traditional Craftsmanship", text: "Wooden bilona churns, wood fires and unhurried hands — methods measured in hours, not minutes." },
  { icon: "leaf", title: "Premium Ingredients", text: "A2 milk from pasture-raised desi cows and current-season dry fruits from the world's finest orchards." },
  { icon: "map-pin", title: "Carefully Sourced", text: "Named farms, named valleys, named orchards. We know every hand that touches what you eat." },
  { icon: "shield-check", title: "Quality Checked", text: "Every batch passes moisture, purity and adulteration checks at an FSSAI-licensed laboratory." },
  { icon: "package", title: "Freshly Packed", text: "Small batches, made-to-order packing and dated jars. Nothing sits in warehouses growing old." },
  { icon: "package-check", title: "Secure Packaging", text: "Tamper-evident seals, shock-absorbing boxes and temperature-conscious dispatch across India." },
  { icon: "sparkles", title: "Authentic Indian Taste", text: "The danedar texture, the nutty aroma, the taste your grandmother would nod at approvingly." },
  { icon: "heart-handshake", title: "Made With Care", text: "Fair pay for partner farms, small batches, and a customer team that answers like family." },
] as const;

/* ── Trust bar ── */
export const TRUST_ITEMS = [
  { icon: "leaf", title: "100% Natural", text: "Carefully sourced ingredients" },
  { icon: "flame", title: "Traditional Bilona", text: "Inspired by traditional craftsmanship" },
  { icon: "shield-check", title: "Quality Checked", text: "Carefully inspected products" },
  { icon: "package", title: "Freshly Packed", text: "Packed with care" },
  { icon: "truck", title: "Secure Delivery", text: "Safe packaging across India" },
] as const;

/* ── Testimonials ── */
export const TESTIMONIALS = [
  {
    name: "Lakshmi Venkatesh", location: "Bengaluru", rating: 5,
    text: "I have bought ghee from every 'premium' brand in the last two years. NANDINI is the first one my mother — who grew up on farm-made ghee — approved without a single criticism. The danedar texture is exactly right.",
  },
  {
    name: "Col. Suresh Malhotra (Retd.)", location: "Jaipur", rating: 5,
    text: "We send hampers to fellow officers every Diwali. This year's Royal Hamper drew more calls of appreciation than any gift in fifteen years. The unboxing is genuinely an experience.",
  },
  {
    name: "Fatima Sheikh", location: "Mumbai", rating: 5,
    text: "The pistachios and Medjool dates have become a weekly order. Everything arrives fresh, beautifully packed, and the dates taste like toffee. My iftar table looks richer for it.",
  },
  {
    name: "Dr. Ramesh Iyer", location: "Chennai", rating: 4,
    text: "As a physician I read labels obsessively. Clean ingredient lists, honest claims, no medical nonsense on the website. The ghee itself is excellent. My only complaint is that the 1L jar empties too fast.",
  },
  {
    name: "Anjali & Rohan Kapoor", location: "Gurugram", rating: 5,
    text: "We built our own hamper for our wedding's welcome kits. The team coordinated with us over WhatsApp, personal notes were hand-written, and 150 guests went home smiling.",
  },
  {
    name: "Harpreet Kaur", location: "Amritsar", rating: 5,
    text: "Ordered the Morning Ritual Combo on my sister's recommendation. The ghee's aroma when you open the jar — nothing in a supermarket prepares you for it. This is real food.",
  },
  {
    name: "Meenakshi Rathore", location: "Udaipur", rating: 5,
    text: "Being from Rajasthan, I am sceptical of brands using our heritage for marketing. NANDINI is the exception — the craft is real, the sourcing is honest, and the taste speaks for itself.",
  },
  {
    name: "Joseph Thomas", location: "Kochi", rating: 4,
    text: "Walnuts are the best I've had outside Kashmir itself — light coloured, no bitter aftertaste. Shipping took a day longer to Kerala than promised, but the team informed me proactively. Will reorder.",
  },
] as const;

/* ── Blog ── */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-bilona-ghee",
    title: "What Is Bilona Ghee? The 3,000-Year-Old Method Explained",
    category: "Ghee",
    excerpt: "Cream-separated or cultured? Machine or wooden churn? The difference between bilona ghee and everything else on the shelf — and why it matters for your kitchen.",
    image: IMG.process.bilona1,
    author: "Team NANDINI",
    date: "2026-08-14",
    readTime: "6 min read",
    content: [
      "Walk into any premium grocery store today and you will find at least six brands claiming 'bilona ghee'. The word has become a marketing badge. But bilona is not a brand claim — it is a method, one of the oldest documented food processes on the subcontinent, and understanding it changes what you should expect from a jar of ghee.",
      "The bilona method begins not with cream but with curd. Whole milk is cultured overnight, then churned — traditionally with a wooden instrument — to separate cultured butter from buttermilk. That butter is then simmered slowly until it becomes ghee. The industrial alternative skips three of these four steps: milk is centrifuged to extract cream directly, and the cream is melted down. Faster, cheaper, and unrecognisable in taste.",
      "Why does the cultured route matter? Fermentation changes the chemistry of the butter, developing deeper flavour compounds and the faint tang that makes bilona ghee taste 'correct' to anyone who grew up with it. The slow simmer then creates the danedar — grainy — texture that signals a properly made ghee.",
      "There are practical differences too. Bilona ghee typically has a higher smoke point, a more complex aroma, and a texture that solidifies into fine grains rather than a smooth wax. None of this makes it 'healthier' in the marketing sense — it makes it a different, more traditional food, and most people who taste both never go back.",
      "At NANDINI, every jar of our A2 ghee follows the full method: curd, wooden bilona, slow fire. It takes us nearly 30 litres of milk to make one litre of ghee. That arithmetic is the real reason true bilona ghee costs what it costs — and the easiest way to spot brands whose prices don't add up.",
    ],
  },
  {
    slug: "how-to-store-ghee",
    title: "How to Store Ghee So It Lasts a Year (Really)",
    category: "Ghee",
    excerpt: "Does ghee need refrigeration? Which spoon to use? Simple storage habits that keep your ghee golden, aromatic and safe for months.",
    image: IMG.ghee.jar2,
    author: "Team NANDINI",
    date: "2026-07-28",
    readTime: "4 min read",
    content: [
      "Ghee is one of the few traditional fats engineered by time to survive Indian summers. With its milk solids removed and moisture driven out, properly made ghee resists rancidity far better than butter or most oils. Stored thoughtfully, a jar will happily last up to a year — though in most homes it never gets the chance.",
      "The three rules are simple. First, always use a clean, completely dry spoon. Water is the only real enemy of ghee; even a drop introduces moisture that can cause spoilage at the jar's edge. Second, keep the jar away from the stove — heat cycles degrade aroma faster than anything else. A cool, dark cupboard is ideal. Third, close the lid promptly; ghee absorbs neighbouring kitchen odours with enthusiasm.",
      "Refrigeration is optional. It extends life slightly but makes the ghee rock-hard and dulls the aroma. In Indian summer conditions, a cool cupboard with good habits beats a fridge with careless ones. If your kitchen regularly crosses 35°C in summer, the fridge is the safer bet for long storage.",
      "How do you know ghee has gone past its prime? Trust your nose. Fresh ghee smells nutty and caramel-sweet. A stale, paint-like or sour smell means oxidation has won — time for a new jar. Any discolouration at the surface or visible moisture is a second signal.",
      "One last habit worth adopting: finish a jar within two to three months of opening. Not because it will spoil, but because ghee this fresh deserves to be eaten at its best — and a monthly jar rhythm is the easiest way to guarantee it.",
    ],
  },
  {
    slug: "soaking-almonds-myth-truth",
    title: "Soaking Almonds Overnight: Grandmother's Rule or Nutrition Myth?",
    category: "Wellness",
    excerpt: "The one habit every Indian household swears by — examined honestly. What soaking changes, what it doesn't, and how to do it right.",
    image: IMG.dryFruits.almonds2,
    author: "Team NANDINI",
    date: "2026-07-10",
    readTime: "5 min read",
    content: [
      "Few food habits survive in Indian households as tenaciously as soaking almonds overnight. Your grandmother insisted; your mother continued; you probably do it too. But does the water actually do anything — or is this tradition wearing the costume of science?",
      "The honest answer: soaking does something, but less dramatically than folklore suggests. Soaking softens the almond's skin and may make some nutrients marginally easier to absorb, and the softened texture is genuinely easier on digestion for some people, especially children and older family members. The tannins in the skin — responsible for slight bitterness — leach into the water, which is why soaked almonds taste milder and sweeter.",
      "What soaking does not do: release 'locked enzymes' in the mystical quantities some wellness posts claim, or transform the almond's fundamental nutrition. An almond is an excellent food raw; it remains an excellent food soaked. The habit earns its place for texture and taste as much as anything else.",
      "If you do soak, do it well: eight to twelve hours in room-temperature water, no more (they ferment), then peel if you prefer the milder taste and eat them fresh. Discard the soaking water. Soaked almonds keep for a day in the fridge — longer and they spoil.",
      "Our suggestion: start with genuinely good almonds. No soaking method rescues a stale nut, and a fresh, current-season almond barely needs excuses. The habit your grandmother kept alive works best on ingredients worthy of it.",
    ],
  },
  {
    slug: "anjeeer-ka-halwa-recipe",
    title: "Anjeer Ka Halwa: The Winter Recipe Worth the Patience",
    category: "Recipes",
    excerpt: "Afghani figs, NANDINI ghee and forty quiet minutes — the halwa that converts sceptics into tradition-keepers. Full recipe inside.",
    image: IMG.lifestyle.kitchen1,
    author: "Team NANDINI",
    date: "2026-06-22",
    readTime: "7 min read",
    content: [
      "Every Indian winter dessert has a texture it is chasing — and anjeer ka halwa chases the most unusual one: a jammy, seed-flecked, almost chewy richness that no besan or suji halwa can imitate. It is also, quietly, one of the easiest 'impressive' halwas once you accept its one demand: patience.",
      "Begin the night before. Soak 250 g of Afghani anjeer in just-enough warm water — they should plump, not swim. By morning they will be swollen and soft, ready to be ground into a coarse paste with a splash of the soaking water. Do not purée them; the seed-crunch is the point.",
      "Now the ghee. Heat 4 tablespoons of NANDINI A2 ghee in a heavy kadhai, add the fig paste, and stir. For the next twenty-five minutes your only job is stirring and medium flame — the paste will darken, sweeten, and begin to release its own stickiness from the pan's edge. This stage cannot be rushed; halwa rewards those who stay.",
      "When the paste glistens and pulls away from the kadhai, add warm milk a little at a time (about half a cup), stirring until absorbed each time. Finish with a spoon more ghee, slivered almonds and pistachios, and a pinch of cardamom. Some households fold in khoya for extra richness — traditional and welcome.",
      "Serve warm. Then make it again next weekend; this halwa has a way of becoming an appointment. And when someone asks why it tastes so much better than the mithai shop's — tell them the truth: it's the ghee, and the forty minutes nobody else was willing to spend.",
    ],
  },
  {
    slug: "reading-a-ghee-label",
    title: "Reading a Ghee Label Like a Pro: 7 Things to Check",
    category: "Ghee",
    excerpt: "'A2', 'cultured', 'bilona', 'danedar' — the label words that matter, the ones that don't, and the one test you can do at home.",
    image: IMG.ghee.trad1,
    author: "Team NANDINI",
    date: "2026-06-05",
    readTime: "5 min read",
    content: [
      "Ghee labels have become vocabulary tests. A2, grass-fed, cultured, bilona, Vedic, wood-pressed — some of these words carry real meaning, others are decoration. Here is the decoder ring.",
      "Words that matter: 'Cultured' means the ghee was made from curd rather than cream — the traditional route, with real flavour consequences. 'Bilona' means hand-churned after culturing. 'A2' refers to the beta-casein protein type of the milk (from indigenous desi cows rather than foreign breeds) — relevant to some people's digestion preferences, though it is a milk property, not a ghee property. 'Danedar' or 'grainy' signals slow cooling and proper making.",
      "Words that mean little: 'Vedic' (a vibe, not a method), 'premium' (says who?), 'pure' (the FSSAI already insists). 'Grass-fed' is meaningful where it can be verified — we name our farms — and decorative where it cannot.",
      "The home test: put a spoonful of ghee on your palm. Good ghee melts quickly and evenly and smells nutty-sweet. If it smells flat or greasy, the maker rushed the simmer or the stock is old. Then check the jar: a batch number and a made-on date should be printed — a brand that dates its batches is a brand that expects its ghee to be eaten fresh.",
      "Finally, do the arithmetic we mentioned in our bilona explainer: roughly 25–30 litres of milk go into a litre of true bilona ghee. If a 'bilona' jar costs dramatically less than that arithmetic allows, someone in the story is missing.",
    ],
  },
  {
    slug: "building-a-gift-hamper",
    title: "The Art of the Indian Gift Hamper: What Goes In and Why",
    category: "Indian Traditions",
    excerpt: "From til-dhan customs to modern unboxing rituals — how we design hampers that say more than 'greetings of the season'.",
    image: IMG.hampers.hamper4,
    author: "Team NANDINI",
    date: "2026-05-18",
    readTime: "6 min read",
    content: [
      "The gift hamper is India's oldest curated product. Long before 'curation' became a word, households assembled thalis of til, gur, dry fruits and ghee for weddings, births and festivals — each item chosen for what it wished upon the receiver: sweetness, prosperity, strength, health. When we design a NANDINI hamper, we are continuing that grammar.",
      "Our first rule: every item must be eatable-within-days good, not decorative-filler good. Nothing pads a NANDINI hamper. The second rule: structure the unboxing in layers — something golden first (ghee, our hero), then the nuttery middle (pistachios, cashews, almonds), then the sweet close (dates, anjeer). The eye travels the way the meal would.",
      "The container must earn its keep after the contents are gone. That is why our boxes are keepsakes — forest-green rigid board, brass clasps, foil-embossed emblems. We have seen customers use them for jewellery, documents, and one memorable report: a sewing kit.",
      "The hand-written note is the part nobody forgets. We ask every hamper customer for a message at checkout, write it by hand on cotton paper, and wax-stamp it. In an era of printed everything, sixty seconds of handwriting has become the most premium component we ship.",
      "If you are building your own hamper with our Build-Your-Own tool: start with one golden item, two textures, one sweetness, and one surprise. The same grammar, your intentions. It works for a ₹1,500 thank-you as well as it does for a ₹7,000 Diwali signature.",
    ],
  },
  {
    slug: "dry-fruit-grades-explained",
    title: "W240, Mamra, Jumbo: What Dry Fruit Grades Actually Mean",
    category: "Dry Fruits",
    excerpt: "The alphabet soup on premium packs decoded — so you know exactly what you're paying for when the price doubles.",
    image: IMG.dryFruits.cashews2,
    author: "Team NANDINI",
    date: "2026-04-30",
    readTime: "6 min read",
    content: [
      "Buy cashews anywhere serious and you will meet 'W240'. Order pistachios and you will hear 'naturally split'. Ask for almonds and someone will offer 'Mamra' at triple the price. These aren't marketing fluff — they are real grades from real grading systems, and knowing them is the difference between paying for quality and paying for adjectives.",
      "Cashew grades are simple arithmetic: W means 'whole', and the number is the approximate count of kernels per pound. W180 are the giants; W240 are large, beautiful and the sweet spot of price and presence; W320 are the everyday workhorses. Halwais quietly specify W240 for kaju katli because size means fewer breaks and a cleaner set.",
      "Pistachios split naturally on the tree when the kernel outgrows the shell — a sign of full maturity. 'Naturally split' means no mechanical cracking, which also means the shell edges are clean and the kernel inside completed its season. Machine-forced splits often hide small, underripe kernels.",
      "Mamra almonds are a genuine rarity — under 4% of world production, from a few high-altitude Iranian valleys. Smaller and less uniform than California almonds, they are sweeter and oilier. People who know them buy them for taste, not looks. Medjool dates graded 'jumbo' simply means size — but in Medjool, size and moisture travel together, which is why jumbo tastes so much richer.",
      "The lesson across all of them: grades reward the buyer who asks. Every NANDINI pack prints its grade on the label — not because regulations require it, but because a brand confident in its sourcing has nothing to blur.",
    ],
  },
  {
    slug: "behind-the-name-nandini",
    title: "Behind the Brand: Why We Named It NANDINI",
    category: "Behind the Brand",
    excerpt: "A cow named after a river, a village that kept its promises, and the day we decided premium should mean honest. The founding story.",
    image: IMG.farm.cow2,
    author: "Founders",
    date: "2026-04-12",
    readTime: "8 min read",
    content: [
      "NANDINI was born in a kitchen in Jodhpur with a very ordinary complaint: we could not buy ghee that tasted like the one at home. Our grandmother's ghee came from a neighbour's cow, made twice a month, gone in a week. Everything on the shelf tasted manufactured — technically ghee, spiritually nothing.",
      "The name came first, the way names do. Nandini — in our family's telling, the name of the cow that supplied three generations of our ghee, herself named after the divine cow of folklore that grants every wish asked of her with a generous heart. We did not want a brand that sounded like a factory. We wanted a name that sounded like a promise.",
      "The first year was humbling. We made eleven batches before one met our grandmother's standard — she tasted batch number nine and said, 'this is close, but the aroma wants patience'. Batch eleven got a slow nod. That nod is our quality manual to this day.",
      "We chose Rajasthan deliberately. The state's pastoral traditions — the Raika shepherds, the indigenous cow breeds, the stubborn knowledge of arid-land dairy — are a living craft, not a museum piece. Our partner farms around Jodhpur and Pushkar keep Gir, Tharparkar and Rathi cows the old way: calves first, pasture always, no tethering to milking machines.",
      "Five years on, the promise has not changed: make it the way home made it, price it honestly, date every jar, and answer every customer message like a neighbour. A cow named Nandini would approve — or she would slow-nod, and we would try again.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/* ── FAQs ── */
export const FAQ_CATEGORIES = [
  {
    name: "Orders",
    faqs: [
      { q: "How can I place an order?", a: "Browse the shop, select your product and weight variant, and click Add to Cart. Proceed to checkout, enter your delivery details and payment method, and place the order. You will receive an order confirmation on email and WhatsApp within minutes." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or cancelled within 4 hours of being placed, as long as they have not been packed. Contact our support team on WhatsApp or email with your order number and we will help." },
      { q: "How can I track my order?", a: "Use the Track Order page and enter your order number with the registered email or mobile number. You will see a live timeline from order placed to delivered. We also send updates at every stage by email and WhatsApp." },
      { q: "Do you offer bulk or corporate orders?", a: "Yes. We regularly fulfil corporate gifting orders of 25–2,000 hampers with volume pricing, GST invoicing and dedicated support. Write to us via the contact page or WhatsApp for a quotation." },
    ],
  },
  {
    name: "Shipping",
    faqs: [
      { q: "How long does delivery take?", a: "Metro cities: 2–4 working days. Other cities: 3–6 working days. Remote pincodes may take up to 7 days. Ghee ships with extra cushioning in summer months to protect it from heat." },
      { q: "Do you charge for shipping?", a: "Orders above ₹999 ship free across India. Below that, a flat ₹99 shipping fee applies. Free-shipping progress is always visible in your cart." },
      { q: "Do you ship across India?", a: "Yes, we deliver to 27,000+ pincodes across India. A few remote pincodes may be served by India Post with slightly longer timelines." },
      { q: "What if my package arrives damaged?", a: "Send us a photo within 48 hours of delivery via WhatsApp or email. We will replace the damaged item or refund it fully — no return pickup needed for minor damage cases." },
    ],
  },
  {
    name: "Payments",
    faqs: [
      { q: "What payment methods do you accept?", a: "UPI, all major credit and debit cards (Visa, Mastercard, RuPay), net banking, wallets, and Cash on Delivery on orders up to ₹5,000." },
      { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available on orders up to ₹5,000 across serviceable pincodes. A ₹49 handling fee applies to COD orders to keep our pricing fair for prepaid customers." },
      { q: "Is my payment information secure?", a: "Payments are processed by a PCI-DSS compliant payment gateway over encrypted connections. We never store your card details on our servers. See our Security page for details." },
      { q: "Do you offer coupons or discounts?", a: "First-time customers receive a welcome offer on signup. We also run festive promotions announced via the newsletter and notification centre — subscribe to hear first." },
    ],
  },
  {
    name: "Ghee",
    faqs: [
      { q: "How should I store ghee?", a: "Store in a cool, dark cupboard away from the stove, always use a clean dry spoon, and close the lid promptly. Refrigeration is optional. Unopened jars last up to 12 months; opened jars are best finished within 2–3 months." },
      { q: "What is the difference between A2 and regular ghee?", a: "A2 refers to the beta-casein protein in the milk, which comes from indigenous desi cow breeds like Gir and Tharparkar. Many people prefer A2 for digestibility and taste. All NANDINI cow ghee is made from A2 milk of desi breeds." },
      { q: "Why does my ghee look grainy (danedar)?", a: "Grainy texture is the signature of properly made, slow-cooled ghee — a mark of quality, not a defect. It melts instantly on a warm roti or in a hot kadhai. Smooth-set ghee simply cooled differently." },
      { q: "Is your ghee lactose-free?", a: "Ghee naturally contains negligible lactose and milk proteins because they are removed during slow cooking. Most lactose-intolerant customers enjoy our ghee comfortably, though we recommend consulting your doctor for severe allergies." },
    ],
  },
  {
    name: "Dry Fruits",
    faqs: [
      { q: "Are your dry fruits roasted or raw?", a: "All our dry fruits are raw unless the product name says roasted — like our Iranian pistachios. Raw nuts let you toast fresh at home for maximum aroma." },
      { q: "How should I store dry fruits?", a: "Keep them in their resealable pouch in a cool, dry place, or transfer to airtight containers. Walnuts last longer refrigerated. Avoid storing near strong-smelling spices — nuts absorb odours." },
      { q: "Where do you source your dry fruits from?", a: "Almonds from California, cashews from Panruti (Tamil Nadu), pistachios from Rafsanjan (Iran), walnuts from Anantnag (Kashmir), dates from the Medjool belt, anjeer from Kandahar (Afghanistan) and raisins from Nashik (Maharashtra). Each pack states its origin." },
      { q: "Do your dry fruits contain added sugar or preservatives?", a: "No. Our raw dry fruits contain nothing but the fruit itself. The only exceptions are stated on the label — for example our cranberries contain a touch of sugar for tartness balance." },
    ],
  },
  {
    name: "Returns",
    faqs: [
      { q: "What is your return policy?", a: "Food products cannot be returned once opened, for safety reasons. If an item arrives damaged, leaking or incorrect, contact us within 48 hours with photos and we will replace or refund it fully." },
      { q: "How do refunds work?", a: "Approved refunds reach your original payment method within 5–7 working days. For COD orders, refunds go to your bank account via UPI or IMPS after a quick verification call." },
      { q: "What if I don't like the taste of a product?", a: "Taste is personal, and we would rather have your trust than your money. If a product genuinely disappointed you, write to us — first-time customers get a one-time taste guarantee credit." },
    ],
  },
  {
    name: "Storage",
    faqs: [
      { q: "How long do your products last?", a: "Ghee: 12 months unopened, 2–3 months after opening. Dry fruits: 6–9 months in airtight storage, longer refrigerated. Every pack carries a made-on and best-before date so you always know." },
      { q: "Can ghee melt in summer transit?", a: "Ghee may partially melt above 30°C in transit — this is completely natural and does not affect quality. It resets on cooling. We add thermal padding to ghee orders in peak summer." },
      { q: "Should walnuts be refrigerated?", a: "Walnuts' healthy oils are delicate, so refrigeration extends their freshness considerably — especially after opening. They keep 3+ months refrigerated versus 6–8 weeks at room temperature." },
    ],
  },
] as const;

/* ── Initial notifications (seeded for demo) ── */
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1", type: "order", title: "Order #NG1024 has been shipped",
    body: "Your Traditional Bilona A2 Cow Ghee (500 ml) is on its way. Expected in 2 days.",
    timestamp: "2 hours ago", read: false, href: "/track-order",
  },
  {
    id: "n2", type: "stock", title: "Premium Iranian Pistachios are back in stock",
    body: "The 500 g pack you were waiting for is available again — fresh harvest, limited stock.",
    timestamp: "6 hours ago", read: false, href: "/product/premium-iranian-pistachios-roasted-salted",
  },
  {
    id: "n3", type: "wishlist", title: "Wishlist price drop — 10% off",
    body: "Kesar Saffron-Infused Ghee from your wishlist is now ₹999 (was ₹1,099).",
    timestamp: "1 day ago", read: false, href: "/product/kesar-saffron-ghee",
  },
  {
    id: "n4", type: "offer", title: "Festive early-bird offer",
    body: "Book any gift hamper 30+ days before Diwali and get a complimentary brass diya.",
    timestamp: "2 days ago", read: true, href: "/shop/gift-hampers",
  },
  {
    id: "n5", type: "product", title: "New: Wood-Fired A2 Gir Cow Ghee",
    body: "Small batch of 40 jars a week, hand-numbered. Now live on the shop.",
    timestamp: "3 days ago", read: true, href: "/product/a2-gir-cow-ghee-wood-fired",
  },
  {
    id: "n6", type: "account", title: "Welcome to the NANDINI family",
    body: "Your account is ready. Explore bestsellers, track orders and manage your wishlist in one place.",
    timestamp: "1 week ago", read: true, href: "/account",
  },
];

/* ── Popular searches ── */
export const POPULAR_SEARCHES = ["Bilona Ghee", "Almonds", "Gift Hamper", "Pistachios", "A2 Ghee", "Dates", "Anjeer"];
