export default async function run(page) {
  const out = [];
  for (const [w,h,tag] of [[1440,900,'d'],[390,844,'m']]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(6500);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    out.push({ tag, total, overflow });
    let i = 0;
    for (let y = 0; y < total && i < 14; y += h * 1.0, i++) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(900);
      await page.screenshot({ path: `shots/${tag}-${String(i).padStart(2,'0')}.png` });
    }
  }
  return out;
}
