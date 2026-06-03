import { test } from '@playwright/test';

import { ManageOrderFlow }
  from '../../flows/manageOrder/orderManagement.flow';

import { TrialSetFlow }
  from '../../flows/manageOrder/executionSet.flow';

import { testData }
  from '../../utils/testData';

test(
  'trial set flow',
  async ({ page }) => {

    const manageFlow =
      new ManageOrderFlow(page);

    const trialSetFlow =
      new TrialSetFlow(page);

    for (const orderData of testData.orders) {

      const orderNumber =
        orderData.orderNumber;

      const flows =
        orderData.flows;

      if (!flows.createTrialSet) {

        console.log(
          `⏭️ Trial Set disabled for ${orderNumber}`
        );

        continue;
      }

      await manageFlow.openOrder(
        orderNumber,
        'success'
      );

      await trialSetFlow
        .createTrialSet();
    }
  }
);