export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(22000);
  const out = [];
  await page.evaluate(() => document.querySelector('.rcf-insta__title').scrollIntoView({ block: 'center' }));
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, i % 2 ? -40 : 40);
    await page.waitForTimeout(1500);
    out.push(await page.evaluate(() => { const s = document.querySelector('.rcf-ig').closest('section'); const r = s.getBoundingClientRect(); return [s.className, Math.round(r.top), Math.round(r.height)]; }));
  }
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'shots/ig.png' });
  return out;
}
