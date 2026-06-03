import { test } from '@playwright/test';

import { OrderSyncFlow } from '../../flows/sync/dataSyncronization.flow';
import { ManageOrderFlow } from '../../flows/manageOrder/orderManagement.flow';
import { DuplicatePanelFlow } from '../../flows/manageOrder/batchDuplication.flow';

import { testData } from '../../utils/testData';

// full E2E flow timeout
test.setTimeout(120000);

test(
  'full flow',
  async ({ page }) => {

    const syncFlow =
      new OrderSyncFlow(page);

    const manageFlow =
      new ManageOrderFlow(page);

    const duplicateFlow =
  new DuplicatePanelFlow(page);

    for (const orderData of testData.orders) {

      const orderNumber =
        orderData.orderNumber;

      const flows = orderData.flows;

      console.log(
        `\n🚀 Processing Order: ${orderNumber}`
      );

      const result =
        await syncFlow.syncOrder(orderNumber);

      // proceed only for success/validation
      if (
  result === 'success' ||
  result === 'validation' ||
  result === 'modified'
){

        console.log(
          `➡️ Proceeding to Manage AO for ${orderNumber}`
        );

        // ✅ open order in Manage AO
        await manageFlow.openOrder(
          orderNumber,
          result
        );

       // optional flows for reusable orders
if (
  result === 'success' ||
  result === 'modified'
) {

if (flows.duplicatePanels) {

  console.log(
    '🧩 Duplicate Panel flow enabled'
  );

  await duplicateFlow
    .duplicatePanels();
}

          if (flows.createTrialSet) {

            console.log(
              '🧪 Trial Set flow enabled'
            );
          }

          if (flows.materialUpdate) {

            console.log(
              '🧱 Material Update flow enabled'
            );
          }

          if (flows.deletePanels) {

            console.log(
              '🗑️ Delete Panel flow enabled'
            );
          }

          if (flows.print) {

            console.log(
              '🖨️ Print flow enabled'
            );
          }
        }

      } else {

        console.log(
          `⛔ Skipping Manage AO for FAILED order: ${orderNumber}`
        );
      }
    }
  }
);