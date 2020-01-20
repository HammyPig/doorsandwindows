function doBooking() {
  // Find invoice row
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var row = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  
  var createNew = false;
  
  // Verify row
  if (row == 1) {
    var sure = true;
    if (invoiceNumber > Book.getRange(2, 1).getValue() + 1) {
      var response = UI.alert("Warning: You are skipping an invoice slot... Are you sure you want to proceed?", UI.ButtonSet.YES_NO);
      if (response == UI.Button.NO) {
        sure = false;
      }
    }
    
    if (sure) {
    Book.insertRowBefore(2);
    row = 2;
    var createNew = true;
    }
  } else {
    var response2 = UI.alert("Warning: This invoice number already exists, would you like to override the existing information?", UI.ButtonSet.YES_NO);
  }
  
  if (response2 == UI.Button.YES || createNew) {
    // Fill in booking information
    var orderSummary = String(Order.getRange(5, 1, trolley.length, 2).getValues());
    var paymentStatus = "";
    if (amountPaid == invoiceTotal) {
      paymentStatus = "Paid " + date;
    }
    
    var stockStatus = "Stock";
    
    Book.getRange(row, 1).setValue(invoiceNumber);
    Book.getRange(row, 2).setValue(date);
    Book.getRange(row, 3).setValue(invoiceTotal);
    Book.getRange(row, 4).setValue(amountPaid);
    Book.getRange(row, 5).setValue("=(INDIRECT(ADDRESS(ROW(), COLUMN()-2)))-(INDIRECT(ADDRESS(ROW(),COLUMN()-1)))");
    Book.getRange(row, 6).setValue(paymentStatus);
    if (!(orderSummary.indexOf("wf")+1 || orderSummary.indexOf("ws")+1 || orderSummary.indexOf("df")+1 || orderSummary.indexOf("ds")+1)) {
      Book.getRange(row, 7).setValue("n/a");
    } else if (Book.getRange(row, 7).getValue() == "n/a") {
      Book.getRange(row, 7).setValue("");
    }
    Book.getRange(row, 8).setValue("");
    Book.getRange(row, 9).setValue("");
    Book.getRange(row, 10).setValue(clientName);
    Book.getRange(row, 11).setValue(clientAddress);
    Book.getRange(row, 12).setValue(clientMobile);
    Book.getRange(row, 13).setValue(clientEmail);
    Book.getRange(row, 14).setValue(paymentMethod);
    Book.getRange(row, 15).setValue(salesPerson);
    Book.getRange(row, 16).setValue(deliveryType);
    Book.getRange(row, 17).setValue(leadTime);
    Book.getRange(row, 18).setValue(stockStatus);
    Book.getRange(row, 19).setValue(orderSummary);
  }
}