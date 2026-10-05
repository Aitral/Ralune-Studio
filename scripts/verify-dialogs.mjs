import { chromium, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => document.fonts.ready);
  for (const id of ['forma', 'senda', 'umbral']) {
    await page.locator(`[data-project="${id}"]`).click();
    const image = page.locator('#dialog-image');
    await expect.poll(() => image.evaluate((img, projectId) => img.complete && img.naturalWidth > 0 && img.currentSrc.includes(`/assets/${projectId}`), id)).toBe(true);
    const currentSrc = await image.evaluate((img) => img.currentSrc);
    results.push({ project: id, currentSrc, correct: true });
    await page.screenshot({ path: `.impeccable/review/dialog-${id}.png` });
    await page.keyboard.press('Escape');
    await expect(page.locator(`[data-project="${id}"]`)).toBeFocused();
  }
  await writeFile('.impeccable/review/dialog-verification.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
