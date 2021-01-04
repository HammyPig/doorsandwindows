function orderUpdateStock() {
  var invoiceNumber = ORDER.getRange(2, O_INVOICENUMBER).getValue();
  updateStock(invoiceNumber);
  
  // Update UI
  var row = locateInvoice(invoiceNumber)
  ORDER.getRange(O_INVOICESTATUS).setValue(BOOK.getRange(row, B_INVOICESTATUS).getValue());
}

function invoiceUpdateStock() {
  var invoiceNumber = INVOICE.getRange(I_INVOICENUMBER).getValue();
  updateStock(invoiceNumber);
}

function updateStock(invoiceNumber) {
  var row = locateInvoice(invoiceNumber);
  
  if (row == -1) {
    UI.alert(`Error: Invoice '${invoiceNumber}' not found...\nInvoice stock cannot be updated when not saved into financial book first`);
    throw `Error: Invoice '${invoiceNumber}' not found...`;
  }
  
  var paymentStatus = BOOK.getRange(row, B_PAYMENTSTATUS).getValue()
  
  if (!paymentStatus.includes('Paid')) {
    var payOverride = UI.alert("Note: Customer has NOT been recorded as paid, do you wish to FORCE the payment status to PAID?", UI.ButtonSet.OK_CANCEL);
    
    if (payOverride == UI.Button.OK) {
      forcePaymentStatus(invoiceNumber);
    } else {
      UI.alert("Process cancelled... Stock has not been changed");
      return;
    }
  }
  
  var stockStatus = BOOK.getRange(row, B_STOCKSTATUS).getValue()
  var orderSummary = BOOK.getRange(row, B_ORDERSUMMARY).getValue();
  
  // Find product quantities
  var order = orderSummary.split(',');
  var products = [];
  var quantities = [];
  
  for (var i = 0; i < order.length; i += 2) {
    products.push(order[i]);
    quantities.push(order[i + 1]);
  }
  
  /*
  if (stockStatus != "") {
    // Add back quantities if stock has been taken previously, so there are no miscounts
    for (var i = 0; i < products.length; i++) {
      var stockRow = locateProduct(products[i]);
      var existingStock = STOCK.getRange(stockRow, S_STOCK).getValue();
      STOCK.getRange(stockRow, S_STOCK).setValue(existingStock + quantities[i]);
    }
  }
  */
  
  var stockUpdated = false;
  // Subtract quantities from stock count
  if (stockStatus == "") { 
    for (var i = 0; i < products.length; i++) {
      var stockRow = locateProduct(products[i]);
      var existingStock = STOCK.getRange(stockRow, S_STOCK).getValue();
      STOCK.getRange(stockRow, S_STOCK).setValue(Number(existingStock) - Number(quantities[i]));
    }
    
    // Mark invoice as stock updated
    BOOK.getRange(row, B_STOCKSTATUS).setValue(`Stock Updated ${DATE}`);
  } else {
    stockUpdated = true;
  }
  
  // Update invoice status to either completed, completed with screens delivered, or awaiting screens
  var containsScreen = orderHasScreen(orderSummary);
  var status = BOOK.getRange(row, B_INVOICESTATUS).getValue();
  var nextStep = `${DATE}: COMPLETED Order fully completed`
  
  if (containsScreen) {
    // Check if screens/customs have been delivered for invoice to be fully completed
    var fullyComplete = UI.alert("Have screens and/or custom products been received too?", UI.ButtonSet.YES_NO);
    if (fullyComplete == UI.Button.YES) {
      nextStep += `\n${DATE}: Customs/screens have been received`;
    } else {
      if (stockUpdated) {
        UI.alert("Error: Stock has already been updated for this invoice... Process cancelled");
        throw "Error: Stock has already been updated for this invoice... Process cancelled";
      }
      nextStep = `${DATE}: Partially received, stock has been updated, awaiting customs/screens`;
    }
  }
  
  BOOK.getRange(row, B_INVOICESTATUS).setValue(nextStep + "\n\n" + status);
}