function checkStatus() {
  var invoiceNumber = Number(Order.getRange("I5").getValue());
  
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  Order.getRange("J6").setValue(Book.getRange(invoiceLookup, 9).getValue());
}