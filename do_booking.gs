function doBooking() {
  // Check if invoice already exists
  var createNew = false;
  var row = locateInvoice(invoiceNumber)
  
  // Verify row
  if (row == 1) {
    var sure = true;
    var latestInvoice = Book.getRange(2, F_INVOICENUMBER).getValue()
    
    if (invoiceNumber > latestInvoice + 1) {
      var response = UI.alert("Warning: You are skipping an invoice slot... Are you sure you want to proceed?", UI.ButtonSet.YES_NO);
      
      if (response == UI.Button.NO) {
        sure = false;
      }
    }
    
    if (sure) {
      Book.insertRowBefore(2);
      row = 2;
      var createNew = true;
    }
    
  } else {
    var override = UI.alert("Warning: This invoice number already exists, would you like to override the existing information?", UI.ButtonSet.YES_NO);
  }
  
  if (override == UI.Button.YES || createNew) {
  
    // Fill in booking information
    var orderSummary = String(Order.getRange(5, 1, trolley.length, 2).getValues());
    var paymentStatus = '';
    if (amountPaid >= invoiceTotal) {
      paymentStatus = `Paid ${DATE}`;
    }
    
    var stockStatus = "Stock";
    
    Book.getRange(row, F_INVOICENUMBER).setValue(invoiceNumber);
    Book.getRange(row, F_DATE).setValue(DATE);
    Book.getRange(row, F_INVOICETOTAL).setValue(invoiceTotal);
    Book.getRange(row, F_AMOUNTPAID).setValue(amountPaid);
    Book.getRange(row, F_AMOUNTDUE).setValue("=(INDIRECT(ADDRESS(ROW(), COLUMN()-2)))-(INDIRECT(ADDRESS(ROW(),COLUMN()-1)))");
    Book.getRange(row, F_PAYMENTSTATUS).setValue(paymentStatus);
    var containScreen = (orderSummary.indexOf("wf")+1 || orderSummary.indexOf("ws")+1 || orderSummary.indexOf("df")+1 || orderSummary.indexOf("ds")+1)
    if (!containScreen) {
      Book.getRange(row, F_SCREENORDER).setValue('n/a');
    } else if (Book.getRange(row, F_SCREENORDER).getValue() == 'n/a') {
      Book.getRange(row, F_SCREENORDER).setValue('');
    }
    Book.getRange(row, F_STOCKUPDATED).setValue("");
    Book.getRange(row, F_INVOICESTATUS).setValue("");
    Book.getRange(row, F_CLIENTNAME).setValue(clientName);
    Book.getRange(row, F_DELIVERYADDRESS).setValue(clientAddress);
    Book.getRange(row, F_CLIENTMOBILE).setValue(clientMobile);
    Book.getRange(row, F_CLIENTEMAIL).setValue(clientEmail);
    Book.getRange(row, F_PAYMENTMETHOD).setValue(paymentMethod);
    Book.getRange(row, F_SALESPERSON).setValue(salesPerson);
    Book.getRange(row, F_DELIVERYTYPE).setValue(deliveryType);
    Book.getRange(row, F_SCHEDULEDFOR).setValue(scheduledFor);
    Book.getRange(row, F_ORDERSUMMARY).setValue(orderSummary);
  }
}