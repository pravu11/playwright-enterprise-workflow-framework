import { expect, Page } from '@playwright/test';
import { appConstants } from '../../constants/appConstants';

export class TrialSetPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openExecutionSetInfo() {

    await this.page.click(
      appConstants.manageOrder.trialSetTab
    );
  }

  async createTrialSet() {

    console.log(
      '🧪 Starting Trial Set Creation'
    );

    await this.page.click(
      appConstants.manageOrder.addTrialSetButton
    );

    const panels =
      this.page.locator(
        appConstants.manageOrder.trialPanelCheckboxes
      );

    const panelCount =
      await panels.count();

    console.log(
      `📦 Available Panels: ${panelCount}`
    );

    let panelsToSelect = 0;

    if (panelCount > 5) {
      panelsToSelect = 5;
    }
    else if (panelCount >= 3) {
      panelsToSelect = 2;
    }
    else if (panelCount === 2) {
      panelsToSelect = 1;
    }
    else {

      console.log(
        '⚠️ Only one panel available. Trial set skipped.'
      );

      return false;
    }

    for (
      let i = 0;
      i < panelsToSelect;
      i++
    ) {

      await panels
        .nth(i)
        .check();
    }

    console.log(
      `✅ Selected ${panelsToSelect} panel(s)`
    );

    console.log('🖱️ Clicking Save');
    await this.page.click(
      appConstants.manageOrder.saveTrialSetButton
    );
    console.log('⏳ Waiting for toast');

    await expect(
      this.page.locator(
        appConstants.manageOrder.trialSetSuccessToast
      )
    ).toBeVisible({
  timeout: 30000
});

    console.log(
      '✅ Trial Set Created'
    );

    return true;
  }

async verifyTrialSetCard() {

  const count =
    await this.page
      .locator(
        appConstants.manageOrder.trialSetCard
      )
      .count();

  console.log(
    `🧪 Trial Sets Found: ${count}`
  );
}

  async verifyTrialPanelIcons() {

    await this.page.click(
      appConstants.manageOrder.orderDetailsTab
    );

    const icons =
      this.page.locator(
        appConstants.manageOrder.trialPanelIcon
      );

    const count =
      await icons.count();

    console.log(
      `🧪 Trial Panel Icons Found: ${count}`
    );
  }

  async verifyTrialSetInExecution() {

    const newPagePromise =
      this.page.context().waitForEvent(
        'page'
      );

    await this.page.click(
      appConstants.manageOrder.goToExecutionButton
    );

    const executionPage =
      await newPagePromise;

    await executionPage.waitForLoadState();

    await executionPage.click(
      appConstants.manageOrder.applicationProcessTab
    );

    const layers =
      executionPage.locator(
        appConstants.manageOrder.executionLayers
      );

    const layerCount =
      await layers.count();

    console.log(
      `📚 Layers Found: ${layerCount}`
    );

    for (
      let i = 0;
      i < layerCount;
      i++
    ) {

      await layers
        .nth(i)
        .click();

      await executionPage.waitForTimeout(
        1000
      );

      const trialGroups =
        executionPage.locator(
          appConstants.manageOrder.trialGroup
        ).filter({
          hasText: 'T'
        });

      const groupCount =
        await trialGroups.count();

      if (groupCount > 0) {

        console.log(
          `✅ Trial Set found in Layer ${i + 1}`
        );

      } else {

        console.log(
          `⚠️ No Trial Set in Layer ${i + 1}`
        );
      }
    }
  }
}