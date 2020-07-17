function doAll() {
  var invoice_number = Order.getRange("A2").getValue()
  
  if (isNaN(invoice_number)) {
    UI.alert("Warning: Invoice number is invalid... Process cancelled.");
  } else {
    createInvoice();
    doBooking();
  }
  
  latestInvoice();
}


function latestInvoice() {
  var latest_invoice = Book.getRange(2, F_INVOICENUMBER).getValue();
  Order.getRange("A2").setValue("Latest: " + latest_invoice);
}


function onOpen() {
  latestInvoice();
  
  // Setup Menu
  var menu = UI.createMenu("Invoice Options");
  menu.addItem("Save Custom Product Info", "specialOrder");
  menu.addItem("Save Document Copy", "saveSheet");
  menu.addSeparator();
  menu.addItem("Invoice Paid", "updatePaid");
  menu.addItem("Update Stock/Invoice Complete", "updateStockB");
  menu.addSeparator();
  menu.addItem("Clear Order", "clearOrder");
  menu.addToUi();
}