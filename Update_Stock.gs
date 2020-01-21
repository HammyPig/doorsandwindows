function updateStockA() {
  var invoiceNumber = Number(Order.getRange("I5").getValue());
  analyseStock(invoiceNumber);
  
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  Order.getRange("J6").setValue(Book.getRange(invoiceLookup, 9).getValue());
}

function updateStockB() {
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  analyseStock(invoiceNumber);
}

function updatePaid() {
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  Book.getRange(invoiceLookup, 4).setValue(Book.getRange(invoiceLookup, 3).getValue());
  Book.getRange(invoiceLookup, 6).setValue("Paid " + date);
}
  

function analyseStock(invoiceNumber) {
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
  var paid = true;
  
  if (Book.getRange(invoiceLookup, 6).getValue() == "") {
    var response = UI.alert("Note: Customer has not been recorded as paid, are you sure you want to proceed? Financial book will be updated to show customer has paid.", UI.ButtonSet.YES_NO);
    if (response == UI.Button.NO) {
      paid = false;
    }
  }
 
  if (paid) {
    if (Book.getRange(invoiceLookup, 8).getValue() == "") {
      var order = Book.getRange(invoiceLookup, 19).getValue().split(",");
      var trolley = [];
      var quantities = [];
      
      for (i = 0; i < order.length; i+=2) {
        trolley.push(order[i]);
      }
      
      for (i = 1; i < order.length; i+=2) {
        quantities.push(order[i]);
      }
      
      for (i = 0; i < trolley.length; i++) {
        for (ii = 0; ii < allStock.length; ii++) {
          
          if (String(trolley[i]) === String(allStock[ii])) {
            var existingStock = Stock.getRange("K" + String(ii+2)).getValue();
            var existingCount = Stock.getRange("M" + String(ii+2)).getValue();
            Stock.getRange("K" + String(ii+2)).setValue(existingStock - quantities[i]);
            Stock.getRange("M" + String(ii+2)).setValue(Number(existingCount) + Number(quantities[i]));
            
            break;
          }
        }
      }
      Book.getRange(invoiceLookup, 8).setValue("Stock Updated");
    }
    
    if (Book.getRange(invoiceLookup, 6).getValue() == "") {
      Book.getRange(invoiceLookup, 4).setValue(Book.getRange(invoiceLookup, 3).getValue());
      Book.getRange(invoiceLookup, 6).setValue("Paid " + date);
    }
    
    var orderSummary = Book.getRange(invoiceLookup, 19).getValue();
    
    if (!((orderSummary.indexOf("wf")+1 || orderSummary.indexOf("ws")+1 || orderSummary.indexOf("df")+1 || orderSummary.indexOf("ds")+1 || orderSummary.indexOf("custom")+1))) {
      Book.getRange(invoiceLookup, 9).setValue("Completed " + date);
    } else if (Book.getRange(invoiceLookup, 9).getValue().indexOf("Partial")+1) {
      var response = UI.alert("Have screens and/or custom products been delivered?", UI.ButtonSet.YES_NO);
      if (response == UI.Button.YES) {
        Book.getRange(invoiceLookup, 9).setValue("Completed " + date);
      }
    } else {
      Book.getRange(invoiceLookup, 9).setValue("Partial " + date);
    }
    
  } else {
    UI.alert("Process cancelled...");
  }
}