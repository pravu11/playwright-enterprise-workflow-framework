import { test } from '@playwright/test';

import { ManageOrderFlow }
  from '../../flows/manageOrder/orderManagement.flow';

import { OrderSyncFlow }
  from '../../flows/sync/dataSyncronization.flow';

import { testData }
  from '../../utils/testData';

test(
  'manage order navigation check',
  async ({ page }) => {

    const manageFlow =
      new ManageOrderFlow(page);

    const syncFlow =
      new OrderSyncFlow(page);

    for (const orderData of testData.orders) {

      const orderNumber =
        orderData.orderNumber;

      console.log(
        `\n🔍 Checking Manage Order for: ${orderNumber}`
      );

      const result =
        await syncFlow.syncOrder(orderNumber);

      if (
        result === 'success' ||
        result === 'validation' ||
        result === 'modified'
      ) {

        await manageFlow.openOrder(
          orderNumber,
          result
        );
      }
    }
  }
);