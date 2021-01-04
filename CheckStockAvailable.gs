/**
Displays the amount of stock leftover if
the order is fulfilled, and notifies if 
stock is missing with current stock levels.
**/
function checkStockAvailable(rows, quantities) {
  var stockAvailable = true;
  var stockLeftList = [];
  
  for (var i = 0; i < rows.length; i++) {
    var existingStock = STOCK.getRange(rows[i], S_STOCK).getValue();
    var stockLeft = [Number(existingStock) - Number(quantities[i])];
    stockLeftList.push(stockLeft);
    
    if (stockLeft < 0) {
      stockAvailable = false;
    }
  }
  
  ORDER.getRange(O_PRODUCTOFFSET, O_STOCKLEVEL, stockLeftList.length, 1).setValues(stockLeftList);
  
  if (!stockAvailable) {
    UI.alert("Warning: Stock not available, an order will need to be placed for this invoice...");
    return "Order";
  }
  
  return "Stock";
}