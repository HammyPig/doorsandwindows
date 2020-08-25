function checkStatus() {
  var invoiceNumber = Number(Order.getRange("I5").getValue());
  var row = locateInvoice(invoiceNumber);
  
  var status = Book.getRange(row, F_INVOICESTATUS).getValue();
  if (status == '') {
    status = 'No Actions Taken';
  }
  Order.getRange("I6").setValue(status);
}