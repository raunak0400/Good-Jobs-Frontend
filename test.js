const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  await page.evaluate(async () => {
    await openJobModal(1);
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'modal_opened.png' });

  const modalHtml = await page.evaluate(() => {
    const m = document.getElementById('gjModal');
    return m ? m.outerHTML : 'null';
  });
  console.log('Modal HTML:', modalHtml);

  await browser.close();
  console.log('Done');
})();
