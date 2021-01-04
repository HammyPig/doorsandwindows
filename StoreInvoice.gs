/**
 * Records invoice information to financial
 * book
 */
function storeInvoice(invoiceInfo) {
   
  var row = validateInvoice(invoiceInfo.invoiceNumber)
  if (row == -1) {
    UI.alert("Invoice saving process cancelled...");
    return;
  }
  
  // Invoice information
  storeStaticInfo(row, invoiceInfo);
  
  // Create and store order summary
  var orderSummary = []
  for (i = 0; i < invoiceInfo.cart.length; i++) {
    orderSummary.push(invoiceInfo.cart[i]);
    orderSummary.push(invoiceInfo.quantities[i]);
  }
  
  orderSummary = String(orderSummary);
  BOOK.getRange(row, B_ORDERSUMMARY).setValue(orderSummary);
  
  // Store statuses
  
  var status = `${DATE}: Awaiting payment status to be updated\n${DATE}: Order edited\n\n` + BOOK.getRange(row, B_INVOICESTATUS).getValue(); // initial invoice status
  
  // Screen Order Number - n/a or empty
  var containsScreen = orderHasScreen(orderSummary);
  
  if (!containsScreen) {
    BOOK.getRange(row, B_SCREENORDER).setValue("n/a");
  } else {
    if (BOOK.getRange(row, B_SCREENORDER).getValue() == "n/a") {
      BOOK.getRange(row, B_SCREENORDER).setValue("");
    }
  }
  
  //BOOK.getRange(row, B_PAYMENTSTATUS).setValue(paymentStatus);
  
  // Stock Status - Stock Placed in Reserved -> Stock Has Been Substracted
  BOOK.getRange(row, B_STOCKSTATUS).setValue("");
  
  // Invoice Status - Awaiting Payment -> Awaiting Pickup/Delivery (Verify products are in stock) -> Awaiting Screen Pickup/Delivery (Verify screen is ready) -> Completed
  BOOK.getRange(row, B_INVOICESTATUS).setValue(status);
  
  ORDER.getRange(O_INVOICESTATUS).setValue(status);
}

function storeStaticInfo(row, invoiceInfo) {
    BOOK.getRange(row, B_INVOICENUMBER).setValue(invoiceInfo.invoiceNumber);
    BOOK.getRange(row, B_DATE).setValue(DATE);
    BOOK.getRange(row, B_INVOICETOTAL).setValue(invoiceInfo.invoiceTotal);
    BOOK.getRange(row, B_AMOUNTPAID).setValue(invoiceInfo.amountPaid);
    BOOK.getRange(row, B_AMOUNTDUE).setValue("=INDIRECT(ADDRESS(ROW(), COLUMN()-3))-INDIRECT(ADDRESS(ROW(),COLUMN()-2))-INDIRECT(ADDRESS(ROW(),COLUMN()-1))"); // invoiceTotal - amountPaid
    BOOK.getRange(row, B_CLIENTNAME).setValue(invoiceInfo.clientName);
    BOOK.getRange(row, B_DELIVERYADDRESS).setValue(invoiceInfo.address);
    BOOK.getRange(row, B_PHONE).setValue(invoiceInfo.phone);
    BOOK.getRange(row, B_EMAIL).setValue(invoiceInfo.email);
    BOOK.getRange(row, B_PAYMENTTYPE).setValue(invoiceInfo.paymentType);
    BOOK.getRange(row, B_SALESPERSON).setValue(invoiceInfo.salesPerson);
    BOOK.getRange(row, B_DELIVERYTYPE).setValue(invoiceInfo.deliveryType);
    BOOK.getRange(row, B_SCHEDULEDFOR).setValue(invoiceInfo.scheduledFor);
    BOOK.getRange(row, B_DISCOUNT).setValue(invoiceInfo.discount);
    BOOK.getRange(row, B_REFERRAL).setValue(invoiceInfo.referral);
    BOOK.getRange(row, B_NOTES).setValue(invoiceInfo.notes);
}