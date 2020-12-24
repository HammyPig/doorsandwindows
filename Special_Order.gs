function specialOrder() {
  var customOrderInfo = []
  var lastRow = Invoice.getLastRow()
  var invoiceOrder = Invoice.getRange(16, 1, lastRow - 27).getValues();
  
  for (i=0; i<invoiceOrder.length; i++) {
    if (invoiceOrder[i][0].includes("Custom Order")) {
    var description = Invoice.getRange(16 + i, 2).getValue();
    description = description.replace(/,/g, "|");
    customOrderInfo.push(description);
    var price = Invoice.getRange(16 + i, 6).getValue();
    customOrderInfo.push(price);
    }
  }
  
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  var invoiceHistory = String(Book.getRange(2, F_INVOICENUMBER, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  if (invoiceLookup > 1) {
      Book.getRange(invoiceLookup, 20).setValue(String(customOrderInfo));
  }
  
  var invoiceDiscount = Invoice.getRange(Invoice.getLastRow()-5, 7).getValue();
  var invoicePrice = Invoice.getRange(Invoice.getLastRow()-6, 7).getValue() - invoiceDiscount;
  
  Book.getRange(invoiceLookup, F_INVOICETOTAL).setValue(invoicePrice);
  Book.getRange(invoiceLookup, F_DISCOUNT).setValue(invoiceDiscount);
}