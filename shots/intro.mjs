export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(16000);
  await page.evaluate(() => document.querySelector('#recent-experiences').scrollIntoView());
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'shots/intro.png' });
  return 'ok';
}
