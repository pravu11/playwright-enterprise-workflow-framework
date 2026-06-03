import { Page } from '@playwright/test';
import { appConstants } from '../../constants/appConstants';

export class ManageOrderPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToManageOrder() {

    console.log(
      '📍 Navigating to Manage Application Order'
    );

    // HARD RESET
    await this.page.goto('about:blank');

    await this.page.waitForTimeout(500);

    // open Application Process
    await this.page.goto(
      appConstants.urls.appProcessPage,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    // open Manage AO
    await this.page.click(
      appConstants.manageOrder.manageAOCard,
      {
        timeout: 10000
      }
    );

    // wait for DOM
    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    // wait for UI ready
    await this.page.waitForFunction(() => {

      const el = document.querySelector(
        '#searchCriteriaCtl'
      ) as HTMLElement | null;

      return el && el.offsetParent !== null;

    }, {
      timeout: 20000
    });

    console.log('✅ Manage AO page ready');
  }

  async openSearchPanel(
    isValidationTab = false
  ) {

    console.log('📂 Opening Search Panel');

    const inputSelector = isValidationTab
      ? appConstants.manageOrder.validationSearchInput
      : appConstants.manageOrder.successSearchInput;

    const input = this.page.locator(
      inputSelector
    );

    // already open
    if (
      await input.isVisible().catch(() => false)
    ) {
      return;
    }

    const toggle = this.page.locator(
      appConstants.manageOrder.searchCriteria
    );

    const isActive =
      await toggle.getAttribute('class');

    // open only if closed
    if (!isActive?.includes('active')) {

      await toggle.evaluate((el: any) =>
        el.click()
      );
    }

    await input.waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async searchOrder(
    orderNumber: string,
    isValidationTab = false
  ): Promise<boolean> {

    console.log(
      `🔍 Searching order: ${orderNumber}`
    );

    const input = isValidationTab
      ? this.page.locator(
          appConstants.manageOrder.validationSearchInput
        )
      : this.page.locator(
          appConstants.manageOrder.successSearchInput
        );

    await input.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await input.fill(orderNumber);

    // ENTER triggers actual search
    await input.press('Enter');

    // wait for grid result
    const row = this.page.locator(
      `tr:has-text("${orderNumber}")`
    ).first();

    try {

      await row.waitFor({
        state: 'visible',
        timeout: 15000
      });

      console.log(
        `✅ Order ${orderNumber} found`
      );

      return true;

    } catch {

      console.log(
        `⚠️ Order ${orderNumber} NOT found in this tab`
      );

      return false;
    }
  }

  async clickOrderArrow(orderNumber: string) {

    console.log(
      `👉 Opening order via arrow: ${orderNumber}`
    );

    const arrow = this.page.locator(
      `#btnarrow_${orderNumber}`
    );

    await arrow.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await arrow.click({
      force: true
    });

    // wait for order page
    await this.page.waitForSelector(
      'text=Order Details',
      {
        timeout: 15000
      }
    );

    console.log(
      `✅ Order ${orderNumber} page opened`
    );
  }

  async getSyncErrorLogs(): Promise<string[]> {

    console.log(
      '📄 Opening Sync Error Logs tab'
    );

    const syncErrorTab = this.page.locator(
      appConstants.manageOrder.syncErrorLogsTab
    );

    await syncErrorTab.waitFor({
      state: 'visible',
      timeout: 10000
    });

    // real click
    await syncErrorTab.evaluate((el: any) =>
      el.click()
    );

    // wait for rows to load
    await this.page.waitForSelector(
      appConstants.manageOrder.syncErrorRows,
      {
        state: 'visible',
        timeout: 15000
      }
    );

    const rows = this.page.locator(
      appConstants.manageOrder.syncErrorRows
    );

    const count = await rows.count();

    console.log(
      `🧾 Total Sync Errors Found: ${count}`
    );

    const errors: string[] = [];

    for (let i = 0; i < count; i++) {

      const errorMessage = await rows
        .nth(i)
        .locator('td')
        .nth(2)
        .innerText();

      errors.push(
        errorMessage.trim()
      );
    }

    return errors;
  }

  async openOrder(
    orderNumber: string,
    type:
  'success' |
  'validation' |
  'modified'
  ) {

    console.log(
      `📂 Locating order: ${orderNumber}`
    );

    await this.navigateToManageOrder();

    // VALIDATION FLOW
    if (type === 'validation') {

      console.log(
        '🔄 Switching to Validation tab'
      );

      const validationTab =
        this.page.locator(
          appConstants.manageOrder.validationTab
        );

      await validationTab.waitFor({
        state: 'visible'
      });

      // real click
      await validationTab.evaluate(
        (el: any) => el.click()
      );

      // wait for validation section
      await this.page.waitForSelector(
        appConstants.manageOrder.validationSection,
        {
          state: 'visible',
          timeout: 10000
        }
      );

      // open search panel
      await this.openSearchPanel(true);

      const found =
        await this.searchOrder(
          orderNumber,
          true
        );

      if (found) {

        console.log(
          '⚠️ Found in Validation tab'
        );

        await this.clickOrderArrow(
          orderNumber
        );

        const errors =
          await this.getSyncErrorLogs();

        console.log(
          '📋 Validation Errors:',
          errors
        );

        return;
      }
    }

    // SUCCESS FLOW
    if (
  type === 'success' ||
  type === 'modified'
) {

      console.log(
        '🔄 Using Success tab'
      );

      // open search panel
      await this.openSearchPanel(false);

      const found =
        await this.searchOrder(
          orderNumber,
          false
        );

      if (found) {

        console.log(
          '✅ Found in Success tab'
        );

        await this.clickOrderArrow(
          orderNumber
        );

        return;
      }
    }

    console.log(
      `⚠️ Order ${orderNumber} not found`
    );
  }
}
