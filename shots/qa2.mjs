export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(7000);
  const ids = ['#about','#stats','#recent-experiences','#contact'];
  let i=0;
  for (const sel of ids) {
    await page.evaluate((s)=>{const e=document.querySelector(s); if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY)}, sel);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `shots/e-${i++}.png` });
  }
  return 'ok';
}
