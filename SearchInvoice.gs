function searchInvoice() {
  var invoiceNumber = ORDER.getRange(2, O_SEARCHBAR).getValue();
  ORDER.getRange(2, O_SEARCHBAR).setValue("");
  
  var row = locateInvoice(invoiceNumber);
  
  if (row == -1) {
    UI.alert("Warning: The invoice you entered could not be found...");
    return;
  }
  
  clearOrderPage();
  
  // Fill in invoice information
  var invoiceTotal = BOOK.getRange(row, B_INVOICETOTAL).getValue();
  var amountPaid = BOOK.getRange(row, B_AMOUNTPAID).getValue();
  var amountDue = BOOK.getRange(row, B_AMOUNTDUE).getValue();
  var clientName = BOOK.getRange(row, B_CLIENTNAME).getValue();
  var address = BOOK.getRange(row, B_DELIVERYADDRESS).getValue();
  var phone = BOOK.getRange(row, B_PHONE).getValue();
  var email = BOOK.getRange(row, B_EMAIL).getValue();
  var paymentType = BOOK.getRange(row, B_PAYMENTTYPE).getValue();
  var salesPerson = BOOK.getRange(row, B_SALESPERSON).getValue();
  var deliveryType = BOOK.getRange(row, B_DELIVERYTYPE).getValue();
  var scheduledFor = BOOK.getRange(row, B_SCHEDULEDFOR).getValue();
  var orderSummary = BOOK.getRange(row, B_ORDERSUMMARY).getValue().split(",");
  var discount = BOOK.getRange(row, B_DISCOUNT).getValue();
  var referral = BOOK.getRange(row, B_REFERRAL).getValue();
  var status = BOOK.getRange(row, B_INVOICESTATUS).getValue();
  var notes = BOOK.getRange(row, B_NOTES).getValue();
  
  ORDER.getRange(2, O_INVOICENUMBER).setValue(invoiceNumber);
  ORDER.getRange(2, O_CLIENTNAME).setValue(clientName);
  ORDER.getRange(2, O_ADDRESS).setValue(address);
  ORDER.getRange(2, O_PHONE).setValue(phone);
  ORDER.getRange(2, O_EMAIL).setValue(email);
  ORDER.getRange(2, O_PAYMENTTYPE).setValue(paymentType);
  ORDER.getRange(2, O_SALESPERSON).setValue(salesPerson);
  ORDER.getRange(2, O_DELIVERYTYPE).setValue(deliveryType);
  ORDER.getRange(2, O_SCHEDULEDFOR).setValue(scheduledFor);
  ORDER.getRange(2, O_AMOUNTPAID).setValue(amountPaid);
  ORDER.getRange(2, O_DISCOUNT).setValue(discount);
  ORDER.getRange(2, O_REFERRAL).setValue(referral);
  ORDER.getRange(O_NOTES).setValue(notes);
  ORDER.getRange(O_INVOICESTATUS).setValue(status);
  ORDER.getRange(O_AMOUNTDUE).setValue(amountDue);
  
  ORDER.getRange(5, 14).setValue(invoiceTotal);
  ORDER.getRange(6, 14).setValue(discount);
  ORDER.getRange(7, 14).setValue(amountPaid);
  ORDER.getRange(8, 14).setValue(amountDue);
  ORDER.getRange(12, 14).setValue("=INDIRECT(ADDRESS(ROW()-4, COLUMN()))-INDIRECT(ADDRESS(ROW()-2, COLUMN()))");
  
  // Fill in products
  for (var i = 0; i < orderSummary.length; i++) {
    ORDER.getRange(i + 5, 1).setValue(orderSummary[2 * i]);
    ORDER.getRange(i + 5, 2).setValue(orderSummary[(2 * i) + 1]);
  }
}