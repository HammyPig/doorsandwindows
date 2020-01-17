function updateStock() {
  var invoiceNumber = Number(Order.getRange("I5").getValue()) - 1572;
  var order = Book.getRange(invoiceNumber, 17).getValue().split(",");
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
  
  Book.getRange(invoiceNumber, 7).setValue("Received");
}