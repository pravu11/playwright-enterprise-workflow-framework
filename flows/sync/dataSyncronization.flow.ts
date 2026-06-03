import { Page } from '@playwright/test';
import { SyncPage } from '../../pages/DataSyncPage';

export class OrderSyncFlow {

  private syncPage: SyncPage;

  constructor(page: Page) {

    this.syncPage = new SyncPage(page);
  }

  async syncOrder(orderNumber: string) {

    await this.syncPage.navigate();

    await this.syncPage.enterOrderNumber(
      orderNumber
    );

    const clicked =
      await this.syncPage.clickSyncOrResync();

    if (!clicked) {

      return 'failed';
    }

    return await this.syncPage.validateSyncResult(
      orderNumber
    );
  }
}