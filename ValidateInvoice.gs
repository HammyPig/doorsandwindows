/*
Returns row of invoice if invoice is valid
*/
function validateInvoice(invoiceNumber) {
  // Check if invoice already exists
  var validInvoice = true;
  var row = locateInvoice(invoiceNumber);
  
  // New invoice detected
  if (row == -1) {
  
    // Check if invoice number is being skipped
    var latestInvoice = BOOK.getRange(2, B_INVOICENUMBER).getValue();
    if (Number(invoiceNumber) != Number(latestInvoice) + 1) {
      var skipInvoice = UI.alert(`Warning: You are placing an invoice out of order, (latest invoice: ${latestInvoice}, current invoice: ${invoiceNumber}) ... Are you sure you want to proceed?`, UI.ButtonSet.YES_NO);
      if (skipInvoice == UI.Button.NO) {
        return -1;
      }
    }
    
    BOOK.insertRowBefore(2);
    return 2;
  }
  
  // Override existing invoice
  var overrideInvoice = UI.alert("Warning: This invoice number already exists, would you like to override the existing information?", UI.ButtonSet.YES_NO);
  if (overrideInvoice == UI.Button.NO) {
    return -1;
  }
  
  return row;
}