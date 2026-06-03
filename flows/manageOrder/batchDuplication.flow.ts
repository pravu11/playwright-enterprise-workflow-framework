import { Page } from '@playwright/test';

import { DuplicatePanelPage }
  from '../../pages/manageOrder/BatchDuplicationPage';

export class DuplicatePanelFlow {

  private duplicatePanelPage:
    DuplicatePanelPage;

  constructor(page: Page) {

    this.duplicatePanelPage =
      new DuplicatePanelPage(page);
  }

  async duplicatePanels() {

    await this.duplicatePanelPage
      .duplicatePanelsForFirstFiveSamples();
  }
}