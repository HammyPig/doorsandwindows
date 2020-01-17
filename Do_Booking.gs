function doBooking() {
  // Finding Additional Booking Information
  var pos = invoiceNumber - ((Book.getRange("A2").getValue())-2);
  var overrideCheck = Book.getRange(pos, 1).getValue();
  var ui = SpreadsheetApp.getUi();
  
  if (overrideCheck != "") {
    var response = ui.alert("Warning: This invoice number already exists, would you like to override the existing information?", ui.ButtonSet.YES_NO);
  }
  
  if (response == ui.Button.YES || overrideCheck == "") {
  
    var orderSummary = Order.getRange(5, 1, trolley.length, 2).getValues();
    var paymentStatus = "Not Paid"
    if (amountPaid == invoiceTotal) {
      paymentStatus = date;
    }
    
    var stockStatus = "Stock";
    
    saveSheet();
    
    Book.getRange(pos, 1).setValue(formattedInvoiceNumber + ', "' + invoiceNumber + '")');
    Book.getRange(pos, 2).setValue(date);
    Book.getRange(pos, 3).setValue(invoiceTotal);
    Book.getRange(pos, 4).setValue(amountPaid);
    Book.getRange(pos, 5).setValue("=(INDIRECT(ADDRESS(ROW(), COLUMN()-2)))-(INDIRECT(ADDRESS(ROW(),COLUMN()-1)))");
    Book.getRange(pos, 6).setValue(paymentStatus);
    Book.getRange(pos, 8).setValue(clientName);
    Book.getRange(pos, 9).setValue(clientAddress);
    Book.getRange(pos, 10).setValue(clientMobile);
    Book.getRange(pos, 11).setValue(clientEmail);
    Book.getRange(pos, 12).setValue(paymentMethod);
    Book.getRange(pos, 13).setValue(salesPerson);
    Book.getRange(pos, 14).setValue(deliveryType);
    Book.getRange(pos, 15).setValue(leadTime);
    Book.getRange(pos, 16).setValue(stockStatus);
    Book.getRange(pos, 17).setValue(String(orderSummary));
  }
}