import fs from 'fs';
import type { Page } from 'playwright';
import type { Configuration } from './config';

export type PageTest = (page: Page) => void | Promise<void>;

export type TestMeta = {
  name: string;
};

export type TestFile = { default: PageTest; meta: TestMeta };

export const getTestFiles = ({ dropFolder }: Configuration) => {
  return fs.readdirSync(dropFolder).filter((file) => file.endsWith('.js'));
};
