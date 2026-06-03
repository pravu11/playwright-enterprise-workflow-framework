import { defineConfig } from '@playwright/test';

export default defineConfig({

 reporter: [
    ['html', { open: 'never' }],  // generate report but don't auto-open
    ['list']                      // console logs
  ],

    timeout: 120000,

use: {
  baseURL: process.env.BASE_URL || 'https://example-app.com',
  browserName: 'chromium',
  channel: 'msedge',
  headless: true,
   actionTimeout: 15000,
    navigationTimeout: 60000,
   viewport: null,
  launchOptions: {
    args: ['--start-maximized']
  },
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},


projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
    use: {
      storageState: undefined
    }
  },
  {
    name: 'tests',
    dependencies: ['setup'],
  }
]
});
