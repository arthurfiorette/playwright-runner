import path from 'node:path';
import type { Browser, BrowserContext } from 'playwright';
import { createBrowser, createTestContext } from '../src/browser-config';
import { interpretConfig, parseConfig, readConfig } from '../src/config';
import { getTestFiles, TestFile } from '../src/test-reader';

const rawConfig = readConfig();
const config = parseConfig(rawConfig);
let testContext!: BrowserContext;
let browser!: Browser;

interpretConfig(config);

// Before all tests, and only before, create a browser and a test context
beforeAll(async () => {
  browser = await createBrowser(config);
  testContext = await createTestContext(config, browser);
});

// Generates a test function for a given test file.
for (const testFile of getTestFiles(config)) {
  const location = path.resolve(config.dropFolder, testFile);
  const test = require(location) as TestFile;

  it(
    test.meta.name,
    async () => {
      const page = await testContext.newPage();
      await test.default(page);
      await page.close();
    },
    // Default timeout is only 5 seconds
    config.test.timeout
  );
}

// After all tests are done, close all pending connections and pages.
afterAll(async () => {
  await testContext.close();
  await browser.close();
});
