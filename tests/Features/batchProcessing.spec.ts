import { test } from '@playwright/test';

import { ManageOrderFlow }
  from '../../flows/manageOrder/orderManagement.flow';

import { DuplicatePanelFlow }
  from '../../flows/manageOrder/batchDuplication.flow';

import { testData }
  from '../../utils/testData';

test(
  'duplicate panel only',
  async ({ page }) => {

    const manageFlow =
      new ManageOrderFlow(page);

    const duplicateFlow =
      new DuplicatePanelFlow(page);

    for (const orderData of testData.orders) {

      if (
        !orderData.flows.duplicatePanels
      ) {
        continue;
      }

      console.log(
        `\n🧩 Running Duplicate Panel Flow for ${orderData.orderNumber}`
      );

      await manageFlow.openOrder(
        orderData.orderNumber,
        'success'
      );

      await duplicateFlow
        .duplicatePanels();
    }
  }
);