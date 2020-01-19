function init() {
  date = Utilities.formatDate(new Date(), "UTC+10", "dd/MM/yyyy")
  
  ss = SpreadsheetApp.getActiveSpreadsheet();
  UI = SpreadsheetApp.getUi();
  Order = ss.getSheets()[0];
  Invoice = ss.getSheets()[1];
  Stock = ss.getSheets()[2];
  Book = ss.getSheets()[3];
  
  allStock = Stock.getRange("B2:B").getValues().filter(String);
  latestInvoice = Number(Book.getRange(2, 1).getValue());
}