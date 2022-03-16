import json5 from 'json5';
import fs from 'node:fs';
import type { BrowserContextOptions, LaunchOptions } from 'playwright';

export type Configuration = {
  env: Record<string, string | number | boolean>;
  dropFolder: string;
  browser: LaunchOptions;
  testContext: BrowserContextOptions;
  test: {
    timeout: number;
  };
};

export function readConfig(path = './config.jsonc'): string {
  return fs.readFileSync(path, 'utf8');
}

export function parseConfig(text: string): Configuration {
  return json5.parse(text) as Configuration;
}