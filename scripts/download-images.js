/**
 * Download selected images and convert to optimized webp via sharp.
 * Selection avoids watermarked stock sources (Alamy/Shutterstock/etc.)
 */
const sharp = require("/home/z/my-project/node_modules/sharp");
const fs = require("fs");
const path = require("path");

const BASE = "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/";
const OUT_DIR = "/home/z/my-project/public/images";

// name -> { file, width }  (file = hash in search results)
const PLAN = [
  // heroes
  ["hero-ghee-jar", "5097c750dd8f.jpg", 1800],
  ["hero-rajasthan", "ce2e8d8e338d.jpg", 1920],
  // cows / farm
  ["cow-farm-1", "f864f2be8bb4.jpg", 1400],
  ["cow-farm-2", "50a5165863b4.jpg", 1200],
  ["cow-farm-3", "af3ce0c3c6dc.jpg", 1400],
  // bilona process
  ["bilona-1", "3b2f0e5c4d75.jpg", 1400],
  ["bilona-2", "ebc1d5fcd103.jpg", 1400],
  ["bilona-milk", "f864f2be8bb4.jpg", 1200],
  ["bilona-curd", "ebc1d5fcd103.jpg", 1200],
  ["bilona-butter", "afc0e049d20b.jpg", 1200],
  ["bilona-slowcook", "7499b6c9206b.jpg", 1400],
  ["bilona-ghee", "d999fc784339.jpg", 1400],
  // ghee jars (product shots)
  ["ghee-jar-1", "89d6ae576b13.jpg", 1200],
  ["ghee-jar-2", "20888c492946.png", 1200],
  ["ghee-jar-3", "14d79bb9dcd4.jpg", 1200],
  ["ghee-jar-4", "7c58aa690d52.webp", 1200],
  ["ghee-jar-5", "ba8ad6edd7c3.jpg", 1200],
  ["ghee-jar-6", "cf1d99eeb469.png", 1200],
  ["ghee-jar-7", "1ec6c2c602a4.jpg", 1400],
  ["ghee-jar-8", "99aaa8d6a798.jpg", 1200],
  // ghee trad secondary
  ["ghee-trad-1", "2729x2127", 0], // placeholder, replaced below
];

const REST = [
  ["ghee-trad-1", "1ec6c2c602a4.jpg", 1400],
  ["ghee-trad-2", "99aaa8d6a798.jpg", 1200],
  ["ghee-trad-3", "0d9f408c7fe1.jpg", 1200],
  ["ghee-trad-4", "5097c750dd8f.jpg", 1200],
  ["ghee-trad-5", "8ffe206a84bd.jpg", 1200],
  ["ghee-trad-6", "f8e7b8ae688e.jpg", 1200],
  ["ghee-spoon-1", "d999fc784339.jpg", 1200],
  ["ghee-spoon-2", "afc0e049d20b.jpg", 1200],
  ["almonds-1", "8dcdec7fa886.jpg", 1200],
  ["almonds-2", "8adf0339cef6.jpg", 1200],
  ["almonds-3", "d9b7b9230230.webp", 1200],
  ["cashews-1", "dc5158734755.jpg", 1200],
  ["cashews-2", "4a8401b6637e.jpg", 1200],
  ["cashews-3", "3b020be7c3b7.jpg", 1200],
  ["pistachios-1", "6a9e43908f7c.webp", 1200],
  ["pistachios-2", "0bb922294d17.png", 1200],
  ["pistachios-3", "2f64df83adc3.jpg", 1200],
  ["walnuts-1", "95f985afa4ff.jpg", 1200],
  ["walnuts-2", "8c2589492ba6.jpeg", 1200],
  ["walnuts-3", "95f985afa4ff.jpg", 1400],
  ["dates-1", "d12cf200d9c6.jpg", 1200],
  ["dates-2", "559215c6f146.jpg", 1200],
  ["dates-3", "a6433ceb6982.webp", 1200],
  ["anjeer-1", "7f4159afe3ea.jpg", 1200],
  ["anjeer-2", "fee434d3d1c7.jpg", 1200],
  ["anjeer-3", "e32e00f2b7eb.jpg", 1200],
  ["raisins-1", "db1aa0d59236.jpg", 1200],
  ["raisins-2", "fd6159957416.jpg", 1200],
  ["raisins-3", "1b4cc8b3261b.jpg", 1200],
  ["mixed-1", "1f5c95fcbb15.webp", 1200],
  ["mixed-2", "c61fae171394.jpg", 1200],
  ["mixed-3", "a0526b65ff8c.jpg", 1200],
  ["hazelnut-1", "6051ebe668ab.jpg", 1200],
  ["cranberry-1", "ce9dd3e1a1aa.jpg", 1200],
  ["mamra-1", "cd17d6ab99fd.png", 1200],
  ["hamper-1", "80b20bc61c64.jpg", 1200],
  ["hamper-2", "77c3365cca9b.jpg", 1200],
  ["hamper-3", "04fa8ddf9e62.jpg", 1200],
  ["hamper-4", "1b521faf09c6.png", 1200],
  ["hamper-5", "7ccdda119d4d.jpg", 1200],
  ["hamper-6", "b530e072d097.jpg", 1200],
  ["hamper-7", "87fdf9170b49.jpg", 1200],
  ["hamper-8", "b2aed62d7057.jpg", 1200],
  ["kitchen-1", "7499b6c9206b.jpg", 1400],
  ["kitchen-2", "6fda65b4f5c3.jpeg", 1400],
  ["kitchen-3", "81227ac19a79.jpg", 1200],
  ["roti-1", "c48aaaa0ba08.jpg", 1200],
  ["roti-2", "c0c383605f18.jpg", 1400],
  ["roti-3", "e50976a23173.jpg", 1200],
];

const ALL = [...PLAN.filter((p) => p[2] !== 0), ...REST];

async function processOne([name, file, width]) {
  const outPath = path.join(OUT_DIR, `${name}.webp`);
  if (fs.existsSync(outPath)) return `skip: ${name}`;
  const url = BASE + file;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return `FAIL(${res.status}): ${name}`;
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outPath);
    return `ok: ${name} (${Math.round(buf.length / 1024)}KB in)`;
  } catch (e) {
    return `ERR: ${name} ${e.message?.slice(0, 60)}`;
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const concurrency = 6;
  let idx = 0;
  const results = [];
  async function worker() {
    while (idx < ALL.length) {
      const item = ALL[idx++];
      results.push(await processOne(item));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  results.forEach((r) => console.log(r));
  console.log(`DONE ${results.filter((r) => r.startsWith("ok") || r.startsWith("skip")).length}/${ALL.length}`);
})();
