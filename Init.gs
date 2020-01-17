function init() {
  date = Utilities.formatDate(new Date(), "UTC+10", "dd/MM/yyyy")
  
  ss = SpreadsheetApp.getActiveSpreadsheet(); //es
  Order = ss.getSheets()[0];
  Invoice = ss.getSheets()[1];
  Stock = ss.getSheets()[2];
  Book = ss.getSheets()[3];
  
  allStock = Stock.getRange("B2:B").getValues().filter(String);
  latestInvoice = Number(Book.getRange(Book.getLastRow(), 1).getValue()) + 1;
}