/** 
Returns the financial book row of 
the specified invoice. Returns -1
if invoice is not found.
**/
function locateInvoice(invoiceNumber) {
  invoiceNumber = Number(invoiceNumber);
  invoiceNumber = String(invoiceNumber);
  var invoiceHistory = String(BOOK.getRange(B_INVOICEOFFSET, B_INVOICENUMBER, BOOK.getLastRow(), B_INVOICENUMBER).getValues()).split(",");
  var row = invoiceHistory.indexOf(invoiceNumber);
  
  if (row == -1) {
    return row;
  }
  
  return row + B_INVOICEOFFSET;
}

function testLocateInvoice() {
  Logger.log(locateInvoice("2737"));
  Logger.log(locateInvoice(2737));
  Logger.log(locateInvoice("0001"));
  Logger.log(locateInvoice(1));
  Logger.log(locateInvoice("001"));
}