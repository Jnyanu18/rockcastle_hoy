export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(5000);
  await page.evaluate(() => document.querySelector('#about').scrollIntoView());
  await page.waitForTimeout(4500);
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/stage.png' });
  return 'ok';
}
