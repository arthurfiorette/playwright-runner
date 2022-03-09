import { Browser, chromium } from 'playwright';
import type { Configuration } from './config';

export function createBrowser(config: Configuration): Promise<Browser> {
  return chromium.launch(config.browser);
}

export function createTestContext(config: Configuration, browser: Browser) {
  return browser.newContext(config.testContext);
}
