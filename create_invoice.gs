function createInvoice() {
  resetInvoice();
  getOrder();
  inputInfo();
  inputProducts();
}


function inputInfo() {
  Invoice.getRange("B10").setValue(clientName); //Client Name
  Invoice.getRange("B11").setValue(clientAddress); //Client Address
  Invoice.getRange("B12").setValue(clientMobile); //Client Phone Number
  Invoice.getRange("B13").setValue(clientEmail); //Client Email
  Invoice.getRange("F9").setValue(DATE); //Date
  Invoice.getRange("F10").setValue(salesPerson); //Sales Person
  Invoice.getRange("F11").setValue(invoiceNumber); //Invoice Number
  Invoice.getRange("F12").setValue(orderType); //Delivery or Pick-Up
  Invoice.getRange("F13").setValue(scheduledFor); //Scheduled Time
  Invoice.getRange("G17").setValue('=SUM(G16:INDIRECT(ADDRESS(ROW()-1,COLUMN())))'); //Product Subtotal
  Invoice.getRange('E18').setValue(`DELIVERY: ${deliveryType}`) // Delivery Type
  Invoice.getRange("G18").setValue(deliveryCost); //Delivery Cost
  Invoice.getRange("G19").setValue('=(INDIRECT(ADDRESS(ROW()+1,COLUMN())))/11'); //GST (10% of subtotal)
  Invoice.getRange("G20").setValue('=IF(ISNUMBER(INDIRECT(ADDRESS(ROW()-2,COLUMN()))), (INDIRECT(ADDRESS(ROW()-2,COLUMN())))+(INDIRECT(ADDRESS(ROW()-3,COLUMN()))), (INDIRECT(ADDRESS(ROW()-3,COLUMN()))))'); //Total Cost (subtotal + delivery costs)
  Invoice.getRange("G21").setValue(discountApplied);
  Invoice.getRange("G22").setValue(amountPaid); //Amount Paid
  Invoice.getRange("G23").setValue("=INDIRECT(ADDRESS(ROW()-3,COLUMN()))-INDIRECT(ADDRESS(ROW()-2,COLUMN()))-INDIRECT(ADDRESS(ROW()-1,COLUMN()))");
  Invoice.getRange("G24").setValue(paymentMethod); //Payment Method
}


function inputProducts() {  
  // Make room for number of products
  if (trolley.length > 1) {
    var extraRows = trolley.length - 1
    Invoice.insertRowsAfter(16, extraRows);
    Invoice.getRange(16, 1, 1, 7).copyFormatToRange(Invoice, 1, 7, 17, 16 + extraRows); // Set extra rows to style
  }
  
  // Fill in product information
  for (var i = 0; i < trolley.length; i++) {
    var row = 16 + i
    
    Invoice.getRange(row, 1).setValue(products[i]);
    Invoice.getRange(row, 2).setValue(descriptions[i]);
    Invoice.getRange(row, 5).setValue(quantities[i]);
    Invoice.getRange(row, 6).setValue(prices[i]);
    Invoice.getRange(row, 7).setValue(`=E${row}*F${row}`);
  }
}