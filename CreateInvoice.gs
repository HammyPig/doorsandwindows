/**
 * Resets and inputs all invoice information
 * onto invoice page
 */
function createInvoice(invoiceInfo) {
  resetInvoice();
  inputInfo(invoiceInfo);
  inputProducts(invoiceInfo);
}

function inputInfo(invoiceInfo) {
  INVOICE.getRange("B10").setValue(invoiceInfo.clientName);
  INVOICE.getRange("B11").setValue(invoiceInfo.address);
  INVOICE.getRange("B12").setValue(invoiceInfo.phone);
  INVOICE.getRange("B13").setValue(invoiceInfo.email);
  INVOICE.getRange("F9").setValue(DATE);
  INVOICE.getRange("F10").setValue(invoiceInfo.salesPerson);
  INVOICE.getRange("F11").setValue(invoiceInfo.invoiceNumber);
  INVOICE.getRange("F12").setValue(invoiceInfo.orderType);
  INVOICE.getRange("F13").setValue(invoiceInfo.scheduledFor);
  INVOICE.getRange("G17").setValue('=SUM(G16:INDIRECT(ADDRESS(ROW()-1,COLUMN())))'); //Product Subtotal
  if (!isNaN(invoiceInfo.deliveryType)) {
    INVOICE.getRange('E18').setValue(`DELIVERY: Custom`) // Delivery Type
  } else {
    INVOICE.getRange('E18').setValue(`DELIVERY: ${invoiceInfo.deliveryType}`) // Delivery Type
  }
  if (invoiceInfo.deliveryCost != 0) {
    INVOICE.getRange("G18").setValue(invoiceInfo.deliveryCost); //Delivery Cost
  }
  INVOICE.getRange("G19").setValue('=(INDIRECT(ADDRESS(ROW()+3,COLUMN())))/11'); //GST (10% of subtotal)
  INVOICE.getRange("G20").setValue(invoiceInfo.paymentType); //Payment Method
  if (invoiceInfo.paymentType == "Card") {
    INVOICE.getRange("G21").setValue(`=${CARD_SURCHARGE}*(INDIRECT(ADDRESS(ROW()-3,COLUMN()))+INDIRECT(ADDRESS(ROW()-4,COLUMN())))`); //Surcharge
  } else {
    INVOICE.getRange("G21").setValue("n/a");
  }
  //Total Cost (subtotal + delivery costs)
  INVOICE.getRange("G22").setValue('=IF(ISNUMBER(INDIRECT(ADDRESS(ROW()-1,COLUMN()))), (INDIRECT(ADDRESS(ROW()-1,COLUMN())))+(INDIRECT(ADDRESS(ROW()-4,COLUMN())))+(INDIRECT(ADDRESS(ROW()-5,COLUMN()))), (INDIRECT(ADDRESS(ROW()-4,COLUMN())))+(INDIRECT(ADDRESS(ROW()-5,COLUMN()))))');
  INVOICE.getRange("G23").setValue(invoiceInfo.discount);
  INVOICE.getRange("G24").setValue(invoiceInfo.amountPaid);
  INVOICE.getRange("G25").setValue("=INDIRECT(ADDRESS(ROW()-3,COLUMN()))-INDIRECT(ADDRESS(ROW()-2,COLUMN()))-INDIRECT(ADDRESS(ROW()-1,COLUMN()))");
}

function inputProducts(invoiceInfo) {  
  // Make room for number of products
  var cartLength = invoiceInfo.products.length;
  
  if (cartLength > 1) {
    var extraRows = cartLength - 1;
    INVOICE.insertRowsAfter(I_FIRSTPRODUCT, extraRows);
    INVOICE.getRange(I_FIRSTPRODUCT, 1, 1, 7).copyFormatToRange(INVOICE, 1, 7, 17, I_FIRSTPRODUCT + extraRows); // Set extra rows to style
  }
  
  // Fill in product information
  for (var i = 0; i < cartLength; i++) {
    var row = i + I_FIRSTPRODUCT;
    var item_num = i + 1;
    INVOICE.getRange(row, 1).setValue("ITEM " + item_num + ":\n" + invoiceInfo.products[i]);
    INVOICE.getRange(row, 2).setValue(invoiceInfo.descriptions[i]);
    INVOICE.getRange(row, 5).setValue(invoiceInfo.quantities[i]);
    INVOICE.getRange(row, 6).setValue(invoiceInfo.prices[i]);
    INVOICE.getRange(row, 7).setValue(`=E${row}*F${row}`); // quantities * prices
  }
}