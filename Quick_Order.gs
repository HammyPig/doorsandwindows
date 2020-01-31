function quickOrder() {
  
  var invoiceNumber = Number(Order.getRange("L2").getValue());
  
  var invoiceHistory = String(Book.getRange(2, F_INVOICENUMBER, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  
  if (invoiceLookup == 1) {
    UI.alert("Warning: The invoice you entered could not be found...");
  } else {
    Order.getRange(2, 1, 1, 9).setValue("");
    Order.getRange(5, 1, Order.getLastRow(), 3).setValue("");
    var paymentPaid = Book.getRange(invoiceLookup, F_AMOUNTPAID).getValue();
    var clientName = Book.getRange(invoiceLookup, F_CLIENTNAME).getValue();
    var clientAddress = Book.getRange(invoiceLookup, F_DELIVERYADDRESS).getValue();
    var clientMobile = Book.getRange(invoiceLookup, F_CLIENTMOBILE).getValue();
    var clientEmail = Book.getRange(invoiceLookup, F_CLIENTEMAIL).getValue();
    var paymentType = Book.getRange(invoiceLookup, F_PAYMENTMETHOD).getValue();
    var salesPerson = Book.getRange(invoiceLookup, F_SALESPERSON).getValue();
    var deliveryType = Book.getRange(invoiceLookup, F_DELIVERYTYPE).getValue();
    var scheduledFor = Book.getRange(invoiceLookup, F_SCHEDULEDFOR).getValue();
    
    var orderSummary = Book.getRange(invoiceLookup, F_ORDERSUMMARY).getValue().split(",");
    var discountApplied = Book.getRange(invoiceLookup, F_DISCOUNT).getValue();
    
    Order.getRange("A2").setValue(invoiceNumber);
    Order.getRange("B2").setValue(clientName);
    Order.getRange("C2").setValue(clientAddress);
    Order.getRange("D2").setValue(clientMobile);
    Order.getRange("E2").setValue(clientEmail);
    Order.getRange("F2").setValue(paymentType);
    Order.getRange("G2").setValue(salesPerson);
    Order.getRange("H2").setValue(deliveryType);
    Order.getRange("I2").setValue(scheduledFor);
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