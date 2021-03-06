/**
 * Clears all contents within order page
 */
function clearOrderPage() {
  clearOrder();
  displayLatestInvoice();
}

function clearOrder() {
  ORDER.getRange(2, 1, 1, 12).setValue(""); // top bar
  ORDER.getRange(5, 1, ORDER.getLastRow(), 3).setValue(""); // cart products
  ORDER.getRange("I4").setValue("Invoices Notes");
  ORDER.getRange(O_NOTES).setValue(""); // notes
  ORDER.getRange(O_INVOICESTATUS).setValue(""); // status
  O_PAYMENTINFO.setValue(""); // payment status
}
