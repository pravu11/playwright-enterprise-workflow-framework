import { test } from '@playwright/test';

import { OrderSyncFlow }
  from '../../flows/sync/dataSyncronization.flow';

import { testData }
  from '../../utils/testData';

test(
  'sync flow only',
  async ({ page }) => {

    const syncFlow =
      new OrderSyncFlow(page);

    for (const orderData of testData.orders) {

      const orderNumber =
        orderData.orderNumber;

      console.log(
        `\n🚀 Syncing Order: ${orderNumber}`
      );

      await syncFlow.syncOrder(
        orderNumber
      );
    }
  }
);