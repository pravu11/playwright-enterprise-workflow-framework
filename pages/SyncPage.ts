import { Page } from '@playwright/test';
import { appConstants } from '../constants/appConstants';

export class SyncPage {

  constructor(private page: Page) { }

  async navigate() {

    await this.page.goto(appConstants.urls.syncPage);
  }

async enterOrderNumber(orderNumber: string) {

  const input =
    this.page.locator(
      appConstants.syncPage.orderInput
    );

  await input.click();

  await input.fill('');

  await input.pressSequentially(
    orderNumber,
    { delay: 100 }
  );

  await input.press('Enter');

  await this.page.waitForTimeout(1500);
}

async clickSyncOrResync() {

  const syncNow = this.page.locator(
    appConstants.syncPage.syncNowButton
  );

  const resync = this.page.locator(
    appConstants.syncPage.reSyncButton
  );

  await this.page.waitForTimeout(2000);

  // 🔥 EXISTING ORDER
  if (await resync.isVisible().catch(() => false)) {

    console.log('👉 Resyncing existing order');

    await resync.click();

    return true;
  }

  // 🔥 NEW ORDER
  if (await syncNow.isVisible().catch(() => false)) {

    console.log('👉 Syncing new order');

    await syncNow.click();

    return true;
  }

  console.log(
    '⚠️ No Sync/ReSync button for this order'
  );

  return false;
}

  async validateSyncResult(
  orderNumber: string
): Promise<
  'success' |
  'validation' |
  'modified' |
  'failed'
> {

    console.log('⏳ Waiting for sync result...');

    const toast = this.page.locator(
      appConstants.syncPage.toastMessage
    );

    // wait for toast
    await toast.waitFor({
      state: 'visible',
      timeout: 15000
    });

    const text = await toast.innerText();

    console.log(`🔍 Sync Result: ${text}`);

    const lowerText = text.toLowerCase();

    await this.page.waitForTimeout(2000);

    // VALIDATION
    if (lowerText.includes('validation')) {

      console.log(
        `⚠️ Order ${orderNumber} has validation errors`
      );

      await this.openSyncLogs(orderNumber, 'success');

      return 'validation';
    }

// FAILURE
if (lowerText.includes('failed')) {

  console.log(
    `❌ Order ${orderNumber} sync FAILED`
  );

  const logMessage =
    await this.openSyncLogs(
      orderNumber,
      'error'
    );

  const lowerLog =
    logMessage.toLowerCase();

  // reusable order
  if (
    lowerLog.includes(
      'already modified'
    )
  ) {

    console.log(
      `♻️ Order ${orderNumber} already exists and is reusable`
    );

    return 'modified';
  }

  // execution already started/completed
  if (
    lowerLog.includes(
      'execution already started'
    )
  ) {

    console.log(
      `⛔ Order ${orderNumber} already in execution`
    );

    return 'failed';
  }

  return 'failed';
}

    // SUCCESS
    console.log(
      `✅ Order ${orderNumber} synced successfully`
    );

    return 'success';
  }

async openSyncLogs(
  orderNumber: string,
  type: 'success' | 'error'
): Promise<string> {

  console.log('🔍 Opening Sync Logs...');

  await this.page.locator(
    appConstants.syncPage.syncHistoryButton
  ).click();

  await this.page.waitForTimeout(3000);

  if (type === 'error') {

    console.log('📄 Switching to ERROR LOGS tab');

    await this.page.locator(
      appConstants.syncPage.errorTab
    ).click();

  } else {

    console.log('📄 Using SUCCESS LOGS tab');
  }

  await this.page.waitForTimeout(3000);

const rows = this.page.locator(
  'table tbody tr',
  {
    has: this.page.locator(
      `td:has-text("${orderNumber}")`
    )
  }
);

// wait for logs to refresh
await this.page.waitForTimeout(5000);

const rowCount =
  await rows.count();

if (rowCount === 0) {

    console.log(
      `⚠️ No logs found for ${orderNumber}`
    );

    return '';
  }

  const latestRow =
    rows.last();

  const comment = await latestRow
    .locator('td')
    .nth(1)
    .innerText();

  console.log(
    `🧾 Extracted Log for ${orderNumber}:\n${comment}`
  );

  return comment;
}
}
