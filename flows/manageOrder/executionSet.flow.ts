import { Page } from '@playwright/test';
import { TrialSetPage }
  from '../../pages/manageOrder/ExecutionSet';

export class TrialSetFlow {

  private trialSetPage:
    TrialSetPage;

  constructor(page: Page) {

    this.trialSetPage =
      new TrialSetPage(page);
  }

  async createTrialSet() {

    await this.trialSetPage
      .openExecutionSetInfo();

    const created =
      await this.trialSetPage
        .createTrialSet();

    if (!created) {
      return;
    }

    await this.trialSetPage
      .verifyTrialSetCard();

    await this.trialSetPage
      .verifyTrialPanelIcons();

    await this.trialSetPage
      .verifyTrialSetInExecution();
  }
}