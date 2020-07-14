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
  Invoice.getRange("F9").setValue(date); //Date
  Invoice.getRange("F10").setValue(salesPerson); //Sales Person
  Invoice.getRange("F11").setValue(invoiceNumber); //Invoice Number
  Invoice.getRange("F12").setValue(orderType); //Delivery or Pick-Up
  Invoice.getRange("F13").setValue(scheduledFor); //Scheduled Time
  Invoice.getRange("G17").setValue("=SUM(G16:INDIRECT(ADDRESS(ROW()-1,COLUMN())))"); //Product Subtotal
  //Invoice.getRange("G18").setValue("=(INDIRECT(ADDRESS(ROW()-1,COLUMN())))*0.1"); //GST (10% of subtotal)
  Invoice.getRange("G19").setValue(deliveryCost); //Delivery Cost
  Invoice.getRange("G20").setValue(paymentMethod); //Payment Method
  Invoice.getRange("G21").setValue("=IF(ISNUMBER(INDIRECT(ADDRESS(ROW()-2,COLUMN()))), (INDIRECT(ADDRESS(ROW()-2,COLUMN())))+(INDIRECT(ADDRESS(ROW()-4,COLUMN()))), (INDIRECT(ADDRESS(ROW()-4,COLUMN()))))"); //Total Cost (subtotal + delivery costs)
  Invoice.getRange("G22").setValue(discountApplied);
  Invoice.getRange("G23").setValue(amountPaid); //Amount Paid
  Invoice.getRange("G24").setValue("=INDIRECT(ADDRESS(ROW()-3,COLUMN()))-INDIRECT(ADDRESS(ROW()-2,COLUMN()))-INDIRECT(ADDRESS(ROW()-1,COLUMN()))");
}


function inputProducts() {
  // Input Client Products
  Invoice.getRange(16, 1).setValue(products[0]);
  Invoice.getRange(16, 2).setValue(descriptions[0]);
  Invoice.getRange(16, 5).setValue(quantities[0]);
  Invoice.getRange(16, 6).setValue(prices[0]);
  Invoice.getRange(16, 7).setValue("=E16*F16");
  
  // Additional Products
  if (trolley.length > 1) {
    var extraRows = trolley.length - 1
    Invoice.insertRowsAfter(16, extraRows); // Make room for number of products
    Invoice.getRange(16, 1, 1, 7).copyFormatToRange(Invoice, 1, 7, 17, 16 + extraRows); // Set extra rows to style
    
    for (var i = 1; i < trolley.length; i++) {
      var row = 16 + i
      Invoice.getRange(row, 1).setValue(products[i]);
      Invoice.getRange(row, 2).setValue(descriptions[i]);
      Invoice.getRange(row, 5).setValue(quantities[i]);
      Invoice.getRange(row, 6).setValue(prices[i]);
      Invoice.getRange(row, 7).setValue("=E" + String(row) + "*F" + String(row));
    }
  }
}