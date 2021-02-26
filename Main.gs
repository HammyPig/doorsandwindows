// Spreadsheet settings
DATE = Utilities.formatDate(new Date(), "UTC+10", "dd/MM/yy")

SS = SpreadsheetApp.getActiveSpreadsheet();
UI = SpreadsheetApp.getUi();
ORDER = SS.getSheetByName('Order');
INVOICE = SS.getSheetByName('Invoice');
STOCK = SS.getSheetByName('Stock');
BOOK = SS.getSheetByName('Financial Book');

STOCK_LIST = STOCK.getRange("A2:A").getValues().filter(String);
STOCK_LIST = STOCK_LIST.map(function (r) { return r[0]; });
CARD_SURCHARGE = 0.01; // 1%

// Order Page
O_INVOICENUMBER = 1;
O_CLIENTNAME = 2;
O_ADDRESS = 3;
O_PHONE = 4;
O_EMAIL = 5;
O_PAYMENTTYPE = 6;
O_SALESPERSON = 7;
O_DELIVERYTYPE = 8;
O_SCHEDULEDFOR = 9;
O_AMOUNTPAID = 10;
O_DISCOUNT = 11;
O_REFERRAL = 12;
O_SEARCHBAR = 14;
O_PRODUCTOFFSET = 5;
O_STOCKLEVEL = 3;
O_QUANTITY = 2;
O_INPUTOFFSET = 2;
O_NOTES = "I5";
O_INVOICESTATUS = "I13";
O_AMOUNTDUE = "N5";
O_PAYMENTINFO = ORDER.getRange(5, 14, 8, 1);

// Financial Book Page
B_INVOICENUMBER = 1;
B_DATE = 2;
B_INVOICETOTAL = 3;
B_AMOUNTPAID = 4;
B_DISCOUNT = 5;
B_AMOUNTDUE = 6;
B_PAYMENTSTATUS = 7;
B_SCREENORDER = 8;
B_STOCKSTATUS = 9;
B_INVOICESTATUS = 10;
B_SCHEDULEDFOR = 11;
B_DELIVERYTYPE = 12;
B_CLIENTNAME = 13;
B_PHONE = 14;
B_EMAIL = 15;
B_DELIVERYADDRESS = 16;
B_PAYMENTTYPE = 17;
B_SALESPERSON = 18;
B_REFERRAL = 19;
B_ORDERSUMMARY = 20;
B_CUSTOMINFO = 21;
B_NOTES = 22;
B_INVOICEOFFSET = 2;

// Stock Page
S_ID = 1;
S_DESCRIPTION = 2;
S_CODE = 3;
S_HEIGHT = 4;
S_WIDTH = 5;
S_COLOUR = 6;
S_OPENING = 7;
S_GLASSTYPE = 8;
S_COST = 9;
S_PRICE = 10;
S_STOCK = 11;

// Invoice
I_INVOICENUMBER = "F11";
I_FIRSTPRODUCT = 16; // first row which contains a product in the invoice page
I_DISCOUNTOFFSET = 5; // five rows from last row containing text

function doAll() {
  if (validInvoiceNumber()) {
    var invoiceInfo = getOrder();
    createInvoice(invoiceInfo);
    storeInvoice(invoiceInfo);
  }
  displayLatestInvoice();
}

function storeInfoOnly() {
  if (validInvoiceNumber()) {
    var invoiceInfo = getOrder();
    storeInvoice(invoiceInfo);
  }
}

function createInvoiceOnly() {
  var invoiceInfo = getOrder();
  createInvoice(invoiceInfo);
}

function validInvoiceNumber() {
  var invoiceNumber = ORDER.getRange(2, O_INVOICENUMBER).getValue();
  
  if (isNaN(invoiceNumber)) {
    UI.alert("Warning: Invoice number is not a number... Process cancelled.");
    return false;
  }
  
  return true;
}

function displayLatestInvoice() {
  var latestInvoice = BOOK.getRange(B_INVOICEOFFSET, B_INVOICENUMBER).getValue();
  ORDER.getRange(O_INPUTOFFSET, O_INVOICENUMBER).setValue("Latest: " + latestInvoice);
}

function onOpen() {
  displayLatestInvoice();
  
  // Setup Menu
  var menu = UI.createMenu("Invoice Options");
  menu.addItem("Clear Order Page", "clearOrderPage");
  menu.addItem('Reset Invoice', 'resetInvoice');
  //menu.addItem("Save Document Copy", "saveSheet");
  menu.addSeparator();
  menu.addItem("Save Custom/Discount Info", "saveCustomInfo");
  menu.addSeparator();
  menu.addItem("Update Payment Info", "invoiceUpdatePayment");
  menu.addItem("Stock or Screens/Customs Received", "invoiceUpdateStock");
  menu.addToUi();
}