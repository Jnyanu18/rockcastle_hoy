export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(22000);
  await page.evaluate(() => document.querySelector('.rcf-insta__title').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(6000);
  await page.screenshot({ path: 'shots/ig.png' });
  return 'ok';
}
