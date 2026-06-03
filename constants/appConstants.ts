export const appConstants = {

  urls: {

    login:
      'https://example-app.com/Login.aspx',

    landingPage:
      'https://example-app.com/WarehouseIndex.aspx',

    appProcessPage:
      'https://example-app.com/ApplicationProcess.aspx',

    syncPage:
      'https://example-app.com/SyncData.aspx'
  },

loginPage: {

  usernameInput:
    '#ContentPlaceHolder_userNameTextBox',

  passwordInput:
    '#ContentPlaceHolder_passwordTextbox',

  loginButton:
    '#ContentPlaceHolder_loginButton'
},

  syncPage: {

    orderInput:
      '#txtOrderNumber',

    syncNowButton:
      'button:has-text("Sync Now")',

    reSyncButton:
      'a:has-text("Re - Sync")',

    syncHistoryButton:
      '#ContentPlaceHolder1_lnkHistory',

    errorTab:
      '[data-target="#tab2"]',

    toastMessage:
      '.VegamToastNotificationWrapper'
  },

 manageOrder: {

  manageAOCard:
    'text=Manage Application Order',

  searchCriteria:
    '#searchCriteriaCtl',

  validationTab:
    '#tabSyncFailedOrders',

  validationSection:
    '#divSyncFailedOrders',

  validationSearchInput:
    '#txt_36368',

  successSearchInput:
    '#txt_33729',

  syncErrorLogsTab:
    'a[data-bind*="syncerrorlogs"]',

  syncErrorRows:
    '#divSyncErrorLogs tbody tr',

  sampleRows:
    '.sample-box',

panelRows:
  '[data-bind="foreach: PanelInfoList"] > .sample-box',

  selectedPanel:
  '.sample-box.active',

  duplicatePanelIcon:
    '.i-duplicate-order',

duplicatePopup:
  '.modal-content:has-text("Duplicate Panel")',

duplicateSelectAll:
  '.modal-content:has-text("Duplicate Panel") input.custom-checkbox',

  duplicateButton:
    '#btnDulicatePanel',

  duplicateSuccessToast:
    'text=Panel information duplicated successfully',

  trialSetTab:
  'text=Execution Set Info',

addTrialSetButton:
  'button:has-text("Add trial set")',

trialPanelCheckboxes:
  'input.panelCheckBox',

saveTrialSetButton:
  'button[onclick="AddPanelToInitialSet();"]',

trialSetSuccessToast:
  'text=Panels added to trial execution set successfully',

trialSetCard:
  'span:has-text("Trial Execution Set -")',

orderDetailsTab:
  'text=Order Details',

trialPanelIcon:
  'i[title="Trial Panel"]',

goToExecutionButton:
  '#ContentPlaceHolder1_btnAOExecution',

applicationProcessTab:
  '#lnkAppProcess',

executionLayers:
  'li.nav-item',

trialGroup:
  'span.cursor-pointer'
}
};
