import { Page } from '@playwright/test';
import { ManageOrderPage } from '../../pages/manageOrder/OrderManagementPage';

export class ManageOrderFlow {

  private manageOrderPage: ManageOrderPage;

  constructor(page: Page) {

    this.manageOrderPage =
      new ManageOrderPage(page);
  }

async openOrder(
  orderNumber: string,
  type:
    'success' |
    'validation' |
    'modified'
){

    await this.manageOrderPage.openOrder(
      orderNumber,
      type
    );
  }
}