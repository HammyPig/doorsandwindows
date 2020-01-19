function doBooking() {
  var ui = SpreadsheetApp.getUi();
  // Find invoice row
  var origin = Book.getLastRow();
  var originNumber = Book.getRange(origin, 1).getValue();

  var row = origin - (invoiceNumber - originNumber);
  
  var createNew = false;
  
  // Verify row
  if (row == 1) {
    Book.insertRowBefore(2);
    row = 2;
    var createNew = true;
  } else if (row < 1) {
    var response = ui.alert("Warning: You are skipping an invoice slot... Are you sure you want to proceed?", ui.ButtonSet.YES_NO);
  } else {
    var response = ui.alert("Warning: This invoice number already exists, would you like to override the existing information?", ui.ButtonSet.YES_NO);
  }
  
  if (response == ui.Button.YES || createNew) {
    // Fill in booking information
    var orderSummary = Order.getRange(5, 1, trolley.length, 2).getValues();
    var paymentStatus = "Not Paid"
    if (amountPaid == invoiceTotal) {
      paymentStatus = date;
    }
    
    var stockStatus = "Stock";
    
    Book.getRange(row, 1).setValue(invoiceNumber);
    Book.getRange(row, 2).setValue(date);
    Book.getRange(row, 3).setValue(invoiceTotal);
    Book.getRange(row, 4).setValue(amountPaid);
    Book.getRange(row, 5).setValue("=(INDIRECT(ADDRESS(ROW(), COLUMN()-2)))-(INDIRECT(ADDRESS(ROW(),COLUMN()-1)))");
    Book.getRange(row, 6).setValue(paymentStatus);
    Book.getRange(row, 8).setValue(clientName);
    Book.getRange(row, 9).setValue(clientAddress);
    Book.getRange(row, 10).setValue(clientMobile);
    Book.getRange(row, 11).setValue(clientEmail);
    Book.getRange(row, 12).setValue(paymentMethod);
    Book.getRange(row, 13).setValue(salesPerson);
    Book.getRange(row, 14).setValue(deliveryType);
    Book.getRange(row, 15).setValue(leadTime);
    Book.getRange(row, 16).setValue(stockStatus);
    Book.getRange(row, 17).setValue(String(orderSummary));
  }
}