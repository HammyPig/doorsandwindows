function checkStatus() {
  var invoiceNumber = Number(Order.getRange("I5").getValue());
  
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  var status = Book.getRange(invoiceLookup, 9).getValue();
  if (status == "") {
    status = "Nothing Received";
  }
  Order.getRange("J6").setValue(status);
}