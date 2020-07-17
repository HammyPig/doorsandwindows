function orderUpdateStock() {
  var invoiceNumber = Number(Order.getRange("I5").getValue());
  updateStock(invoiceNumber);
  
  // Update UI
  var row = locateInvoice(invoiceNumber)
  Order.getRange("J6").setValue(Book.getRange(row, F_INVOICESTATUS).getValue());
}

function invoiceUpdateStock() {
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  updateStock(invoiceNumber);
}

function updatePaid() {
  var invoiceNumber = Number(Invoice.getRange("F11").getValue());
  var row = locateInvoice(invoiceNumber)
  
  var invoiceAmount = Book.getRange(row, F_INVOICEAMOUNT).getValue()
  Book.getRange(row, F_AMOUNTPAID).setValue(invoiceAmount);
  Book.getRange(row, F_PAYMENTSTATUS).setValue(`Paid ${DATE}`);
}


function updateStock(invoiceNumber) {
  var row = locateInvoice(invoiceNumber)
  var paid = true;
  var paymentStatus = Book.getRange(row, F_PAYMENTSTATUS).getValue()
  
  if (!paymentStatus.includes('Paid')) {
    var payOverride = UI.alert("Note: Customer has NOT been recorded as paid, are you sure you want to proceed? Financial book will be updated to show customer has PAID.", UI.ButtonSet.YES_NO);
    
    if (payOverride == UI.Button.YES) {
      // Force invoice to be set as paid
      Book.getRange(row, F_AMOUNTPAID).setValue(Book.getRange(row, F_INVOICETOTAL).getValue());
      Book.getRange(row, F_PAYMENTSTATUS).setValue(`Paid ${DATE}`);
    } else {
      paid = false;
      UI.alert("Process cancelled...");
    }
  }
  
  if (paid) {
    var stockStatus = Book.getRange(row, F_STOCKUPDATED).getValue()
    var orderSummary = Book.getRange(row, F_ORDERSUMMARY).getValue();
    
    if (stockStatus == '') {
      // Find product quantities
      var order = orderSummary.split(',');
      var products = [];
      var quantities = [];
      
      for (var i = 0; i < order.length; i += 2) {
        products.push(order[i]);
        quantities.push(order[i + 1]);
      }
      
      // Subtract quantities from stock count
      for (var i = 0; i < products.length; i++) {
        var stockRow = allStock.indexOf(products[i])
        var existingStock = Stock.getRange(stockRow, F_STOCK).getValue();
        Stock.getRange(stockRow, F_STOCK).setValue(existingStock - quantities[i])
      }
      
      // Mark invoice as stock updated
      Book.getRange(row, F_STOCKUPDATED).setValue(`Stock Updated ${DATE}`);
    }
    
    var containScreen = (orderSummary.indexOf("wf")+1 || orderSummary.indexOf("ws")+1 || orderSummary.indexOf("df")+1 || orderSummary.indexOf("ds")+1 || orderSummary.indexOf("custom")+1)
    
    if (!containScreen) {
      Book.getRange(row, F_INVOICESTATUS).setValue(`Completed ${DATE}`);
    } else {
      // Check if screens/customs have in fact been delivered for invoice to be fully completed
      var fullyComplete = UI.alert("Have screens and/or custom products been delivered?", UI.ButtonSet.YES_NO);
      
      if (fullyComplete == UI.Button.YES) {
        Book.getRange(row, F_INVOICESTATUS).setValue(`Completed ${DATE}`);
      } else {
        Book.getRange(row, F_INVOICESTATUS).setValue(`Partial ${DATE}`);
      }
    }
  }
}