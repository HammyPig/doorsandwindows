function quickComplete() {
  var invoiceNumber = ORDER.getRange(2, O_INVOICENUMBER).getValue();
  var row = locateInvoice(invoiceNumber);
  
  // Verify if invoice exists
  if (row == -1) {
    UI.alert(`Error: Invoice '${invoiceNumber}' not found...\nInvoice cannot be updated when not saved into financial book first`);
    throw `Error: Invoice '${invoiceNumber}' not found...`;
  }
  
  forcePaymentStatus(row);
  
  // Find product quantities
  var orderSummary = BOOK.getRange(row, B_ORDERSUMMARY).getValue();
  deductStock(orderSummary, row);
  var status = `AUTO-COMPLETED ${DATE}\n${DATE}: Auto-updated stock count\n` + BOOK.getRange(row, B_INVOICESTATUS).getValue();
  BOOK.getRange(row, B_INVOICESTATUS).setValue(status);
  
  // Update UI
  updateUI(row);
}

function test() {
ORDER.getRange(O_INVOICESTATUS).setValue("hello?");
}
