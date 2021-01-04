/*
Special order! - Little Chef
Saves custom order descriptions
and prices, along with any discount
*/
function saveCustomInfo() {
  // Find invoice
  var invoiceNumber = INVOICE.getRange("F11").getValue();
  var row = locateInvoice(invoiceNumber);
  if (row == -1) {
    UI.alert("Error: Invoice not found... custom information will not be saved to financial book without an existing invoice");
    throw "Error: Invoice not found... custom information will not be saved to financial book without an existing invoice";
  }
  
  // Get custom information
  var customOrderInfo = []
  var lastRow = INVOICE.getLastRow()
  var productTitles = INVOICE.getRange(16, 1, lastRow - 27).getValues();
  
  for (var i = 0; i < productTitles.length; i++) {
    if (productTitles[i][0].includes("Custom Order")) {
      var description = INVOICE.getRange(16 + i, 2).getValue();
      description = description.replace(/,/g, "|");
      customOrderInfo.push(description);
      
      var price = INVOICE.getRange(16 + i, 6).getValue();
      customOrderInfo.push(price);
    }
  }
  
  // Get discount
  var lastRow = INVOICE.getLastRow();
  var invoiceDiscount = INVOICE.getRange(lastRow - I_DISCOUNTOFFSET, 7).getValue();
  var deliveryType = INVOICE.getRange(lastRow - 10, 5).getValue();
  
  if (deliveryType.includes("Custom")) {
    var deliveryCost = INVOICE.getRange(lastRow - 10, 7).getValue();
    BOOK.getRange(row, B_DELIVERYTYPE).setValue(deliveryCost);
  }
  var invoiceTotal = INVOICE.getRange(lastRow - 6, 7).getValue();
  
  var status = `${DATE}: Awaiting payment status to be updated\n${DATE}: Saved custom information, updated invoice total\n\n` + BOOK.getRange(row, B_INVOICESTATUS).getValue();
  
  BOOK.getRange(row, B_INVOICETOTAL).setValue(invoiceTotal);
  BOOK.getRange(row, B_DISCOUNT).setValue(invoiceDiscount);
  BOOK.getRange(row, B_CUSTOMINFO).setValue(String(customOrderInfo));
  BOOK.getRange(row, B_PAYMENTSTATUS).setValue("");
  BOOK.getRange(row, B_INVOICESTATUS).setValue(status);
}