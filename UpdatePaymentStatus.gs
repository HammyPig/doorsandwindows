function invoiceUpdatePayment() {
  var invoiceNumber = INVOICE.getRange(I_INVOICENUMBER).getValue();
  var lastRow = INVOICE.getLastRow();
  
  var amountDue = INVOICE.getRange(lastRow - 3, 7).getValue() // BALANCE
  var amountPaid = INVOICE.getRange(lastRow - 4, 7).getValue(); // PAID
  
  updatePaymentStatus(invoiceNumber, amountDue, amountPaid);
}

function orderUpdatePayment() {
  var invoiceNumber = ORDER.getRange(2, O_INVOICENUMBER).getValue();
  
  var amountDue = ORDER.getRange(12, 14).getValue();
  var amountPaid = ORDER.getRange(7, 14).getValue() + ORDER.getRange(10, 14).getValue();
  
  updatePaymentStatus(invoiceNumber, amountDue, amountPaid);
  updateUI(invoiceNumber);
}

function forcePaymentStatus(invoiceNumber) {
  var row = locateInvoice(invoiceNumber)
  if (row == -1) {
    UI.alert("Error: Invoice not found...\nInvoice cannot be marked as pay when not saved into financial book first");
    throw "Error: Invoice not found...\nInvoice cannot be marked as pay when not saved into financial book first";
  }
  
  var amountDue = BOOK.getRange(row, B_AMOUNTDUE).getValue();
  
  var status = "\n\n" + BOOK.getRange(row, B_INVOICESTATUS).getValue();
  
  var nextStep = "pickup/delivery";
  var containsScreen = UI.alert("Does this order require screens to be ordered?", UI.ButtonSet.YES_NO)
  if (containsScreen == UI.Button.YES) {
    nextStep = "screens to be ordered";
  }
  
  status = `${DATE}: Auto-paid remaining total amount ($${amountDue}), waiting for ${nextStep}${status}`;
  var paymentStatus = `Paid ${DATE}`;
  
  BOOK.getRange(row, B_AMOUNTPAID).setValue(Number(BOOK.getRange(row, B_AMOUNTPAID).getValue()) + Number(amountDue));
  BOOK.getRange(row, B_PAYMENTSTATUS).setValue(paymentStatus);
  BOOK.getRange(row, B_INVOICESTATUS).setValue(status);
  
  updateUI(invoiceNumber);
}

function updateUI(invoiceNumber) {
  var row = locateInvoice(invoiceNumber);
  
  var amountPaid = BOOK.getRange(row, B_AMOUNTPAID).getValue();
  var amountDue = BOOK.getRange(row, B_AMOUNTDUE).getValue();
  var notes = BOOK.getRange(row, B_NOTES).getValue();
  var status = BOOK.getRange(row, B_INVOICESTATUS).getValue();
  
  ORDER.getRange(O_NOTES).setValue(notes);
  ORDER.getRange(O_INVOICESTATUS).setValue(status);
  
  ORDER.getRange(7, 14).setValue(amountPaid);
  ORDER.getRange(2, O_AMOUNTPAID).setValue(amountPaid);
  ORDER.getRange(8, 14).setValue(amountDue);
  ORDER.getRange(10, 14).setValue("");
  ORDER.getRange(12, 14).setValue("=INDIRECT(ADDRESS(ROW()-4, COLUMN()))-INDIRECT(ADDRESS(ROW()-2, COLUMN()))");
}

/**
 * Gets the current invoice in invoice page
 * and fills in the Paid space to match the
 * balance due, then updates the financial
 * book such that paid matches the balance
 * due, payment status displays Paid DATE,
 * and invoice status has added DATE: Paid
 * In Full 
*/
function updatePaymentStatus(invoiceNumber, amountDue, amountPaid) {
  
  // Validates inputs
  try {
    amountDue = Number(amountDue); // amount needed to cover whole cost
    amountPaid = Number(amountPaid); // total amount paid
  } catch (TypeError) {
    UI.alert("Error: Amount Due or Amount Paid is not a number...");
    throw "Error: Amount Due or Amount Paid is not a number...";
  }
  
  var row = locateInvoice(invoiceNumber)
  if (row == -1) {
    UI.alert("Error: Invoice not found...\nInvoice cannot be marked as pay when not saved into financial book first");
    throw "Error: Invoice not found...\nInvoice cannot be marked as pay when not saved into financial book first";
  }
  
  // Verifies balance has been paid, otherwise will only mark as a deposit
  var deposit = false;
  
  if (amountDue > 0) {
    var overridePaid = UI.alert(`Warning: Customer has not paid in full (owes remaining: $${amountDue}), do you wish to proceed? Payment Status will be marked only as a DEPOSIT`, UI.ButtonSet.OK_CANCEL);
    
    if (overridePaid == UI.Button.CANCEL) {
      UI.alert("Process CANCELLED... Payment status has not been updated");
      throw "Process CANCELLED... Payment status has not been updated";
    }
    
    deposit = true;
  }
  
  var status = "\n\n" + BOOK.getRange(row, B_INVOICESTATUS).getValue();
  
  if (deposit) {
    status = `${DATE}: Paid deposit, deposit total is now $${amountPaid}, waiting for remaining $${amountDue}${status}`;
    var paymentStatus = `Deposit ${DATE}`;
  } else {
    var nextStep = "pickup/delivery";
    var containsScreen = UI.alert("Does this order require screens to be ordered?", UI.ButtonSet.YES_NO)
    if (containsScreen == UI.Button.YES) {
      nextStep = "Screens to be ordered";
    }
    
    status = `${DATE}: Paid total amount ($${amountPaid}), waiting for ${nextStep}${status}`;
    var paymentStatus = `Paid ${DATE}`;
  }
  
  BOOK.getRange(row, B_AMOUNTPAID).setValue(amountPaid);
  BOOK.getRange(row, B_PAYMENTSTATUS).setValue(paymentStatus);
  BOOK.getRange(row, B_INVOICESTATUS).setValue(status);
  
  return !deposit;
}