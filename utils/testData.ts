export const testData = {

username: 'demo_user',
password: 'demo_password',

  orders: [

    {
      orderNumber: 'ORDER_001', //existing order

      flows: {

        duplicatePanels: false,

        deletePanels: false,

        createTrialSet: true,

        materialUpdate: false,

        print: false
      }
    },

    {
      orderNumber: 'ORDER_002', //order modified in system

      flows: {

        duplicatePanels: false,

        deletePanels: false,

        createTrialSet: false,

        materialUpdate: false,

        print: false
      }
    },

    {
      orderNumber: 'ORDER_003', //Validation error

      flows: {

        duplicatePanels: false,

        deletePanels: false,

        createTrialSet: false,

        materialUpdate: false,

        print: false
      }
    },

    {
      orderNumber: 'ORDER_004', //order with duplicate panels

      flows: {

        duplicatePanels: false,

        deletePanels: false,

        createTrialSet: false,

        materialUpdate: false,

        print: false
      }
    },

    {
      orderNumber: 'ORDER_005', //Execution started 

      flows: {

        duplicatePanels: false,

        deletePanels: false,

        createTrialSet: false,

        materialUpdate: false,

        print: false
      }
    }
  ]
};
