function specialOrder() {
  var customOrderInfo = []
  var lastRow = Invoice.getLastRow()
  var invoiceOrder = Invoice.getRange(16, 1, lastRow - 27).getValues();
  
  for (i=0; i<invoiceOrder.length; i++) {
    if (invoiceOrder[i] == "Custom Order") {
    var description = Invoice.getRange(16 + i, 2).getValue();
    description = description.replace(",", "|");
    customOrderInfo.push(description);
    var price = Invoice.getRange(16 + i, 6).getValue();
    customOrderInfo.push(price);
    }
  }
  
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  var invoiceLookup = invoiceNumber - 1572;
  Book.getRange(invoiceLookup, 18).setValue(String(customOrderInfo));
  
  var invoiceDiscount = Invoice.getRange(Invoice.getLastRow()-6, 7).getValue();
  var invoicePrice = Invoice.getRange(Invoice.getLastRow()-7, 7).getValue() - invoiceDiscount;
  
  Book.getRange(invoiceLookup, 3).setValue(invoicePrice);
  Book.getRange(invoiceLookup, 19).setValue(invoiceDiscount);
}