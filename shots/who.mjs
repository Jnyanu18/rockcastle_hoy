export default async function run(page) {
  const out = [];
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(22000);
    await page.evaluate(() => { const e = document.querySelector('#about'); window.scrollTo(0, e.getBoundingClientRect().bottom + scrollY - innerHeight); });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: `shots/who-${tag}.png` });
  }
  return out;
}
