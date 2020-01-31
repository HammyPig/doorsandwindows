function init() {
  date = Utilities.formatDate(new Date(), "UTC+10", "dd/MM/yyyy")
  
  ss = SpreadsheetApp.getActiveSpreadsheet();
  UI = SpreadsheetApp.getUi();
  Order = ss.getSheets()[0];
  Invoice = ss.getSheets()[1];
  Stock = ss.getSheets()[2];
  Book = ss.getSheets()[3];
  
  allStock = Stock.getRange("B2:B").getValues().filter(String);
  
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
}