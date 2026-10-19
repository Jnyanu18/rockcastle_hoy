export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(16000);
  const out = [];
  let i = 0;
  for (const f of [0.05, 0.2, 0.32, 0.5, 0.68]) {
    const info = await page.evaluate((f) => {
      const c = document.querySelector('#services .scrollContainer');
      const y = c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight) * f;
      window.scrollTo(0, y);
      return { y, h: c.offsetHeight };
    }, f);
    await page.waitForTimeout(2500);
    out.push({ f, ...info, now: await page.evaluate(() => scrollY) });
    await page.screenshot({ path: `shots/deck-${i++}.png` });
  }
  return out;
}
