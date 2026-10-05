import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const root = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const output = '.impeccable/review';
await mkdir(output, { recursive: true });
const results = [];
const errors = [];
try {
  for (const width of [360, 390, 768, 1440, 1600]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    // Block all external submissions even if the configuration is changed later.
    await page.route('https://formsubmit.co/**', (route) => route.abort());
    await page.goto(root);
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].filter((img) => !img.closest('dialog')).every((img) => img.complete && img.naturalWidth > 0));
    const metrics = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heading: getComputedStyle(document.querySelector('h1')).fontSize,
      body: getComputedStyle(document.body).fontSize,
      assets: [...document.images].filter((img) => !img.closest('dialog')).map((img) => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight })),
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(width);
    await expect(page.getByRole('tab')).toHaveCount(3);
    await page.getByRole('tab').first().focus();
    await page.keyboard.press('End');
    await expect(page.getByRole('tab').last()).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toContainText('Arquitectura Digital');
    await page.keyboard.press('Home');
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('tab').nth(1)).toBeFocused();
    await page.keyboard.press('ArrowUp');
    for (const title of ['Forma / Galería digital', 'Senda / Historias en movimiento', 'Umbral / Nuevos mundos']) {
      const trigger = page.getByRole('button', { name: `Ver ficha de ${title}`, exact: true });
      await trigger.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog').getByRole('heading', { name: title })).toBeVisible();
      const projectId = await trigger.getAttribute('data-project');
      await expect.poll(() => page.locator('#dialog-image').evaluate((image, id) => image.complete && image.currentSrc.includes(`/assets/${id}`), projectId)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(trigger).toBeFocused();
    }
    if (width < 768) {
      const menu = page.getByRole('button', { name: 'Menú' });
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Contacto', exact: true }).click();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await menu.click();
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
    }
    await expect(page.getByRole('button', { name: 'Enviar mensaje' })).toBeDisabled();
    await expect(page.locator('#contact-form')).not.toHaveAttribute('action', /formsubmit/);
    await page.locator('#name').fill('Prueba local');
    await page.locator('#email').fill('prueba@example.com');
    await page.locator('#message').fill('Verificación local sin enviar.');
    await page.evaluate(() => document.querySelector('#contact-form').requestSubmit());
    await expect(page.locator('#form-status')).toContainText('Tu mensaje no se ha enviado');
    await page.locator('#contact-form').evaluate((form) => form.reset());
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    const anchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.hash).filter((hash) => !document.getElementById(hash.slice(1))));
    expect(anchors).toEqual([]);
    await page.evaluate(() => { document.activeElement.blur(); window.scrollTo(0, 0); });
    await page.screenshot({ path: `${output}/${width === 1440 ? 'desktop' : width === 390 ? 'mobile' : `width-${width}`}.png`, fullPage: true });
    results.push(metrics);
    await page.goto(new URL('gracias/', root).href);
    await expect(page.getByRole('heading', { name: 'Una conversación. Muchas posibilidades.' })).toBeVisible();
    await page.getByRole('link', { name: 'Volver al estudio' }).click();
    await expect(page.locator('h1')).toContainText('Buenas ideas');
    await context.close();
  }
  // No-JavaScript visitors can read the site; the unconfigured form stays blocked.
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const page = await context.newPage();
  await page.goto(root);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#nav-links')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enviar mensaje' })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await context.close();
  expect(errors).toEqual([]);
  await writeFile(`${output}/verification.json`, JSON.stringify({ results, errors, externalMessagesSent: 0 }, null, 2));
  console.log('PASS: 360, 390, 768, 1440 y 1600 px; teclado, menú, pestañas, diálogos, formulario bloqueado, recursos, gracias y sin JS.');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}

