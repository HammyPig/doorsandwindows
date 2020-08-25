DATE = Utilities.formatDate(new Date(), "UTC+10", "dd/MM/yyyy")

ss = SpreadsheetApp.getActiveSpreadsheet();
UI = SpreadsheetApp.getUi();
Order = ss.getSheetByName('Order');
Invoice = ss.getSheetByName('Invoice');
Stock = ss.getSheetByName('Stock');
Book = ss.getSheetByName('Financial Book');

allStock = Stock.getRange("A2:A").getValues().filter(String);
allStock = allStock.map(function (r) { return r[0]; });

// Financial Book
F_INVOICENUMBER = 1;
F_DATE = 2;
F_INVOICETOTAL = 3;
F_AMOUNTPAID = 4;
F_AMOUNTDUE = 5;
F_PAYMENTSTATUS = 6;
F_SCREENORDER = 7;
F_STOCKUPDATED = 8;
F_INVOICESTATUS = 9;
F_SCHEDULEDFOR = 10;
F_DELIVERYTYPE = 11;
F_CLIENTNAME = 12;
F_CLIENTMOBILE = 13;
F_CLIENTEMAIL = 14;
F_DELIVERYADDRESS = 15;
F_PAYMENTMETHOD = 16;
F_DISCOUNT = 17;
F_SALESPERSON = 18;
F_ORDERSUMMARY = 19;

// Stock
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

function locateInvoice(invoiceNumber) {
  var invoiceHistory = String(Book.getRange(2, F_INVOICENUMBER, Book.getLastRow(), 1).getValues()).split(",");
  var row = invoiceHistory.indexOf(String(invoiceNumber))
  row += 2
  
  return row
}