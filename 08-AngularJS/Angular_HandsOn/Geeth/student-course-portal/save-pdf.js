const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

function findChrome() {
  const envPath = process.env.CHROME_PATH || process.env.CHROME || process.env.CHROMIUM;
  if (envPath && fs.existsSync(envPath)) return envPath;

  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

(async () => {
  const url = process.argv[2] || 'http://localhost:4200';
  const output = process.argv[3] || path.join('C:', 'Users', 'geeth', 'Downloads', 'output.pdf');

  const chromePath = findChrome();
  if (!chromePath) {
    console.error('No local Chrome/Edge executable found. Set CHROME_PATH env var to the browser path.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.pdf({ path: output, format: 'A4', printBackground: true });
  await browser.close();
  console.log('Saved PDF to', output);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
