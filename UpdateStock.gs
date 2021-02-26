function orderUpdateStock() {
  var invoiceNumber = ORDER.getRange(2, O_INVOICENUMBER).getValue();
  var row = locateInvoice(invoiceNumber)
  updateStock(row);
  
  // Update UI
  ORDER.getRange(O_INVOICESTATUS).setValue(BOOK.getRange(row, B_INVOICESTATUS).getValue());
}

function invoiceUpdateStock() {
  var invoiceNumber = INVOICE.getRange(I_INVOICENUMBER).getValue();
  var row = locateInvoice(invoiceNumber)
  updateStock(row);
}

function verifyPaymentMade(row) {
  // Verify if payment has been made, if not, payment can be overridden
  var paymentStatus = BOOK.getRange(row, B_PAYMENTSTATUS).getValue()
  if (!paymentStatus.includes("Paid")) {
    var payOverride = UI.alert("WARNING: Customer has NOT been recorded as paid, do you wish to FORCE the payment status to PAID?", UI.ButtonSet.OK_CANCEL);
    if (payOverride == UI.Button.OK) {
      forcePaymentStatus(row);
      updateUI(row);
    } else {
      UI.alert("Process cancelled... Stock has not been changed");
      throw "Process cancelled... Stock has not been changed";
    }
  }
}

function updateStock(row) {  
  // Verify if invoice exists
  if (row == -1) {
    UI.alert(`Error: Invoice '${invoiceNumber}' not found...\nInvoice stock cannot be updated when not saved into financial book first`);
    throw `Error: Invoice '${invoiceNumber}' not found...`;
  }
  
  // Verify payment has been made
  verifyPaymentMade(row);
  
  // Update stock, check if stock is already updated too
  var orderSummary = BOOK.getRange(row, B_ORDERSUMMARY).getValue();
  var stockAlreadyUpdated = deductStock(orderSummary, row);
  
  // Update invoice status to either completed, completed with screens delivered, or awaiting screens
  var containsCustom = orderHasCustom(orderSummary);
  var status = BOOK.getRange(row, B_INVOICESTATUS).getValue();
  var nextStep = `COMPLETED Order ${DATE}`;
  
  if (containsCustom) {
    // Check if screens/customs have been delivered for invoice to be fully completed
    var fullyComplete = UI.alert("Have screens and/or custom products been received too?", UI.ButtonSet.YES_NO);
    if (fullyComplete == UI.Button.YES) {
      nextStep += `\n${DATE}: Customs/screens have been received`;
    } else {
      if (stockAlreadyUpdated) {
        UI.alert("Error: Stock has already been updated for this invoice... Process cancelled");
        throw "Error: Stock has already been updated for this invoice... Process cancelled";
      }
      
      nextStep = `${DATE}: Partially received, stock has been updated, awaiting customs/screens`;
    }
  } else if (stockAlreadyUpdated) {
    UI.alert("Error: Stock has already been updated for this invoice... Process cancelled");
    throw "Error: Stock has already been updated for this invoice... Process cancelled";
  }
  
  BOOK.getRange(row, B_INVOICESTATUS).setValue(nextStep + "\n\n" + status);
}

function deductStock(orderSummary, row) {
  var stockStatus = BOOK.getRange(row, B_STOCKSTATUS).getValue()
  if (stockStatus != "") { 
    return true; 
  }
  
  var order = orderSummary.split(',');
  var products = [];
  var quantities = [];
  
  for (var i = 0; i < order.length; i += 2) {
    products.push(order[i]);
    quantities.push(order[i + 1]);
  }
  
  // Subtract quantities from stock count
  for (var i = 0; i < products.length; i++) {
    var stockRow = locateProduct(products[i]);
    var existingStock = STOCK.getRange(stockRow, S_STOCK).getValue();
    STOCK.getRange(stockRow, S_STOCK).setValue(Number(existingStock) - Number(quantities[i]));
  }
  
  // Mark invoice as stock updated
  BOOK.getRange(row, B_STOCKSTATUS).setValue(`Stock Updated ${DATE}`);
  
  return false;
}