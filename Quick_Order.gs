function quickOrder() {
  
  var invoiceNumber = Number(Order.getRange("L2").getValue());
  
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  
  if (invoiceLookup == 1) {
    var ui = SpreadsheetApp.getUi();
    ui.alert("Warning: The invoice you entered could not be found...");
  } else {
    Order.getRange(2, 1, 1, 9).setValue("");
    Order.getRange(5, 1, Order.getLastRow(), 3).setValue("");
    var paymentPaid = Book.getRange(invoiceLookup, 4).getValue();
    var clientName = Book.getRange(invoiceLookup, 8).getValue();
    var clientAddress = Book.getRange(invoiceLookup, 9).getValue();
    var clientMobile = Book.getRange(invoiceLookup, 10).getValue();
    var clientEmail = Book.getRange(invoiceLookup, 11).getValue();
    var paymentType = Book.getRange(invoiceLookup, 12).getValue();
    var salesPerson = Book.getRange(invoiceLookup, 13).getValue();
    var deliveryType = Book.getRange(invoiceLookup, 14).getValue();
    var leadTime = Book.getRange(invoiceLookup, 15).getValue();
    
    var orderSummary = Book.getRange(invoiceLookup, 17).getValue().split(",");
    var discountApplied = Book.getRange(invoiceLookup, 19).getValue();
    
    Order.getRange("A2").setValue(invoiceNumber);
    Order.getRange("B2").setValue(clientName);
    Order.getRange("C2").setValue(clientAddress);
    Order.getRange("D2").setValue(clientMobile);
    Order.getRange("E2").setValue(clientEmail);
    Order.getRange("F2").setValue(paymentType);
    Order.getRange("G2").setValue(salesPerson);
    Order.getRange("H2").setValue(deliveryType);
    Order.getRange("I2").setValue(leadTime);
    Order.getRange("J2").setValue(paymentPaid);
    Order.getRange("K2").setValue(discountApplied);
    
    var row = 5
    for (i=0; i < orderSummary.length; i+=2) {
      Order.getRange(row, 1).setValue(orderSummary[i]);
      Order.getRange(row, 2).setValue(orderSummary[i+1]);
      row += 1;
    }
  }
}