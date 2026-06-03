import { Page } from '@playwright/test';
import { appConstants }
  from '../../constants/appConstants';

export class DuplicatePanelPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async duplicatePanelsForFirstFiveSamples() {

    console.log(
      '🧩 Starting Duplicate Panel Flow'
    );

    const samples =
      this.page.locator(
        appConstants.manageOrder.sampleRows
      );

    const sampleCount =
      await samples.count();

    const limit =
      Math.min(sampleCount, 5);

    console.log(
      `🧪 Processing ${limit} sample(s)`
    );

    for (let i = 0; i < limit; i++) {

      const sample =
        samples.nth(i);

      // click sample
      await sample.click();

      await this.page.waitForTimeout(1000);

      // current sample row
      const selectedPanel =
        this.page.locator(
          appConstants.manageOrder.panelRows
        ).first();

      const originalPanelId =
        (
          await selectedPanel
            .locator('span')
            .first()
            .textContent()
        )?.trim();

      console.log(
        `📦 Original Panel: ${originalPanelId}`
      );

      // duplicate icon
      const duplicateIcon =
        selectedPanel.locator(
          appConstants.manageOrder.duplicatePanelIcon
        );

      await duplicateIcon.click();

      // wait popup
      await this.page.locator(
        appConstants.manageOrder.duplicatePopup
      ).waitFor({
        state: 'visible'
      });

      console.log(
        '📄 Duplicate popup opened'
      );

      // select all checkbox
      await this.page.locator(
        appConstants.manageOrder.duplicateSelectAll
      ).first().check();

      // duplicate
      await this.page.click(
        appConstants.manageOrder.duplicateButton
      );

      // success toast
      await this.page.locator(
        appConstants.manageOrder.duplicateSuccessToast
      ).last().waitFor({
        state: 'visible',
        timeout: 15000
      });

      console.log(
        '✅ Duplicate success toast displayed'
      );

      // wait for UI refresh
      await this.page.waitForTimeout(3000);

      console.log(`✅ Duplicate created successfully for ${originalPanelId}`);
    }
  }
}