export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(16000);
  const y = await page.evaluate(() => { const c = document.querySelector('#services .scrollContainer'); return c.getBoundingClientRect().top + scrollY; });
  for (let k = 6; k >= 0; k--) { await page.evaluate((v) => window.scrollTo(0, v), y - k * 150 + 120); await page.waitForTimeout(500); }
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'shots/deck-first.png' });
  return y;
}
