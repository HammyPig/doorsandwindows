function checkStock() {
  orderType = "Stock";
  stockAvailability = [];
  
  for (i = 0; i < trolley.length; i++) {
    for (ii = 0; ii < allStock.length; ii++) {
    
      if (String(trolley[i]) === String(allStock[ii])) {
        var existingStock = Stock.getRange("K" + String(ii+2)).getValue();
        var stockAvailable = existingStock - quantities[i];
        stockAvailability.push(stockAvailable);
        break;
      }
    }
  }
  
  for (i = 0; i < stockAvailability.length; i++) {
    Order.getRange(i+5, 3).setValue(stockAvailability[i]);
    if (stockAvailability[i] < 0) { 
      orderType = "Order";
    }
  }
  
  if (orderType == "Order") {
    SpreadsheetApp.getUi().alert("Warning: Stock not available, an order will need to be placed for this invoice...");
  }
}